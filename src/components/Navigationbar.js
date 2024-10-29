import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navigationbar.css';

function Navigationbar(props) {
  const activeLink = {
    color: "orange",
    fontWeight: 'bold',
    fontSize: "110%",
    textDecoration: 'none',
  };

  const navigate = useNavigate();

  function Logout() {
    props.setCurrentUser("");
    navigate('/');
  }

  return (
    <header className="header-container">
      {/* Separate logo container aligned to the top-left */}
      <div className="logo-container">
        <a href="/">
          <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6iRcPIckSZO4ZStCeHLyOcaykFyBHPtmr9w&usqp=CAU" 
            alt="Brand Logo" 
            className="navbar-logo"
          />
        </a>
      </div>

      {/* Navbar aligned to the top-right */}
      <Navbar expand="lg" bg="dark" variant="dark" className="py-2 shadow-sm navbar-container">
        <Container fluid className="d-flex justify-content-end">
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="align-items-center">
              <NavLink to="/products" className="nav-link mx-3" style={activeLink}>
                Products
              </NavLink>
              <NavLink to="/bill" className="nav-link mx-3" style={activeLink}>
                Cart
              </NavLink>
              <NavLink to="/billpage" className="nav-link mx-3" style={activeLink}>
                Bill
              </NavLink>
              <Button variant="outline-danger" className="rounded-3 ms-3" onClick={Logout}>
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Navigationbar;
