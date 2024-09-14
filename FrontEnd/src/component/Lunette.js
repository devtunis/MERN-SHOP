import React, { useState, useEffect, useCallback } from "react";
import axios from "./axios";
import StarRatings from "react-star-ratings";
import "./Lunette.css";
import Navbar from './Navbar';
import { useGlobalContext } from "./context/GlobalContext";
import { toast } from "react-toastify"; // For toast notifications
import { useNavigate } from "react-router-dom";

// Truncate function
const Truncate = (text, maxLength) => {
  if (text && text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};

// Memoized ProductCard component
const ProductCard = React.memo(({ product, HandleAddCart,HandelViewCart }) => (
  <div className="card">
    <img
      style={{cursor:"all-scroll"}}
      className="card-image"
      src={`${process.env.REACT_APP_API_URL}/${product.imgItem}`}
      alt={product.titleProduct || "Product Image"}
      loading="lazy"
      onClick={()=>HandelViewCart(product._id, product.PrixProduct, product.imgItem, product.titleProduct)}
    />
    <div className="card-body">
      <h5
        className="card-title"
        title={product.titleProduct?.length >= 50 ? product.titleProduct : null}
      >
        {Truncate(product.titleProduct, 55)}
      </h5>
      <p className="card-description">{Truncate(product.description, 55)}</p>
      <p className="card-price">${product.PrixProduct}</p>
   
    </div>
    <div className="buttonClassName">
      <button onClick={() => HandleAddCart(product._id, product.PrixProduct, product.imgItem, product.titleProduct)}>
        Add to cart
      </button>
    </div>
  </div>
));

// Adding a display name to the memoized component
ProductCard.displayName = "ProductCard";

// Main Lunette component
const Lunette = () => {
  const Nav = useNavigate()
  const [products, setProducts] = useState([]);
  const [userData, setUserData] = useState(null); // To store fetched user data
  const { dispatch, auth } = useGlobalContext(); // Assuming `auth` contains user info

  const HandelViewCart = (_id,PrixProduct,imgItem, titleProduct)=>{
    const fullImageURL = `${process.env.REACT_APP_API_URL}/${imgItem.replace(/\\/g, '/')}`;
  
    
 
    dispatch({
      type:"Fast__View",
      paylodF:{
        id:_id,
        imgItem:fullImageURL,
        titleProduct,
        PrixProduct
      }
    })
     Nav("/fastView")
  }
  // Helper to generate a unique ID (if needed)
  const generateId = () => Math.random().toString(36).substr(2, 9);

  const HandleAddCart = async (_id, PrixProduct, ImgItem, TitleProduct) => {
    const fullImageURL = `${process.env.REACT_APP_API_URL}/${ImgItem.replace(/\\/g, '/')}`;
  

    try {
      // Update the backend with new cart data
      await axios.put(`/x/${auth.userId}`, {
        id: generateId(), 
        imgItem: fullImageURL,
        titleProduct: TitleProduct,
        userId: auth.userId,
        PrixProduct
      });

      // Notify success
      toast.success("Product added to cart successfully!");

      // Fetch updated user data
      const response = await axios.get(`/findoneUser/${auth.userId}`);
      setUserData(response.data); // Update local state with fetched data
   
      // Dispatch to update global context
      dispatch({
        type: "ADD__TO__CARD",
        payload : response.data
      });
      
    } catch (error) {
      console.error(`Error: ${error}`);
      toast.error(`Error adding to cart: ${error.message}`);
    }
  };

  // Fetch products data from the API
  const FetchData = useCallback(async () => {
    try {
      const response = await axios.get("/LunneteImage");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    FetchData();
  }, [FetchData]);

  return (
    <>
      <Navbar />
      <br />
      <br />
      <section className="product">
        <div className="container">
          <div className="grid">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} HandleAddCart={HandleAddCart}
              HandelViewCart ={HandelViewCart}
              
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default React.memo(Lunette);
