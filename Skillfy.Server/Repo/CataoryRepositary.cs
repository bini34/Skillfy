
using Microsoft.EntityFrameworkCore;
using Skillfy.Server.Data;
using Skillfy.Server.Dto;
using Skillfy.Server.Model;
using System.Globalization;

namespace Skillfy.Server.Repo
{
    public class CatagoryRepositary : IcatogryRepositary
    {
        private readonly ApplicationDbContext _context;

        public CatagoryRepositary(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<string>> Retunrallcatagory()
        {
            return await _context.catagories
              .Select(c => c.CatagoryName)
              .ToListAsync();
        }

        public async Task<Catagory> ReturnCatagory(string catagory)
        {
            return await _context.catagories.FirstOrDefaultAsync(c => c.CatagoryName == catagory);
            
        }
        public async Task<int> GetCatagoryIdByNameAsync(string catagoryName)
        {
            var catagory = await _context.catagories
                .Where(c => c.CatagoryName == catagoryName)
                .Select(c => c.catagoryId)
                .FirstOrDefaultAsync();

            return catagory;
        }

        public async Task<List<CourseCardDto>> GetCoursesByCategoryAsync(string categoryName)
        {
            return await _context.courses
                                 .Where(c => c.Catagory.CatagoryName == categoryName).Select(c => new CourseCardDto
                                 {

                                     Id = c.CourseID,
                                     coursename = c.Title,
                                     price = c.Price,
                                     coursethumbline = c.ThumbnailImage,
                                     //   enrollmentcount = c.EnrollmentCount,
                                     rating = _context.ratings.Where(r => r.CourseId == c.CourseID).Average(r => (int?)r.rating) ?? 0,
                                     teachername = _context.users.Where(u => u.Id == c.UserId).Select(u => u.Fname).FirstOrDefault(),
                                     EnrollmentCount = _context.enrolls.Count(e => e.CourseID == c.CourseID),
                                     lessoncount = _context.chapters
                                      .Where(ch => ch.CourseId == c.CourseID)
                                      .SelectMany(ch => _context.lessons.Where(l => l.ChapterId == ch.ChapterId))
                                     .Count()

                                 })
                                 .ToListAsync();
        }

    }
}
