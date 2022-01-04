namespace MovieToGoAPI.DTOs.Authentication
{
    public class AuthenticationResponse
    {
        public string Token { get; set; }

        public DateTime Expiration { get; set; }
    }
}
