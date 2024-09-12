import React, { useEffect, useState } from 'react';
import "./Casquette.css";
import ProudctCasquette from './ApiCasquette'; // Ensure this contains your product data
import CardCasquuete1 from './CardCasquuete1';
import { useGlobalContext } from './context/GlobalContext';
import axios  from "./axios";

const Casquette = () => {
 
  const [casquettes, setCasquettes] = useState([]);

  const GetDat = async () => {
    try {
      const response = await axios.get('/casquettes');
      console.log(response.data,"<=>")
      setCasquettes(response.data);
    } catch (error) {
      console.log(`This error occurred: ${error}`);
    }
  };

  useEffect(() => {
    GetDat(); 
      
  }, []);
 
  

  return (
    <div className='Casquette'>
      <div className='CasquetteTitle'>NOS PRODUITS</div>

      <div className='Container__NOS_PRODUITS'>
        <div className='FatherProudct'>
          {casquettes.map((item) => (
           
            <CardCasquuete1
            id={item.id}
            key={item._id}
            imgItem={`http://localhost:5000/${item.imgItem}`} 
            PrixProduct ={item.PrixProduct}
            titleProduct={item.titleProduct}
          />
          ))}

        </div>
      </div>
      
    </div>
  );
};

export default Casquette;
