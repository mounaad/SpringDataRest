import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

class Footer extends React.Component {
    render() {
        let fullYear = new Date().getFullYear();
        return (
            <Navbar fixed="bottom" bg="dark" variant="dark">
                <Container className="justify-content-center">
          <span className="text-muted">
            {fullYear}-{fullYear + 1}, All Rights Reserved by Master MIOLA
          </span>
                </Container>
            </Navbar>
        );
    }
}

export default Footer;