namespace MovieToGoAPI.Models
{
    public class ErrorMessage
    {
        public ErrorMessage()
        {

        }

        public ErrorMessage(string ErrorMessage)
        {
            Error = ErrorMessage;
        }

        public string Error { get; set; }
    }
}
