namespace sort_academy_api.Data.Models;

public class UserAnswerOption : BaseModel
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
