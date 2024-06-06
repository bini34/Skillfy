namespace Skillfy.Server.Dto
{
    public class CompositCreateDto
    {
        public CourseCreateDto CourseCreateDto { get; set; }
     
        public List<CreateChapterDto> ChapterDtos { get; set; }
    }
}
