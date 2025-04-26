using sort_academy_api.Data.Context;
using sort_academy_api.Data.Models;

namespace sort_academy_api.Data.Repositories;

public class AnswerOptionRepository(SortAcademyDbContext dbContext, ILogger<BaseRepository<AnswerOption>> logger) : BaseRepository<AnswerOption>(dbContext, logger)
{
}
