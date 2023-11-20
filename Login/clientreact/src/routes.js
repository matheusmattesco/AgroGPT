import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import TelaInicial from "./pages/Inicio";
import Alunos from './pages/Alunos';
import NovoAluno from "./pages/NovoAluno";
import SoilPrediction from "./pages/soilPrediction";
import Inicio from "./pages/PagInicial";
import GerarPredicao from "./pages/GerarPredicao";
import ConsultaDataset from "./pages/ConsultaDataset";
import ConsultaAlgoritmo from "./pages/ConsultaAlgoritmo";
import Cadastro from "./pages/Cadastro";
import GerarPredicaoTeste from "./pages/TelaPredicao";
import Historico from "./pages/Historico"

export default function WebRoute() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/alunos" element={<Alunos />}/>
                <Route path="/aluno/novo/:alunoId" element={<NovoAluno />}/>
                <Route path="/soil-prediction" element={<SoilPrediction />} />
                <Route path="/" element={<Inicio />} />
                <Route path="/inicio" element={<TelaInicial />} />
                <Route path="/gerar-predicao" element={<GerarPredicao />} />
                <Route path="/consulta-dataset" element={<ConsultaDataset />} />
                <Route path="/consulta-algoritmo" element={<ConsultaAlgoritmo />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/Tela-Predicao" element={<GerarPredicaoTeste />} />
                <Route path="/historico" element={<Historico />} />
            </Routes>
        </BrowserRouter>
    );
}