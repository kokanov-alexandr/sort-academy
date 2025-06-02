using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Security.Cryptography.Xml;
using System.Text;
using MailKit.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MimeKit;
using sort_academy_api.Data.Models;
using sort_academy_api.Data.Repositories;
using sort_academy_api.Models;
using SmtpClient = MailKit.Net.Smtp.SmtpClient;

namespace sort_academy_api.Controllers;

/// <summary>
/// Контроллер для работы с пользователями
/// </summary>
/// <param name="userRepository"></param>
/// <param name="mailConfirmationEventRepository"></param>
/// <param name="configuration"></param>
[Route("users")]
public class UsersController(
    UserRepository userRepository,
    MailConfirmationEventRepository mailConfirmationEventRepository,
    IConfiguration configuration) : Controller
{
    private readonly UserRepository _userRepository = userRepository;
    private readonly MailConfirmationEventRepository _mailConfirmationEventRepository = mailConfirmationEventRepository;
    private readonly IConfiguration _configuration = configuration;

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<List<User>>> GetUsersAsync()
    {
        var users = await _userRepository.GetCollectionAsync();
        return Ok(users);
    }

    public static string GenerateSalt(int length)
    {
        byte[] salt = new byte[length];

        using (var rng = new RNGCryptoServiceProvider())
        {
            rng.GetBytes(salt);
        }

        return Convert.ToBase64String(salt);
    }


    public static string GenerateNumericCode(int length = 6)
    {
        var random = new RNGCryptoServiceProvider();
        var bytes = new byte[length];
        var result = new char[length];

        for (int i = 0; i < length; i++)
        {
            random.GetBytes(bytes, i, 1);
            result[i] = (char)('0' + (bytes[i] % 10));
        }

        return new string(result);
    }


    private static string GetPasswordHash(string password, string storedPasswordSalt)
    {
        var passwordWithSalt = password + storedPasswordSalt;
        var bytes = SHA256.HashData(Encoding.UTF8.GetBytes(passwordWithSalt));
        var builder = new StringBuilder();
        foreach (var t in bytes)
        {
            builder.Append(t.ToString("x2"));
        }

        return builder.ToString();
    }

    private static User MapToUser(UserDto userDto)
    {
        var salt = GenerateSalt(16);
        return new User
        {
            Email = userDto.Email,
            PasswordHash = GetPasswordHash(userDto.Password, salt),
            PasswordSalt = salt,
            CreatedDate = DateTime.UtcNow,
            IsEmailConfirmed = false,
        };
    }

    /// <summary>
    /// Регистрация
    /// </summary>
    /// <param name="userDto">модель пользователя</param>
    /// <returns></returns>
    [HttpPost]
    public async Task<ActionResult> RegistrationAsync([FromBody] UserDto userDto)
    {
        var getExistUser = await _userRepository.GetItemAsNoTrackingAsync(x => x.Email == userDto.Email);
        if (getExistUser is not null)
        {
            return Problem(statusCode: 409, detail: "Уже есть аккаунт с данным адресом электронной почты!");

        }
        var user = MapToUser(userDto);
        var createUserResult = await _userRepository.CreateAsync(user);
        if (createUserResult == 0)
        {
            return BadRequest();
        }

        return await ConfirmMailAsync(userDto.Email);
    }

    private static bool VerifyPassword(string password, string storedPasswordHash, string storedPasswordSalt)
    {
        return GetPasswordHash(password, storedPasswordSalt) == storedPasswordHash;
    }

    private string GenerateJwtToken(User user)
    {
        var claims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new(ClaimTypes.Name, user.Email),
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddHours(4),
            SigningCredentials = creds,
            Issuer = _configuration["Jwt:Issuer"],
            Audience = _configuration["Jwt:Audience1"]
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);
    }

    /// <summary>
    /// Авторизация
    /// </summary>
    /// <param name="userDto"></param>
    /// <returns></returns>
    [HttpPost("login")]
    public async Task<ActionResult> AuthorizationAsync([FromBody] UserDto userDto)
    {
        var user = await _userRepository.GetItemAsNoTrackingAsync(x => x.Email == userDto.Email);
        if (user == null)
        {
            return NotFound();
        }

        if (!VerifyPassword(userDto.Password, user.PasswordHash, user.PasswordSalt))
        {
            return BadRequest();
        }

        var token = GenerateJwtToken(user);
        return Ok(new { token = token});
    }

    private MimeMessage GetMessage(string email, string code)
    {
        var message = new MimeMessage();
        message.From.Add(new MailboxAddress(_configuration["EmailSettings:SenderName"],
            _configuration["EmailSettings:SenderEmail"]));
        message.To.Add(new MailboxAddress("Получатель", email));
        message.Subject = "Подтвердите свой email для завершения регистрации";

        message.Body = new TextPart("plain")
        {
            Text =
                $"Ваш код подтверждения: {code}. Обратите внимание: код подтверждения действует в течение 5 минут.\n" +
                $"Если вы не регистрировались на сайте, пожалуйста, проигнорируйте это письмо."
        };

        return message;
    }

    private async Task<ActionResult> SendConfirmMailMessageAsync(string email, string code)
    {
        try
        {
            using var client = new SmtpClient();
            await client.ConnectAsync(_configuration["EmailSettings:SmtpServer"],
                int.Parse(_configuration["EmailSettings:SmtpPort"] ?? string.Empty), SecureSocketOptions.SslOnConnect);
            await client.AuthenticateAsync(_configuration["EmailSettings:SmtpUsername"],
                _configuration["EmailSettings:SmtpPassword"]);
            await client.SendAsync(GetMessage(email, code));
            await client.DisconnectAsync(true);
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
    
    private async Task<ActionResult> ConfirmMailAsync(string email)
    {
        var salt = GenerateSalt(32);
        var code = GenerateNumericCode();
        var mailConfirmationEvent = new MailConfirmationEvent
        {
            Email = email,
            CreatedDate = DateTime.Now,
            Salt = salt,
            Code = code
        };

        var saveEventResult = await _mailConfirmationEventRepository.CreateAsync(mailConfirmationEvent);
        if (saveEventResult == 0)
        {
            return BadRequest();
        }

        var sendEmailResult = await SendConfirmMailMessageAsync(email, code);
        var status = sendEmailResult as StatusCodeResult;
        if (status.StatusCode != Ok().StatusCode)
        {
            return sendEmailResult;
        }

        var result = new ConfirmEmailRequestDto { Salt = salt };
        return Ok(result);

    }

    [HttpPost("confirm-email")]
    public async Task<ActionResult> ConfirmEmailAsync([FromBody] ConfirmEmailRequestDto confirmEmailRequestDto)
    {
        var mailConfirmationEvent =
            await _mailConfirmationEventRepository.GetItemAsNoTrackingAsync(x => x.Salt == confirmEmailRequestDto.Salt);
        
        if (mailConfirmationEvent is null)
        {
            return Problem(statusCode: NotFound().StatusCode, detail: "Код больше не действителен");
        }

        if (mailConfirmationEvent.CreatedDate < DateTime.Now.AddMinutes(-5))
        {
            return Problem(statusCode: NotFound().StatusCode, detail: "Время жизни кода вышло");
        }

        var user = await _userRepository.GetItemAsNoTrackingAsync(x => x.Email == mailConfirmationEvent.Email);
        if (user is null)
        {
            return Problem(statusCode: NotFound().StatusCode, detail: "Пользователь не найден");
        }

        if (mailConfirmationEvent.Code != confirmEmailRequestDto.Code)
        {
            return Problem(statusCode: 410, detail: "Невверный код подтверждения");
        }

        user.IsEmailConfirmed = true;
        var saveUserResult = await _userRepository.SaveItemAsync(user);
        if (saveUserResult == 0)
        {
            return BadRequest();
        }
        var deleteEventResult = await _mailConfirmationEventRepository.DeleteItemAsync(mailConfirmationEvent);
        return deleteEventResult == 0 ? BadRequest() :  Ok();
    }
}