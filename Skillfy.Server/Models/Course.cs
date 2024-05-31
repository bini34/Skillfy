using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Skillfy.Server.Model
{
    public class Course
    {
        [Key]
        public int CourseID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int TeacherID { get; set; }
        public int CatagoryId { get; set; }

        public decimal Price { get; set; }

        public string Language { get; set; }
        public string ThumbnailImage { get; set; }
        public int EnrollmentCount { get; set; }


        public virtual Teacher Teacher { get; set; }
        public virtual Catagory Catagory { get; set; }

        public virtual ICollection<Enroll> Enrolls { get; set; }

        public virtual ICollection<Chapter> Chapters { get; set; }
        public virtual ICollection<Review> Reviews { get; set; }

    }
}
