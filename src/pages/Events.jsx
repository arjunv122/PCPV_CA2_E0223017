import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export default function Events() {
  const { state } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEvents = state.events?.filter(event =>
    event?.id?.toString().includes(searchTerm) ||
    event?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>Events</h1>
        <Link to="/events/filter" className="btn btn-primary">Filters</Link>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          className="input"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          data-testid="filter-input"
        />
      </div>

      {state.loading ? (
        <p>Loading events...</p>
      ) : state.error ? (
        <p>Error: {state.error}</p>
      ) : (
        <div className="grid">
          {filteredEvents.length > 0 ? (
            filteredEvents.map(event => (
              <Link
                key={event?.id}
                to={`/events/${event?.id}`}
                style={{ textDecoration: 'none' }}
              >
                <div className="card" data-testid="event-item">
                  <h3>{event?.id}</h3>
                  <p><strong>Name:</strong> {event?.name}</p>
                  <p><strong>Status:</strong> {event?.status}</p>
                </div>
              </Link>
            ))
          ) : (
            <p>No events found</p>
          )}
        </div>
      )}
    </div>
  );
}
