import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import classes from './AddProduct.module.css';
import toast from 'react-hot-toast';

const notify = () => toast.success('Successfully Updated!');
const EditProductModal = (props) => {
  const [isChangeImg , setisChangeImage] = useState(false);
  const [base64Image, setBase64Image] = useState(props.product.image);

  const [isUpdating, setIsUpdating] = useState(false);


  const [values ,setValues] =useState({
      title: props.product.title,
      image : props.product.image,
      rating : props.product.rate,
      price : props.product.price,
  });
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64Image(reader.result);
      };
      reader.readAsDataURL(file);
    }
    setValues({...values,image:base64Image})
  }
     
  const handleEdit = async(event) => {

    event.preventDefault();

    // Call the onUpdateProduct callback with the edited product data
    const editedProduct = {
      title: values.title,
      image : base64Image,
      rating : values.rating,
      price : values.price,
    };

     // Call API to update the product
      try{
     const response= await fetch(`https://65b7fe4a46324d531d55d562.mockapi.io/products/${props.product.id}`, {
    method: 'PUT', 
     headers: {'content-type':'application/json'},
     body: JSON.stringify(editedProduct)
   })
   if(!response.ok){
    console.error('succesfful updating product');
   }
   else {
     const data = await response.json();
     
     props.onEditProduct(data);
   }
  }
  catch (error) {
//   // Handle any other errors that may occur during the API request
   console.error('Error updating product:', error.message);
 }


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
       Edit Product Detail
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <form onSubmit={handleEdit}>
      <div className={classes.control}>
        <label htmlFor='title'>Title</label>
        <input type='text' id='title' value={values.title}  onChange={e=>setValues({...values,title:e.target.value})}/>
      </div>
      <div className={classes.control} onClick={()=>setisChangeImage(true)}>
        <label htmlFor='image'>image</label>
        {!isChangeImg && <img src={values.image} alt="Preview" style={{ maxWidth: '100px', maxHeight: '100px' }} />}
       <input type="file" id="image" accept="image/*" onChange={handleImageChange}/>

      </div>
      <div className={classes.control}>
        <label htmlFor='rating'>Rate product [1-5] : </label>
        <input type='text' id='rating' value={values.rating} onChange={e=>setValues({...values,rating:e.target.value})} />
      </div>
      <div className={classes.control}>
        <label htmlFor='price'>Price : </label>
        <input type='text' id='price' value={values.price} onChange={e=>setValues({...values,price:e.target.value})}/>
      </div>
      <div>
         {/* toast is appear succesfully */}
         <Button type='submit' onClick={() => { props.onHide();notify() }}>update</Button>
         {/* {isUpdating && <span>updating....</span>} */}

       
      </div> 
    </form>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={props.onHide}>Close</Button>
    </Modal.Footer>
  </Modal>
  );
};

export default EditProductModal;
