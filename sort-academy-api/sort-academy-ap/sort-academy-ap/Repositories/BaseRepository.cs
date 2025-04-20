using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using sort_academy_ap.Data;

namespace sort_academy_ap.Repositories;

public class BaseRepository<T>(SortAcademyDbContext dbContext, ILogger<BaseRepository<T>> logger) where T : class
{
    /// <summary>
    /// Контекст
    /// </summary>
    private SortAcademyDbContext SortAcademyContext { get; set; } = dbContext;

    protected readonly ILogger<BaseRepository<T>> Logger = logger;

    public async Task<List<T>> GetCollectionAsync()
    {
        return await SortAcademyContext.Set<T>().ToListAsync();
    }


    public async Task<int> CreateAsync(T entity)
    {
        try
        {
            var context = SortAcademyContext.Set<T>();
            await context.AddAsync(entity);
            return await SortAcademyContext.SaveChangesAsync();
        }
        catch (Exception)
        {
            Logger.LogError("Ошибка создания сущности");
            return 0;
        }
      
    } 
}
