using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Skillfy.Server.Model
{
    public class Lesson
    {
        [Key]
        public int LessonID { get; set; }
        public int ChapterId { get; set; }
        public string Title { get; set; }
        //public string Description { get; set; }
       
       
      
        public string Url { get; set; }
        public int Order { get; set; }
        public string ThumbnailImage { get; set; }
        public DateTime PublishDate { get; set; }


        public Chapter Chapter { get; set; }

    }
}
