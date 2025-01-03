import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Form.css';

interface LoginProps {
    onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(''); // Adicionada a variável de mensagem
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email && password) {
            onLogin(); // Autenticação bem-sucedida
            navigate('/cliente');
        } else {
            setMessage('Por favor, preencha todos os campos.');
        }
    };

    return (
        <div className="container">
            <h2 className="title">Login</h2>
            <form onSubmit={handleSubmit} className="form">
                <div className="input-group">
                    <label className="label">Email:</label>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="input"
                    />
                </div>
                <div className="input-group">
                    <label className="label">Senha:</label>
                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="input"
                    />
                </div>
                <button type="submit" className="cadastrar">Entrar</button>
            </form>
            <p>
                Não tem uma conta? <Link to="/register">Registre-se</Link>
            </p>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default Login;
