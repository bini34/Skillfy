using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ActionConstraints;
using Microsoft.EntityFrameworkCore;
using Skillfy.Server.Data;


namespace Skillfy.Server.service
{
    public class TeacherPaymentService
    {
        private readonly ApplicationDbContext _context;

        public TeacherPaymentService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<bool> payteacher(string bankno, int payment)
        {
           var account = await _context.banks.SingleOrDefaultAsync(b => b.BankAccount == bankno);
            if (account != null)
            {
                account.balance += payment;
                _context.SaveChanges();
                return true;

            }
            else
            {
                return false;
            }


        
        }


    }
}
