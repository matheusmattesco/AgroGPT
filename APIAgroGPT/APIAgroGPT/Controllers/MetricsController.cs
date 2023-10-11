using Microsoft.AspNetCore.Mvc;
using CsvHelper;
using CsvHelper.Configuration;
using System.Globalization;
using System.IO;
using System.Linq;
using Microsoft.ML.Data;
using Microsoft.ML.Trainers.FastTree;
using Microsoft.ML;

namespace APIAgroGPT.Controllers
{
    [Route("api/metrics")]
    [ApiController]
    public class MetricsController : ControllerBase
    {
        private readonly MLContext _context;

        public MetricsController(MLContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<MetricsResult>> GetMetrics()
        {
            var dataset = _context.Data.LoadFromTextFile<InputModel>(
                path: "C:\\Users\\a895091\\OneDrive - Atos\\Documentos\\ml.net\\Crop_recommendation.csv", hasHeader: true, separatorChar: ',', allowQuoting: true);

            var TrainAndTestDataset = _context.Data.TrainTestSplit(dataset);

            var dataPipeline = _context.Transforms.Concatenate("Features", "N", "P", "K", "temperature", "humidity", "ph", "rainfall")
                .Append(_context.Transforms.Conversion.MapValueToKey("Label", "label"));

            var trainer = _context.MulticlassClassification.Trainers.OneVersusAll(
                _context.BinaryClassification.Trainers.FastForest(new FastForestBinaryTrainer.Options()
                {
                    NumberOfTrees = 17,
                    NumberOfLeaves = 4,
                    FeatureFraction = 1F
                }),
                labelColumnName: "Label"
            );

            var trainingPipeline = dataPipeline.Append(trainer);

            var model = await Task.Run(() => trainingPipeline.Fit(TrainAndTestDataset.TrainSet));

            var metrics = _context.MulticlassClassification.Evaluate(model.Transform(TrainAndTestDataset.TestSet),
                labelColumnName: "Label");

            var metricsList = new double[] { metrics.MacroAccuracy, metrics.LogLoss, metrics.LogLossReduction, metrics.TopKAccuracy };
            var stdDev = CalculateStandardDeviation(metricsList);

            var result = new MetricsResult
            {
                Accuracy = metrics.MacroAccuracy,
                LogLoss = metrics.LogLoss,
                LogLossReduction = metrics.LogLossReduction,
                TopKAccuracy = metrics.TopKAccuracy,
                StandardDeviation = stdDev,
                ConfusionMatrix = metrics.ConfusionMatrix.GetFormattedConfusionTable()

            };

            return result;
        }

        private static double CalculateStandardDeviation(double[] values)
        {
            double mean = values.Average();
            double sumOfSquares = values.Sum(val => Math.Pow(val - mean, 2));
            double variance = sumOfSquares / (values.Length - 1);
            double stdDev = Math.Sqrt(variance);
            return stdDev;
        }
    }

    public class MetricsResult
    {
        public double Accuracy { get; set; }
        public double LogLoss { get; set; }
        public double LogLossReduction { get; set; }
        public double TopKAccuracy { get; set; }
        public double StandardDeviation { get; set; }

        public string ConfusionMatrix { get; set; }
    }

    class InputModel
    {
        [LoadColumn(0)]
        public float N { get; set; }

        [LoadColumn(1)]
        public float P { get; set; }

        [LoadColumn(2)]
        public float K { get; set; }

        [LoadColumn(3)]
        public float temperature { get; set; }

        [LoadColumn(4)]
        public float humidity { get; set; }

        [LoadColumn(5)]
        public float ph { get; set; }

        [LoadColumn(6)]
        public float rainfall { get; set; }

        [LoadColumn(7)]
        public string label { get; set; }
    }
}
