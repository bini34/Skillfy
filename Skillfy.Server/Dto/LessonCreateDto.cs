namespace Skillfy.Server.Dto
{
    public class LessonCreateDto
    {
       
        public string Lessonname {  get; set; }
        public IFormFile Video {  get; set; }
        public int chapterId {  get; set; }


    }
}
