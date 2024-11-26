import React from 'react';

import { ProdutoPedido } from '../types/pedidoproduto';
import { Produto } from '../types/produto';
import '../pages/Form.css';

interface PedidoFormProps {
  produtos: Produto[];
  onAdicionarProduto: (produtoId: number, quantidade: number) => void;
  onRemoverProduto: (id: number) => void;
  novoPedido: ProdutoPedido[];
  produtoSelecionado: number | null;
  quantidadeSelecionada: number;
  setProdutoSelecionado: React.Dispatch<React.SetStateAction<number | null>>;
  setQuantidadeSelecionada: React.Dispatch<React.SetStateAction<number>>;
}

const PedidoForm: React.FC<PedidoFormProps> = ({
  produtos,
  onAdicionarProduto,
  onRemoverProduto,
  novoPedido,
  produtoSelecionado,
  quantidadeSelecionada,
  setProdutoSelecionado,
  setQuantidadeSelecionada
}) => {
  const handleAddClick = () => {
    if (produtoSelecionado && quantidadeSelecionada > 0) {
      onAdicionarProduto(produtoSelecionado, quantidadeSelecionada);
    }
  };

  return (
    <div className="container">
    <div className="form">
        <div className='input-group'>
            <label className="label">Produto</label>
                <select 
                className="input"
                value={produtoSelecionado ?? ''}
                onChange={(e) => setProdutoSelecionado(Number(e.target.value))}
                aria-label="Selecione um produto"
                required
                >
                <option value="" disabled>Selecione um produto</option>
                {produtos.map((produto) => (
                    <option key={produto.id} value={produto.id}>
                    {produto.nome} - R$ {produto.preco}
                    </option>
                ))}
                </select>
        </div>

        <div className="input-group">        
            <label className="label">Quantidade:</label>
                <input
                type="number"
                className="input"
                min="1"
                value={quantidadeSelecionada}
                onChange={(e) => setQuantidadeSelecionada(Number(e.target.value))}
                required
                />
        </div>
                
        <button className="cadastrar" onClick={handleAddClick} disabled={!produtoSelecionado || quantidadeSelecionada <= 0}>
            Adicionar Produto
        </button>

        <div className="list-container">
            <ul className='list'>
                {novoPedido.map((produto) => {
                const detalhes = produtos.find((p) => p.id === produto.id);
                return (
                    <li key={produto.id} className="list-item">
                        <div className="list-details">
                            <strong>{detalhes?.nome}</strong><br/>
                            Quantidade:{produto.quantidade}<br/>
                            Preço Unitário: R$ {((detalhes?.preco ?? 0)).toFixed(2)}
                            <br/>
                            <strong>Total:</strong>R$ {(produto.quantidade * (detalhes?.preco ?? 0)).toFixed(2)}

                        </div>
                        <div className="actions">
                        <button className="excluir" onClick={() => onRemoverProduto(produto.id)}>Remover</button>
                        </div>
                    </li>
                );})}
            </ul>
        </div>
        </div>
    </div>  
  );
};

export default PedidoForm;
