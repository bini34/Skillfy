﻿using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Skillfy.Server.Model;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Skillfy.Server.Models;

namespace Skillfy.Server.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }
        public DbSet<ApplicationUser> users { get; set; }
        public DbSet<Lesson> lessons { get; set; }
        public DbSet<Course> courses { get; set; }      
        public DbSet<Catagory> catagories { get; set; }
        public DbSet<Review> ratings { get; set; }
        public DbSet<Enroll> enrolls { get; set; }
        public DbSet<Chapter> chapters { get; set; }
      
        public DbSet<BankInfo> banks { get; set; }

        public DbSet<TeacherInfo> teachers { get; set; }
        public DbSet<Transaction> transactions { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure one-to-many relationship between ApplicationUser and Course
            modelBuilder.Entity<Course>()
                .HasOne(c => c.User)
                .WithMany(u => u.Courses)
                .HasForeignKey(c => c.UserId)
                .OnDelete(DeleteBehavior.Restrict); // Prevent cascading delete

            // Configure many-to-one relationship between Enroll and Course with NO ACTION delete behavior
            modelBuilder.Entity<Enroll>()
                .HasOne(e => e.Course)
                .WithMany(c => c.Enrolls)
                .HasForeignKey(e => e.CourseID)
                .OnDelete(DeleteBehavior.NoAction); // No action on delete to avoid multiple cascade paths

            // Configure many-to-one relationship between Enroll and ApplicationUser with NO ACTION delete behavior
            modelBuilder.Entity<Enroll>()
                .HasOne(e => e.User)
                .WithMany()
                .HasForeignKey(e => e.Id)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Transaction>()
            .HasOne(t => t.User)
            .WithMany( u => u.Transaction)
            .HasForeignKey(t => t.Id);

            modelBuilder.Entity<Transaction>()
                .HasOne(t => t.Course)
                .WithMany(c => c.Transactions)
                .HasForeignKey(t => t.CourseID);
            modelBuilder.Entity<ApplicationUser>()
           .HasOne(a => a.Teacherinfo)
           .WithOne(t => t.ApplicationUser)
           .HasForeignKey<TeacherInfo>(t => t.UserId);


        }
    }


    }

