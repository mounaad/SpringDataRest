import React, { Component } from 'react';
import { Card, Table, Button, ButtonGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from '../axiosConfig';
import MyToast from './MyToast';

export default class VoitureList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            voitures: [],
            show: false,
            toastMessage: '',
            toastColor: 'success'
        };
    }

    componentDidMount() {
        axios.get("http://localhost:9090/voitures")
            .then(response => this.setState({ voitures: response.data }))
            .catch(error => console.log("Erreur : " + error));
    }

    deleteVoiture = (voitureId) => {
        axios.delete("http://localhost:9090/voitures/" + voitureId)
            .then(response => {
                if (response.data != null) {
                    this.setState({
                        show: true,
                        toastMessage: "Voiture supprimée avec succès.",
                        toastColor: "danger",
                        voitures: this.state.voitures.filter(v => v.id !== voitureId)
                    });
                    setTimeout(() => this.setState({ show: false }), 3000);
                }
            })
            .catch(error => console.log("Erreur suppression : " + error));
    };

    render() {
        const { voitures, show, toastMessage, toastColor } = this.state;

        return (
            <div>
                <div style={{ display: show ? "block" : "none" }}>
                    <MyToast show={show} message={toastMessage} toastColor={toastColor} />
                </div>

                <Card className="border border-dark bg-dark text-white">
                    <Card.Header>Liste des Voitures</Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant="dark">
                            <thead>
                            <tr>
                                <th>Marque</th>
                                <th>Modèle</th>
                                <th>Couleur</th>
                                <th>Année</th>
                                <th>Prix</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {voitures.length === 0 ?
                                <tr>
                                    <td colSpan="6" className="text-center">
                                        Aucune Voiture n'est disponible
                                    </td>
                                </tr>
                                :
                                voitures.map(voiture => (
                                    <tr key={voiture.id} align="center">
                                        <td>{voiture.marque}</td>
                                        <td>{voiture.modele}</td>
                                        <td>{voiture.couleur}</td>
                                        <td>{voiture.annee}</td>
                                        <td>{voiture.prix}</td>
                                        <td>
                                            <ButtonGroup>
                                                <Link to={"/edit/" + voiture.id} className="btn btn-sm btn-outline-primary">
                                                    ✏️
                                                </Link>
                                                {' '}
                                                <Button size="sm" variant="outline-danger"
                                                        onClick={this.deleteVoiture.bind(this, voiture.id)}>
                                                    🗑️
                                                </Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}