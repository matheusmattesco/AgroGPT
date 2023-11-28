import React, { useRef, useState } from "react";
import "./style.css";
import {VscEye, VscEyeClosed} from "react-icons/vsc"

import api from "../../services/api";

import logoImage from "../../assets/Icone ChatGPT.png";
import { useNavigate } from 'react-router-dom';
import {
    Button,
} from "@material-tailwind/react";

export default function Cadastro() {
    const [email, setEmail] = useState('');
    const [nome, setNome] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const inputRef = useRef(null);

    const navigate = useNavigate();

    async function handleSignUp(event) {
        event.preventDefault();

        if (password !== confirmPassword) {
            setError("As senhas não correspondem.");
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!password.match(passwordRegex)) {
            setError(
              "A senha deve conter pelo menos 8 caracteres, incluindo pelo menos uma letra minúscula, uma letra maiúscula, um número e um caractere especial."
            );
            return;
          }

        const data = {
            email,
            nome,
            password,
            confirmPassword
        };

        try {
            const response = await api.post('api/account/createuser', data);

            localStorage.setItem('email', email);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('expiration', response.data.expiration);

            navigate('/inicio'); // Use navigate para redirecionar

        } catch (error) {
            alert("Ocorreu um erro no cadastro. Tente novamente.");
        }
    }

    return (
      <div className="background">
        <div className="cadastro-container">
            <section className="form">
                <img src={logoImage} alt="cadastro" id="img1" />
                <form onSubmit={handleSignUp}>
                    <input
                            className="input-cadastro"
                            placeholder="Nome"
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                        />
                    <input
                        className="input-cadastro"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input 
                        ref={inputRef}
                        className="input-cadastro"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <input 
                        className="input-cadastro"
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                    <Button type="submit" 
                                  variant="gradient"
                                  size="md"
                                  className="mr-2 mt-10">
                        Cadastro
                    </Button>
                    {error && <p className="error-message text-white">{error}</p>}
                </form>
            </section>
        </div>
    </div> 
    );
}
