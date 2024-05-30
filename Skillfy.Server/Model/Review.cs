using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Skillfy.Server.Model
{
    public class Review
    {
        public int ReviewId { get; set; }

        public int UserId { get; set; }
        public int CourseId { get; set; }
        public int rating { get; set; }

        public ApplicationUser ApplicationUser { get; set; }
        public Course course { get; set; }
    }
}
