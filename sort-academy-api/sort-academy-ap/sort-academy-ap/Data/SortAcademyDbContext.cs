using Microsoft.EntityFrameworkCore;
using sort_academy_ap.Data.Models;

namespace sort_academy_ap.Data;

/// <summary>
/// Контекст базы данных
/// </summary>
/// <param name="options"></param>
public class SortAcademyDbContext(DbContextOptions<SortAcademyDbContext> options) : DbContext(options)
{
    /// <inheritdoc cref="User"/>
    public DbSet<User> Users { get; set; }
}
