import React, { useState } from 'react';
import FornecedorForm from '../components/FornecedorForm';
import FornecedorList from '../components/FornecedorList';
import { Fornecedor } from '../types/fornecedor';
import './Form.css';

const FornecedoresPage = () => {
    const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
    const [fornecedorEdit, setFornecedorEdit] = useState<Fornecedor | null>(null);
    const [filtroNome, setFiltroNome] = useState('');
    const [filtroContato, setFiltroContato] = useState('');
    const [ordenarAsc, setOrdenarAsc] = useState(true); // Estado para controle da ordenação

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

    // Função para filtrar e ordenar fornecedores
    const fornecedoresFiltrados = fornecedores
        .filter(f => 
            f.nome.toLowerCase().includes(filtroNome.toLowerCase()) &&
            f.contato.toLowerCase().includes(filtroContato.toLowerCase())
        )
        .sort((a, b) => ordenarAsc ? a.nome.localeCompare(b.nome) : b.nome.localeCompare(a.nome));

    return (
        <div className="container">
            <h2 className="title">Cadastrar Fornecedores</h2>
            <FornecedorForm 
                onAddFornecedor={adicionarFornecedor} 
                fornecedorEdit={fornecedorEdit}
                onEditFornecedor={editarFornecedor} 
            />

            {/* Filtros */}
            <div className="input-group">
                <input 
                    type="text"
                    className="input-filter"
                    placeholder="Filtrar por nome"
                    value={filtroNome}
                    onChange={(e) => setFiltroNome(e.target.value)}
                />
                <input 
                    type="text"
                    className="input-filter"
                    placeholder="Filtrar por contato"
                    value={filtroContato}
                    onChange={(e) => setFiltroContato(e.target.value)}
                />
                <button 
                    className="editar" 
                    onClick={() => setOrdenarAsc(!ordenarAsc)}>
                    {ordenarAsc ? 'Ordenar Decrescente' : 'Ordenar Crescente'}
                </button>
            </div>

            <h2 className="title">Lista de Fornecedores</h2>
            <FornecedorList 
                fornecedores={fornecedoresFiltrados} 
                onEdit={setFornecedorEdit} 
                onDelete={excluirFornecedor}
            />
        </div>
    );
};

export default FornecedoresPage;
