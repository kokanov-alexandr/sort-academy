using AutoMapper;
using sort_academy_api.Data.Models;
using sort_academy_api.Models;

namespace sort_academy_api;

public class TestProfile : Profile
{
    public TestProfile()
    {
        CreateMap<Test, TestDto>().ReverseMap();
        CreateMap<Sorting, SortingDto>().ReverseMap();
        CreateMap<Question, QuestionDto>().ReverseMap();
        CreateMap<AnswerOption, AnswerOptionDto>().ReverseMap();
    }
}
