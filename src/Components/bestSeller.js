//will be dynamic using api to get images and add div according to number of element in api
import BestSellerCard from "./bestSellerCard";
import { useState ,useEffect } from "react";

function BestSeller() {

    const [products ,setProducts] = useState([]);


    useEffect(() => {
    const fetchProductsHandler = async () => {
      try {
        const response = await fetch('https://65b7fe4a46324d531d55d562.mockapi.io/products');
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    // Call the fetchProductsHandler function when the component mounts
    fetchProductsHandler();
  }, []);





    return (
        <section className="best-seller">
            <div className="container">
                <div>
                    <h4 className="section-title text-center text-md-start">Best Seller</h4>
                </div>
                <div className="row mb-5">
                {products.map((product) => (
                        <BestSellerCard
                            key={product.id}
                            title ={product.title}
                            image={product.image}
                            price ={product.price}
                            rating={product.rating}   
                       />
                    ))}
                </div>
            </div>
        </section>

    );
}
export default BestSeller;