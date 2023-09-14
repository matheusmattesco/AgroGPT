﻿using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using APIAgroGPT.Context;
using APIAgroGPT.Models;
using APIAgroGPT.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.ML;

namespace APIAgroGPT.Services
{
    public class ModelService : IMLModelOutput
    {
        private readonly AppDbContext _context;

        public ModelService(AppDbContext context)
        {
            _context = context;
        }

        public async Task AddMLModel(MLModel2.ModelOutput prediction)
        {
            _context.Add(prediction);
            await _context.SaveChangesAsync();
        }

        public async Task AddMLModel(MLModelOutput prediction)
        {
            _context.Add(prediction);
            await _context.SaveChangesAsync();
        }

        async Task<IEnumerable<MLModel2.ModelOutput>> IMLModelOutput.GetPredicao()
        {
            try
            {
                return await _context.MLModelOutputs.ToListAsync();
            }
            catch
            {
                throw;
            }
        }
    }
}
