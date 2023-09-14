import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Predicao from "./pages/Predicoes";
import Alunos from './pages/Alunos';
import NovoAluno from "./pages/NovoAluno";
import SoilPrediction from "./pages/soilPrediction";
import Inicio from "./pages/PagInicial";

export default function WebRoute() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/alunos" element={<Alunos />}/>
                <Route path="/aluno/novo/:alunoId" element={<NovoAluno />}/>
                <Route path="/soil-prediction" element={<SoilPrediction />} />
                <Route path="/" element={<Inicio />} />
                <Route path="/inicio" element={<Predicao />} />

            </Routes>
        </BrowserRouter>
    );
}