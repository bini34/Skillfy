using Skillfy.Server.ViewModel;

namespace Skillfy.Server.Repo
{
    public interface Ipayment
    {
        //public Task transaction(ResponsViewModel repo);
        //public Task enrollment(int courseid, string userid, bool paymentstatus);

        public Task<string> InitializePaymentAsync(int price, int courseId, string userId);

    }
}
