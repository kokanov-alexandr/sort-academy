namespace sort_academy_api.Models;

public class SortingPropertyDto : BaseModelDto
{
    /// <summary>
    /// Имя
    /// </summary>
    public string Name { get; set; }

    public List<SortingSortingPropertyDto>? SortingSortingProperty { get; set; }
}
