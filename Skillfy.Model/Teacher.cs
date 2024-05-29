using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Skillfy.Model
{
    public class Teacher
    {
        [Key]
        public int TeacherId { get; set; }
        [Required]
        public string FName { get; set; }
        [Required]
        public string LName { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string Bio { get; set; }
        [Required]
        public string ProfilePicture { get; set; }
        [Required]
        public string Qualifications { get; set; }
        [Required]
        public string ContactInfo { get; set; }
        public double Rating { get; set; }
        public DateTime JoinDate { get; set; }
        public bool IsActive { get; set; }
        public virtual ICollection<course> CoursesTaught { get; set; }


    }
}
