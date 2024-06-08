using Microsoft.AspNetCore.Mvc;
using Skillfy.Server.Dto;
using Skillfy.Server.Model;

namespace Skillfy.Server.service
{
    public interface ICourseService
    {
        public Task<(bool Success, string Message, Course Course)> AddCourse(CourseCreateDto courseCreateDto,  string uniqueFileName);


    }
}
