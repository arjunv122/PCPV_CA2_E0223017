import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export default function FilterOrders() {
  const { state } = useContext(AppContext);
  const [restaurantFilter, setRestaurantFilter] = useState('');
  const [error, setError] = useState('');

 
  const filteredOrders = (state.orders || []).filter(order => {
   
    if (!order?.orderId || !order?.customerName || !order?.restaurant || !order?.status) {
      return false;
    }

    if (!restaurantFilter) {
      return true;
    }

    return order?.restaurant
      ?.toLowerCase()
      .includes(restaurantFilter.toLowerCase());
  });

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setRestaurantFilter(value);

    // Validation logic
    if (value && filteredOrders.length === 0) {
      setError('No results found');
    } else if (!value) {
      setError('');
    } else {
      setError('');
    }
  };

  return (
    <div>
      <h1>Filter Orders</h1>
      <Link to="/order" className="btn btn-primary" style={{ marginBottom: '20px' }}>Back to Orders</Link>

      <div className="card" style={{ marginBottom: '20px' }}>
        <h3>Filter by Restaurant</h3>
        <div style={{ marginBottom: '15px' }}>
          <label>Restaurant Name (case-insensitive):</label>
          <input
            type="text"
            className="input"
            value={restaurantFilter}
            onChange={handleFilterChange}
            placeholder="Enter restaurant name..."
            data-testid="filter-input"
          />
          {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        </div>
      </div>

      <div className="grid">
        {filteredOrders.length > 0 ? (
          filteredOrders.map(order => (
            <Link
              key={order?.orderId}
              to={`/order/${order?.orderId}`}
              style={{ textDecoration: 'none' }}
            >
              <div className="card" data-testid="order-item">
                <h3>Order #{order?.orderId}</h3>
                <p><strong>Customer:</strong> {order?.customerName}</p>
                <p><strong>Restaurant:</strong> {order?.restaurant}</p>
                <p><strong>Total:</strong> ${order?.totalAmount}</p>
                <p><strong>Status:</strong> {order?.status}</p>
              </div>
            </Link>
          ))
        ) : restaurantFilter ? (
          <p>No results found</p>
        ) : (
          <p>No orders found</p>
        )}
      </div>
    </div>
  );
}
