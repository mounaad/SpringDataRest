import React, { Component, createRef } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import axios from '../axiosConfig';

export default class Chatbot extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [
                { role: 'bot', text: '👋 Bonjour ! Je suis votre assistant voiture. Comment puis-je vous aider ?' }
            ],
            input: '',
            loading: false
        };
        this.messagesEndRef = createRef();
    }

    componentDidUpdate() {
        this.messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    sendMessage = async () => {
        const userMessage = this.state.input.trim();
        if (!userMessage || this.state.loading) return;

        this.setState(prev => ({
            messages: [...prev.messages, { role: 'user', text: userMessage }],
            input: '',
            loading: true
        }));

        try {
            const response = await axios.post(
                '/ai/chat',
                userMessage,
                { headers: { 'Content-Type': 'text/plain' } }
            );

            this.setState(prev => ({
                messages: [...prev.messages, { role: 'bot', text: response.data }],
                loading: false
            }));
        } catch {
            this.setState(prev => ({
                messages: [...prev.messages, {
                    role: 'bot',
                    text: '❌ Erreur de connexion à l\'IA'
                }],
                loading: false
            }));
        }
    };

    handleKeyPress = (e) => {
        if (e.key === 'Enter') this.sendMessage();
    };

    render() {
        const chatStyle = {
            height: '400px',
            overflowY: 'auto',
            backgroundColor: '#1a1a2e',
            padding: '15px',
            borderRadius: '8px'
        };

        const userBubble = {
            backgroundColor: '#0d6efd',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '15px 15px 0 15px',
            maxWidth: '70%',
            marginLeft: 'auto',
            marginBottom: '10px',
            textAlign: 'right'
        };

        const botBubble = {
            backgroundColor: '#2d2d44',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '15px 15px 15px 0',
            maxWidth: '70%',
            marginBottom: '10px'
        };

        const typingDot = {
            display: 'inline-block',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: '#aaa',
            margin: '0 2px',
            animation: 'bounce 1.2s infinite'
        };

        return (
            <>
                <style>{`
                    @keyframes bounce {
                        0%, 60%, 100% { transform: translateY(0); }
                        30% { transform: translateY(-5px); }
                    }
                `}</style>

                <Card className="border border-dark bg-dark text-white"
                      style={{ marginTop: '20px' }}>
                    <Card.Header>
                        🤖 Assistant IA — Voiture Shop
                    </Card.Header>
                    <Card.Body>
                        {/* Zone des messages */}
                        <div style={chatStyle}>
                            {this.state.messages.map((msg, index) => (
                                <div key={index}
                                     style={msg.role === 'user' ? userBubble : botBubble}>
                                    {msg.text}
                                </div>
                            ))}

                            {/* Indicateur de frappe */}
                            {this.state.loading && (
                                <div style={botBubble}>
                                    <span style={{ ...typingDot, animationDelay: '0s' }}></span>
                                    <span style={{ ...typingDot, animationDelay: '0.2s' }}></span>
                                    <span style={{ ...typingDot, animationDelay: '0.4s' }}></span>
                                </div>
                            )}

                            <div ref={this.messagesEndRef} />
                        </div>

                        {/* Zone de saisie */}
                        <div className="d-flex mt-3">
                            <Form.Control
                                type="text"
                                className="bg-dark text-white me-2"
                                placeholder="Posez votre question sur les voitures..."
                                value={this.state.input}
                                onChange={e => this.setState({ input: e.target.value })}
                                onKeyPress={this.handleKeyPress}
                                disabled={this.state.loading}
                            />
                            <Button
                                variant="primary"
                                onClick={this.sendMessage}
                                disabled={this.state.loading}
                            >
                                {this.state.loading ? '...' : 'Envoyer'}
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            </>
        );
    }
}