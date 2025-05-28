using sort_academy_api.Data.Context;
using sort_academy_api.Data.Models;

namespace sort_academy_api.Data.Repositories;

public class MailConfirmationEventRepository(SortAcademyDbContext dbContext, ILogger<BaseRepository<MailConfirmationEvent>> logger) : BaseRepository<MailConfirmationEvent>(dbContext, logger)
{
}
