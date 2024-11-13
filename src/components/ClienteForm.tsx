import React, { useEffect, useState } from 'react';
import { Client } from '../types/cliente';
import '../pages/Form.css';

interface ClientFormProps {
    onAdd: (client: Client) => void;
    clientEdit: Client | null;
    onEdit: (client: Client) => void;
}

const ClientForm: React.FC<ClientFormProps> = ({ onAdd, clientEdit, onEdit }) => {
    const [nome, setNome] = useState('');
    const [cpf_cnpj, setCpfCnpj] = useState('');
    const [contato, setContato] = useState('');
    const [endereco, setEndereco] = useState('');
    const [id, setId] = useState<number | null>(null);

    useEffect(() => {
        if (clientEdit) {
            setNome(clientEdit.nome);
            setCpfCnpj(clientEdit.cpf_cnpj);
            setContato(clientEdit.contato);
            setEndereco(clientEdit.endereco);
            setId(clientEdit.id);
        } else {
            setNome('');
            setCpfCnpj('');
            setContato('');
            setEndereco('');
            setId(null);
        }
    }, [clientEdit]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (id !== null) {
            onEdit({ id, nome, cpf_cnpj, contato, endereco });
        } else {
            const newClient: Client = {
                id: Date.now(), 
                nome,
                cpf_cnpj,
                contato,
                endereco,
            };
            onAdd(newClient);
        }


        setNome('');
        setCpfCnpj('');
        setContato('');
        setEndereco('');
        setId(null);
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <h2 className="title">Cadastro de Clientes</h2>
            <div className="input-group">
                <label className="label">Nome</label>
                <input
                    className="input"
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                />
            </div>
            <div className="input-group">
                <label className="label">CPF/CNPJ</label>
                <input
                    className="input"
                    type="text"
                    value={cpf_cnpj}
                    onChange={(e) => setCpfCnpj(e.target.value)}
                    required
                />
            </div>
            <div className="input-group">
                <label className="label">Contato</label>
                <input
                    className="input"
                    type="text"
                    value={contato}
                    onChange={(e) => setContato(e.target.value)}
                    required
                />
            </div>
            <div className="input-group">
                <label className="label">Endereço</label>
                <input
                    className="input"
                    type="text"
                    value={endereco}
                    onChange={(e) => setEndereco(e.target.value)}
                />
            </div>
            <button className="cadastrar" type="submit">
                {id ? 'Atualizar Cliente' : 'Cadastrar Cliente'}
            </button>
        </form>
    );
};

export default ClientForm;
