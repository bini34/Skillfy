using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace Skillfy.Model
{
    public  class Catagory
    {
        [Key]
        public int catagoryId { get; set; }
        [Required]
        public string CatagoryName { get; set; } = string.Empty;
        [Required]
        public string pictureurl {  get; set; } 


        public virtual ICollection<Course> Courses { get; set; }


    }
}
