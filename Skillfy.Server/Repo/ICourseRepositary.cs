using Skillfy.Server.Dto;
using Skillfy.Server.Model;

namespace Skillfy.Server.Repo
{
    public interface ICourseRepositary
    {
        public Task<int> UploadCourse(Course course);
        public Task<Course> GetCourseByName(string name);
        public Task<Course> GetCourseById(int id);
        public Task<List<Course>> GetAllCourse();
        public Task<int> GetCourseCount();
        public Task<int> DeleteCourse(int id);
        public Task<List<Course>> GetEnrolledCourseByUserId(String userId);

        public  Task<List<enrolldcoursecardDto>> getenrolled(string userid);

        public Task<List<CourseCardDto>> getcoursecard();

        public Task<CourseDetailsDto> GetCourseDetails(int id);

        public Task<Course> GetenrolledCourseDetailsAsync(int courseId);

    }
}
