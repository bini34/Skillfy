using Skillfy.Server.Data;
using Skillfy.Server.Dto;
using Skillfy.Server.Model;

namespace Skillfy.Server.service
{
    public class EnrollmentService
    {
        private readonly ApplicationDbContext _context;
        public EnrollmentService(ApplicationDbContext context)
        {
            _context = context;
        }
       
        public async Task<int> EnrollUserAsync(int courseId, string userId)
        {
            
          
           
           var enrollment = new Enroll
              {
                CourseID = courseId,
                Id = userId,
                EnrollmentDate = DateTime.UtcNow,
                PaymentStatus = "Paid",
                Grade = "0"
             };
           

            await _context.enrolls.AddAsync(enrollment);
            await  _context.SaveChangesAsync();

            return enrollment.EnrollmentID;
            
        }
    }
}
