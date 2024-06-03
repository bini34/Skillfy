using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Skillfy.Server.Model
{
    public class Chapter
    {
        [Key]
        public int ChapterId { get; set; }
        [Required]
        public string Chaptername { get; set; }
        public int CourseId { get; set; }

        public Course Course { get; set; }
        public ICollection<Lesson> Lessons { get; set; }
    }
}
