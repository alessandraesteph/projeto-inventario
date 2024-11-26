import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulação de registro
        if (name && email && password) {
            navigate('/login');
        }
    };

    return (
        <div className="container">
            <h1 className="title">Cadastrar</h1>
            <form className="form" onSubmit={handleSubmit}>
                 <div className="input-group">   
                 <label className="label">Nome:</label>
                    <input
                        type="text"
                        placeholder="Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label className="label">Email:</label>    
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label className="label">Senha:</label>
                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                /</div>    
                <button type="submit">Registrar</button>
            </form>
            <p>
                Já tem uma conta? <Link to="/login">Entre</Link>
            </p>
        </div>
    );
};

export default Register;
