using AutoMapper;
using sort_academy_api.Data.Models;
using sort_academy_api.Models;

namespace sort_academy_api;

public class SortingProfile : Profile
{
    public SortingProfile()
    {
        CreateMap<Sorting, SortingDto>().ReverseMap();
        CreateMap<SortingProperty, SortingPropertyDto>().ReverseMap();
        CreateMap<SortingSortingProperty, SortingSortingPropertyDto>().ReverseMap();
    }

}
