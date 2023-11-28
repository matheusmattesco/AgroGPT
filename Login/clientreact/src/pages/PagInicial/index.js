import React from 'react';
import "./style.css";
import IconeChatGPT from "../../assets/Icone ChatGPT.png";
import { useNavigate } from 'react-router-dom';
import {
  Button,
} from "@material-tailwind/react";


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
          <div>
            <h1>Get started</h1>
            <Button 
              onClick={Login}
              variant="gradient"
              size="md"
              className="mr-2 "
              >
              
                Log in
            </Button>
            <Button 
              onClick={Cadastro}
              variant="gradient"
              size="md"
              >
                Sign up
              </Button>
          </div>
        </div>
      </div>
  );
}

export default Inicio;
