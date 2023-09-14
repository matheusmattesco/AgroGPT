using APIAgroGPT.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using static MLModel2;

namespace APIAgroGPT.Context
{
    public class AppDbContext : IdentityDbContext<IdentityUser>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }
        public DbSet<ModelOutput> MLModelOutputs { get; set; }
        public DbSet<Aluno> Alunos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configurar a chave primária para ser o campo "Email"
            modelBuilder.Entity<IdentityUser>()
                .HasKey(u => u.Email);

            // Adicione outras configurações do modelo aqui, se necessário.
            modelBuilder.Entity<ModelOutput>()
                .Property(e => e.FeaturesJson)
                .IsRequired(false);

            modelBuilder.Entity<ModelOutput>()
                .Property(e => e.ScoreJson)
                .IsRequired(false);

            modelBuilder.Entity<Aluno>().HasData(
                new Aluno
                {
                    Id = 1,
                    Nome = "Maria da Penha",
                    Email = "mariapenha@yahoo.com",
                    Idade = 23
                },
                new Aluno
                {
                    Id = 2,
                    Nome = "Manuel Bueno",
                    Email = "manuelbueno@yahoo.com",
                    Idade = 22
                }
            );
        }
    }
}
