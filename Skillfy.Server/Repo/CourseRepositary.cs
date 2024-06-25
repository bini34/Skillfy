using Microsoft.EntityFrameworkCore;
using Skillfy.Server.Data;
using Skillfy.Server.Dto;
using Skillfy.Server.Model;

namespace Skillfy.Server.Repo
{
    public class CourseRepositary : ICourseRepositary
    {

        private readonly ApplicationDbContext _context;

        public CourseRepositary(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Course>> getenrolled(string userid)
        {
            return await _context.enrolls
                               .Where(e => e.Id == userid)
                               .Join(
                                   _context.courses,
                                   enroll => enroll.CourseID,
                                   course => course.CourseID,
                                   (enroll, course) => course
                               )
                               .ToListAsync();


        }
        public async Task<int> DeleteCourse(int id)
        {
            Course c = await _context.courses.FirstOrDefaultAsync(c => c.CourseID == id);
            _context.courses.Remove(c);
            _context.SaveChanges();
            return c.CourseID;

        }

       

        public async Task<List<Course>> GetAllCourse()
        {
            return await _context.courses.ToListAsync();
        }

        public async Task<Course> GetCourseById(int id)
        {
            return await _context.courses.FirstOrDefaultAsync(c => c.CourseID == id);
        }

        public async Task<Course> GetCourseByName(string name)
        {
            return await _context.courses.FirstOrDefaultAsync(c => c.Title == name);
        }

        public async Task<int> GetCourseCount()
        {
            return await _context.courses.CountAsync();
        }

        public async Task<List<Course>> GetEnrolledCourseByUserId(string userId)
        {
            return await _context.enrolls
            .Where(uc => uc.Id == userId)
            .Select(uc => uc.Course)
            .ToListAsync();
        }

      
        public async Task<int> UploadCourse(Course course)
        {
            _context.courses.Add(course);
            await _context.SaveChangesAsync();
            return course.CourseID;

        }

        public async Task<List<CourseCardDto>> getcoursecard()
        {
           
            return await _context.courses.Select(c => new CourseCardDto
            {
                
                Id= c.CourseID,
                coursename = c.Title,
                price = c.Price,
                coursethumbline = c.ThumbnailImage,
                enrollmentcount = c.EnrollmentCount,
                teachername = _context.users.Where(u=>u.Id == c.UserId).Select(u=> u.Fname).FirstOrDefault()

                
            }).ToListAsync();
        }

        //public async Task<CourseDetailsDto> GetCourseDetails(int id)
        //{
           
        //    return await _context.courses.Where(c => c.CourseID == id).Select(async c => new CourseDetailsDto
        //    {
        //        price = c.Price,
        //        chapter =  _context.chapters.Where(ch => ch.CourseId == id).Select(ch => ch.Chaptername).ToArray(),
        //        rating = _context.ratings.Where(r => r.CourseId == id).Average(r => (int?)r.rating) ?? 0,
        //        Bio = _context.teachers.Where(t => t.UserId == c.UserId).Select(t => t.bio).FirstOrDefault(),
        //       lessonname = c.Chapters.SelectMany(ch => ch.Lessons.Select(l => l.Title)).ToArray()

        //    }).FirstOrDefaultAsync();
        //}

        public async Task<CourseDetailsDto> GetCourseDetails(int id)
        {
            return await _context.courses
                .Where(c => c.CourseID == id)
                .Select(c => new CourseDetailsDto
                {
                    price = c.Price,
                    chapter = c.Chapters.Select(ch => ch.Chaptername).ToArray(),
                    lessonname = c.Chapters.SelectMany(ch => ch.Lessons.Select(l => l.Title)).ToArray(),
                    rating = _context.ratings.Where(r => r.CourseId == id).Average(r => (int?)r.rating) ?? 0,
                    Bio = _context.teachers.Where(t => t.UserId == c.UserId).Select(t => t.bio).FirstOrDefault(),
                  //  TotalLessons = c.Chapters.Sum(ch => ch.Lessons.Count)

                })
                .FirstOrDefaultAsync();
        }

        public async Task<Course> GetenrolledCourseDetailsAsync(int courseId)
        {
            return await _context.courses
                                 .Include(c => c.Chapters)            
                                 .ThenInclude(ch => ch.Lessons)     
                                 .FirstOrDefaultAsync(c => c.CourseID == courseId);  
        }


    }
}
