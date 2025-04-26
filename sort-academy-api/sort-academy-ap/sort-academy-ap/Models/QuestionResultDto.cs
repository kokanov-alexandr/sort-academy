namespace sort_academy_api.Models;

public class QuestionResultDto : BaseModelDto
{
    /// <summary>
    /// Результат теста
    /// </summary>
    public TestResultDto TestResult { get; set; }

    /// <summary>
    /// Вопрос
    /// </summary> 
    public QuestionDto Question { get; set; }

    /// <summary>
    /// Варианты ответа пользователя
    /// </summary>
    public List<AnswerOptionDto> UserAnswerOptions { get; set; }
}
