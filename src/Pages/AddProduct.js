import React, { useRef , useState} from 'react';
import Button from 'react-bootstrap/Button';
import classes from './AddProduct.module.css';



const isEmpty =(value) => value.trim() === '';
const isNotIntervalFive =(value)=> value<=5 && value >=1 ;

function AddProduct(props) {
  const titleRef = useRef('');
  const imageRef = useRef('');
  const ratingRef = useRef('');
  const PriceRef = useRef('');

  const [formValidity ,setformValidity] = useState({
    title:true,
    image:true,
    rating:true,
    price:true,
  });

  const [base64Image, setBase64Image] = useState(null);
  const [isloading, setIsloading] = useState(false);




  const handleImageChange = () => {
    const file = imageRef.current.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64Image(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  function submitHandler(event) {
    event.preventDefault();

    //  console.log(imageRef.current.value);
    //   console.log(base64Image);
    const enteredTitle = !isEmpty(titleRef.current.value);
    const selectedImage=!isEmpty(imageRef.current.value);
    const enteredRating =!isEmpty(ratingRef.current.value) && isNotIntervalFive(ratingRef.current.value);
    const enteredPrice =!isEmpty(PriceRef.current.value);

    setformValidity({
      title:enteredTitle,
      image:selectedImage,
      rating:enteredRating,
      price:enteredPrice,
    })

    const FormValid = enteredTitle && selectedImage && enteredRating && enteredPrice;
    console.log(FormValid);
    console.log(enteredTitle);
    if(FormValid){
      const product = {
        title: titleRef.current.value,
        image : base64Image,
        rating : parseInt(ratingRef.current.value),
        price : parseFloat(PriceRef.current.value),
      };
            
      //added to api
      props.onAddProduct(product);
      //update table once added
      //props.onAddProductState(...product);
    }
 
  }



  

  return (
    <form onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='title'>Title</label>
        <input type='text' id='title' ref={titleRef} />
        {!formValidity.title && <p style={{color:'red'}}>please enter title</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor='image'>image</label>
        <input type="file" id="image" accept="image/*"  ref={imageRef} onChange={handleImageChange}/>
        {!formValidity.image&& <p style={{color:'red'}}>please select image </p>}
      </div>
      <div className={classes.control}>
        <label htmlFor='rating'>Rate product [1-5] : </label>
        <input type='text' id='rating' ref={ratingRef} />
        {!formValidity.rating && <p style={{color:'red'}}>please enter rate [1-5] </p>}
      </div>
      <div className={classes.control}>
        <label htmlFor='price'>Price : </label>
        <input type='text' id='price' ref={PriceRef} />
        {!formValidity.price && <p style={{color:'red'}}>please enter price </p>}
      </div>
      <div>
         {/* toast is appear succesfully */}
         <Button type='submit' className={classes.btn} onClick={()=>setIsloading(true)} > {isloading? 'Adding...':'ADD'}</Button>
         {/* {formValidity.title && formValidity.image && formValidity.price&&formValidity.rating&&isAdding && <span>Adding....</span>} */}
       
      </div> 
    </form>
  );
}

export default AddProduct;