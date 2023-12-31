import React, { useRef, useState } from "react";
import "./style.css";
import {VscEye, VscEyeClosed} from "react-icons/vsc"
import {
    Button
} from "@material-tailwind/react";

import api from "../../services/api";

import logoImage from "../../assets/Icone ChatGPT.png";
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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

    const navigate = useNavigate(); // Use useNavigate para navegação

    async function login(event) {
        event.preventDefault();

        const data = {
            email,
            password
        };

        try {
            const response = await api.post('api/account/loginuser', data);

            localStorage.setItem('email', email);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('expiration', response.data.expiration);

            navigate('/inicio'); // Use navigate para redirecionar

        } catch (error) {
            alert('Senha ou Login incorretos!');
        }
    }

    return (
      <div className="background">
        <div className="login-container">
            <section className="form">
                <img src={logoImage} alt="Login" id="img1" />
                <form onSubmit={login}>
                    <input
                        className="input-login"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input 
                        ref={inputRef}
                        className="input-login"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    
                    <Button type="submit"
                                  variant="gradient"
                                  size="md"
                                  className="mr-2 mt-10">
                        Login
                    </Button>
                    {error && <p className="error-message text-white">{error}</p>}
                </form>
            </section>
        </div>
    </div> 
    );
}
