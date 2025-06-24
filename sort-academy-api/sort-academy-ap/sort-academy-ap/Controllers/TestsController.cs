using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using sort_academy_api.Data.Models;
using sort_academy_api.Data.Repositories;
using sort_academy_api.Models;
using sort_academy_api.Profiles;
using sort_academy_api.Providers;

namespace sort_academy_api.Controllers;

/// <summary>
/// Контроллер для работы с тестами
/// </summary>
/// <param name="testRepository"></param>
[Route("tests")]
public class TestsController(TestRepository testRepository, MapperProvider mapperProvider) : Controller
{
    private readonly TestRepository _testRepositoryy = testRepository;
    private readonly MapperProvider _mapperProvider = mapperProvider;

    [HttpGet]
    public async Task<ActionResult<List<User>>> GetTestsAsync()
    {
        var tests = await _testRepositoryy.GetTestsAsync();
        if (tests is null)
        {
            return BadRequest();
        }

        return Ok(tests);
    }

    /// <summary>
    /// Получение теста по идентификатору
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    [HttpGet("{id:int}")]
    public async Task<ActionResult<List<User>>> GetTestByIdAsync([FromRoute] int id)
    {
        var test = await _testRepositoryy.GetTestByIdAsync(id);
        if (test is null)
        {
            return NotFound();
        }

        return Ok(test);
    }

    [HttpPost]
    public async Task<ActionResult<List<User>>> CreateTestAsync([FromBody] TestDto testDto)
    {
        var mapResult = _mapperProvider.CreateMapByProfile<TestDto, Test, TestProfile>(testDto);
        if (mapResult is null)
        {
            return BadRequest();
        }

        var saveResult = await _testRepositoryy.SaveItemAsync(mapResult);
        if (saveResult == 0)
        {
            return BadRequest();
        }

        return Ok(mapResult.Id);
    }
}
