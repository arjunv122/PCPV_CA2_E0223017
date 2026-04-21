import { Link } from 'react-router-dom';
import '../App.css';

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/order">Orders</Link>
        </li>
        <li>
          <Link to="/filter">Filter</Link>
        </li>
        <li>
          <Link to="/stats">Stats</Link>
        </li>
      </ul>
    </nav>
  );
}
