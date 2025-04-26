namespace sort_academy_api.Data.Models;

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
    public List<UserAnswerOption> UserAnswerOptions { get; set; }
}
