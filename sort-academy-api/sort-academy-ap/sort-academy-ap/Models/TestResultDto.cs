using sort_academy_api.Data.Models;

namespace sort_academy_api.Models;

public class TestResultDto : BaseModelDto
{
    /// <summary>
    /// Пользователь
    /// </summary>
    public UserDto User { get; set; }

    /// <summary>
    /// Тест
    /// </summary>
    public TestDto Test { get; set; }

    /// <summary>
    /// Результаты ответов
    /// </summary>
    public List<QuestionResultDto>? QuestionResults { get; set; }

    /// <summary>
    /// Дата начала теста
    /// </summary>
    public DateTime? StartDate { get; set; }

    /// <summary>
    /// Дата завершения теста
    /// </summary>
    public DateTime? CompletionDate { get; set; }
}
