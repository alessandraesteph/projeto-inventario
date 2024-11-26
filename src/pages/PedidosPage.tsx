import React, { useState, useEffect } from 'react';
import { Pedido } from '../types/pedido';
import { ProdutoPedido } from '../types/pedidoproduto';
import { Produto } from '../types/produto';
import PedidoForm from '../components/PedidoForm';
import './Form.css';

const PedidosPage: React.FC = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [clientes, setClientes] = useState<{ id: number; nome: string }[]>([]);
  const [clienteId, setClienteId] = useState<number | null>(null);
  const [pedidoSelecionado, setPedidoSelecionado] = useState<Pedido | null>(null);
  const [novoPedido, setNovoPedido] = useState<ProdutoPedido[]>([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState<number | null>(null);
  const [quantidadeSelecionada, setQuantidadeSelecionada] = useState<number>(0);


  useEffect(() => {
    const mockProdutos: Produto[] = [
      { id: 1, nome: 'Produto A', preco: 50, descricao: 'Descrição A', imagem: null },
      { id: 2, nome: 'Produto B', preco: 30, descricao: 'Descrição B', imagem: null },
    ];
    const mockClientes = [
      { id: 1, nome: 'Cliente A' },
      { id: 2, nome: 'Cliente B' },
    ];
    setProdutos(mockProdutos);
    setClientes(mockClientes);
  }, []);

  const handleAdicionarProduto = (produtoId: number, quantidade: number) => {
    if (produtoId && quantidade > 0) {
      setNovoPedido((prev) => {
        const produtoExistente = prev.find((p) => p.id === produtoId);
        if (produtoExistente) {
          return prev.map((p) =>
            p.id === produtoId
              ? { ...p, quantidade: p.quantidade + quantidade }
              : p
          );
        }
        return [...prev, { id: produtoId, quantidade }];
      });
      setProdutoSelecionado(null);
      setQuantidadeSelecionada(0);
    }
  };

  const handleRemoverProduto = (id: number) => {
    setNovoPedido(novoPedido.filter((produto) => produto.id !== id));
  };

  const handleAdicionarPedido = () => {
    if (clienteId && novoPedido.length > 0) {
      const total = novoPedido.reduce(
        (acc, produto) => acc + produto.quantidade * produtos.find((p) => p.id === produto.id)!.preco,
        0
      );

      const novo: Pedido = {
        id: pedidos.length + 1,
        clienteId,
        produtos: novoPedido,
        status: 'Pendente',
        total,
      };

      setPedidos([...pedidos, novo]);
      setNovoPedido([]);
      setClienteId(null);
    }
  };

  const handleEditarPedido = (pedido: Pedido) => {
    setPedidoSelecionado(pedido);
  };

  const handleAtualizarPedido = () => {
    if (pedidoSelecionado) {
      setPedidos(
        pedidos.map((p) => (p.id === pedidoSelecionado.id ? pedidoSelecionado : p))
      );
      setPedidoSelecionado(null);
    }
  };

  const handleExcluirPedido = (id: number) => {
    setPedidos(pedidos.filter((p) => p.id !== id));
  };

  return (
    <div className="container">
      <h1>Gerenciamento de Pedidos</h1>
      <h2 className="title">Cadastrar Pedido</h2>
      <div className='input-group'>
        <label className="label"> Cliente:</label>
          <select
            className='input'
            value={clienteId ?? ''}
            onChange={(e) => setClienteId(Number(e.target.value))}
          >
            <option value="" disabled>
              Selecione um cliente
            </option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nome}
              </option>
            ))}
          </select>

        <PedidoForm
          produtos={produtos}
          onAdicionarProduto={handleAdicionarProduto}
          onRemoverProduto={handleRemoverProduto}
          novoPedido={novoPedido}
          produtoSelecionado={produtoSelecionado}
          quantidadeSelecionada={quantidadeSelecionada}
          setProdutoSelecionado={setProdutoSelecionado}
          setQuantidadeSelecionada={setQuantidadeSelecionada}
        />

        <button className="cadastrar" onClick={handleAdicionarPedido}>Adicionar Pedido</button>
      </div>

      <div className="list-container">
          <h2 className="title">Pedidos</h2>
          {pedidos.map((pedido) => (
          <div className="list-details" key={pedido.id}>
            <h3>Pedido #{pedido.id}</h3>
            <button className="editar" onClick={() => handleEditarPedido(pedido)}>Editar</button>
            <button className= "excluir" onClick={() => handleExcluirPedido(pedido.id)}>Excluir</button>
            <div className="list-item">
              <strong className='title'>Cliente:{' '}</strong>
              {clientes.find((cliente) => cliente.id === pedido.clienteId)?.nome ?? 'Desconhecido'}
              <p>Status: {pedido.status}</p>
              <strong><p>Total: R$ {pedido.total.toFixed(2)}</p></strong>

            </div>

            <ul className='list'>
              {pedido.produtos.map((produto) => {
                const detalhes = produtos.find((p) => p.id === produto.id);
                return (
                  <li className='list-item' key={produto.id}>
                    <strong>{detalhes?.nome}</strong><br/>
                    Quantidade:{produto.quantidade}<br/>
                    Preço Unitário: R$ {((detalhes?.preco ?? 0)).toFixed(2)}
                  </li>
                  
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {pedidoSelecionado && (
        <div className="list-container">
          <h2 className="title">Editar Pedido #{pedidoSelecionado.id}</h2>
          <label className='label'></label>
            Status:
            <select
              className='input'
              value={pedidoSelecionado.status}
              onChange={(e) =>
                setPedidoSelecionado({
                  ...pedidoSelecionado,
                  status: e.target.value,
                })
              }
            >
              <option value="Pendente">Pendente</option>
              <option value="Concluído">Concluído</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          <button className='editar' onClick={handleAtualizarPedido}>Atualizar Pedido</button>
        </div>
      )}
    </div>
  );
};

export default PedidosPage;
