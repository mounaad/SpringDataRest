import React, { Component } from 'react';
import { Card, Form, Col, Row, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MyToast from './MyToast';

// Wrapper pour injecter useParams dans un composant classe
function VoitureWrapper(props) {
    const params = useParams();
    return <Voiture {...props} params={params} />;
}

class Voiture extends Component {

    constructor(props) {
        super(props);
        this.state = {
            marque: '',
            modele: '',
            couleur: '',
            annee: '',
            prix: '',
            show: false,
            toastMessage: '',
            toastColor: 'success'
        };
        this.voitureChange = this.voitureChange.bind(this);
        this.submitVoiture = this.submitVoiture.bind(this);
    }

    componentDidMount() {
        const voitureId = this.props.params?.id;
        if (voitureId) {
            axios.get("http://localhost:9090/voitures/" + voitureId)
                .then(response => {
                    const v = response.data;
                    this.setState({
                        marque: v.marque,
                        modele: v.modele,
                        couleur: v.couleur,
                        annee: v.annee,
                        prix: v.prix
                    });
                })
                .catch(error => console.log("Erreur chargement : " + error));
        }
    }

    voitureChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    submitVoiture(event) {
        event.preventDefault();
        const voiture = {
            marque: this.state.marque,
            modele: this.state.modele,
            couleur: this.state.couleur,
            annee: this.state.annee,
            prix: this.state.prix
        };

        const voitureId = this.props.params?.id;

        if (voitureId) {
            axios.put("http://localhost:9090/voitures/" + voitureId, voiture)
                .then(response => {
                    if (response.data != null) {
                        this.setState({ show: true, toastMessage: "Voiture modifiée avec succès.", toastColor: "success" });
                        setTimeout(() => this.setState({ show: false }), 3000);
                    }
                })
                .catch(error => console.log("Erreur modification : " + error));
        } else {
            axios.post("http://localhost:9090/voitures", voiture)
                .then(response => {
                    if (response.data != null) {
                        this.setState({
                            show: true,
                            toastMessage: "Voiture enregistrée avec succès.",
                            toastColor: "success",
                            marque: '', modele: '', couleur: '', annee: '', prix: ''
                        });
                        setTimeout(() => this.setState({ show: false }), 3000);
                    }
                })
                .catch(error => console.log("Erreur ajout : " + error));
        }
    }

    render() {
        const marginTop = { marginTop: "20px" };
        const voitureId = this.props.params?.id;

        return (
            <div>
                <div style={{ display: this.state.show ? "block" : "none" }}>
                    <MyToast show={this.state.show} message={this.state.toastMessage} toastColor={this.state.toastColor} />
                </div>

                <Card className="border border-dark bg-dark text-white" style={marginTop}>
                    <Card.Header>{voitureId ? "Modifier Voiture" : "Ajouter Voiture"}</Card.Header>
                    <Form onSubmit={this.submitVoiture} onReset={() =>
                        this.setState({ marque: '', modele: '', couleur: '', annee: '', prix: '' })
                    }>
                        <Card.Body>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridMarque">
                                    <Form.Label>Marque</Form.Label>
                                    <Form.Control required name="marque" type="text"
                                                  className="bg-dark text-white" placeholder="Entrez Marque"
                                                  value={this.state.marque} autoComplete="off" onChange={this.voitureChange} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridModele">
                                    <Form.Label>Modèle</Form.Label>
                                    <Form.Control required name="modele" type="text"
                                                  className="bg-dark text-white" placeholder="Entrez Modèle"
                                                  value={this.state.modele} autoComplete="off" onChange={this.voitureChange} />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridCouleur">
                                    <Form.Label>Couleur</Form.Label>
                                    <Form.Control required name="couleur" type="text"
                                                  className="bg-dark text-white" placeholder="Entrez Couleur"
                                                  value={this.state.couleur} autoComplete="off" onChange={this.voitureChange} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridAnnee">
                                    <Form.Label>Année</Form.Label>
                                    <Form.Control required name="annee" type="number"
                                                  className="bg-dark text-white" placeholder="Entrez Année"
                                                  value={this.state.annee} autoComplete="off" onChange={this.voitureChange} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridPrix">
                                    <Form.Label>Prix</Form.Label>
                                    <Form.Control required name="prix" type="number"
                                                  className="bg-dark text-white" placeholder="Entrez Prix"
                                                  value={this.state.prix} autoComplete="off" onChange={this.voitureChange} />
                                </Form.Group>
                            </Row>
                        </Card.Body>
                        <Card.Footer style={{ textAlign: "right" }}>
                            <Button size="sm" variant="success" type="submit">Enregistrer</Button>
                            {' '}
                            <Button size="sm" variant="info" type="reset">Reset</Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default VoitureWrapper;