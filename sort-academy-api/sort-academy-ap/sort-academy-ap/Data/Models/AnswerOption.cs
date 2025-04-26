namespace sort_academy_api.Data.Models;

/// <summary>
/// Вариант ответа
/// </summary>
public class AnswerOption : BaseModel
{
    /// <summary>
    /// Значение
    /// </summary>
    public string Value { get; set; }

    /// <summary>
    /// Верный
    /// </summary>
    public bool IsCorrect { get; set; }

    /// <summary>
    /// Ответы на вопрос
    /// </summary>
    public List<QuestionResult> QuestionResults { get; set; }

}
