import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './pages/Navbar';
import Produto from './pages/ProdutoCadastro';
import Cliente from './pages/ClientPage';
import Login from './pages/Login';
import FornecedoresPage from './pages/FornecedoresPage'; 
import './global.css';
import Pedido from './pages/Pedido'
const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/ProdutoCadastro" element={<Produto />} />
        <Route path="/cliente" element={<Cliente />} />
        <Route path="/FornecedoresPage" element={<FornecedoresPage/>}/>
        <Route path='/Pedido' element={<Pedido/>}/>
      </Routes>
    </>
  );
};

export default App;