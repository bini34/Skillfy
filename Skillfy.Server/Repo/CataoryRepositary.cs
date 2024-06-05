
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

        public async Task<Catagory> ReturnCatagory(string catagory)
        {
            return await _context.catagory.FirstOrDefaultAsync(c => c.CatagoryName == catagory);
            
        }
    }
}
