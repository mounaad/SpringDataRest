import React from 'react';
import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavigationBar from './Components/NavigationBar';
import Bienvenue from './Components/Bienvenue';
import Voiture from './Components/Voiture';
import VoitureList from './Components/VoitureList';
import Footer from './Components/Footer';
import Login from './Components/Login';
import Register from './Components/Register';

// Protection des routes
const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/login" />;
};

function App() {
    const marginTop = { marginTop: "20px" };

    return (
        <Router>
            <Routes>
                {/* Routes publiques */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Routes protégées */}
                <Route path="/*" element={
                    <PrivateRoute>
                        <div className="App">
                            <NavigationBar />
                            <Container>
                                <Row>
                                    <Col lg={12} style={marginTop}>
                                        <Routes>
                                            <Route path="/" element={<Bienvenue />} />
                                            <Route path="/add" element={<Voiture />} />
                                            <Route path="/edit/:id" element={<Voiture />} />
                                            <Route path="/list" element={<VoitureList />} />
                                        </Routes>
                                    </Col>
                                </Row>
                            </Container>
                            <Footer />
                        </div>
                    </PrivateRoute>
                } />
            </Routes>
        </Router>
    );
}

export default App;