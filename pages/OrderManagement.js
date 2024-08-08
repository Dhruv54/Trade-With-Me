import axios from 'axios';
import useStore, { OrderState }from '../pages/store';

const MENTIONED_PRICE = 79988; // Your mentioned price
const TARGET_PRICE = 79400; // Your target price
const STOPLOSS_PRICE = 80200; // Your stop loss price

export const manageOrders = async () => {
  const fyeraccesstoken = localStorage.getItem('fyeraccesstoken');

  const currentPrice = useStore.getState().currentPrice;
  const orderState = useStore.getState().orderState;
  const setOrderDetails = useStore.getState().setOrderDetails;
  const setOrderState = useStore.getState().setOrderState;

  if (!currentPrice) return;

  if (orderState === OrderState.ORDER_PENDING && currentPrice < MENTIONED_PRICE) {
    // Place order
    try {
      const response = await fetch('/api/placeorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fyeraccesstoken)
      });

      if (response.ok) {
        console.log('Order Executed');
        setOrderState(OrderState.ORDER_PLACED);
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
  if (orderState === OrderState.ORDER_PLACED && orderDetails) {
    // Check for target or stop loss
    if (currentPrice <= TARGET_PRICE || currentPrice >= STOPLOSS_PRICE) {
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
  }
};
