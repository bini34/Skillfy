using Skillfy.Server.Data;
using Skillfy.Server.Model;
using Skillfy.Server.Repo;
using System.Runtime.CompilerServices;

namespace Skillfy.Server.service
{
    public class LessonService : Ilessonrepo
    {

        private readonly ApplicationDbContext _context;
        public LessonService(ApplicationDbContext context) {
            _context = context;
        
        }

        public async Task<int> SaveLessonAsync(int chapterid, string videourl , string title)
        {
            var lesson = new Lesson
            {
                Title = title,
                ChapterId = chapterid,
                PublishDate = DateTime.Now,
                Url = videourl
                    
            };
            await _context.lessons.AddAsync(lesson);
            return lesson.LessonID;
        }
    }
}
