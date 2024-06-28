namespace Skillfy.Server.Dto
{
    public class CourseUpdateDto
    {
       
            public int CourseID { get; set; }
            public string CourseName { get; set; }
            public string Thumbnail { get; set; }
            public decimal Price { get; set; }
            public string Description { get; set; }
        
    }
}
