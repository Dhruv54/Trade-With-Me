import useStore from '../pages/store';

const OrderDetails = () => {
  const orderDetails = useStore((state) => state.orderDetails);

  if (!orderDetails) return <div>No order placed yet</div>;

  return (
    <div>
      <h3>Order Details</h3>
      <pre>{JSON.stringify(orderDetails, null, 2)}</pre>
    </div>
  );
};

export default OrderDetails;
