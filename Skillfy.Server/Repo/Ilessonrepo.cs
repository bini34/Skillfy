namespace Skillfy.Server.Repo
{
    public interface Ilessonrepo
    {
       public Task<int> SaveLessonAsync(int chapterid, string videourl);
    }
}
