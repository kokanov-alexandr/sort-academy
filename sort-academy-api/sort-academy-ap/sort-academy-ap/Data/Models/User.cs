namespace sort_academy_api.Data.Models;

/// <summary>
/// Пользователь
/// </summary>
public class User : BaseModel
{
    /// <summary>
    /// Почта
    /// </summary>
    public string Email { get; set; }

    /// <summary>
    /// Хэш пароля
    /// </summary>
    public string PasswordHash { get; set; }

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
    public bool IsEmailConfirmed { get; set; }
}
