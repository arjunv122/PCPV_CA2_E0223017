import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export default function Courses() {
  const { state } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCourses = state.courses?.filter(course =>
    course?.id?.toString().includes(searchTerm) ||
    course?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>Courses</h1>
        <Link to="/courses/filter" className="btn btn-primary">Filters</Link>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          className="input"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          data-testid="filter-input"
        />
      </div>

      {state.loading ? (
        <p>Loading courses...</p>
      ) : state.error ? (
        <p>Error: {state.error}</p>
      ) : (
        <div className="grid">
          {filteredCourses.length > 0 ? (
            filteredCourses.map(course => (
              <Link
                key={course?.id}
                to={`/courses/${course?.id}`}
                style={{ textDecoration: 'none' }}
              >
                <div className="card" data-testid="course-item">
                  <h3>{course?.id}</h3>
                  <p><strong>Title:</strong> {course?.title}</p>
                  <p><strong>Status:</strong> {course?.status}</p>
                </div>
              </Link>
            ))
          ) : (
            <p>No courses found</p>
          )}
        </div>
      )}
    </div>
  );
}
