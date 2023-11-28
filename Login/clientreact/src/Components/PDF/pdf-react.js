import React from 'react';

const ExportContent = ({ pred }) => (

<div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0 mt-12">
    <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-center">
            <h1 className="text-4xl font-bold mb-4">Hello, this will be exported as PDF!</h1>
            <p className="mb-4">Additional content...</p>
            <p className="bg-blue-500">TRUCOOOO</p>
            <h1>{pred.id}</h1>
            <p>{pred.k}</p>
            <p>{pred.autor}</p>
            <p>{pred.nome}</p>
            <p className="mb-4">Label Previsto: {pred.predictedLabel}</p>
        </div>
    </div>
</div>
);

export default ExportContent;
