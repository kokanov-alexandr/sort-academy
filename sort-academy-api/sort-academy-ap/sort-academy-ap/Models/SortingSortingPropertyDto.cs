using sort_academy_api.Enums;

namespace sort_academy_api.Models;

public class SortingSortingPropertyDto
{
    public int SortingId { get; set; }

    public SortingDto Sorting { get; set; }

    public int SortingPropertyId { get; set; }

    public SortingPropertyDto SortingProperty { get; set; }

    public TimeComplexity Value { get; set; }
}
