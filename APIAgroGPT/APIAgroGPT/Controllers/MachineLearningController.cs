using APIAgroGPT.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.ML;
using MLModel2_WebApi2; // Importe o namespace do seu modelo

[Route("api/[controller]")]
[ApiController]
public class MachineLearningController : ControllerBase
{
    private readonly PredictionEnginePool<MLModel2.ModelInput, MLModel2.ModelOutput> _predictionEnginePool;
    private readonly IMLModelOutput _modelOutputService; // Injete o serviço aqui

    public MachineLearningController(
        PredictionEnginePool<MLModel2.ModelInput, MLModel2.ModelOutput> predictionEnginePool,
        IMLModelOutput modelOutputService) // Injete o serviço no construtor
    {
        _predictionEnginePool = predictionEnginePool;
        _modelOutputService = modelOutputService; // Atribua o serviço à variável local
    }

    [HttpPost("predict")]
    public async Task<ActionResult<MLModel2.ModelOutput>> Predict([FromBody] MLModel2.ModelInput input)
    {
            var prediction = _predictionEnginePool.Predict(input);

            await _modelOutputService.AddMLModel(prediction); 

            return Ok(prediction);
        
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<MLModel2.ModelOutput>>> GetPredicao()
    {
        var predicao = await _modelOutputService.GetPredicao();
        return Ok(predicao);
    }

}
