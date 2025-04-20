
namespace sort_academy_api.Models;

public class SortingDto : BaseModelDto
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
    public List<SortingSortingPropertyDto>? SortingSortingProperty { get; set; }
}
