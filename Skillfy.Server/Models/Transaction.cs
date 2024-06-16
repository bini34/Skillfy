using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Skillfy.Server.Model;
using System.ComponentModel.DataAnnotations;

namespace Skillfy.Server.Models
{
    public class Transaction
    {
      
        public int TransactionId { get; set; }
        public string TxRef { get; set; }
        public string Id { get; set; }
        public ApplicationUser User { get; set; }
        public int CourseID { get; set; }
        public Course Course { get; set; }
        public int Amount { get; set; }
        public decimal PlatformFee { get; set; }
        public decimal TeacherAmount { get; set; }
        public string Status { get; set; }
        public DateTime TransactionDate { get; set; }


    }
}
