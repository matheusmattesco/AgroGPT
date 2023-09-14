using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace APIAgroGPT.Models
{
    [Table("MLModelOutputs")]
    public class MLModelOutput
    {
        [Key]
        public int Id { get; set; }

        public float N { get; set; }
        public float P { get; set; }
        public float K { get; set; }
        public float Temperature { get; set; }
        public float Humidity { get; set; }
        public float Ph { get; set; }
        public float Rainfall { get; set; }
        public uint Label { get; set; }
        public string FeaturesJson { get; set; }
        [NotMapped]
        public float[] Features
        {
            get { return JsonConvert.DeserializeObject<float[]>(FeaturesJson); }
            set { FeaturesJson = JsonConvert.SerializeObject(value); }
        }
        public string PredictedLabel { get; set; }
        public string ScoreJson { get; set; }
        [NotMapped]
        public float[] Score
        {
            get { return JsonConvert.DeserializeObject<float[]>(ScoreJson); }
            set { ScoreJson = JsonConvert.SerializeObject(value); }
        }
    }

}