import React, { useEffect, useState } from 'react';
import axios from './component/axios';

const Alerte = () => {
  const [casquettes, setCasquettes] = useState([]);

  const GetDat = async () => {
    try {
      const response = await axios.get('/casquettes');
      console.log(response.data)
      setCasquettes(response.data);
    } catch (error) {
      console.log(`This error occurred: ${error}`);
    }
  };

  useEffect(() => {
    GetDat();           
  }, []);

  return (
    <>
      <div>Alerte</div>
      {casquettes.map((item) => (
        <div key={item._id}>
          <h3>{item.titleProduct}</h3>
          <img
            src={`${process.env.REACT_APP_API_URL}/${item.imgItem}`}
            alt={item.titleProduct}
            style={{ width: '200px', height: 'auto' }}
          />
        </div>
      ))}
    </>
  );
};

export default Alerte;
