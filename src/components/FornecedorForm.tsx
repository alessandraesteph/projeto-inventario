import React, { useState, useEffect } from 'react';
import { Fornecedor } from '../types/fornecedor';
import "../pages/Form.css";

interface FornecedorFormProps {
    onAddFornecedor: (fornecedor: Fornecedor) => void;
    fornecedorEdit: Fornecedor | null;
    onEditFornecedor: (fornecedor: Fornecedor) => void;
}

const FornecedorForm = ({ onAddFornecedor, fornecedorEdit, onEditFornecedor }: FornecedorFormProps) => {
    const [nome, setNome] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [contato, setContato] = useState('');

    useEffect(() => {
        if (fornecedorEdit) {
            setNome(fornecedorEdit.nome);
            setCnpj(fornecedorEdit.cnpj);
            setContato(fornecedorEdit.contato);
        } else {
            setNome('');
            setCnpj('');
            setContato('');
        }
    }, [fornecedorEdit]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const fornecedor: Fornecedor = { id: Date.now(), nome, cnpj, contato }; 
        if (fornecedorEdit) {
            onEditFornecedor(fornecedor);
        } else {
            onAddFornecedor(fornecedor);
        }
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <div className="input-group">
                <label className="label">Nome</label>
                <input
                    type="text"
                    className="input"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                />
            </div>
            <div className="input-group">
                <label className="label">CNPJ</label>
                <input
                    type="text"
                    className="input"
                    value={cnpj}
                    onChange={(e) => setCnpj(e.target.value)}
                    required
                />
            </div>
            <div className="input-group">
                <label className="label">Contato</label>
                <input
                    type="text"
                    className="input"
                    value={contato}
                    onChange={(e) => setContato(e.target.value)}
                    required
                />
            </div>
            <button type="submit" className="cadastrar">
                {fornecedorEdit ? 'Editar Fornecedor' : 'Cadastrar Fornecedor'}
            </button>
        </form>
    );
};

export default FornecedorForm;
