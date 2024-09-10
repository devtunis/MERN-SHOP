import React, { useState } from "react";
import { useGlobalContext } from "./context/GlobalContext";
import "./CardCasquuete1.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const CardCasquuete1 = ({ id, imgItem, titleProduct, PrixProduct }) => {
  console.log({ id, imgItem, titleProduct, PrixProduct });
  
  // Access both dispatch and auth from GlobalContext
  const { dispatch, auth } = useGlobalContext(); 
  const [userData, setUserData] = useState([]);

  const handleData = async () => {
    console.log(id, imgItem, titleProduct, PrixProduct);

    try {
      // Update the backend
      await axios.put(`http://localhost:5000/x/${auth.userId}`, {
        id, 
        imgItem,
        titleProduct,  // Typo fixed here
        userId: auth.userId,
        PrixProduct
      });

      // Fetch updated user data
      const response = await axios.get(`http://localhost:5000/findoneUser/${auth.userId}`);
      setUserData(response.data); // Update the state with fetched data
      console.log(response.data, "response data");

      // Dispatch to update global context
      dispatch({
        type: "ADD__TO__CARD",
        payload: response.data, // Use the fetched data
      });
      
     
    } catch (error) {
      console.log(`Error: ${error}`);
      toast.error(`Erreur: ${error.message}`);
    }
  };

  return (
    <div className="CardCasquuete1">
      <div className="imgCardQas">
        <img src={imgItem} alt="product" />
      </div>
      <div className="TitleImgCarde">{titleProduct}</div>
      <br />
      <div className="PrixTitle">{PrixProduct} €</div>
      <br />
      <button onClick={handleData}>Ajouter au panier</button>
      
 
    </div>
  );
};

export default CardCasquuete1;
