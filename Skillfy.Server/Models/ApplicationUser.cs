using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;


namespace Skillfy.Server.Model
{
    public class ApplicationUser : IdentityUser
    {
        
        public string Fname { get; set; }
        public string Lname { get; set; }

        public string ProfileUrl { get; set; } = string.Empty;
        public virtual ICollection<Enroll> Enroll { get; set; }
        public virtual ICollection<Review> Reviews { get; set; }
        public virtual ICollection<Course> Courses { get; set; }



    }
}
