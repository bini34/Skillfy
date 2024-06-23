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
       
        public async Task<int> EnrollUserAsync(ChapaCallBackModel respons)
        {
            
            if (respons.Status == "failed")
            {
                return -2;
            }

            var parts = respons.TxRef.Split('-');
            var courseId = int.Parse(parts[0]);
            var userId = parts[1];
           
           var enrollment = new Enroll
              {
                CourseID = courseId,
                Id = userId,
                EnrollmentDate = DateTime.UtcNow,
                PaymentStatus = "Paid"
             };
           

            await _context.enrolls.AddAsync(enrollment);
            await  _context.SaveChangesAsync();

            return enrollment.EnrollmentID;
            
        }
    }
}
