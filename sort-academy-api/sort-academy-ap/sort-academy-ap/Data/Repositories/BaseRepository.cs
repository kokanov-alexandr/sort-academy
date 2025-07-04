﻿using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using sort_academy_api.Data.Context;
using sort_academy_api.Data.Models;

namespace sort_academy_api.Data.Repositories;

public abstract class BaseRepository<T>(SortAcademyDbContext dbContext, ILogger<BaseRepository<T>> logger) where T : BaseModel
{
    /// <summary>
    /// Контекст
    /// </summary>
    private  SortAcademyDbContext SortAcademyContext { get; set; } = dbContext;

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
    public async Task<T?> GetItemByIdAsync(int id)
    {
        return SortAcademyContext.Set<T>().FirstOrDefault(x => x.Id == id);
    }

    public async Task<int> SaveItemAsync(T? entity)
    {
        try
        {
            if (entity == null)
            {
                Logger.LogError("Сохранение пустого объекта невозможно");
                return 0;
            }

            var context = SortAcademyContext.Set<T>();
            if (entity.Id == 0)
            {
                context.AttachRange(entity);
                var insertResult = await SortAcademyContext.SaveChangesAsync();
                if (insertResult == 0)
                {
                    return 0;
                }

                return entity.Id;
            }

            SortAcademyContext.Entry(entity).State = EntityState.Modified;
            return await SortAcademyContext.SaveChangesAsync();
        }
        catch (Exception exception)
        {
            Logger.LogError(exception, exception.StackTrace);
            return 0;
        }
    }
    
    public async Task<T> GetItemAsNoTrackingAsync(Expression<Func<T, bool>> predicate)
    {
        try
        {
            var dbSet = SortAcademyContext.Set<T>();
            return await dbSet.AsNoTracking().FirstOrDefaultAsync(predicate);
        }
        catch (Exception exception)
        {
            Logger.LogError(exception, exception.StackTrace);
            return null;
        }
    }
    
    public async Task<int> DeleteItemAsync(T entity)
    {
        try
        {
            SortAcademyContext.Set<T>().Remove(entity);
            return await SortAcademyContext.SaveChangesAsync();
        }
        catch (Exception exception)
        {
            Logger.LogError(exception, exception.StackTrace);
            return 0;
        }
    }
}
