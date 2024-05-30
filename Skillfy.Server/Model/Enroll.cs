using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Skillfy.Server.Model
{
    public class Enroll
    {
        [Key]
        public int EnrollmentID { get; set; }
        public int CourseID { get; set; }
        public int userID { get; set; }
        public DateTime EnrollmentDate { get; set; }
        public string PaymentStatus { get; set; }
        public string Grade { get; set; }

        // Navigation properties
        public virtual Course Course { get; set; }
        public virtual ApplicationUser User { get; set; }
    }
}
