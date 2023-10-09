using APIAgroGPT.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.ML;
using MLModel2_WebApi2;
using System;
using Microsoft.AspNetCore.Http;
using APIAgroGPT.Models;

[Route("api/[controller]")]
[ApiController]
public class MachineLearningController : ControllerBase
{
    private readonly PredictionEnginePool<MLModel2.ModelInput, MLModel2.ModelOutput> _predictionEnginePool;
    private readonly IMLModelOutput _modelOutputService; 

    public MachineLearningController(
        PredictionEnginePool<MLModel2.ModelInput, MLModel2.ModelOutput> predictionEnginePool,
        IMLModelOutput modelOutputService) 
    {
        _predictionEnginePool = predictionEnginePool;
        _modelOutputService = modelOutputService; 
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


    [HttpGet("{id:int}", Name = "GetPredicao")]
    public async Task<ActionResult<MLModel2.ModelOutput>> GetPredicao(int id) 
    {
        var predicao = await _modelOutputService.GetPredicao(id);

        if (predicao == null)
            return NotFound($"Não existe predicao com o id={id}");

        return Ok(predicao);
    }
    
    [HttpDelete("{id:int}")]
    public async Task<ActionResult> Delete(int id)
    {
        try
        {
            var predicao = await _modelOutputService.GetPredicao(id);
            if (predicao != null)
            {
                await _modelOutputService.DeletePredicao(predicao);
                return Ok($"Predicao de id={id} foi excluido com sucesso");
            }
            else
            {
                return NotFound($"Predicao com id={id} não encontrado");
            }
        }
        catch
        {
            return BadRequest("Request inválido");
        }
    }
}
