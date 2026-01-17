
import { create } from 'zustand';
import { Order } from '../types/order';

interface OrderStore {
  orders: Order[];
  addOrder: (order: Order) => void;
  approveOrder: (orderId: string) => void;
  rejectOrder: (orderId: string) => void;
}

export const useOrders = create<OrderStore>((set) => ({
  orders: [],
  
  addOrder: (order) => {
    set(state => ({
      orders: [...state.orders, order]
    }));
  },
  
  approveOrder: (orderId) => {
    set(state => ({
      orders: state.orders.map(order =>
        order.id === orderId 
          ? { ...order, status: 'confirmed' }
          : order
      )
    }));
  },
  
  rejectOrder: (orderId) => {
    set(state => ({
      orders: state.orders.map(order =>
        order.id === orderId 
          ? { ...order, status: 'rejected' }
          : order
      )
    }));
  },
}));