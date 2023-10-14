using CsvHelper.Configuration;
using CsvHelper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.ML.Data;
using System.Globalization;

namespace APIAgroGPT.Controllers
{
    [Route("api/dataset")]
    [ApiController]
    public class DataSetController : ControllerBase
    {

        [HttpGet("{selectedLabel}")]
        public ActionResult<CropRecommendationOutput> GetCropRecommendation(string selectedLabel)
        {
            string filePath = @"C:\\Users\\a895091\\OneDrive - Atos\\Documentos\\ml.net\\Crop_recommendation.csv";

            using (var reader = new StreamReader(filePath))
            using (var csv = new CsvReader(reader, new CsvConfiguration(CultureInfo.InvariantCulture)))
            {
                var records = csv.GetRecords<ModelInput>().ToList();

                var groupedData = new CropRecommendationOutput(); // Inicializa com valores padrão
                foreach (var group in records.GroupBy(record => record.label))
                {
                    if (group.Key == selectedLabel)
                    {
                        var averageN = group.Average(record => record.N);
                        var averageP = group.Average(record => record.P);
                        var averageK = group.Average(record => record.K);
                        var averageTemperature = group.Average(record => record.temperature);
                        var averageHumidity = group.Average(record => record.humidity);
                        var averagepH = group.Average(record => record.ph);
                        var averageRainfall = group.Average(record => record.rainfall);
                        var minN = group.Min(record => record.N);
                        var maxN = group.Max(record => record.N);
                        var minP = group.Min(record => record.P);
                        var maxP = group.Max(record => record.P);
                        var minK = group.Min(record => record.K);
                        var maxK = group.Max(record => record.K);
                        var minTemperature = group.Min(record => record.temperature);
                        var maxTemperature = group.Max(record => record.temperature);
                        var minHumidity = group.Min(record => record.humidity);
                        var maxHumidity = group.Max(record => record.humidity);
                        var minpH = group.Min(record => record.ph);
                        var maxpH = group.Max(record => record.ph);
                        var minRainfall = group.Min(record => record.rainfall);
                        var maxRainfall = group.Max(record => record.rainfall);
                        groupedData = new CropRecommendationOutput
                        {
                            Label = group.Key,
                            AverageN = averageN,
                            AverageP = averageP,
                            AverageK = averageK,
                            AverageTemperature = averageTemperature,
                            AverageHumidity = averageHumidity,
                            AveragepH = averagepH,
                            AverageRainfall = averageRainfall,
                            MinN = minN,
                            MaxN = maxN,
                            MinP = minP,
                            MaxP = maxP,
                            MinK = minK,
                            MaxK = maxK,
                            MinTemperature = minTemperature,
                            MaxTemperature = maxTemperature,
                            MinHumidity = minHumidity,
                            MaxHumidity = maxHumidity,
                            MinpH = minpH,
                            MaxpH = maxpH,
                            MinRainfall = minRainfall,
                            MaxRainfall = maxRainfall
                        };
                        break; // Sai do loop quando encontrar o item correspondente
                    }
                }

                if (groupedData.Label == null)
                {
                    // Trate o caso em que não há correspondência para o selectedLabel
                    return NotFound();
                }
                else
                {
                    return groupedData;
                }

            }
        }


        public class ModelInput
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

    public class CropRecommendationOutput
    {
        public string Label { get; set; }
        public double AverageN { get; set; }
        public double AverageP { get; set; }
        public double AverageK { get; set; }
        public double AverageTemperature { get; set; }
        public double AverageHumidity { get; set; }
        public double AveragepH { get; set; }
        public double AverageRainfall { get; set; }
        public double MinN { get; set; }
        public double MaxN { get; set; }
        public double MinP { get; set; }
        public double MaxP { get; set; }
        public double MinK { get; set; }
        public double MaxK { get; set; }
        public double MinTemperature { get; set; }
        public double MaxTemperature { get; set; }
        public double MinHumidity { get; set; }
        public double MaxHumidity { get; set; }
        public double MinpH { get; set; }
        public double MaxpH { get; set; }
        public double MinRainfall { get; set; }
        public double MaxRainfall { get; set; }
    }
}
