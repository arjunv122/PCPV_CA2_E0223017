import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export default function EventFilter() {
  const { state } = useContext(AppContext);
  const [filters, setFilters] = useState({
    status: '',
    name: '',
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredEvents = (state.events || []).filter(event => {
    if (filters.status && event?.status !== filters.status) return false;
    if (filters.name && !event?.name?.toLowerCase().includes(filters.name.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <h1>Filter Events</h1>
      <Link to="/events" className="btn btn-primary" style={{ marginBottom: '20px' }}>Back to Events</Link>

      <div className="card" style={{ marginBottom: '20px' }}>
        <h3>Filters</h3>
        <div style={{ marginBottom: '15px' }}>
          <label>Status:</label>
          <input
            type="text"
            name="status"
            className="input"
            value={filters.status}
            onChange={handleFilterChange}
            placeholder="e.g., active"
            data-testid="filter-input"
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            className="input"
            value={filters.name}
            onChange={handleFilterChange}
            placeholder="Event name"
            data-testid="filter-input"
          />
        </div>
      </div>

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
          <p>No events match the filters</p>
        )}
      </div>
    </div>
  );
}
