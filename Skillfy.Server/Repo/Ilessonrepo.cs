namespace Skillfy.Server.Repo
{
    public interface Ilessonrepo
    {
        public Task SaveLessonAsync(int chapterid, string videourl);
    }
}
