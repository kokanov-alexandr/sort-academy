using sort_academy_api.Data.Context;
using sort_academy_api.Data.Models;

namespace sort_academy_api.Data.Repositories;

public class QuestionRepository(SortAcademyDbContext dbContext, ILogger<BaseRepository<Question>> logger) : BaseRepository<Question>(dbContext, logger)
{
}
