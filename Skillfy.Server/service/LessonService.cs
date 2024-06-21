using Skillfy.Server.Data;
using Skillfy.Server.Model;
using Skillfy.Server.Repo;
using System.Net.Http.Headers;
using System.Net.Http;
using System.Runtime.CompilerServices;
using System.Text.Json;
using System.Text;

namespace Skillfy.Server.service
{
    public class LessonService : Ilessonrepo
    {

        private readonly ApplicationDbContext _context;
        public LessonService(ApplicationDbContext context) {
            _context = context;
            //_httpClientFactory = httpClientFactory;
            //_apiKey = configuration["Mux:AccessToken"];
            //_apiKeySecret = configuration["Mux:SecretKey"];

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
            await _context.SaveChangesAsync();
            return lesson.LessonID;
        }

       
    }
}
