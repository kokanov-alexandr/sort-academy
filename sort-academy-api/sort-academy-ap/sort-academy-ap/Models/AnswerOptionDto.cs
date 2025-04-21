namespace sort_academy_api.Models;

public class AnswerOptionDto : BaseModelDto
{
    /// <summary>
    /// Значение
    /// </summary>
    public string Value { get; set; }

    /// <summary>
    /// Верный
    /// </summary>
    public bool IsCorrect { get; set; }
}
