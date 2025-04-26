namespace sort_academy_api.Data.Models;

/// <summary>
/// Результат теста
/// </summary>
public class TestResult : BaseModel
{
    /// <summary>
    /// Пользователь
    /// </summary>
    public User User { get; set; }

    /// <summary>
    /// Тест
    /// </summary>
    public Test Test { get; set; }

    /// <summary>
    /// Результаты ответов
    /// </summary>
    public List<QuestionResult>? QuestionResults { get; set; }

    /// <summary>
    /// Дата начала теста
    /// </summary>
    public DateTime? StartDate { get; set; }

    /// <summary>
    /// Дата завершения теста
    /// </summary>
    public DateTime? CompletionDate { get; set; }
}
