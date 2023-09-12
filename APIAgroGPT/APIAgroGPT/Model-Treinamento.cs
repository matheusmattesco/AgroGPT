using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.ML.Data;
using Microsoft.ML.Trainers.FastTree;
using Microsoft.ML.Trainers;
using Microsoft.ML;

namespace MLModel2_WebApi2
{


    public partial class MLModel2
    {
        public static ITransformer RetrainPipeline(MLContext mlContext, IDataView trainData)
        {
            var pipeline = BuildPipeline(mlContext);
            var model = pipeline.Fit(trainData);

            return model;
        }

        public static IEstimator<ITransformer> BuildPipeline(MLContext mlContext)
        {
            // Data process configuration with pipeline data transformations
            var pipeline = mlContext.Transforms.ReplaceMissingValues(new[] { new InputOutputColumnPair(@"N", @"N"), new InputOutputColumnPair(@"P", @"P"), new InputOutputColumnPair(@"K", @"K"), new InputOutputColumnPair(@"temperature", @"temperature"), new InputOutputColumnPair(@"humidity", @"humidity"), new InputOutputColumnPair(@"ph", @"ph"), new InputOutputColumnPair(@"rainfall", @"rainfall") })
                                    .Append(mlContext.Transforms.Concatenate(@"Features", new[] { @"N", @"P", @"K", @"temperature", @"humidity", @"ph", @"rainfall" }))
                                    .Append(mlContext.Transforms.Conversion.MapValueToKey(outputColumnName: @"label", inputColumnName: @"label"))
                                    .Append(mlContext.MulticlassClassification.Trainers.OneVersusAll(binaryEstimator: mlContext.BinaryClassification.Trainers.FastForest(new FastForestBinaryTrainer.Options() { NumberOfTrees = 17, NumberOfLeaves = 4, FeatureFraction = 1F, LabelColumnName = @"label", FeatureColumnName = @"Features" }), labelColumnName: @"label"))
                                    .Append(mlContext.Transforms.Conversion.MapKeyToValue(outputColumnName: @"PredictedLabel", inputColumnName: @"PredictedLabel"));

            return pipeline;
        }
    }
}
