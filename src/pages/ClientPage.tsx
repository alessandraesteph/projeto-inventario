import React, { useState } from 'react';
import ClientForm from '../components/ClienteForm';
import ClientList from '../components/ClienteList';
import { Client } from '../types/cliente';

const ClientPage: React.FC = () => {
    const [clients, setClients] = useState<Client[]>([]);
    const [clientEdit, setClientEdit] = useState<Client | null>(null);

    const handleAddClient = (client: Client) => {
        const existingClient = clients.find(c => c.cpf_cnpj === client.cpf_cnpj);
        if (existingClient) {
            alert('CPF/CNPJ já cadastrado!');
            return;
        }
        setClients([...clients, client]);
    };

    const handleEditClient = (client: Client) => {
        setClients(clients.map(c => (c.id === client.id ? client : c)));
        setClientEdit(null); // Fechar a função corretamente aqui
    };

    const handleDeleteClient = (id: number) => {
        setClients(clients.filter(client => client.id !== id));
    };

    const handleSetClientEdit = (client: Client) => {
        setClientEdit(client);
    };

    return (
        <div className="container">
            <ClientForm onAdd={handleAddClient} clientEdit={clientEdit} onEdit={handleEditClient} />
            <h2>Lista de Clientes</h2>
            <ClientList clients={clients} onEdit={handleSetClientEdit} onDelete={handleDeleteClient} />
        </div>
    );
};

export default ClientPage;
