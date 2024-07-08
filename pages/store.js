import { create } from 'zustand';

// Enum for order states
export const OrderState = {
  ORDER_PENDING: 'ORDER_PENDING',
  ORDER_PLACED: 'ORDER_PLACED',
  ORDER_EXIT: 'ORDER_EXIT',
};

// Enum for Trade states
export const TradeState = {
  TRADE_CALL_SIDE: 'CALL',
  TRADE_PUT_SIDE: 'PUT',
  TRADE_NONE_SIDE: 'NONE',
};

const useStore = create((set) => ({
  currentPrice: null,
  previousDayLowPrice: null,
  previousDayHighPrice: null,
  target: null,
  stoploss: null,
  orderDetails: null,
  orderState: OrderState.ORDER_PENDING,
  tradeState: TradeState.TRADE_NONE_SIDE,
  setCurrentPrice: (price) => set({ currentPrice: price }),
  setOrderDetails: (details) => set({ orderDetails: details }),
  setOrderState: (state) => set({ orderState: state }),
  setTradeState: (state) => set({ tradeState: state }),
}));

export default useStore;
