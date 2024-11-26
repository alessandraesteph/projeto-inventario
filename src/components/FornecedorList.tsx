import React from 'react';
import { Fornecedor } from '../types/fornecedor';
import "../pages/Form.css";

interface FornecedorListProps {
    fornecedores: Fornecedor[];
    onEdit: (fornecedor: Fornecedor) => void;
    onDelete: (id: number) => void;
}

const FornecedorList = ({ fornecedores, onEdit, onDelete }: FornecedorListProps) => {
    return (
        <div className="list-container">
            <ul className="list">  {}
                {fornecedores.map((fornecedor) => (
                    <li key={fornecedor.id} className="list-item"> {}
                        <div className="list-details">
                            <strong>{fornecedor.nome}</strong><br />
                            CNPJ: {fornecedor.cnpj}<br />
                            Contato: {fornecedor.contato}
                        </div>
                        <div className="actions">
                            <button className="editar" onClick={() => onEdit(fornecedor)}>Editar</button>
                            <button className="excluir" onClick={() => onDelete(fornecedor.id)}>Excluir</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FornecedorList;
