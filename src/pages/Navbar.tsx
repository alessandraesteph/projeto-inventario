import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <Link to="/login">Login</Link>
            <Link to="/ProdutoCadastro">Produto</Link>
            <Link to="/cliente">Cliente</Link>
            <Link to="/FornecedoresPage">Fornecedores</Link>
        </nav>
    );
};

export default Navbar;
