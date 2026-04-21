import { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export default function ActivityDetail() {
  const { id } = useParams();
  const { state } = useContext(AppContext);

  const activity = state.activities?.find(a => a?.id === parseInt(id));

  if (state.loading) {
    return <div><p>Loading...</p></div>;
  }

  if (!activity) {
    return (
      <div>
        <p>Activity not found</p>
        <Link to="/activities" className="btn btn-primary">Back to Activities</Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/activities" className="btn btn-primary" style={{ marginBottom: '20px' }}>Back</Link>
      <div className="card">
        <h1>Activity Details</h1>
        <p><strong>ID:</strong> {activity.id}</p>
        <p><strong>Name:</strong> {activity.name}</p>
        <p><strong>Status:</strong> {activity.status}</p>
      </div>
    </div>
  );
}
