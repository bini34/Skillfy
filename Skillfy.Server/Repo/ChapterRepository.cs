using Microsoft.EntityFrameworkCore;
using Skillfy.Server.Data;
using Skillfy.Server.Model;

namespace Skillfy.Server.Repo
{
    public class ChapterRepository : IchapterRepositery
    {
        private readonly ApplicationDbContext _context;

        public ChapterRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Chapter>> GetAllChaptersAsync()
        {
            return await _context.chapters.ToListAsync();
        }

        public async Task<Chapter> GetChapterByIdAsync(int id)
        {
            return await _context.chapters.FindAsync(id);
        }

        public async Task AddChapterAsync(Chapter chapter)
        {
            await _context.chapters.AddAsync(chapter);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateChapterAsync(Chapter chapter)
        {
            _context.chapters.Update(chapter);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteChapterAsync(int id)
        {
            var chapter = await _context.chapters.FindAsync(id);
            if (chapter != null)
            {
                _context.chapters.Remove(chapter);
                await _context.SaveChangesAsync();
            }
        }
    }
}
