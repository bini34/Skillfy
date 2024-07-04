using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace Skillfy.Server.Model
{
    public class Review
    {
        [Key]
        public int ReviewId { get; set; }

        public string userID { get; set; }
        public int CourseId { get; set; }
        public int rating { get; set; }      
        public string comment {  get; set; }    
        public ApplicationUser User { get; set; }
        public Course Course { get; set; }
    }
}
