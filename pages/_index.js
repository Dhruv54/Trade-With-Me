import React from 'react'
import LiveMarket from '../components/LiveMarketPrice';
import OrderDetails from '../components/OrderDetails';

const Mainpage = () => {
  return (
    <div>
      <LiveMarket/>
      <OrderDetails/>
    </div>
  );
};

export default Mainpage;
