import React, { useState } from 'react';
import FornecedorForm from '../components/FornecedorForm';
import FornecedorList from '../components/FornecedorList';
import { Fornecedor } from '../types/fornecedor';
import './Form.css'; 

const FornecedoresPage = () => {
    const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
    const [fornecedorEdit, setFornecedorEdit] = useState<Fornecedor | null>(null);

    const adicionarFornecedor = (fornecedor: Fornecedor) => {
        setFornecedores([...fornecedores, fornecedor]);
    };

    const editarFornecedor = (fornecedor: Fornecedor) => {
        setFornecedores(fornecedores.map(f => (f.id === fornecedor.id ? fornecedor : f)));
        setFornecedorEdit(null);
    };

    const excluirFornecedor = (id: number) => {
        setFornecedores(fornecedores.filter(fornecedor => fornecedor.id !== id));
    };

    return (
        <div className="container">
            <h2 className="title">Cadastrar Fornecedores</h2>
            <FornecedorForm 
                onAddFornecedor={adicionarFornecedor} 
                fornecedorEdit={fornecedorEdit}
                onEditFornecedor={editarFornecedor} 
            />
            <h2 className="title">Lista de Fornecedores</h2>
            <FornecedorList 
                fornecedores={fornecedores} 
                onEdit={setFornecedorEdit} 
                onDelete={excluirFornecedor}
            />
        </div>
    );
};

export default FornecedoresPage;
