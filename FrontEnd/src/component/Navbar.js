import React from 'react'
import "./NavNar.css"
import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import { useGlobalContext } from './context/GlobalContext'

 
 const  Navbar = () => {
    const Move = useGlobalContext()
    const Nav = useNavigate()
    const HandelPanyer = ()=>{
        Nav("/StoreCard")
    }
  return (
    <div className='container__nav__bar'>
        
        <div className='logo'>MENZEL PARIS</div>
        <div className='nav__logo'>
            <ul>
                <li>Accueil </li>
                <li>Produits
                </li>
              
                <Link >  <li>Mon Compte</li>  </Link>
             <li>Contact
             </li>
            </ul>
        </div>
        <div className='panier__logo' onClick={HandelPanyer}>
            <small className='PayCounter'>{Move.BasketProudct.length}</small>
            <img src='./iamges/panier.png'  alt="" />
        </div>



    </div>
  )
}


export default Navbar