using sort_academy_api.Data.Context;
using sort_academy_api.Data.Models;

namespace sort_academy_api.Data.Repositories;

public class QuestionResultRepository(SortAcademyDbContext dbContext, ILogger<BaseRepository<QuestionResult>> logger) : 
    BaseRepository<QuestionResult>(dbContext, logger)
{
}


