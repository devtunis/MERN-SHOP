import React, { useEffect, useState } from 'react';
import "./NavNar.css";
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalContext } from './context/GlobalContext';

const Navbar = () => {
    const { BasketProudct, auth, dispatch } = useGlobalContext();
    const Nav = useNavigate();
    const [len, setLen] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        let s = 0;
        BasketProudct?.forEach(item => {
            s += item.length;
        });
        setLen(s);
    }, [BasketProudct]);

    const handlePanyer = () => {
        Nav("/StoreCard");
    };

    const handleLogOut = () => {
        dispatch({
            type: "AUTH",
            payload: null,
        });
        // dispatch({
        //     type :"ADD__TO__CARD",
        //     BasketProudct:[]
            
        // })
        localStorage.clear();
        Nav("/")
    };

    

    return (
        <div className='container__nav__bar'>
            
            
            <div className='logo'>
            
            <Link to={"/Admin"} style={{color:auth.username=="admin"?"red":"black",display:auth.username=="admin"?"flex":"none",textDecoration:"none",alignItems:"center",gap:"10px"}}>MyStore
            <span className="material-symbols-outlined">
            local_convenience_store
            </span>
            </Link>
                MENZEL PARIS
                <p>
                    bonjour cher  <small className='flach'> •</small>    
                    <span style={{ 
                        color: auth?.username === "admin" ? "gold" : "red", 
                        fontFamily: "cursive", 
                        fontWeight: "bold", 
                        textTransform: "capitalize" 
                    }}>
                        {auth?.username ? auth.username : "Guest"}
                    </span> <small  className='flach'> •</small>    
                </p>
                <button className='xbutton changePostion' onClick={()=>{ setIsOpen(prev => !prev);}}>
                    {isOpen ? 'X' : '☰'}
                </button>
                
            </div>
            <hr className='hrItem' />
            <div className={`nav__logo ${isOpen ? 'open' : ''}`}>
                <ul>
                    <li onClick={handleLogOut}>Log out</li>
                     
                    <Link to={"/StoreData"} style={{textDecoration:"none",color:"white",cursor:"pointer"}}><li>Accueil</li></Link>
                    <li onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>Produits</li>
                    <Link to="/" style={{ textDecoration: 'none', color: '#fff', fontFamily: 'Arial' }}>
                        <li>Mon Compte</li>
                    </Link>
                    <li>Contact</li>
                    <hr className='hrItem' />
                </ul>
            </div>
            <div className='panier__logo' onClick={handlePanyer}>
                {auth ? (
                    <div>
                        <small className='PayCounter'>{len}</small>
                        <img src='./iamges/panier.png' alt="Panier" />
                    </div>
                ) : (
                    <Nav to="/" />
                )}
            </div>
        </div>
    );
};

export default Navbar;
