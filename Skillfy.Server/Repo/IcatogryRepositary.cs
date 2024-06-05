using Skillfy.Server.Model;

namespace Skillfy.Server.Repo
{
    public interface IcatogryRepositary
    {
        public Task<Catagory> ReturnCatagory(string catgory);
    }
}
