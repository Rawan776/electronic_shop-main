import React, { useState } from 'react';

import './Dashboard.module.css'
import EditProductModal from './EditProductModal';
import DeleteProductModel from './DeleteProductModel';
import toast from 'react-hot-toast';

const notifyUpdate = () => toast.success('Successfully updated!');
const notifyDelete= () => toast.success('Successfully Deleted!');


const Product = (props) => {
  const[openEditModel ,setEditModalOpen] = useState(false);
  const[openDeleteModel ,setDeleteModalOpen] = useState(false);


  const selectedProduct ={
    id:props.id,
    title:props.title,
    image:props.image,
    price:props.price,
    rate:props.rating
  }

  const handleDelete = () => {
    // Call the onDeleteProduct function passed from the parent
    props.onDeleteProduct(props.id);
    setDeleteModalOpen(false);
    // setTimeout(() => {
    //   notifyDelete();
    // }, 2000);
       
  };
  const handleEdit=(editedProduct) => {
    props.onEditProduct(editedProduct);
    setEditModalOpen(false);
     notifyUpdate()};

  return (
    <tr>
      <td>{props.id}</td>
      <td>{props.title}</td>
      <td><img src={props.image} alt="selected" style={{ maxWidth: '50px' }} /></td>
      <td>{props.price}</td>
      <td>{props.rating}</td>
      <td>
        <div className='d-flex gap-2 justify-content-center'>
          <button onClick={()=> setDeleteModalOpen(true)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
          </svg></button>
          <DeleteProductModel 
          show={openDeleteModel}
          onHide={()=>setDeleteModalOpen(false)} 
          onDeleteProduct={handleDelete}
            />
          <button onClick={()=>setEditModalOpen(true)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
          </svg>
          </button>
          <EditProductModal 
          show={openEditModel}
          product={selectedProduct}
          onHide={()=>setEditModalOpen(false)}
          onEditProduct={handleEdit}        
            />
         
        </div>
      </td>
    </tr>
  );
};

export default Product;
