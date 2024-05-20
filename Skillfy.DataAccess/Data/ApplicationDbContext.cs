using Microsoft.EntityFrameworkCore;
using Skillfy.Model;

namespace Skillfy.DataAccess.Data
{
    public class ApplicationDbContext:DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options):base(options)
        {
            
        }
        public DbSet<User> users { get; set; }
        public DbSet<Catagorie> Catagories { get; set; }

    }
}
