namespace sort_academy_api.Models;

public class QuestionDto : BaseModelDto
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
    public List<AnswerOptionDto>? AnswerOptions { get; set; }
}
