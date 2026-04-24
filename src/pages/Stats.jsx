import { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';

export default function Stats() {
  const { state } = useContext(AppContext);

  // Only count valid orders (with required fields)
  const validOrders = (state.orders || []).filter(order =>
    order?.orderid && order?.customerName && order?.restaurant && order?.status
  );

  // Calculate stats using reduce
  const totalOrders = validOrders.length;

  const deliveredOrders = validOrders.reduce((count, order) => {
    return order?.status?.toLowerCase() === 'delivered' ? count + 1 : count;
  }, 0);

  const cancelledOrders = validOrders.reduce((count, order) => {
    return order?.status?.toLowerCase() === 'cancelled' ? count + 1 : count;
  }, 0);

  useEffect(() => {
    // Expose global state for testing
    window.appState = {
      totalOrders,
      deliveredOrders,
      cancelledOrders,
    };
  }, [totalOrders, deliveredOrders, cancelledOrders]);

  return (
    <div>
      <h1>Orders Analytics Dashboard</h1>

      <div className="stats-summary" style={{ marginBottom: '30px' }}>
        <h2>Statistics</h2>
        <p data-testid="total-orders"><strong>Total Orders:</strong> {totalOrders}</p>
        <p data-testid="delivered-orders"><strong>Delivered Orders:</strong> {deliveredOrders}</p>
        <p data-testid="cancelled-orders"><strong>Cancelled Orders:</strong> {cancelledOrders}</p>
      </div>

      <div className="orders-list">
        <h2>All Orders</h2>
        {validOrders.length > 0 ? (
          <div className="grid">
            {validOrders.map(order => (
              <div key={order?.orderid} className="card" data-testid="order-item">
                <h3>Order #{order?.orderid}</h3>
                <p><strong>Customer:</strong> {order?.customerName}</p>
                <p><strong>Restaurant:</strong> {order?.restaurant}</p>
                <p><strong>Total:</strong> ${order?.totalAmount}</p>
                <p><strong>Status:</strong> {order?.status}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No orders found</p>
        )}
      </div>

      {state.loading && <p>Loading statistics...</p>}
      {state.error && <p style={{ color: 'red' }}>Error: {state.error}</p>}
    </div>
  );
}
