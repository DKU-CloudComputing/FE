import React from 'react';
import AuthUser from '../service/AuthUser';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';

function Navi() {
  const logOut = () => {
    AuthUser.removeUserSessionId();
    window.location.reload();
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
      <Container>
        <Navbar.Brand href="/">Imaginairy</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/dashboard">Dashboard</NavDropdown.Item>
              <NavDropdown.Item href="/profile">Edit Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logOut}>Sign Out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navi;
