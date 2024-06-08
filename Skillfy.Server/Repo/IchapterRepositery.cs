using Skillfy.Server.Model;

namespace Skillfy.Server.Repo
{
    public interface IchapterRepositery
    {
        
         public Task<IEnumerable<Chapter>> GetAllChaptersAsync();
         public Task<Chapter> GetChapterByIdAsync(int id);
        public Task AddChaptersAsync(IEnumerable<Chapter> chapters);


         public Task UpdateChapterAsync(Chapter chapter);
         public Task DeleteChapterAsync(int id);
        

    }
}
