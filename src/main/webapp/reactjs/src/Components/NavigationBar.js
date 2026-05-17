import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class NavigationBar extends React.Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Link to="/" className="navbar-brand">
                        Voiture Shop
                    </Link>
                    <Nav className="me-auto">
                        <Link to="/add" className="nav-link">
                            Ajouter Voiture
                        </Link>
                        <Link to="/list" className="nav-link">
                            Liste Voitures
                        </Link>
                    </Nav>
                </Container>
            </Navbar>
        );
    }
}

export default NavigationBar;