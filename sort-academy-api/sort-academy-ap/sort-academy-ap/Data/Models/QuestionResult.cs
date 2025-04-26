namespace sort_academy_api.Data.Models;

/// <summary>
/// Рузальтат вопроса
/// </summary>
public class QuestionResult : BaseModel
{
    /// <summary>
    /// Результат теста
    /// </summary>
    public TestResult TestResult { get; set; }

    /// <summary>
    /// Вопрос
    /// </summary>
    public Question Question { get; set; }

    /// <summary>
    /// Варианты ответа пользователя
    /// </summary>
    public List<AnswerOption> UserAnswerOptions { get; set; }
}
