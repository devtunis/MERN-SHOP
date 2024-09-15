import React from 'react'
import "./FirstView.css"
import { useNavigate } from 'react-router-dom'
 
 
 

const   FirstView = () => {
    const Nav = useNavigate()
  
  return (
    <> 
   


    <div className='container__first_view'>
        
        <div className="insdide__cotnainer">
          <div className='firstview__img'><img src='https://cdn.pixabay.com/photo/2013/07/13/11/31/shop-158317_640.png'/></div>
          <div className='firstview__titile'> 
            <h1>Shop</h1>
            <h4 className='whatsapp'>What s up?     </h4>
          </div>


          <div className='firstview__button'>

            <input type='button' className='button1' value="Create a new account" onClick={()=> {Nav("/l")}} />

            <input type='button' className='button2' value="Sign in"  onClick={()=>{Nav("/Identify")}} />
           
          </div>          

        </div>  

        </div>
        </>

  )
}

     

export default FirstView