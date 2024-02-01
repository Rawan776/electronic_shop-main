//Dasboard
import React ,{useCallback ,useState ,useEffect} from 'react';
import Navbar_main from '../Components/Navbar_main';
import FooterSection from '../Components/footerSection';
import ProductList from './ProductList';
import Classes from './Dashboard.module.css';

const Dashboard = () => {
  const [products ,setProducts] = useState([]);
  const [error ,setError] = useState(null);
  const [isLoading ,setisLoading] = useState(true);


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

  let content = <p>Loading...</p>;

  if(isLoading){
    return(
      <section className={Classes.ProductsLoding}>
      {content}
      </section>
    )
  }
  if(products.length > 0)
  {
    content = <ProductList products={products}/>
  }
  if (error) {
    content = <p>{error}</p>;
  }
  
  return (
    <React.Fragment>
      <Navbar_main/>
      {content}
      <FooterSection />
    </React.Fragment>
  );
};

export default Dashboard;
