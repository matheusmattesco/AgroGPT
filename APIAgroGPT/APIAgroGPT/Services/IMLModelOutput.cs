using APIAgroGPT.Models;


namespace APIAgroGPT.Services
{
    public interface IMLModelOutput
    {
        Task AddMLModel(MLModelOutput prediction); // Novo método para salvar a previsão do modelo
        Task AddMLModel(MLModel2.ModelOutput prediction);
    }
}
