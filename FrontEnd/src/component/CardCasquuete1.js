import React, { useState } from "react";
import { useGlobalContext } from "./context/GlobalContext";
import "./CardCasquuete1.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "./axios";
import { useNavigate } from "react-router-dom";
const CardCasquuete1 = ({ id, imgItem, titleProduct, PrixProduct }) => {
 // console.log({ id, imgItem, titleProduct, PrixProduct });
  const Nav = useNavigate()



  const { dispatch, auth } = useGlobalContext(); 
  const [userData, setUserData] = useState([]);
  const notify = () => toast("ajouter dans payment");


const  generateId=()=>{
  let id1 = "";
  while (id1.length <= 8) {
      id1 += String.fromCharCode(Math.floor(Math.random() * (91 - 65)) + 65);
  }
  return id1;
}






  const handleData = async () => {
  //  console.log(id, imgItem, titleProduct, PrixProduct);
      !auth && Nav("/")
    try {
      // Update the backend
      await axios.put(`/x/${auth.userId}`, {
        id:generateId(), 
        imgItem,
        titleProduct,  // Typo fixed here
        userId: auth.userId,
        PrixProduct
      });
       
      notify()
      // Fetch updated user data
      const response = await axios.get(`/findoneUser/${auth.userId}`);
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

  const HandelIamgeWIthDataReactAndseeThisPictuer = ()=>{
    console.log(id, imgItem, titleProduct, PrixProduct,"currentReactComponent");
    dispatch({
      type:"Fast__View",
      paylodF:{
        id,
        imgItem,
        titleProduct,
        PrixProduct
      }
    })
     Nav("/fastView")
  }
  return (
    <div className="CardCasquuete1" 
    
    style={{cursor:"all-scroll"}}>
      <div className="imgCardQas">
        <img src={imgItem} alt="product" onClick={HandelIamgeWIthDataReactAndseeThisPictuer} />
      </div>
      <div className="TitleImgCarde a">{titleProduct}</div>
      <br />
      <div className="PrixTitle a">{PrixProduct} €</div>
      <br />
      <button onClick={handleData} >     
          <span className="material-symbols-outlined">shopping_cart</span>

          </button>
      
 
    </div>
  );
};

export default CardCasquuete1;
