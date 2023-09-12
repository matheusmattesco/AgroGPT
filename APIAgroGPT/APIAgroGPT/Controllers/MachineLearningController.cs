using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.ML;
using MLModel2_WebApi2;// Importe o namespace do seu modelo

[Route("api/[controller]")]
[ApiController]
public class MachineLearningController : ControllerBase
{
    private readonly PredictionEnginePool<MLModel2.ModelInput, MLModel2.ModelOutput> _predictionEnginePool;

    public MachineLearningController(PredictionEnginePool<MLModel2.ModelInput, MLModel2.ModelOutput> predictionEnginePool)
    {
        _predictionEnginePool = predictionEnginePool;
    }

    [HttpPost("predict")]
    public ActionResult<MLModel2.ModelOutput> Predict([FromBody] MLModel2.ModelInput input)
    {
        try
        {
            var prediction = _predictionEnginePool.Predict(input);
            return Ok(prediction);
        }
        catch (Exception ex)
        {
            // Lide com exceções, se necessário
            return BadRequest($"Erro na previsão: {ex.Message}");
        }
    }
}
