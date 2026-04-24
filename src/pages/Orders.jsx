import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export default function Orders() {
  const { state } = useContext(AppContext);

  // Filter out invalid orders (must have required fields)
  const validOrders = (state.orders || []).filter(order =>
    order?.orderId && order?.customerName && order?.restaurant && order?.status
  );

  return (
    <div>
      <h1>Food Delivery Orders</h1>

      {state.loading ? (
        <p>Loading orders...</p>
      ) : state.error ? (
        <p style={{ color: 'red' }}>Error: {state.error}</p>
      ) : (
        <div className="grid">
          {validOrders.length > 0 ? (
            validOrders.map(order => (
              <Link
                key={order?.orderId}
                to={`/order/${order?.orderId}`}
                style={{ textDecoration: 'none' }}
              >
                <div className="card">
                  <h3>Order #{order?.orderId}</h3>
                  <p><strong>Customer:</strong> {order?.customerName}</p>
                  <p><strong>Restaurant:</strong> {order?.restaurant}</p>
                  <p><strong>Total:</strong> ${order?.totalAmount}</p>
                  <p><strong>Status:</strong> <span style={{ 
                    color: order?.status === 'Delivered' ? 'green' : 
                           order?.status === 'Cancelled' ? 'red' : 'orange'
                  }}>{order?.status}</span></p>
                  <p><strong>Rating:</strong> {order?.rating || 'N/A'} ⭐</p>
                </div>
              </Link>
            ))
          ) : (
            <p>No orders found</p>
          )}
        </div>
      )}
    </div>
  );
}
