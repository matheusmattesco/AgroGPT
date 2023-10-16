import React, { useRef, useState } from "react";
import "./style.css";
import {VscEye, VscEyeClosed} from "react-icons/vsc"

import api from "../../services/api";

import logoImage from "../../assets/Icone ChatGPT.png";
import { useNavigate } from 'react-router-dom';

export default function Cadastro() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [eyeIsClosed, setEyeState] = useState(false);
    const inputRef = useRef(null);

    const toggleShow = () => {
        if (inputRef.current.type === "password") {
            setEyeState(true)
            inputRef.current.type = "text";
        } else {
            setEyeState(false)
            inputRef.current.type = "password";
        }
    };

    const navigate = useNavigate();

    async function handleSignUp(event) {
        event.preventDefault();

        if (password !== confirmPassword) {
            setError("As senhas não correspondem.");
            return;
        }

        const data = {
            email,
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
            alert('O cadastro falhou: ' + error.message);
        }
    }

    return (
      <div className="background">
        <div className="login-container">
            <section className="form">
                <img src={logoImage} alt="Login" id="img1" />
                <form onSubmit={handleSignUp}>
                    <input
                        className="input-login"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input 
                        ref={inputRef}
                        className="input-login2"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <input 
                        className="input-login2"
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                    <span className="icon" onClick={toggleShow}>
                        {eyeIsClosed ? <VscEyeClosed /> : <VscEye />}
                    </span>
                    <button className="button-login" type="submit">
                        Sign Up
                    </button>
                    {error && <p className="error-message">{error}</p>}
                </form>
            </section>
        </div>
    </div> 
    );
}
