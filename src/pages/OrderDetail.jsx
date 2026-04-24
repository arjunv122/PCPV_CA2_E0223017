import { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export default function OrderDetail() {
  const { id } = useParams();
  const { state, dispatch } = useContext(AppContext);

  
  const orderId = parseInt(id);
  if (isNaN(orderId)) {
    return (
      <div>
        <p style={{ color: 'red' }}>Order not found</p>
        <Link to="/order" className="btn btn-primary">Back to Orders</Link>
      </div>
    );
  }

  const order = state.orders?.find(o => o?.orderId === orderId || parseInt(o?.orderId) === orderId);

  if (state.loading) {
    return <div><p>Loading...</p></div>;
  }

  if (!order) {
    return (
      <div>
        <p style={{ color: 'red' }}>Order not found</p>
        <Link to="/order" className="btn btn-primary">Back to Orders</Link>
      </div>
    );
  }

  
  const subtotal = (order.items || []).reduce((sum, item) => {
    return sum + (item?.price * item?.quantity || 0);
  }, 0);

  const handleMarkDelivered = () => {
    dispatch({
      type: 'UPDATE_ORDER_STATUS',
      payload: {
        orderId: order.orderId,
        status: 'Delivered',
      },
    });
  };

  return (
    <div>
      <Link to="/order" className="btn btn-primary" style={{ marginBottom: '20px' }}>Back to Orders</Link>
      <div className="card">
        <h1>Order #{order.orderId}</h1>
        
        <h3>Order Details</h3>
        <p><strong>Customer:</strong> {order.customerName}</p>
        <p><strong>Restaurant:</strong> {order.restaurant}</p>
        <p><strong>Delivery Time:</strong> {order.deliveryTime} mins</p>
        <p><strong>Rating:</strong> {order.rating || 'N/A'} ⭐</p>
        
        <h3>Items</h3>
        <table style={{ width: '100%', marginBottom: '20px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #ddd' }}>
              <th style={{ textAlign: 'left', padding: '10px' }}>Item</th>
              <th style={{ textAlign: 'center', padding: '10px' }}>Price</th>
              <th style={{ textAlign: 'center', padding: '10px' }}>Qty</th>
              <th style={{ textAlign: 'right', padding: '10px' }}>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {(order.items || []).map((item, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '10px' }}>{item?.name}</td>
                <td style={{ textAlign: 'center', padding: '10px' }}>${item?.price}</td>
                <td style={{ textAlign: 'center', padding: '10px' }}>{item?.quantity}</td>
                <td style={{ textAlign: 'right', padding: '10px' }}>${item?.price * item?.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <h3>Total Amount: ${order.totalAmount}</h3>
        <p><strong>Status:</strong> {order.status}</p>

        {order.status !== 'Delivered' && (
          <button 
            onClick={handleMarkDelivered}
            className="btn btn-primary"
            style={{ marginTop: '20px' }}
          >
            Mark as Delivered
          </button>
        )}
      </div>
    </div>
  );
}
