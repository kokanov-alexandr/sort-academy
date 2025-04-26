using Microsoft.EntityFrameworkCore;
using sort_academy_api.Data.Context;
using sort_academy_api.Data.Models;

namespace sort_academy_api.Data.Repositories;

public class TestRepositoryy(SortAcademyDbContext dbContext, ILogger<BaseRepository<Test>> logger) : BaseRepository<Test>(dbContext, logger)
{
    public async Task<List<Test>> GetTestsAsync()
    {
        try
        {
            return await dbContext.Tests
                .Include(x => x.Sorting)
                .Include(x => x.Questions)
                .ThenInclude(x => x.AnswerOptions)
                .ToListAsync();

        }
        catch (Exception)
        {
            throw new Exception("Ошибка при получении сортировок");
        }
    }

    public async Task<Test> GetTestByIdAsync(int id)
    {
        try
        {
            return  await dbContext.Tests
                .Include(x => x.Sorting)
                .Include(x => x.Questions)
                .ThenInclude(x => x.AnswerOptions)
                .FirstOrDefaultAsync(x => x.Id == id);

        }
        catch (Exception)
        {
            throw new Exception("Ошибка при получении сортировок");
        }
    }
}
