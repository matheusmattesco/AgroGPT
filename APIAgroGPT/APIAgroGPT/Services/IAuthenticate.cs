namespace APIAgroGPT.Services
{
    public interface IAuthenticate
    {
        Task<bool> Authenticate(string username, string password);

        Task<bool> RegisterUser(string email, string user, string password);

        Task Logout();
    }
}
