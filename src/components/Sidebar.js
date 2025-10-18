import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaTachometerAlt, FaVideo, FaLayerGroup, FaUsers, 
  FaCreditCard, FaSignOutAlt, FaImages
} from 'react-icons/fa';
import { toast } from 'react-toastify';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    window.location.href = '/login';
  };

  const menuItems = [
    { path: '/dashboard', name: 'Dashboard', icon: <FaTachometerAlt /> },
    { path: '/templates', name: 'Templates', icon: <FaVideo /> },
    { path: '/categories', name: 'Categories', icon: <FaLayerGroup /> },
    { path: '/users', name: 'Users', icon: <FaUsers /> },
    { path: '/subscriptions', name: 'Subscriptions', icon: <FaCreditCard /> }
  ];

  return (
    <>
      <div className={`sidebar ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <div className="sidebar-header">
          <div className="d-flex align-items-center">
            <div className="logo-icon">
              <FaImages />
            </div>
            {isOpen && (
              <div className="ms-3">
                <h5 className="mb-0 text-white">Crafto Admin</h5>
                <small className="text-light opacity-75">Management Panel</small>
              </div>
            )}
          </div>
        </div>

        <Nav className="flex-column sidebar-nav">
          {menuItems.map((item) => (
            <Nav.Item key={item.path}>
              <Nav.Link
                as={Link}
                to={item.path}
                className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                <span className="nav-icon">{item.icon}</span>
                {isOpen && <span className="nav-text">{item.name}</span>}
              </Nav.Link>
            </Nav.Item>
          ))}

          <hr style={{borderColor: 'rgba(255,255,255,0.1)', margin: '1rem'}} />

          <Nav.Item>
            <Nav.Link
              href="#"
              onClick={handleLogout}
              className="sidebar-link text-danger"
            >
              <span className="nav-icon"><FaSignOutAlt /></span>
              {isOpen && <span className="nav-text">Logout</span>}
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>

      {isOpen && <div className="sidebar-overlay d-lg-none" onClick={toggleSidebar} />}
    </>
  );
};

export default Sidebar;