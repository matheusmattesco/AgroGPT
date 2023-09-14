

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import './style.css';
import { FiXCircle, FiEdit, FiUserX } from 'react-icons/fi';
import api from "../../services/api";
import logoCadastro from "../../assets/Icone ChatGPT.png";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

export default function Alunos() {
    const [nome, setNome] = useState('');
    const [alunos, setAlunos] = useState([]);
    const [predicao, setPredicao] = useState([]);

    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');

    const history = useNavigate(); // Defina history como uma constante

    const authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    useEffect(() => {
        api.get('api/MachineLearning', authorization).then(
            response => {
                setPredicao(response.data);
            }
        );
    }, []); // Passa um array vazio como segundo argumento para executar apenas uma vez

    async function logout() {
        try {
            localStorage.clear();
            localStorage.setItem('token', '');
            authorization.headers = undefined; // Defina o cabeçalho como undefined para removê-lo
            history('/');
        } catch (error) {
            alert('Não foi possível fazer o logout' + error);
        }
    }

    return (
        <div className="aluno-container">
            <header>
                <img src={logoCadastro} alt="Cadastro" />
                <span>Bem-vindo, <strong>{email}</strong>!</span>
                <Link className="button" to="/aluno/novo/0">Nova Predição</Link>
                <button onClick={logout} type="button">
                    <FiXCircle size={35} color="#17202a" />
                </button>
            </header>
            <form>
                <input type="text" placeholder="Nome" />
                <button type="button" className="button">
                    Filtrar aluno por nome (parcial)
                </button>
            </form>
            <h1>Histórico de Predições</h1>

            <ul>
                {predicao.map(predicao => (
                    <li key={predicao.id}>
                        <b>Id: {predicao.id}</b> <br /> <br />
                        <b>Nitrato: </b>{predicao.n} <br /> <br />
                        <b>Pottásio: {predicao.p}</b> <br /> <br />
                        <b>PH {predicao.ph}</b> <br /><br />
                        <b>Resultado: </b>{predicao.predictedLabel} <br /> <br />
                    </li>
                ))}
            </ul>
        </div>
    )
}