import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AddProductForm from './AddProduct'
import { useState } from 'react';
function AddProductModel(props) {
  const  [ID , setID] = useState('');

    async function AddProductHandler(product) {
        const response = await fetch('https://65b7fe4a46324d531d55d562.mockapi.io/products', {
          method: 'POST',
          body:JSON.stringify(product),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        console.log(data);
        setID(data.id);
        props.onAddProduct(data);
    }


  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
         Product Detail
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
       <AddProductForm onAddProduct={AddProductHandler}  onHide={props.onHide}/>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
// onAddProductState={props.onAddProduct}

export default AddProductModel;