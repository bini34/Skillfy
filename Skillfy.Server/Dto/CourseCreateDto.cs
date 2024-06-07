namespace Skillfy.Server.Dto
{
    public class CourseCreateDto
    {
        public string CourseName {  get; set; }

        public string Description { get; set; }

        public string catagory { get; set; }

        public IFormFile Thumbline { get; set; }
        public int price {  get; set; }
        public string userid { get; set; }


    }
}
