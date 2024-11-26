import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './pages/Navbar';
import Produto from './pages/ProdutoCadastro';
import Cliente from './pages/ClientPage';
import Login from './pages/Login';
import Register from './pages/Register';
import FornecedoresPage from './pages/FornecedoresPage';
import Pedido from './pages/PedidosPage';
import './global.css';

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = () => setIsAuthenticated(true);

    return (
        <>
            {isAuthenticated && <Navbar />}
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route
                    path="/login"
                    element={<Login onLogin={handleLogin} />}
                />
                {isAuthenticated ? (
                    <>
                        <Route path="/ProdutoCadastro" element={<Produto />} />
                        <Route path="/cliente" element={<Cliente />} />
                        <Route path="/FornecedoresPage" element={<FornecedoresPage />} />
                        <Route path="/Pedido" element={<Pedido />} />
                    </>
                ) : (
                    <Route path="*" element={<Navigate to="/login" />} />
                )}
            </Routes>
        </>
    );
};

export default App;
