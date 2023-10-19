using System.ComponentModel.DataAnnotations;

namespace APIAgroGPT.ViewModels
{
    public class RegisterModel
    {

        [Required]
        [EmailAddress]

        public string Email { get; set; }

        public string Nome { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirma senha")]
        [Compare("Password", ErrorMessage = "Senhas não conferem")]

        public string ConfirmPassword { get; set;}
    }
}
