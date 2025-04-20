using sort_academy_ap.Data;
using sort_academy_ap.Data.Models;

namespace sort_academy_ap.Repositories;

/// <summary>
/// Репозиторий пользователей
/// </summary>
public class UserRepository(SortAcademyDbContext dbContext, ILogger<BaseRepository<User>> logger) : BaseRepository<User>(dbContext, logger)
{
}
