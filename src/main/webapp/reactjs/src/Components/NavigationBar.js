import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function NavigationBar() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        navigate("/login");
    };

    const username = localStorage.getItem("username");

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Link to="/" className="navbar-brand">Voiture Shop</Link>
                <Nav className="me-auto">
                    <Link to="/add" className="nav-link">Ajouter Voiture</Link>
                    <Link to="/list" className="nav-link">Liste Voitures</Link>
                    <Link to="/chatbot" className="nav-link">🤖 Assistant IA</Link> {/* ✅ ajouté */}
                </Nav>
                <Nav>
                    <span className="navbar-text text-white me-3">
                        👤 {username}
                    </span>
                    <Button variant="outline-light" size="sm" onClick={logout}>
                        Déconnexion
                    </Button>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;