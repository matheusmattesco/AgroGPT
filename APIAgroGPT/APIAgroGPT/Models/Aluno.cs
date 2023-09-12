using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace APIAgroGPT.Models
{
    [Table("Alunos")]
    public class Aluno
    {
        [Key] // para Indicar que é chave primária
        public int Id { get; set; }
        [Required]  //Required =  NotNull
        [StringLength(80)] //Tamanho da table
        public string Nome { get; set; }
        [Required]
        [EmailAddress]  
        [StringLength(100)]
        public string Email { get; set; }
        [Required]
        public int Idade { get; set; }
    }
}
