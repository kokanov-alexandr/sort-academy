namespace sort_academy_api.Models;

/// <summary>
/// Модель теста
/// </summary>
public class TestDto : BaseModelDto
{
    /// <summary>
    /// Имя
    /// </summary>
    public string Name { get; set; }

    /// <summary>
    /// Описание
    /// </summary>
    public string? Description { get; set; }

    /// <summary>
    /// Удалён
    /// </summary>
    public bool IsDeleted { get; set; }

    /// <summary>
    /// Сортировка
    /// </summary>
    public SortingDto? Sorting { get; set; }

    /// <summary>
    /// Вопрос
    /// </summary>
    public List<QuestionDto>? Questions { get; set; }
}
