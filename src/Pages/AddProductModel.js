import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AddProductForm from './AddProduct'
function AddProductModel(props) {

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
       <AddProductForm onAddProduct={AddProductHandler}/>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddProductModel;