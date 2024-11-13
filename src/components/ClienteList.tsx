import React from 'react';
import { Client } from '../types/cliente';

interface ClientListProps {
    clients: Client[];
    onEdit: (client: Client) => void;
    onDelete: (id: number) => void;
}

const ClientList: React.FC<ClientListProps> = ({ clients, onEdit, onDelete }) => {
    return (
        <div className="list-container">
            <ul className="fornecedor-list">
                {clients.map(client => (
                    <li key={client.id} className="fornecedor-item">
                        <div>
                            <strong>Nome:</strong> {client.nome}
                            <br />
                            <strong>CPF/CNPJ:</strong> {client.cpf_cnpj}
                            <br />
                            <strong>Contato:</strong> {client.contato}
                            <br />
                            <strong>Endereço:</strong> {client.endereco}
                        </div>
                        <div>
                            <button className="editar" onClick={() => onEdit(client)}>Editar</button>
                            <button className="excluir" onClick={() => onDelete(client.id)}>Excluir</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ClientList;
