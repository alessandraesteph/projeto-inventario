
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
            <ul className="fornecedor-list">
                {fornecedores.map((fornecedor) => (
                    <li key={fornecedor.id} className="fornecedor-item">
                        <div>
                            <strong>{fornecedor.nome}</strong> - {fornecedor.cnpj} - {fornecedor.contato}
                        </div>
                        <div>
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
