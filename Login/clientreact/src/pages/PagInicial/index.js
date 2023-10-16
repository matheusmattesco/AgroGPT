import React from 'react';
import "./style.css";
import IconeChatGPT from "../../assets/Icone ChatGPT.png";
import { useNavigate } from 'react-router-dom';


function Inicio() {
  const navigate = useNavigate();

  const Login = () => {
    navigate('/login');
  };

  const Cadastro = () => {
    navigate('/cadastro');

  };

  return (
      <div className="container-flex">
        <div className="div-flex-1">
          <img className="img-flex" src={IconeChatGPT} alt="ChatGPT" />
          <h1>Agro e IA:</h1>
          <p className="text-flex">A evolução que alimenta o futuro.</p>
        </div>
        <div className="div-flex-2">
          <div className="Login">
            <h1>Get started</h1>
            <button onClick={Login}>Log in</button>
            <button onClick={Cadastro}>Sign up</button>
          </div>
        </div>
      </div>
  );
}

export default Inicio;
