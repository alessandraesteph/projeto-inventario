import { ProdutoPedido } from './pedidoproduto';

export interface Pedido {
    id: number;
    clienteId: number; // Referência ao ID do cliente
    produtos: ProdutoPedido[]; // Produtos no pedido
    status: string; // Status do pedido (ex.: "Pendente", "Concluído")
    total: number; // Valor total do pedido
  }