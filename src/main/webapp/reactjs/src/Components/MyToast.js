import React from 'react';
import { Toast } from 'react-bootstrap';

const MyToast = ({ show, message, toastColor }) => {
    return (
        <Toast
            show={show}
            style={{
                position: 'fixed',
                top: '70px',
                right: '20px',
                zIndex: 9999,
                minWidth: '250px',
                backgroundColor: toastColor === 'danger' ? '#dc3545' : '#28a745',
                color: 'white'
            }}
        >
            <Toast.Header closeButton={false}
                          style={{ backgroundColor: toastColor === 'danger' ? '#c82333' : '#218838', color: 'white' }}>
                <strong className="me-auto">
                    {toastColor === 'danger' ? '🗑️ Suppression' : '✅ Succès'}
                </strong>
            </Toast.Header>
            <Toast.Body>{message}</Toast.Body>
        </Toast>
    );
};

export default MyToast;