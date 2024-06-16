using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Skillfy.Server.Controllers;
using Skillfy.Server.Data;
using Skillfy.Server.Model;
using Skillfy.Server.ViewModel;

namespace Skillfy.Server.Api
{
  //  [Route("api/chapacallback")]
   // [ApiController]
    public class Chapacallback
    {
        public ApplicationDbContext _context;
        private readonly ILogger<PaymentController> _logger;
        private readonly ChapaPaymentService _paymentService;


        public Chapacallback(ApplicationDbContext context)
        {
            _context = context;
        }
        //[HttpPost("enroll")]
        //public async Task EnrollUserAsync(ResponsViewModel respons)
        //{
        //    if(respons.Status == false)
        //    {

        //    }
            
        //    var parts = txRef.Split('-');
        //    var courseId = int.Parse(parts[0]);
        //    var userId = parts[1];

        //    var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
        //    var course = await _context.courses.FirstOrDefaultAsync(c => c.CourseID == courseId);

        //    if (user != null && course != null)
        //    {
        //        var enrollment = new Enroll
        //        {
        //            CourseID = course.CourseID,
        //            Id = user.Id,
        //            EnrollmentDate = DateTime.UtcNow,
        //            PaymentStatus = "Paid"
        //        };

        //        _context.enrolls.Add(enrollment);
        //        await _context.SaveChangesAsync();
        //    }
        //}


    }
}
