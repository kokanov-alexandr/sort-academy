using Microsoft.EntityFrameworkCore;
using sort_academy_api.Data;
using sort_academy_api.Data.Models;

namespace sort_academy_api.Repositories;

public class SortingRepository(SortAcademyDbContext dbContext, ILogger<BaseRepository<Sorting>> logger) : BaseRepository<Sorting>(dbContext, logger)
{

    public async Task<List<Sorting>> GetSortingsAsync()
    {
        try
        {
            return await dbContext.Sortings
                      .Include(x => x.SortingSortingProperty)
                      .ThenInclude(x => x.SortingProperty)
                      .ToListAsync();

        }
        catch (Exception)
        {
            Logger.LogError("Ошибка при получении сортировок");
            throw;
        }
    }
}
