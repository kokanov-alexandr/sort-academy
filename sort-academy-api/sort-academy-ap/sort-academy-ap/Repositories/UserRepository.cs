using sort_academy_api.Data;
using sort_academy_api.Data.Models;

namespace sort_academy_api.Repositories;

/// <summary>
/// Репозиторий пользователей
/// </summary>
public class UserRepository(SortAcademyDbContext dbContext, ILogger<BaseRepository<User>> logger) : BaseRepository<User>(dbContext, logger)
{
}
