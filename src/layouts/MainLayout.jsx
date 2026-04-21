import Navbar from '../components/Navbar';

export default function MainLayout({ children }) {
  return (
    <div className="main-layout">
      <Navbar />
      <div className="layout-content">
        <div className="container">{children}</div>
      </div>
    </div>
  );
}
