import React, { Component } from 'react';
import { Card, Form, Col, Row, Button } from 'react-bootstrap';
import axios from '../axiosConfig';

export default class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            confirm: '',
            error: '',
            success: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.state.password !== this.state.confirm) {
            this.setState({ error: "Les mots de passe ne correspondent pas" });
            return;
        }

        axios.post("http://localhost:9090/auth/register", {
            username: this.state.username,
            password: this.state.password
        })
            .then(() => {
                this.setState({ success: "Compte créé avec succès !" });
                setTimeout(() => window.location.href = "/login", 2000);
            })
            .catch(() => {
                this.setState({ error: "Erreur lors de la création du compte" });
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
                                <h4>Créer un compte</h4>
                            </Card.Header>
                            <Form onSubmit={this.handleSubmit}>
                                <Card.Body>
                                    {this.state.error &&
                                        <div className="alert alert-danger">{this.state.error}</div>
                                    }
                                    {this.state.success &&
                                        <div className="alert alert-success">{this.state.success}</div>
                                    }
                                    <Form.Group className="mb-3">
                                        <Form.Label>Nom d'utilisateur</Form.Label>
                                        <Form.Control
                                            required
                                            name="username"
                                            type="text"
                                            className="bg-dark text-white"
                                            placeholder="Choisissez un nom d'utilisateur"
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
                                            placeholder="Choisissez un mot de passe"
                                            value={this.state.password}
                                            onChange={this.handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Confirmer le mot de passe</Form.Label>
                                        <Form.Control
                                            required
                                            name="confirm"
                                            type="password"
                                            className="bg-dark text-white"
                                            placeholder="Confirmez votre mot de passe"
                                            value={this.state.confirm}
                                            onChange={this.handleChange}
                                        />
                                    </Form.Group>
                                </Card.Body>
                                <Card.Footer className="text-center">
                                    <Button variant="success" type="submit" className="me-2">
                                        S'inscrire
                                    </Button>
                                    <Button variant="outline-light"
                                            onClick={() => window.location.href = "/login"}>
                                        Déjà un compte ?
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