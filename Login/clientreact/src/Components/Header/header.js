import React from 'react';
import './style.css';
import logo from "../../assets/Icone ChatGPT.png";
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const ConsultaAlgoritmo = () => {
        navigate('/consulta-algoritmo');
    };

    const ConsultaDataset = () => {
        navigate('/consulta-dataset');
    };

    const Inicio = () => {
        navigate('/inicio');
    };

    const Ajuda = () => {
        navigate('/');
    };

    const TelaPredicao = () => {
        navigate('/tela-predicao');
    };

    async function logout() {
        try {
            localStorage.clear();
            localStorage.setItem('token', '');
            authorization.headers = undefined; // Defina o cabeçalho como undefined para removê-lo
            navigate('/'); // Use navigate diretamente para mudar para a página inicial
        } catch (error) {
            alert('Não foi possível fazer o logout' + error);
        }
    }

    return (
        <header>
            <div className='header-padrao'>
                <img src={logo} alt="Logo" />
                <div>
                    <ul>
                        <li><a onClick={Inicio}>Inicio</a></li>
                        <li><a onClick={Ajuda}>Ajuda</a></li>
                        <li><a onClick={TelaPredicao}>Nova Classificação</a></li>
                        <li><a onClick={ConsultaDataset}>Consulta Dataset</a></li>
                        <li><a onClick={ConsultaAlgoritmo}>Consulta algoritmo</a></li>
                        <li><a onClick={logout}>Sair</a></li>
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Header;
