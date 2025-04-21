namespace sort_academy_api.Data.Models;

/// <summary>
/// Вопрос
/// </summary>
public class Question : BaseModel
{
    /// <summary>
    /// Контент
    /// </summary>
    public string Content { get; set; }

    /// <summary>
    /// Удалён
    /// </summary>
    public bool IsDeleted { get; set; }

    /// <summary>
    /// Варианты ответа
    /// </summary>
    public List<AnswerOption>? AnswerOptions { get; set; }
}
