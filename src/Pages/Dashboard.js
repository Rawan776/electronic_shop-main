//Dasboard
import React ,{useState ,useEffect} from 'react';
import Navbar_main from '../Components/Navbar_main';
import FooterSection from '../Components/footerSection';
import ProductList from './ProductList';
import AddProductModel from './AddProductModel'
import Classes from './Dashboard.module.css';

const Dashboard = () => {
  const [products ,setProducts] = useState([]);
  const [error ,setError] = useState(null);
  const [isLoading ,setisLoading] = useState(true);
  const [isFormVisible, setFormVisibility] = useState(false);

  const fetchProductsHandler = async ()=>{
    setError(null);
    try{
      const response = await fetch ('https://65b7fe4a46324d531d55d562.mockapi.io/products');
      if(!response.ok){
        throw new Error('Something went wrong!');
      }

      const data = await response.json();
      setProducts(data);
      setisLoading(false);

    }
    catch(error){
      setError(error.message);
    }
  };

  useEffect(()=>{
    fetchProductsHandler()
  },[]);

  // Update the product list with the newly added product
  const handleAddProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  const handleEditProduct = (updatedProduct) => {
   // Update the local state with the updated product
        setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === updatedProduct.id ? { ...product, ...updatedProduct } : product
        )
      );
  };

   const  handleDelete = async (productId) => {
    try{
    const response = await fetch(`https://65b7fe4a46324d531d55d562.mockapi.io/products/${productId}`, {
      method: 'DELETE',
    });
    if(response.ok){
      setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
    }
    else {
      // Handle error response from the API
      console.error('Error deleting product:', response.statusText);
    }
   }
   catch (error) {
    // Handle any other errors that may occur during the API request
    console.error('Error deleting product:', error.message);
  }
   }

  // render products
  let content = <p>Loading...</p>;

  if(isLoading){
    return(
      <section className={Classes.ProductsLoding}>
      {content}
      </section>
    )
  }
  if(products.length >= 0)
  {
    content = <ProductList products={products} onEdit={(updatedProduct)=>{handleEditProduct(updatedProduct)}} onDelete={handleDelete}/>
  }
  if (error) {
    content = <p>{error}</p>;
  }
  
  return (
    <React.Fragment>
      <Navbar_main/>
      <div className='btn border border-rounded mt-5 ms-5' onClick={()=>setFormVisibility(true)}> Add product </div>
      <AddProductModel 
       show={isFormVisible}
       onHide={() => setFormVisibility(false)} 
       onAddProduct={(newProduct)=>{handleAddProduct(newProduct) ; setFormVisibility(false)}
    }/>
      {content}
      <FooterSection />
    </React.Fragment>
  );
};

export default Dashboard;
