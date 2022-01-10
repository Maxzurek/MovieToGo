namespace MovieToGoAPI.Models
{
    public class AuthenticationResponse
    {
        public string Token { get; set; }

        public DateTime TokenExpiration { get; set; }
    }
}
