namespace sort_academy_api.Data.Models;

/// <summary>
/// Событие подтверждения почты
/// </summary>
public class MailConfirmationEvent : BaseModel
{
    /// <summary>
    /// Почта
    /// </summary>
    public string Email { get; set; }
    
    /// <summary>
    /// Соль
    /// </summary>
    public string Salt { get; set; }

    /// <summary>
    /// Дата создания
    /// </summary>
    public DateTime CreatedDate { get; set; }

    /// <summary>
    /// Код подтверждения
    /// </summary>
    public string Code { get; set; }

}