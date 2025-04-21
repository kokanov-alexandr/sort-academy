using sort_academy_api.Data.Context;
using sort_academy_api.Data.Models;

namespace sort_academy_api.Data.Repositories;

public class TestRepositoryy(SortAcademyDbContext dbContext, ILogger<BaseRepository<Test>> logger) : BaseRepository<Test>(dbContext, logger)
{
}
