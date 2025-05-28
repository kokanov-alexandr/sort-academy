using Microsoft.EntityFrameworkCore;
using sort_academy_api.Data.Models;

namespace sort_academy_api.Data.Context;

/// <summary>
/// Контекст базы данных
/// </summary>
/// <param name="options"></param>
public class SortAcademyDbContext(DbContextOptions<SortAcademyDbContext> options) : DbContext(options)
{
    /// <inheritdoc cref="User"/>
    public DbSet<User> Users { get; set; }

    /// <inheritdoc cref="Sorting"/>
    public DbSet<Sorting> Sortings { get; set; }

    /// <inheritdoc cref="SortingProperty"/>
    public DbSet<SortingProperty> SortingProperties { get; set; }

    /// <inheritdoc cref="SortingProperty"/>
    public DbSet<SortingSortingProperty> SortingSortingProperty { get; set; }

    /// <inheritdoc cref="Test"/>
    public DbSet<Test> Tests { get; set; }

    /// <inheritdoc cref="Question"/>
    public DbSet<Question> Questions { get; set; }

    /// <inheritdoc cref="AnswerOption"/>
    public DbSet<AnswerOption> AnswerOptions { get; set; }

    /// <inheritdoc cref="TestResult"/>
    public DbSet<TestResult> TestResults { get; set; }

    /// <inheritdoc cref="QuestionResult"/>
    public DbSet<QuestionResult> QuestionResults { get; set; }

    /// <inheritdoc cref="MailConfirmationEvent"/>
    public DbSet<MailConfirmationEvent> MailConfirmationEvents { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<SortingSortingProperty>()
            .HasKey(spv => new { spv.SortingId, spv.SortingPropertyId });
    }
}
