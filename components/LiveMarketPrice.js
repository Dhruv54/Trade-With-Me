import { useEffect } from 'react';
import axios from 'axios';
import useStore from '../pages/store';
import { manageOrders } from '../pages/OrderManagement';

const LiveMarket = () => {
  const setCurrentPrice = useStore((state) => state.setCurrentPrice);

  useEffect(() => {
    const fetchLivePrice = async () => {
      const fyeraccesstoken = localStorage.getItem('fyeraccesstoken');
      try {
        const response = await fetch('/api/marketstatus', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(fyeraccesstoken)
        });

        if (response.ok) {
          const data = await response.json();
          let currentPrice = 0;
          if (data.market_status) {
            if (data.market_status.candles.length > 0) {
              currentPrice = data.market_status.candles[data.market_status.candles.length - 1][4]; // Assuming the closing price is at index 4
              setCurrentPrice(currentPrice);
              console.log(currentPrice)
              await manageOrders();
            }
          }
        }
        else {
          console.error('Fetch market live price status failed:', response.statusText);
        }
      }
      catch (error) {
        console.error('Error during fetch market live price status:', error);
      }
    };
    const intervalId = setInterval(fetchLivePrice, 5000);
    return () => clearInterval(intervalId);
  }, [setCurrentPrice]);

  return <div>Fetching live market price SENSEX : {useStore.getState().currentPrice}</div>;
};

export default LiveMarket;
