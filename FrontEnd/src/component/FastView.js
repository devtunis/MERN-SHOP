import React from 'react'
import { useGlobalContext } from './context/GlobalContext'
import Navbar from './Navbar'
import "./FastView.css"
const FastView = () => {
  const {fastView}  = useGlobalContext()
   
  return (
    <>
  <Navbar/>
  

  <div className='FastView'>
    
    <div className='FastViewInside'>

      <div className='FastViewInsideImg'>
          <img src={fastView.imgItem} style={{cursor:"not-allowed"}} />
      
      </div>

      <div className='FastViewInsideTitle'>
         <hr/>
  <div className='FastViewInsideTitleTitle'> <h2>{fastView.titleProduct}</h2></div>
  <hr/>
  <div className='FastViewInsidePrix'> <h2>{fastView.PrixProduct} €</h2></div>
  <small>+ livraison à partir de 10.00 €</small>
  <div className='FastViewInsideShoppin'>
   
    <button> <span className="material-symbols-outlined">shopping_cart_checkout</span> J achéte</button>
  </div>
  
      </div>
    </div>
    

  </div>
    </>

  )
}

export default FastView