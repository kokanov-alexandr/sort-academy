using sort_academy_api.Enums;
namespace sort_academy_api.Data.Models;

public class SortingSortingProperty
{
    public int SortingId { get; set; }

    public Sorting Sorting { get; set;}

    public int SortingPropertyId { get; set; }

    public SortingProperty SortingProperty  { get; set; }

    public TimeComplexity Value { get; set; }
}