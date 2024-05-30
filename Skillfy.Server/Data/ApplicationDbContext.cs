using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Skillfy.Server.Model;

namespace Skillfy.Server.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        public DbSet<Course> courses { get; set; }
        public DbSet<Review> Review { get; set; }
        public DbSet<Catagory> Catagories { get; set; }
        public DbSet<Enroll> Enroll { get; set; }
        public DbSet<Teacher> Teacher { get; set; }
        public DbSet<Chapter> chapter { get; set; }

        public DbSet<ApplicationUser> ApplicationUsers { get; set; }



    }

}
