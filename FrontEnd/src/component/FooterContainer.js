import React from 'react';
import "./FooterContainer.css";

const FooterContainer = () => {
    const data = new Date()
    const Year = data.getFullYear()

  return (
    <div className='FooterContainer'>
      <div className='levl1'>
        <h2 style={{color:"white"}}>© {Year} MENZEL Paris - Tous droits réservés</h2>
      </div>
      <div className='levl1'>
        <h2 style={{color:"white"}}>Mentions légales | Politique de confidentialité</h2>
      </div>
      <div className='levl1'>
        <h2 style={{color:"white"}}>Suivez-nous :</h2>
      </div>
      <div className='levl1'>
           <img src='https://img.freepik.com/vecteurs-libre/icone-medias-sociaux-vecteur-instagram-7-juin-2021-bangkok-thalande_53876-136728.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1726099200&semt=ais_hybrid'/>
           <img src="https://c.clc2l.com/t/w/h/whatsapp-business-mMnOI_.png"/>
           <img src='https://cdn-icons-png.freepik.com/256/3938/3938055.png?semt=ais_hybrid'/>
      </div>
    </div>
  );
}

export default FooterContainer;
