using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using sort_academy_api.Data.Models;
using sort_academy_api.Data.Repositories;
using sort_academy_api.Models;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;

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

    /// <summary>
    /// Регистрация
    /// </summary>
    /// <param name="userDto"></param>
    /// <returns></returns>
    [Authorize]
    [HttpPost]
    public async Task<ActionResult> RegistrationAsync([FromBody] UserDto userDto)
    {
        var salt = new byte[16];
        using (var rng = RandomNumberGenerator.Create())
        {
            rng.GetBytes(salt);
        }
        var saltString = Convert.ToBase64String(salt);

        var passwordWithSalt = userDto.Password + saltString;
        var bytes = SHA256.HashData(Encoding.UTF8.GetBytes(passwordWithSalt));
        var builder = new StringBuilder();
        foreach (var t in bytes)
        {
            builder.Append(t.ToString("x2"));
        }

        var user = new User
        {
            Email = userDto.Email,
            PasswordHash = builder.ToString(),
            PasswordSalt = saltString,
            CreatedDate = DateTime.UtcNow,
            IsEmailConfirmed = false,
        };

        var createUserResult = await _userRepository.CreateAsync(user);
        if (createUserResult == 1)
        {
            return Ok();
        }

        return BadRequest();
    }

    private static bool VerifyPassword(string password, string storedPasswordHash, string storedPasswordSalt)
    {
        var passwordWithSalt = password + storedPasswordSalt;
        var bytes = SHA256.HashData(Encoding.UTF8.GetBytes(passwordWithSalt));
        var builder = new StringBuilder();
        foreach (var t in bytes)
        {
            builder.Append(t.ToString("x2"));
        }
        var hashedPassword = builder.ToString();
        return hashedPassword == storedPasswordHash;
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
            Expires = DateTime.UtcNow.AddSeconds(10), 
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
}
