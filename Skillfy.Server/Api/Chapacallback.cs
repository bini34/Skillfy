using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Skillfy.Server.Data;
using Skillfy.Server.Model;

namespace Skillfy.Server.Api
{
  //  [Route("api/chapacallback")]
   // [ApiController]
    public class Chapacallback
    {
        public ApplicationDbContext _context;


        public Chapacallback(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task EnrollUserAsync(string txRef, string customerEmail)
        {
            // Extract courseId and userId from txRef
            var parts = txRef.Split('-');
            var courseId = parts[0];
            var userId = parts[1];

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId && u.Email == customerEmail);
/*           var course = await _context.courses.FirstOrDefaultAsync(c => c.CourseID == courseId);

            if (user != null && course != null)
            {
                /*var enrollment = new Enroll
                {
                    CourseID = course.Id,
                    user = user.Id,
                    EnrollmentDate = DateTime.UtcNow,
                    PaymentStatus = "Paid"
                };

                _context.Enrollments.Add(enrollment);
                await _context.SaveChangesAsync();
            }
     */
        }


    }
}
