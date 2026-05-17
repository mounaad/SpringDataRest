import React, { Component } from 'react';
import { Card, Form, Col, Row, Button } from 'react-bootstrap';
import axios from 'axios';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        axios.post("http://localhost:9090/auth/login", {
            username: this.state.username,
            password: this.state.password
        })
            .then(response => {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("username", this.state.username);
                window.location.href = "/";
            })
            .catch(error => {
                this.setState({ error: "Identifiants incorrects" });
            });
    }

    render() {
        const marginTop = { marginTop: "100px" };

        return (
            <div className="container" style={marginTop}>
                <Row className="justify-content-center">
                    <Col lg={5}>
                        <Card className="border border-dark bg-dark text-white">
                            <Card.Header className="text-center">
                                <h4>Connexion</h4>
                            </Card.Header>
                            <Form onSubmit={this.handleSubmit}>
                                <Card.Body>
                                    {this.state.error &&
                                        <div className="alert alert-danger">{this.state.error}</div>
                                    }
                                    <Form.Group className="mb-3">
                                        <Form.Label>Nom d'utilisateur</Form.Label>
                                        <Form.Control
                                            required
                                            name="username"
                                            type="text"
                                            className="bg-dark text-white"
                                            placeholder="Entrez votre nom d'utilisateur"
                                            value={this.state.username}
                                            onChange={this.handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Mot de passe</Form.Label>
                                        <Form.Control
                                            required
                                            name="password"
                                            type="password"
                                            className="bg-dark text-white"
                                            placeholder="Entrez votre mot de passe"
                                            value={this.state.password}
                                            onChange={this.handleChange}
                                        />
                                    </Form.Group>
                                </Card.Body>
                                <Card.Footer className="text-center">
                                    <Button variant="success" type="submit" className="me-2">
                                        Se connecter
                                    </Button>
                                    <Button variant="outline-light"
                                            onClick={() => window.location.href = "/register"}>
                                        Créer un compte
                                    </Button>
                                </Card.Footer>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}