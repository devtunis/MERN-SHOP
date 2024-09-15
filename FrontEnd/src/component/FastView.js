import React from 'react'
import { useGlobalContext } from './context/GlobalContext'
import Navbar from './Navbar'
import "./FastView.css"
import axios from './axios'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'


const FastView = () => {
  const {fastView,auth,user,dispatch,BasketProudct}  = useGlobalContext()
  const  generateId=()=>{
    let id1 = "";
    while (id1.length <= 8) {
        id1 += String.fromCharCode(Math.floor(Math.random() * (91 - 65)) + 65);
    }
    return id1;
  }
  
  
  const HandelButtonReactPushDataBase = async()=>{
     
    try{
      await axios.put(`/x/${auth.userId}`, {
        id:generateId(), // here genrated other id
        imgItem:fastView.imgItem,
        titleProduct:fastView.titleProduct,
        userId: auth.userId,
        PrixProduct:fastView.PrixProduct
      });
      toast.success("this add by success")
  
      const response = await axios.get(`/findoneUser/${auth.userId}`);
    
      console.log(response.data, "response data");

      // Dispatch to update global context
      dispatch({
        type: "ADD__TO__CARD",
        payload: response.data, // Use the fetched data
      });
    }catch(index){
      console.log(`this error by ${index}`)
    }

   
  }
  return (
    <>
  <Navbar/>
  

  <div className='FastView'>
      
    <div className='FastViewInside'>

      <div className='FastViewInsideImg'>
           <span className='firstChildSpanChild'>
            
            <Link to={"/StoreData"} style={{textDecoration:"none",color:"black"}}>  <span className="material-symbols-outlined">close</span> </Link>
           </span>

          <img src={fastView.imgItem} style={{cursor:"not-allowed"}} />
 
      
      </div>

      <div className='FastViewInsideTitle'>
         <hr/>
  <div className='FastViewInsideTitleTitle'> <h2>{fastView.titleProduct}</h2></div>
  <hr/>
  <div className='FastViewInsidePrix'> <h2>{fastView.PrixProduct} €</h2></div>
  <small>+ livraison à partir de 10.00 €</small>
  <div className='FastViewInsideShoppin'>

    <button onClick={HandelButtonReactPushDataBase}> <span className="material-symbols-outlined"
      >shopping_cart_checkout</span> J achéte</button>  
     
  </div>
  
      </div>
    </div>
    

  </div>
    </>

  )
}

export default FastView