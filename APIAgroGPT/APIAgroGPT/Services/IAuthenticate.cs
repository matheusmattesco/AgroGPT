namespace APIAgroGPT.Services
{
    public interface IAuthenticate
    {
        Task<bool> Authenticate(string username, string password);

        Task<bool> RegisterUser(string email, string password);

        Task Logout();
    }
}
