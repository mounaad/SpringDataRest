import React from 'react';
import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './Components/NavigationBar';
import Bienvenue from './Components/Bienvenue';
import Voiture from './Components/Voiture';
import VoitureList from './Components/VoitureList';
import Footer from './Components/Footer';

function App() {
    const marginTop = { marginTop: "20px" };

    return (
        <Router>
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
        </Router>
    );
}

export default App;