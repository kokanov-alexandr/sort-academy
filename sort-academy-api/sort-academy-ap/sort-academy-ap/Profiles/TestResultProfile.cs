using AutoMapper;
using sort_academy_api.Data.Models;
using sort_academy_api.Models;

namespace sort_academy_api.Profiles;

public class TestResultProfile : Profile
{
    public TestResultProfile()
    {
        CreateMap<TestResult, TestResultDto>().ReverseMap();
        CreateMap<QuestionResult, QuestionResultDto>().ReverseMap();
        CreateMap<Question, QuestionDto>().ReverseMap();
        CreateMap<AnswerOption, AnswerOptionDto>().ReverseMap();
        CreateMap<User, UserDto>().ReverseMap();
        CreateMap<Test, TestDto>().ReverseMap();
    }
}
