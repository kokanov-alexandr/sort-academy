using Microsoft.AspNetCore.Mvc;
using sort_academy_api.Data.Models;
using sort_academy_api.Data.Repositories;
using sort_academy_api.Models;
using sort_academy_api.Profiles;
using sort_academy_api.Providers;

namespace sort_academy_api.Controllers;

/// <summary>
/// Контроллер для работы с результатами вопроса
/// </summary>
/// <param name="questionResultRepository"></param>
/// <param name="mapperProvider"></param>
[Route("questions/results")]
public class QuestionResultController(QuestionResultRepository questionResultRepository, MapperProvider mapperProvider) : Controller
{
    private readonly QuestionResultRepository _questionResultRepository = questionResultRepository;
    private readonly MapperProvider _mapperProvider = mapperProvider;

    [HttpPost]
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
