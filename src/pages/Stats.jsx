import { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';

export default function Stats() {
  const { state } = useContext(AppContext);

  // Only count valid orders (with required fields)
  const validOrders = (state.orders || []).filter(order =>
    order?.orderId && order?.customerName && order?.restaurant && order?.status
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

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Valid Orders</h3>
          <div className="value" data-testid="total-orders">
            {totalOrders}
          </div>
        </div>
        <div className="stat-card">
          <h3>Delivered Orders</h3>
          <div className="value" data-testid="delivered-orders">
            {deliveredOrders}
          </div>
        </div>
        <div className="stat-card">
          <h3>Cancelled Orders</h3>
          <div className="value" data-testid="cancelled-orders">
            {cancelledOrders}
          </div>
        </div>
      </div>

      {state.loading && <p>Loading statistics...</p>}
      {state.error && <p style={{ color: 'red' }}>Error: {state.error}</p>}
    </div>
  );
}
