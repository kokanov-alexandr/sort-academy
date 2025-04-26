using Microsoft.AspNetCore.Mvc;
using sort_academy_api.Data.Models;
using sort_academy_api.Data.Repositories;
using sort_academy_api.Models;
using sort_academy_api.Profiles;
using sort_academy_api.Providers;

namespace sort_academy_api.Controllers;

/// <summary>
/// Контроллер для работы с соритровками
/// </summary>
/// <param name="sortingRepository"></param>
[Route("sortings")]
public class SortingsController(SortingRepository sortingRepository, MapperProvider mapperProvider) : Controller
{
    private readonly SortingRepository _sortingRepository = sortingRepository;
    private readonly MapperProvider _mapperProvider = mapperProvider;

    [HttpGet]
    public async Task<ActionResult<List<SortingDto>>> GetSortingsAsync()
    {
        var sortings = await _sortingRepository.GetSortingsAsync();
        var mapResult = _mapperProvider.CreateMapByProfileForList<Sorting, SortingDto, SortingProfile>(sortings);
        if (mapResult is null)
        {
            return BadRequest();
        }

        return Ok(mapResult);
    }


    [HttpPost]
    public async Task<ActionResult<List<SortingDto>>> CreateSortingsAsync([FromBody] SortingDto sortingDto)
    {
        var mapResult = _mapperProvider.CreateMapByProfile<SortingDto, Sorting, SortingProfile>(sortingDto);
        if (mapResult is null)
        {
            return BadRequest();
        }

        var saveResult = await _sortingRepository.SaveItemAsync(mapResult);
        return saveResult == 0 ? BadRequest() : Ok(mapResult.Id);
    }
}
