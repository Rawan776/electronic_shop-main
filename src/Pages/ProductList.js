import './AddProduct.module.css'
import Product from './Product';
import AddProduct from './AddProduct';
import AddProductModel from './AddProductModel'
import { useState } from 'react';

function ProductList(props) {
    const [isFormVisible, setFormVisibility] = useState(false);
    return (
        <div className ="container-fluid tableContent  p-5">
            <div className='btn border border-rounded mb-2' onClick={()=>setFormVisibility(true)}> Add product </div>
            <AddProductModel show={isFormVisible} onHide={() => setFormVisibility(false)}/>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Rating</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {props.products.map((product) => (
                        <Product
                            key={product.id}
                            id={product.id}
                            title ={product.title}
                            image={product.image}
                            price ={product.price}
                            rating={product.rating}   
                       />
                    ))}
                </tbody>
            </table>
        </div>

    );
}
export default ProductList;