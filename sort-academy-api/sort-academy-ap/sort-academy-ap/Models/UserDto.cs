namespace sort_academy_api.Models;

/// <summary>
/// Пользователь
/// </summary>
public class UserDto : BaseModelDto
{

    /// <summary>
    /// Почта
    /// </summary>
    public string Email { get; set; }

    /// <summary>
    /// Пароль
    /// </summary>
    public string Password { get; set; }

    /// <summary>
    /// Соль пароля
    /// </summary>
    public string PasswordSalt { get; set; }

    /// <summary>
    /// Дата создания
    /// </summary>
    public DateTime CreatedDate { get; set; }

    /// <summary>
    /// Подтверждена ли почта
    /// </summary>
    public string IsEmailConfirmed { get; set; }
}
