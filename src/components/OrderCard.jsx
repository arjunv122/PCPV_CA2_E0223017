export default function OrderCard({ order }) {
  return (
    <div className="card" data-testid="order-item">
      <h3>{order?.id || 'N/A'}</h3>
      <p><strong>Status:</strong> {order?.status || 'N/A'}</p>
      <p><strong>Amount:</strong> ${order?.amount || 0}</p>
      <p><strong>Date:</strong> {order?.date || 'N/A'}</p>
    </div>
  );
}
