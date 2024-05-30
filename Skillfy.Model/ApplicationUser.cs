using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;


namespace Skillfy.Model
{
    public class ApplicationUser : IdentityUser
    {
        [Key]
        public int Id {  get; set; }
        public string Fname { get; set; }
        public string Lname { get; set; }
        public virtual ICollection<Enroll> Enrolls { get; set; }
        public virtual ICollection<Review> Ratings { get; set; }



    }
}
