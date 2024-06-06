using Microsoft.AspNetCore.Mvc;
using Skillfy.Server.Data;
using Skillfy.Server.Dto;
using Skillfy.Server.Model;
using Skillfy.Server.Repo;
using Skillfy.Server.ViewModel;

namespace Skillfy.Server.Controllers
{
    public class ChapterController : Controller
    {

        private readonly ApplicationDbContext _context;
        private readonly IchapterRepositery _chapterRepositary;

        public ChapterController(ApplicationDbContext context, IchapterRepositery chapterRepositary) 
        { 
            _chapterRepositary = chapterRepositary;
            _context = context;
        }

        //public async Task<IActionResult> CreateChapter(List<CreateChapterDto> chapterDtos)
        //{
        //    if (chapterDtos == null)
        //    {
        //        return BadRequest(new ResponsViewModel(false, "Chapter is null", null));
        //    }
        //    foreach (var chapters in chapterDtos)
        //    {

        //        var chap = new Chapter
        //        {
        //            Chaptername = chapters.name
                    
        //        };
        //        await _chapterRepositary.AddChapterAsync(chap);

        //    }

        //}
    }
}
