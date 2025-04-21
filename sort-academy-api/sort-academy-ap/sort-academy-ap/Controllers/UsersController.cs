using Microsoft.AspNetCore.Mvc;
using sort_academy_api.Data;
using sort_academy_api.Data.Models;
using sort_academy_api.Data.Repositories;
using sort_academy_api.Models;
using System.Security.Cryptography;
using System.Text;

namespace sort_academy_api.Controllers;

/// <summary>
/// Контроллер для работы с пользователями
/// </summary>
/// <param name="userRepository"></param>
[Route("users")]
public class UsersController(UserRepository userRepository) : Controller
{
    private readonly UserRepository _userRepository = userRepository;


    [HttpGet]
    public async Task<ActionResult<List<User>>> GetUsersAsync()
    {
        var users =  await _userRepository.GetCollectionAsync();
        if (users is null)
        {
            return BadRequest();
        }

        return Ok(users);
    }

    [HttpPost]
    public async Task<ActionResult> CreateUserAsync([FromBody] UserDto userDto)
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
