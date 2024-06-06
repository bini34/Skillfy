using Microsoft.EntityFrameworkCore;
using Skillfy.Server.Data;
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

      
    }
}
