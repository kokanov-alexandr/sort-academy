using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using MailKit.Security;
using Microsoft.AspNetCore.Authorization;
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
/// <param name="configuration"></param>
[Route("users")]
public class UsersController(UserRepository userRepository, IConfiguration configuration) : Controller
{
    private readonly UserRepository _userRepository = userRepository;
    private readonly IConfiguration _configuration = configuration;
    
    [Authorize]
    [HttpGet]
    public async Task<ActionResult<List<User>>> GetUsersAsync()
    {
        var users =  await _userRepository.GetCollectionAsync();
        return Ok(users);
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
        
        var salt = new byte[16];
        using (var rng = RandomNumberGenerator.Create())
        {
            rng.GetBytes(salt);
        }
        var saltString = Convert.ToBase64String(salt);
        
        return new User
        {
            Email = userDto.Email,
            PasswordHash = GetPasswordHash(userDto.Password, saltString),
            PasswordSalt = saltString,
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
        return await SendConfirmMailMessageAsync();
        var user = MapToUser(userDto);
        var createUserResult = await _userRepository.CreateAsync(user);
        if (createUserResult == 1)
        {
            return Ok();
        }

        return BadRequest();
    }

    private static bool VerifyPassword(string password, string storedPasswordHash, string storedPasswordSalt)
    {
        return GetPasswordHash(password, storedPasswordSalt) ==  storedPasswordHash;
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
            Audience = _configuration["Jwt:Audience"]
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
        return Ok(token);

    }

    private MimeMessage GetMessage(string salt)
    {
        var confirmationUrl = $"https://translate.yandex.ru/?lang=en-ru?{salt}";
        var message = new MimeMessage();
        message.From.Add(new MailboxAddress(_configuration["EmailSettings:SenderName"], _configuration["EmailSettings:SenderEmail"]));
        message.To.Add(new MailboxAddress("Получатель", "kokanovvv@gmail.com"));
        message.Subject = "Подтвердите свой email для завершения регистрации";

        message.Body = new TextPart("plain")
        {
            Text = $"Для подтверждения почты, пожалуйста, перейдите по ссылке ниже: \n{confirmationUrl}\nОбратите внимание: эта ссылка действительна в течение 10 минут.\n" +
                   $"Если вы не регистрировались на сайте, пожалуйста, проигнорируйте это письмо."
        };
        
        return message;
    }
    private async Task<ActionResult> SendConfirmMailMessageAsync()
    {
        try
        {
            using var client = new SmtpClient();
            await client.ConnectAsync(_configuration["EmailSettings:SmtpServer"], int.Parse(_configuration["EmailSettings:SmtpPort"] ?? string.Empty), SecureSocketOptions.SslOnConnect);            
            await client.AuthenticateAsync(_configuration["EmailSettings:SmtpUsername"], _configuration["EmailSettings:SmtpPassword"]);
            await client.SendAsync(GetMessage("test_salt"));
            await client.DisconnectAsync(true);
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}
