using Skillfy.Server.Dto;
using Skillfy.Server.Model;

namespace Skillfy.Server.Repo
{
    public interface IcatogryRepositary
    {
        public Task<Catagory> ReturnCatagory(string catgory);
        public Task<int> GetCatagoryIdByNameAsync(string catagoryName);
        public Task<List<string>> Retunrallcatagory();

        public Task<List<CourseCardDto>> GetCoursesByCategoryAsync(string categoryName);


    }
}
