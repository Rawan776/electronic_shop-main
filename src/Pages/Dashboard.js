//Dasboard
import React ,{useCallback ,useState ,useEffect} from 'react';
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



  const fetchProductsHandler = useCallback( async ()=>{
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
  },[]);

  useEffect(()=>{
    fetchProductsHandler()
  },[fetchProductsHandler]);

  const handleAddProduct = (newProduct) => {
    // Update the product list with the newly added product
    //const addedProduct = { id, ...newProduct };
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

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
    content = <ProductList products={products}/>
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
