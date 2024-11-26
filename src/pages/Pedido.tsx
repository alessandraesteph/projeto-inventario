import React, { useState, useEffect } from 'react';
import { Pedido } from '../types/pedido';
import { ProdutoPedido } from '../types/pedidoproduto';
import { Produto } from '../types/produto';

const PedidosPage: React.FC = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [clientes, setClientes] = useState<{ id: number; nome: string }[]>([]);
  const [clienteId, setClienteId] = useState<number | null>(null);
  const [pedidoSelecionado, setPedidoSelecionado] = useState<Pedido | null>(null);
  const [novoPedido, setNovoPedido] = useState<ProdutoPedido[]>([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState<number | null>(null);
  const [quantidadeSelecionada, setQuantidadeSelecionada] = useState<number>(0);

  // Simulação de dados carregados
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

  const handleAdicionarProduto = () => {
    if (produtoSelecionado && quantidadeSelecionada > 0) {
      setNovoPedido((prev) => {
        const produtoExistente = prev.find((p) => p.id === produtoSelecionado);
        if (produtoExistente) {
          return prev.map((p) =>
            p.id === produtoSelecionado
              ? { ...p, quantidade: p.quantidade + quantidadeSelecionada }
              : p
          );
        }
        return [...prev, { id: produtoSelecionado, quantidade: quantidadeSelecionada }];
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
    <div>
      <h1>Gerenciamento de Pedidos</h1>
      {/* Formulário de Cadastro */}
      <div>
        <h2>Cadastrar Pedido</h2>
        <label>
          Cliente:
          <select
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
        </label>
        <div>
          <h3>Produtos</h3>
          <div>
            <label>
              Produto:
              <select
                value={produtoSelecionado ?? ''}
                onChange={(e) => setProdutoSelecionado(Number(e.target.value))}
              >
                <option value="" disabled>
                  Selecione um produto
                </option>
                {produtos.map((produto) => (
                  <option key={produto.id} value={produto.id}>
                    {produto.nome} - R$ {produto.preco}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Quantidade:
              <input
                type="number"
                min="1"
                value={quantidadeSelecionada}
                onChange={(e) => setQuantidadeSelecionada(Number(e.target.value))}
              />
            </label>
            <button onClick={handleAdicionarProduto}>Adicionar Produto</button>
          </div>
          <ul>
            {novoPedido.map((produto) => {
              const detalhes = produtos.find((p) => p.id === produto.id);
              return (
                <li key={produto.id}>
                  {detalhes?.nome} - {produto.quantidade} x R$ {detalhes?.preco} = R${' '}
                  {(produto.quantidade * (detalhes?.preco ?? 0)).toFixed(2)}{' '}
                  <button onClick={() => handleRemoverProduto(produto.id)}>Remover</button>
                </li>
              );
            })}
          </ul>
        </div>
        <button onClick={handleAdicionarPedido}>Adicionar Pedido</button>
      </div>

      {/* Listagem de Pedidos */}
      <div>
        <h2>Pedidos</h2>
        {pedidos.map((pedido) => (
          <div key={pedido.id}>
            <h3>Pedido #{pedido.id}</h3>
            <p>
              Cliente:{' '}
              {clientes.find((cliente) => cliente.id === pedido.clienteId)?.nome ?? 'Desconhecido'}
            </p>
            <p>Status: {pedido.status}</p>
            <p>Total: R$ {pedido.total.toFixed(2)}</p>
            <ul>
              {pedido.produtos.map((produto) => {
                const detalhes = produtos.find((p) => p.id === produto.id);
                return (
                  <li key={produto.id}>
                    {detalhes?.nome} - {produto.quantidade} x R$ {detalhes?.preco} = R${' '}
                    {(produto.quantidade * (detalhes?.preco ?? 0)).toFixed(2)}
                  </li>
                );
              })}
            </ul>
            <button onClick={() => handleEditarPedido(pedido)}>Editar</button>
            <button onClick={() => handleExcluirPedido(pedido.id)}>Excluir</button>
          </div>
        ))}
      </div>

      {/* Modal para edição de pedido */}
      {pedidoSelecionado && (
        <div>
          <h2>Editar Pedido #{pedidoSelecionado.id}</h2>
          <label>
            Status:
            <select
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
            </select>
          </label>
          <button onClick={handleAtualizarPedido}>Salvar Alterações</button>
          <button onClick={() => setPedidoSelecionado(null)}>Cancelar</button>
        </div>
      )}
    </div>
  );
};

export default PedidosPage;
