import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function DeleteProductModel(props) {


  return (
    <>
      <Modal     {...props} >
        <Modal.Header closeButton>
          <Modal.Title>Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete product!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={props.onDeleteProduct}>
           Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteProductModel;