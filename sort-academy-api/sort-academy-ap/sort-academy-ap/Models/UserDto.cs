namespace sort_academy_ap.Models;

/// <summary>
/// Пользователь
/// </summary>
public class UserDto
{
    /// <summary>
    /// Идентификатор
    /// </summary>
    public int Id { get; set; }

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
