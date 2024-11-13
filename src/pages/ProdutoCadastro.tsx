import { useState } from 'react';
import { Produto } from "../types/produto";
import './Form.css'; 

const ProdutoCadastro = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [produtoAtual, setProdutoAtual] = useState<Produto>({
    id: 0,
    nome: '',
    preco: 0,
    descricao: '',
    imagem: null,
  });
  const [filtro, setFiltro] = useState<string>(''); 
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProdutoAtual({ ...produtoAtual, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProdutoAtual({ ...produtoAtual, imagem: e.target.files[0] });
    }
  };

  const handleAddProduto = () => {
    setProdutos([...produtos, { ...produtoAtual, id: Date.now() }]);
    setProdutoAtual({ id: 0, nome: '', preco: 0, descricao: '', imagem: null });
  };

  const handleDeleteProduto = (id: number) => {
    setProdutos(produtos.filter(produto => produto.id !== id));
  };

  const handleEditProduto = (id: number) => {
    const produto = produtos.find(p => p.id === id);
    if (produto) {
      setProdutoAtual(produto);
      handleDeleteProduto(id);
    }
  };

  const handleFiltroChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFiltro(e.target.value);
  };

  const produtosFiltrados = () => {
    if (filtro === 'nome') {
      return [...produtos].sort((a, b) => a.nome.localeCompare(b.nome));
    } else if (filtro === 'preco-asc') {
      return [...produtos].sort((a, b) => a.preco - b.preco);
    } else if (filtro === 'preco-desc') {
      return [...produtos].sort((a, b) => b.preco - a.preco);
    }
    return produtos;
  };

  return (
    <div className="container">
      <h2 className="title">Cadastrar Produto</h2>
      <div className="form">
        <div className="input-group">
          <input 
            type="text" 
            name="nome" 
            placeholder="Nome" 
            className="input"
            value={produtoAtual.nome} 
            onChange={handleInputChange} 
          />
        </div>
        <div className="input-group">
          <input 
            type="number" 
            name="preco" 
            placeholder="Preço" 
            className="input"
            value={produtoAtual.preco} 
            onChange={handleInputChange} 
          />
        </div>
        <div className="input-group">
          <textarea 
            name="descricao" 
            placeholder="Descrição" 
            className="input"
            value={produtoAtual.descricao} 
            onChange={handleInputChange} 
          />
        </div>
        <div className="input-group">
          <input 
            type="file" 
            name="imagem" 
            onChange={handleFileChange} 
          />
        </div>
        <button className="cadastrar" onClick={handleAddProduto}>
          Adicionar Produto
        </button>
      </div>

      <h2 className="title">Filtros</h2>
      <select onChange={handleFiltroChange} value={filtro} className="input">
        <option value="">Selecione um filtro</option>
        <option value="nome">Nome (Ordem Alfabética)</option>
        <option value="preco-asc">Preço (Menor para Maior)</option>
        <option value="preco-desc">Preço (Maior para Menor)</option>
      </select>

      <h2 className="title">Produtos Cadastrados</h2>
      <div className="list-container">
        <ul className="fornecedor-list">
          {produtosFiltrados().map(produto => (
            <li key={produto.id} className="fornecedor-item">
              <h3>{produto.nome}</h3>
              <p>Preço: {produto.preco}</p>
              <p>{produto.descricao}</p>
              {produto.imagem && (
                <img 
                  src={URL.createObjectURL(produto.imagem)} 
                  alt={produto.nome} 
                  width="100" 
                />
              )}
              <button className="editar" onClick={() => handleEditProduto(produto.id)}>Editar</button>
              <button className="excluir" onClick={() => handleDeleteProduto(produto.id)}>Excluir</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProdutoCadastro;
