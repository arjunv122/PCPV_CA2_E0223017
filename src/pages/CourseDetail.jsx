import { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export default function CourseDetail() {
  const { id } = useParams();
  const { state } = useContext(AppContext);

  const course = state.courses?.find(c => c?.id === parseInt(id));

  if (state.loading) {
    return <div><p>Loading...</p></div>;
  }

  if (!course) {
    return (
      <div>
        <p>Course not found</p>
        <Link to="/courses" className="btn btn-primary">Back to Courses</Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/courses" className="btn btn-primary" style={{ marginBottom: '20px' }}>Back</Link>
      <div className="card">
        <h1>Course Details</h1>
        <p><strong>ID:</strong> {course.id}</p>
        <p><strong>Title:</strong> {course.title}</p>
        <p><strong>Status:</strong> {course.status}</p>
      </div>
    </div>
  );
}
