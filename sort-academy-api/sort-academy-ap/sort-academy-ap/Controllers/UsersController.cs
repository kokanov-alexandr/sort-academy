using Microsoft.AspNetCore.Mvc;
using sort_academy_ap.Data;
using sort_academy_ap.Data.Models;
using sort_academy_ap.Models;
using sort_academy_ap.Repositories;
using System.Security.Cryptography;
using System.Text;

namespace sort_academy_ap.Controllers;

/// <summary>
/// Контроллер для работы с пользователями
/// </summary>
/// <param name="userRepository"></param>
[Route("users")]
public class UsersController(UserRepository userRepository) : Controller
{
    private readonly UserRepository _userRepository = userRepository;


    [HttpGet]
    public async Task<List<User>> GetUsersAsync()
    {
        return await _userRepository.GetCollectionAsync();
    }

    [HttpPost]
    public async Task<IActionResult> CreateUserAsync([FromBody] UserDto userDto)
    {
        var salt = new byte[16];
        using (var rng = RandomNumberGenerator.Create())
        {
            rng.GetBytes(salt);
        }
        string saltString = Convert.ToBase64String(salt);

        string passwordWithSalt = userDto.Password + saltString;
        var bytes = SHA256.HashData(Encoding.UTF8.GetBytes(passwordWithSalt));
        var builder = new StringBuilder();
        for (int i = 0; i < bytes.Length; i++)
        {
            builder.Append(bytes[i].ToString("x2"));
        }

        var user = new User
        {
            Email = userDto.Email,
            PasswordHash = passwordWithSalt,
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

}
