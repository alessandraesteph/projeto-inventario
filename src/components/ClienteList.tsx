import React, { useState } from 'react';
import { Client } from '../types/cliente';
import '../pages/Form.css'; 

interface ClientListProps {
    clients: Client[];
    onEdit: (client: Client) => void;
    onDelete: (id: number) => void;
}

const ClientList: React.FC<ClientListProps> = ({ clients, onEdit, onDelete }) => {
    const [selectedName, setSelectedName] = useState('');
    const [selectedCpfCnpj, setSelectedCpfCnpj] = useState('');

    const uniqueNames = Array.from(new Set(clients.map(client => client.nome)));
    const uniqueCpfCnpjs = Array.from(new Set(clients.map(client => client.cpf_cnpj)));

    const filteredClients = clients.filter(client =>
        (selectedName === '' || client.nome === selectedName) &&
        (selectedCpfCnpj === '' || client.cpf_cnpj === selectedCpfCnpj)
    );

    return (
        <div className="list-container">
            <h2 className="title">Filtros</h2>

            <div className="filters">
                <select 
                    value={selectedName}
                    onChange={(e) => setSelectedName(e.target.value)}
                    className="input"
                >
                    <option value="">Filtrar por Nome</option>
                    {uniqueNames.map((name, index) => (
                        <option key={index} value={name}>
                            {name}
                        </option>
                    ))}
                </select>

                <select
                    value={selectedCpfCnpj}
                    onChange={(e) => setSelectedCpfCnpj(e.target.value)}
                    className="input"
                >
                    <option value="">Filtrar por CPF/CNPJ</option>
                    {uniqueCpfCnpjs.map((cpfCnpj, index) => (
                        <option key={index} value={cpfCnpj}>
                            {cpfCnpj}
                        </option>
                    ))}
                </select>
            </div>

            <h2 className="title">Lista de Clientes</h2>
            <div className="grid-container">
                {filteredClients.length > 0 ? (
                    filteredClients.map(client => (
                        <div key={client.id} className="client-card">
                            <div className="list-details">
                                <strong>Nome:</strong> {client.nome}
                                <br />
                                <strong>CPF/CNPJ:</strong> {client.cpf_cnpj}
                                <br />
                                <strong>Contato:</strong> {client.contato}
                                <br />
                                <strong>Endereço:</strong> {client.endereco}
                            </div>
                            <div className="actions">
                                <button className="editar" onClick={() => onEdit(client)}>Editar</button>
                                <button className="excluir" onClick={() => onDelete(client.id)}>Excluir</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Nenhum cliente encontrado com os filtros aplicados.</p>
                )}
            </div>
        </div>
    );
};

export default ClientList;
