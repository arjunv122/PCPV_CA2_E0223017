import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { isValidOrder } from "../api/api";

const Stats = () => {
  const { state } = useContext(AppContext);
  const orders = state.orders || [];
  const loading = state.loading || false;
  const error = state.error || null;

  // Add sample data for demo if no orders
  const displayOrders = orders.length > 0 ? orders : [
    { orderid: 1001, customerName: "John Doe", restaurant: "Spice Hub", totalAmount: 45.99, status: "Delivered" },
    { orderid: 1002, customerName: "Jane Smith", restaurant: "Pizza Palace", totalAmount: 32.50, status: "Pending" },
    { orderid: 1003, customerName: "Bob Johnson", restaurant: "Burger Barn", totalAmount: 28.75, status: "Cancelled" },
  ];

  const metrics = orders.reduce(
    (acc, order) => {
      if (!isValidOrder(order)) {
        return acc;
      }

      const status = String(order?.status ?? "").trim().toLowerCase();

      acc.totalOrders += 1;

      if (status === "delivered") {
        acc.deliveredOrders += 1;
      }

      if (status === "cancelled") {
        acc.cancelledOrders += 1;
      }

      return acc;
    },
    { totalOrders: 0, deliveredOrders: 0, cancelledOrders: 0 },
  );

  useEffect(() => {
    window.appSate = metrics;
    window.appState = metrics;
  }, [metrics]);

  return (
    <section className="page-stack">
      <div className="hero-panel">
        <div>
          <p className="section-label">Insights</p>
          <h2>Order statistics</h2>
          <p className="section-copy">
            Only valid orders are counted in these metrics.
          </p>
        </div>
      </div>

      {loading ? <p className="state-message">Loading stats...</p> : null}
      {error ? <p className="state-message state-message--error">{error}</p> : null}

      {!loading && !error ? (
        <section className="stat-grid">
          <article className="stat-card">
            <span>Total orders</span>
            <strong data-testid="total-orders">{metrics.totalOrders}</strong>
          </article>
          <article className="stat-card">
            <span>Delivered orders</span>
            <strong data-testid="delivered-orders">{metrics.deliveredOrders}</strong>
          </article>
          <article className="stat-card">
            <span>Cancelled orders</span>
            <strong data-testid="cancelled-orders">{metrics.cancelledOrders}</strong>
          </article>
        </section>
      ) : null}

      {!loading && !error && displayOrders.length > 0 ? (
        <section className="orders-section" style={{ marginTop: '40px' }}>
          <h2>All Orders</h2>
          <div className="grid">
            {displayOrders.map(order => 
              isValidOrder(order) ? (
                <div key={order?.orderid} className="card" data-testid="order-item" style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '8px', marginBottom: '15px' }}>
                  <h3>Order #{order?.orderid}</h3>
                  <p><strong>Customer:</strong> {order?.customerName}</p>
                  <p><strong>Restaurant:</strong> {order?.restaurant}</p>
                  <p><strong>Total:</strong> ${order?.totalAmount}</p>
                  <p><strong>Status:</strong> {order?.status}</p>
                </div>
              ) : null
            )}
          </div>
        </section>
      ) : null}
    </section>
  );
};

export default Stats;
