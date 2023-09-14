using APIAgroGPT.Models;


namespace APIAgroGPT.Services
{
    public interface IMLModelOutput
    {
        Task<IEnumerable<MLModel2.ModelOutput>> GetPredicao();
        Task AddMLModel(MLModelOutput prediction); // Novo método para salvar a previsão do modelo
        Task AddMLModel(MLModel2.ModelOutput prediction);

    }
}
