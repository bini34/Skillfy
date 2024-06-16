using Skillfy.Server.Model;

namespace Skillfy.Server.Models
{
    public class TeacherInfo
    {
        public int Id { get; set; }

        public string bio {  get; set; }

        public int BankId { get; set; }

        public BankInfo Bank { get; set; }

        public string UserId { get; set; }

        // Navigation property for the related ApplicationUser
        public ApplicationUser ApplicationUser { get; set; }
    }
}
