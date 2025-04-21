using sort_academy_api.Data.Context;
using sort_academy_api.Data.Models;

namespace sort_academy_api.Data.Repositories;

/// <summary>
/// Репозиторий пользователей
/// </summary>
public class UserRepository(SortAcademyDbContext dbContext, ILogger<BaseRepository<User>> logger) : BaseRepository<User>(dbContext, logger)
{
}
