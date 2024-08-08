import { create } from 'zustand';

// Enum for order states
export const OrderState = {
  ORDER_PENDING: 'ORDER_PENDING',
  ORDER_PLACED: 'ORDER_PLACED',
  ORDER_EXIT: 'ORDER_EXIT',
};

const useStore = create((set) => ({
  currentPrice: null,
  orderDetails: null,
  orderState: OrderState.ORDER_PENDING,
  setCurrentPrice: (price) => set({ currentPrice: price }),
  setOrderDetails: (details) => set({ orderDetails: details }),
  setOrderState: (state) => set({ orderState: state }),
}));

export default useStore;
