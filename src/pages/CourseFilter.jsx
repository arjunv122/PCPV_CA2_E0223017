import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export default function CourseFilter() {
  const { state } = useContext(AppContext);
  const [filters, setFilters] = useState({
    status: '',
    title: '',
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredCourses = (state.courses || []).filter(course => {
    if (filters.status && course?.status !== filters.status) return false;
    if (filters.title && !course?.title?.toLowerCase().includes(filters.title.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <h1>Filter Courses</h1>
      <Link to="/courses" className="btn btn-primary" style={{ marginBottom: '20px' }}>Back to Courses</Link>

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
          <label>Title:</label>
          <input
            type="text"
            name="title"
            className="input"
            value={filters.title}
            onChange={handleFilterChange}
            placeholder="Course title"
            data-testid="filter-input"
          />
        </div>
      </div>

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
          <p>No courses match the filters</p>
        )}
      </div>
    </div>
  );
}
