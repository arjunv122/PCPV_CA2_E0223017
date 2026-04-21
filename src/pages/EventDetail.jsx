import { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export default function EventDetail() {
  const { id } = useParams();
  const { state } = useContext(AppContext);

  const event = state.events?.find(e => e?.id === parseInt(id));

  if (state.loading) {
    return <div><p>Loading...</p></div>;
  }

  if (!event) {
    return (
      <div>
        <p>Event not found</p>
        <Link to="/events" className="btn btn-primary">Back to Events</Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/events" className="btn btn-primary" style={{ marginBottom: '20px' }}>Back</Link>
      <div className="card">
        <h1>Event Details</h1>
        <p><strong>ID:</strong> {event.id}</p>
        <p><strong>Name:</strong> {event.name}</p>
        <p><strong>Status:</strong> {event.status}</p>
      </div>
    </div>
  );
}
