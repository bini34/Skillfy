using System.ComponentModel.DataAnnotations;

namespace Skillfy.Server.Models
{
    public class BankInfo
    {
        [Key]
        public int BankId { get; set; }

        [Required]
        public string BankName { get; set; }
        = string.Empty;
        [Required]
        public string BankAccount { get; set; }

        public int balance {  get; set; }

        public virtual ICollection<TeacherInfo> Teachers { get; set;}
    }
}
