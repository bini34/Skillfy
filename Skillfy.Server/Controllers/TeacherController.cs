using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Skillfy.Server.Data;
using Skillfy.Server.Dto;
using Skillfy.Server.Models;

namespace Skillfy.Server.Controllers
{
    [Route("api/teacher")]
    [ApiController]
    public class TeacherController : Controller
    {
        public ApplicationDbContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public TeacherController(ApplicationDbContext context, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            _webHostEnvironment = webHostEnvironment;
        }
        [HttpPost("uploadteacher")]
        public async Task<IActionResult> Teacher([FromForm] teacherprofileDto profile)
        {
            var bankid = await _context.banks.Where(b=>b.BankAccount == profile.bankaccount).Select(b=>b.BankId).FirstOrDefaultAsync();
            string uniqueFileName = null;
            if (profile.profile != null)
            {
                string uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "teacherprofile");
                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }
                uniqueFileName = Guid.NewGuid().ToString() + "_" + profile.profile.FileName;
                string filePath = Path.Combine(uploadsFolder, uniqueFileName);
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await profile.profile.CopyToAsync(fileStream);
                }
            }

            var teacher = new TeacherInfo
            {
                UserId = profile.userid,
                BankId = bankid,
                bio = profile.bio
                
            };
            var user = await _context.Users.FindAsync(profile.userid);
            if (user == null)
            {
                return NotFound("User not found");
            }

         
            user.ProfileUrl = uniqueFileName;

        
            _context.teachers.Add(teacher);
            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return Ok("Teacher profile updated successfully");


        }
        [HttpGet("getteachercourse{userid}")]
        public async Task<IActionResult> getteachercourse(string userid)
        {
            var titles = await _context.courses
                                 .Where(c => c.UserId == userid)
                                 .Select(c => c.Title)
                                 .ToListAsync();

            return Ok(titles);

        }



    }
}
