import React from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import { FaBars, FaBell, FaUser, FaSearch } from 'react-icons/fa';

const TopNavbar = ({ toggleSidebar }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <Navbar className="top-navbar shadow-sm px-3">
      <div className="d-flex align-items-center">
        <button 
          className="btn btn-link text-dark p-0 me-3"
          onClick={toggleSidebar}
        >
          <FaBars size={20} />
        </button>

        <div className="search-bar d-none d-md-block">
          <div className="input-group">
            <span className="input-group-text bg-transparent border-end-0">
              <FaSearch className="text-muted" />
            </span>
            <input 
              type="text" 
              className="form-control border-start-0" 
              placeholder="Search..."
            />
          </div>
        </div>
      </div>

      <Nav className="ms-auto d-flex align-items-center">
        <Nav.Item className="me-3">
          <FaBell className="text-muted" size={20} />
        </Nav.Item>

        <Dropdown>
          <Dropdown.Toggle variant="link" className="d-flex align-items-center text-decoration-none text-dark p-0">
            <div className="user-avatar me-2">
              <FaUser className="text-muted" />
            </div>
            <div className="d-none d-md-block text-start">
              <div className="fw-semibold" style={{fontSize: '0.9rem'}}>
                {user.name || 'Admin User'}
              </div>
              <div className="text-muted" style={{fontSize: '0.8rem'}}>
                {user.role || 'Administrator'}
              </div>
            </div>
          </Dropdown.Toggle>

          <Dropdown.Menu align="end">
            <Dropdown.Item>Profile</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={() => {
              localStorage.clear();
              window.location.href = '/login';
            }}>
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav>
    </Navbar>
  );
};

export default TopNavbar;