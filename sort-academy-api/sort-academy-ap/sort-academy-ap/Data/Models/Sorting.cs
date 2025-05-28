namespace sort_academy_api.Data.Models;

/// <summary>
/// Сортировка
/// </summary>
public class Sorting : BaseModel
{
    /// <summary>
    /// Имя
    /// </summary>
    public string Name { get; set; }

    /// <summary>
    /// Отображаемое имя
    /// </summary>
    public string? DisplayName { get; set; }

    /// <summary>
    /// Описание
    /// </summary>
    public string? Description { get; set; }

    /// <summary>
    /// Свойства
    /// </summary>
    public List<SortingSortingProperty>? SortingSortingProperty { get; set; }

    /// <summary>
    /// Тесты
    /// </summary>
    public List<Test>? Tests { get; set; }
}
