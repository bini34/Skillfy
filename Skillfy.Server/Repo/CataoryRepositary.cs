
using Microsoft.EntityFrameworkCore;
using Skillfy.Server.Data;
using Skillfy.Server.Model;
using System.Globalization;

namespace Skillfy.Server.Repo
{
    public class CatagoryRepositary : IcatogryRepositary
    {
        private readonly ApplicationDbContext _context;

        public CatagoryRepositary(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<string>> Retunrallcatagory()
        {
            return await _context.catagories
              .Select(c => c.CatagoryName)
              .ToListAsync();
        }

        public async Task<Catagory> ReturnCatagory(string catagory)
        {
            return await _context.catagories.FirstOrDefaultAsync(c => c.CatagoryName == catagory);
            
        }
        public async Task<int> GetCatagoryIdByNameAsync(string catagoryName)
        {
            var catagory = await _context.catagories
                .Where(c => c.CatagoryName == catagoryName)
                .Select(c => c.catagoryId)
                .FirstOrDefaultAsync();

            return catagory;
        }

        public async Task<List<Course>> GetCoursesByCategoryAsync(string categoryName)
        {
            return await _context.courses
                                 .Where(course => course.Catagory.CatagoryName == categoryName)
                                 .ToListAsync();
        }

    }
}
