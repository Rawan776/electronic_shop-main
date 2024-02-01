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
  const [formValidity ,setformValidity] =useState({
    title:true,
    image:true,
    rating:true,
    price:true,
  });

  function submitHandler(event) {
    event.preventDefault();

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
        image : imageRef.current.value,
        rating : ratingRef.current.value,
        price : PriceRef.current.value,
      };
       
      props.onAddProduct(product);

    }
 
  }



  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   console.log(file);
  //   if (file) {
  //     // Use FileReader to convert the selected image to a data URL
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setSelectedImage(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   } else {
  //     setSelectedImage(null);
  //   }
  // };

  return (
    <form onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='title'>Title</label>
        <input type='text' id='title' ref={titleRef} />
        {!formValidity.title && <p style={{color:'red'}}>please enter title</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor='image'>image</label>
        <input type="file" id="image" accept="image/*"  ref={imageRef} />
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
        <Button type='submit' className={classes.btn}>ADD</Button>
      </div> 
    </form>
  );
}

export default AddProduct;