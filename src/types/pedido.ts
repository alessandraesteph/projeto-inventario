import { ProdutoPedido } from './pedidoproduto';

export interface Pedido {
    id: number;
    clienteId: number; 
    produtos: ProdutoPedido[]; 
    status: string; 
    total: number; 
  }