namespace sort_academy_api.Data.Models;

public class SortingProperty : BaseModel
{
    /// <summary>
    /// Имя
    /// </summary>
    public string Name { get; set; }

    public List<SortingSortingProperty>? SortingSortingProperty { get; set; }
}
