import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const EditProductModal = (props) => {
//   const [editedProduct, setEditedProduct] = useState({});

//   useEffect(() => {
//     // Set the initial state of the form with the selected product's data
//     setEditedProduct(product);
//   }, [product]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditedProduct((prevProduct) => ({
//       ...prevProduct,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = () => {
//     // Call the onUpdateProduct callback with the edited product data
//     onUpdateProduct(editedProduct);
//   };

  return (
    <Modal
    {...props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
       Edit Product Detail
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
     {/* <EditProductForm /> */}
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={props.onClose}>Close</Button>
    </Modal.Footer>
  </Modal>
  );
};

export default EditProductModal;
