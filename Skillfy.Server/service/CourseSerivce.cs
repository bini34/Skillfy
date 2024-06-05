using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Skillfy.Server.Data;
using Skillfy.Server.Dto;
using Skillfy.Server.Model;
using Skillfy.Server.Repo;
using Skillfy.Server.ViewModel;

namespace Skillfy.Server.service
{
    public class CourseSerivce : ICourseService
    {
        private readonly ICourseRepositary _courseRepositary;
        private readonly IchapterRepositery _chapterRepositery;
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IcatogryRepositary _icatogry;

        public CourseSerivce(IchapterRepositery ichapterRepositery, ICourseRepositary courseRepositary, ApplicationDbContext context, IWebHostEnvironment webHostEnvironment, IcatogryRepositary icatogry)
        {
            _chapterRepositery = ichapterRepositery;
            _context = context;
            _courseRepositary = courseRepositary;
            _webHostEnvironment = webHostEnvironment;
            _icatogry = icatogry;
        }

        public async Task<(bool Success, string Message, Course Course)> AddCourse(CourseCreateDto courseCreateDto, int TeacherId, List<CreateChapterDto> chapterDtos)
        {
           
            string uniqueFileName = null;
            if (courseCreateDto.Thumbline != null)
            {
                string uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "coursethumbline");
                uniqueFileName = Guid.NewGuid().ToString() + "_" + courseCreateDto.Thumbline.FileName;
                string filePath = Path.Combine(uploadsFolder, uniqueFileName);
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await courseCreateDto.Thumbline.CopyToAsync(fileStream);
                }
            }
            var catagory = _icatogry.ReturnCatagory(courseCreateDto.catagory);

            var course = new Course
            {
                Title = courseCreateDto.CourseName,
                TeacherID = TeacherId,
                CatagoryId = catagory.Id,
                Price = courseCreateDto.price,
                Description = courseCreateDto.Description,
                ThumbnailImage = "/coursethumbline/{uniqueFileName}"

            };

            var CourseId = await _courseRepositary.UploadCourse(course);
            if (CourseId > 0)
            {
                if (chapterDtos == null)
                {
                    return ( false, "Chapter is null", null);
                }
                foreach (var chapters in chapterDtos)
                {

                    var chap = new Chapter
                    {
                        Chaptername = chapters.Name,
                        ChapterId = CourseId


                    };
                    await _chapterRepositery.AddChapterAsync(chap);

                }

            }
            return (true, "Course and chapters created successfully", null);

        }
    }
}
