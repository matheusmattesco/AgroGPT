import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import './style.css';
import { FiXCircle, FiEdit, FiUserX } from 'react-icons/fi';
import api from "../../services/api";
import logoCadastro from "../../assets/Icone ChatGPT.png";

export default function Predicao() {
    const [nome, setNome] = useState('');
    const [alunos, setAlunos] = useState([]);

    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');

    const history = useNavigate(); // Defina history como uma constante

    const authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    useEffect(() => {
        api.get('api/alunos', authorization).then(
            response => {
                setAlunos(response.data);
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

    async function editAluno(id){
        try {
            history(`/aluno/novo/${id}`)
        } catch (error) {
            alert('Não foi possível editar o aluno')
        }
    }

    return (
        <div className="aluno-container">
            <header>
                <img src={logoCadastro} alt="Cadastro" />
                <span>Bem-vindo, <strong>{email}</strong>!</span>
                <Link className="button" to="/aluno/novo/0">Novo Aluno</Link>
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
            <h1>Relação de Alunos</h1>

            <ul>
                {alunos.map(aluno => (
                    <li key={aluno.id}>
                        <b>Nome: </b>{aluno.nome} <br /> <br />
                        <b>Email: </b>{aluno.email} <br /> <br />
                        <b>Idade: </b>{aluno.idade} <br /> <br />
                        <button onClick={()=> editAluno(aluno.id)} type="button">
                            <FiEdit size="25" color="#17202a" />
                        </button>
                        <button type="button">
                            <FiUserX size="25" color="#17202a" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}