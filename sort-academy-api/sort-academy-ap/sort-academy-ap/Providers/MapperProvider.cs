using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.Extensions.Logging;

namespace sort_academy_api.Providers;

public class MapperProvider
{

    public TResult CreateMap<TSource, TResult>(TSource source)
    {
        try
        {
            var mapper = GetMapper<TSource, TResult>();
            return mapper.Map<TResult>(source);
        }
        catch (Exception)
        {
            return default;
        }
    }

    /// <inheritdoc/>
    public List<TResult> CreateMapForList<TSource, TResult>(List<TSource> source)
    {
        try
        {
            var mapper = GetMapper<TSource, TResult>();
            return mapper.Map<List<TResult>>(source);
        }
        catch (Exception)
        {
            return default;
        }

    }


    public TResult CreateMapByProfile<TSource, TResult, TProfile>(TSource source) where TProfile : Profile, new()
    {
        try
        {
            var mapper = GetProfileMapper<TProfile>();
            return mapper.Map<TResult>(source);
        }
        catch (Exception)
        {
            return default;
        }
    }

    public List<TResult> CreateMapByProfileForList<TSource, TResult, TProfile>(IEnumerable<TSource> source) where TProfile : Profile, new()
    {
        try
        {
            var mapper = GetProfileMapper<TProfile>();
            return mapper.Map<List<TResult>>(source);
        }
        catch (Exception)
        {
            return default;
        }
    }

    private Mapper GetMapper<T, TU>()
    {
        var config = new MapperConfiguration(cfg => { cfg.CreateMap<T, TU>(); });
        return new Mapper(config);
    }

    private Mapper GetProfileMapper<TProfile>() where TProfile : Profile, new()
    {
        var config = new MapperConfiguration(cfg => { cfg.AddProfile<TProfile>(); });
        return new Mapper(config);
    }
}
