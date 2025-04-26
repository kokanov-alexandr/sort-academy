using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using sort_academy_api.Data.Context;
using sort_academy_api.Data.Models;

namespace sort_academy_api.Data.Repositories;

public class TestResultRepository(SortAcademyDbContext dbContext, ILogger<BaseRepository<TestResult>> logger) : BaseRepository<TestResult>(dbContext, logger)
{
    public async Task<List<TestResult>> GetUserTestResultsAsync(int userId)
    {
        try
        {
            return await dbContext.TestResults
                .Include(x => x.User)
                .Where(x => x.User.Id == userId)
                .Include(x => x.Test).ThenInclude(x => x.Questions).ThenInclude(x => x.AnswerOptions)
                .Include(x => x.QuestionResults).ThenInclude(x => x.Question)
                .Include(x => x.QuestionResults).ThenInclude(x => x.UserAnswerOptions)
                .AsNoTracking()
                .ToListAsync();
        }
        catch (Exception e)
        {
            logger.LogError($"Ошибка при получении результатов тестов {e.Message}");
            throw;
        }
    }

    public async Task<TestResult> GetTestResultByIdAsync(int id)
    {
        try
        {
            return await dbContext.TestResults
                .Include(x => x.User)
                .Include(x => x.Test).ThenInclude(x => x.Questions).ThenInclude(x => x.AnswerOptions)
                .Include(x => x.QuestionResults).ThenInclude(x => x.Question)
                .Include(x => x.QuestionResults).ThenInclude(x => x.UserAnswerOptions)
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == id);

        }
        catch (Exception e)
        {
            logger.LogError($"Ошибка при получении результатов тестов {e.Message}");
            throw;
        }
    }
}

