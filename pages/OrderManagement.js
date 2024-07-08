import useStore, { OrderState, TradeState } from '../pages/store';

const MENTIONED_PRICE = 79988; // Your mentioned price
const TARGET_PRICE = 79400; // Your target price
const STOPLOSS_PRICE = 80200; // Your stop loss price

export const manageOrders = async () => {
  const fyeraccesstoken = localStorage.getItem('fyeraccesstoken');

  const currentPrice = useStore.getState().currentPrice;
  const previousDayLowPrice = useStore.getState().previousDayLowPrice;
  const previousDayHighPrice = useStore.getState().previousDayHighPrice;
  const orderState = useStore.getState().orderState;

  const setOrderDetails = useStore.getState().setOrderDetails;
  const setOrderState = useStore.getState().setOrderState;
  const setTradeState = useStore.getState().setTradeState;

  if (!currentPrice) return;
  if (!previousDayLowPrice) return;
  if (!previousDayHighPrice) return;

  if (orderState === OrderState.ORDER_PENDING && currentPrice < previousDayLowPrice) {
    // PUT Side Trade plan Place order
    try {
      const response = await fetch('/api/placeorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fyeraccesstoken)
      });

      if (response.ok) {
        console.log('Order Executed');
        setOrderState(OrderState.ORDER_PLACED);
        setTradeState(TradeState.TRADE_PUT_SIDE);
      }
      else {
        console.error('Order failed:', response.statusText);
      }
      setOrderDetails(response);
    }
    catch (error) {
      console.error('Error during placing Order', error);
    }
  }
  else if (orderState === OrderState.ORDER_PENDING && currentPrice > previousDayHighPrice) {
    // CALL Side Trade plan Place order
    try {
      const response = await fetch('/api/placeorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fyeraccesstoken)
      });

      if (response.ok) {
        console.log('Order Executed');
        setOrderState(OrderState.ORDER_PLACED);
        setTradeState(TradeState.TRADE_CALL_SIDE);
      }
      else {
        console.error('Order failed:', response.statusText);
      }
      setOrderDetails(response);
    }
    catch (error) {
      console.error('Error during placing Order', error);
    }
  }

  const orderDetails = useStore.getState().orderDetails;
  const tradeState = useStore.getState().tradeState;
  if (orderState === OrderState.ORDER_PLACED && orderDetails) {

    const target = useStore.getState().target;
    const stoploss = useStore.getState().stoploss;

    if (tradeState === TradeState.TRADE_PUT_SIDE && (currentPrice <= target || currentPrice >= stoploss)) {
      // Exit order
      try {
        const response = await fetch('/api/exitorder', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(fyeraccesstoken)
        });
        if (response.ok) {
          console.log('Exit Order');
          setOrderState(OrderState.ORDER_EXIT);
        } else {
          console.error('Exit Order:', response.statusText);
        }
        setOrderDetails(null);
      } catch (error) {
        console.error('Error during Exiting Order', error);
      }
    }
    else if (tradeState === TradeState.TRADE_CALL_SIDE && (currentPrice >= target || currentPrice <= stoploss)) {
      // Exit order
      try {
        const response = await fetch('/api/exitorder', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(fyeraccesstoken)
        });
        if (response.ok) {
          console.log('Exit Order');
          setOrderState(OrderState.ORDER_EXIT);
        } else {
          console.error('Exit Order:', response.statusText);
        }
        setOrderDetails(null);
      } catch (error) {
        console.error('Error during Exiting Order', error);
      }
    }
  }

  // Reset to pending if order is exited
  if (orderState === OrderState.ORDER_EXIT) {
    setOrderState(OrderState.ORDER_PENDING);
    setTradeState(TradeState.TRADE_NONE_SIDE);
  }
};
