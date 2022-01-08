using System.ComponentModel.DataAnnotations;

namespace MovieToGoAPI.DTOs.Users
{
    public class UserCreationDTO
    {
        [Required(ErrorMessage = "The field {0} is required")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "The field {0} is required")]
        public string Password { get; set; }

        [Required(ErrorMessage = "The field {0} is required")]
        public string Email { get; set; }

        [StringLength(150)]
        public string FirstName { get; set; }

        [StringLength(150)]
        public string LastName { get; set; }
    }
}
