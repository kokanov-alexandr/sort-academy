using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using sort_academy_api.Data.Models;
using sort_academy_api.Data.Repositories;
using sort_academy_api.Models;
using sort_academy_api.Profiles;
using sort_academy_api.Providers;

namespace sort_academy_api.Controllers;

/// <summary>
/// Контроллер для работы с результатами тестов
/// </summary>
/// <param name="testResultRepository"></param>
/// <param name="questionResultRepository"></param>
/// <param name="mapperProvider"></param>
[Route("tests/results")]
public class TestResultsController(TestResultRepository testResultRepository, 
    QuestionResultRepository questionResultRepository, MapperProvider mapperProvider) : Controller
{
    private readonly TestResultRepository _testResultRepository = testResultRepository;
    private readonly QuestionResultRepository _questionResultRepository = questionResultRepository;
    private readonly MapperProvider _mapperProvider = mapperProvider;

    [HttpGet("user/{userId:int}")]
    public async Task<ActionResult> GetUserTestResultsAsync([FromRoute] int userId)
    {
        var tests = await _testResultRepository.GetUserTestResultsAsync(userId);
        var mapResult = _mapperProvider.CreateMapByProfileForList<TestResult, TestResultDto, TestResultProfile>(tests);
        return mapResult is null ? BadRequest() : Ok(tests);
    }

    
    [HttpGet]
    public async Task<ActionResult> GeTestResultByIdAsync([FromQuery] int id)
    {
        var test = await _testResultRepository.GetTestResultByIdAsync(id);
        if (test is null)
        {
            return NotFound();
        }

        var mapResult = _mapperProvider.CreateMapByProfile<TestResult, TestResultDto, TestResultProfile>(test);
        return mapResult is null ? BadRequest() : Ok(test);
    }

    
    [HttpPost]
    public async Task<ActionResult> CreateTestResultsAsync([FromBody] TestResultDto testResultDto)
    {
        testResultDto.StartDate = DateTime.Now;
        var mapResult = _mapperProvider.CreateMapByProfile<TestResultDto, TestResult, TestResultProfile>(testResultDto);
        if (mapResult is null)
        {
            return BadRequest();
        }

        var saveResult = await _testResultRepository.SaveItemAsync(mapResult);
        return saveResult == 0 ? BadRequest() : Ok(mapResult.Id);
    }


    [HttpPost("answer")]
    public async Task<ActionResult> CreateQuestionResultAsync([FromBody] QuestionResultDto questionResultDto)
    {
        var mapResult = _mapperProvider.CreateMapByProfile<QuestionResultDto, QuestionResult, TestResultProfile>(questionResultDto);
        if (mapResult is null)
        {
            return BadRequest();
        }

        var saveResult = await _questionResultRepository.SaveItemAsync(mapResult);
        return saveResult == 0 ? BadRequest() : Ok(mapResult.Id);
    }
}   
