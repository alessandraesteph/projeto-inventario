import React, { useState } from 'react';
import './Form.css';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(`Email: ${email}, Senha: ${password}`);
    };

    return (
        <div className="container">
            <h2 className="title">Login</h2>
            <form onSubmit={handleLogin} className="form">
                <div className="input-group">
                    <label className="label">Email:</label>
                    <input
                        type="email"
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="input"
                    />
                </div>
                <button type="submit" className="cadastrar">Entrar</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default Login;
