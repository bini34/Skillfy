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
        public async Task<bool> DeleteCourseAsync(int courseId)
        {
            var course = await _context.courses.FindAsync(courseId);

            if (course == null)
            {
                return false;
            }

            _context.courses.Remove(course);
            await _context.SaveChangesAsync();

            return true;
        }
        public async Task<bool> UpdateCourseAsync(CourseUpdateDto courseUpdateDto)
        {
            var course = await _context.courses.FindAsync(courseUpdateDto.CourseID);

            if (course == null)
            {
                return false;
            }

            course.Title = courseUpdateDto.CourseName;
            course.ThumbnailImage = courseUpdateDto.Thumbnail;
            course.Price = courseUpdateDto.Price;
            course.Description = courseUpdateDto.Description;

            _context.courses.Update(course);
            await _context.SaveChangesAsync();

            return true;
        }
        public async Task<List<enrolldcoursecardDto>> getenrolled(string userId)
        {
            var enrolls = await _context.enrolls
                              .Where(e => e.Id == userId)
                              .ToListAsync();

            if (!enrolls.Any())
            {
                return null;
            }

            var courseIds = enrolls.Select(e => e.CourseID).ToList();

            var courses = await _context.courses
                                        .Where(c => courseIds.Contains(c.CourseID))
                                        .Select(c => new
                                        {
                                           
                                            c.Title,
                                            c.ThumbnailImage,
                                            c.UserId,
                                            c.CourseID
                                        })
                                        .ToListAsync();

            var userIds = courses.Select(c => c.UserId).ToList(); // there is teacher id retrived 

            var teacherInfos = await _context.teachers //using the teacher teacher info is fetched 
                                             .Where(ti => userIds.Contains(ti.UserId))
                                             .ToListAsync();

            var teachers = await _context.Users
                                          .Where(u => userIds.Contains(u.Id))
                                          .ToListAsync();
            var reviews = await _context.ratings
                               .Where(r => r.userID == userId && courseIds.Contains(r.CourseId))
                               .ToListAsync();

            var result = (from course in courses
                          join teacherInfo in teacherInfos on course.UserId equals teacherInfo.UserId
                          join teacher in teachers on teacherInfo.UserId equals teacher.Id
                          select new enrolldcoursecardDto
                          {
                              courseid = course.CourseID,
                              coursename = course.Title,
                              teachername = teacher.Fname,
                              teacherpicture = teacher.ProfileUrl,
                              thumbline = course.ThumbnailImage,
                              rated = reviews.Any(r => r.CourseId == course.CourseID)
                          }).ToList();


            return result;
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
                //   enrollmentcount = c.EnrollmentCount,
                rating = _context.ratings.Where(r => r.CourseId == c.CourseID).Average(r => (int?)r.rating) ?? 0,
                teachername = _context.users.Where(u=>u.Id == c.UserId).Select(u=> u.Fname).FirstOrDefault(),             
                EnrollmentCount = _context.enrolls.Count(e => e.CourseID == c.CourseID),
                lessoncount = _context.chapters
                              .Where(ch => ch.CourseId == c.CourseID)
                              .SelectMany(ch => _context.lessons.Where(l => l.ChapterId == ch.ChapterId))
                              .Count()

            }).ToListAsync();
        }

        public async Task<List<CourseCardDto>> getcoursecardbyid(int courseid)
        {

            return await _context.courses.Where(c=> c.CourseID ==  courseid).Select(c => new CourseCardDto
            {

                Id = c.CourseID,
                coursename = c.Title,
                price = c.Price,
                coursethumbline = c.ThumbnailImage,
                EnrollmentCount = c.EnrollmentCount,
                teachername = _context.users.Where(u => u.Id == c.UserId).Select(u => u.Fname).FirstOrDefault()


            }).ToListAsync();
        }

        //public async Task<CourseDetailsDto> GetCourseDetails(int id)
        //{

        //    return await _context.courses.Where(c => c.CourseID == id).Select(async c => new CourseDetailsDto
        //    {
        //        price = c.Price,
        //        chapter = _context.chapters.Where(ch => ch.CourseId == id).Select(ch => ch.Chaptername).ToArray(),
        //        rating = _context.ratings.Where(r => r.CourseId == id).Average(r => (int?)r.rating) ?? 0,
        //        Bio = _context.teachers.Where(t => t.UserId == c.UserId).Select(t => t.bio).FirstOrDefault(),
        //        lessonname = c.Chapters.SelectMany(ch => ch.Lessons.Select(l => l.Title)).ToArray()

        //    }).FirstOrDefaultAsync();
        //}

        public async Task<CourseDetailsDto> GetCourseDetails(int id)
        {
            return await _context.courses
                .Where(c => c.CourseID == id)
                .Select(c => new CourseDetailsDto
                {
                    coursename = c.Title,
                    description=c.Description,
                    price = c.Price,
                    about = c.about,
                    course_audience = c.course_audience,
                    chapter =  c.Chapters.Select(ch => ch.Chaptername).ToArray(),
                    lessonname = c.Chapters.SelectMany(ch => ch.Lessons.Select(l => l.Title)).ToArray(),
                    rating = _context.ratings.Where(r => r.CourseId == id).Average(r => (int?)r.rating) ?? 0,
                    Bio = _context.teachers.Where(t => t.UserId == c.UserId).Select(t => t.bio).FirstOrDefault(),
                    teacherprofile =  _context.users.Where(u=> u.Id == c.UserId).Select(u=> u.ProfileUrl).FirstOrDefault(),
                  //  comment = _context.ratings.Where(r => r.CourseId == id).Select(r => r.comment).ToArray(),
                    review = _context.ratings.Where(r => r.CourseId == id).ToArray()

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
