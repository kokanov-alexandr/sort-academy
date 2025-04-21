namespace sort_academy_api.Data.Models;

/// <summary>
/// Тест
/// </summary>
public class Test : BaseModel
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
    public Sorting? Sorting { get; set; }

    /// <summary>
    /// Вопрос
    /// </summary>
    public List<Question>? Questions  { get; set; }
}
