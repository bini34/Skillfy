using Skillfy.Server.Data;
using Skillfy.Server.Model;
using Skillfy.Server.Repo;

namespace Skillfy.Server.service
{
    public class LessonService : Ilessonrepo
    {

        private readonly ApplicationDbContext _context;
        public LessonService(ApplicationDbContext context) {
            _context = context;
        
        }

        public async Task SaveLessonAsync(int chapterid, string videourl )
        {
            var lesson = new Lesson
            {
                ChapterId = chapterid,
                PublishDate = DateTime.Now,
                Url = videourl
                    
            };
            await _context.lessons.AddAsync(lesson);
        }
    }
}
