import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <Link to="/cliente">Cliente</Link>
            <Link to="/FornecedoresPage">Fornecedores</Link>
            <Link to="/ProdutoCadastro">Produto</Link>
            <Link to="/Pedido">Pedidos</Link>
        </nav>
    );
};

export default Navbar;
