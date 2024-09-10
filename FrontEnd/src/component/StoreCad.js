import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from './context/GlobalContext';
import axios from "axios"
import './NavNar.css';
import './Store.css';

const StoreCad = () => {
  const [currently, setCurrently] = useState([]);
  const { BasketProudct, dispatch,auth } = useGlobalContext();
  const navigate = useNavigate();
  const [price, setPrice] = useState(0);
 const [newPrice,setNewPrice] = useState(price)

  // Remove item from basket
  // Remove item from basket
const handleRemove = async (id) => {
  try {
    console.log(id);
    
    // Use a query parameter to send the id1
    await axios.delete(`http://localhost:5000/removeItem/${auth.userId}?id1=${id}`);
    
  } catch (error) {
    console.log(`This error occurred: ${error}`);
  }

  try {
    // Fetch updated user data
    const userResponse = await axios.get(`http://localhost:5000/Udata/${auth.userId}`);
    console.log(userResponse.data);

    // Dispatch updated basket data
    dispatch({
      type: 'ADD__TO__CARD',
      payload: userResponse.data,
    });
  } catch (error) {
    console.error(`Error removing item from database: ${error.response?.data || error.message}`);
  }
};

  // Navigate to another route
  const handleNav = () => {
    navigate('/storeData');
  };

  // Calculate the total price
  
 
 useEffect(()=>{
  let s = 0 ;
  BasketProudct.forEach((item)=>{
    item.forEach((item)=>{
      console.log(item.PrixProduct)
      s+=Number(item.PrixProduct)
    })
  })
  s>0  &&  setPrice(s)
 },[BasketProudct])

 
  // Fetch user data from the database
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/findoneUser/${auth.userId}`);
      // Flatten the nested array and set it to the state
      const flattenedData = response.data.flat();
       console.log(flattenedData,"currently data")

      setCurrently(flattenedData); // Update the state with the flattened data
    } catch (error) {
      console.log(`This error occurred: ${error}`);
    }
  };

  useEffect(() => {
    if (auth.userId) {
      fetchData();
     
    }
  }, [auth.userId]);

  useEffect(() => {
    console.log(BasketProudct, 'BasketProudct');
  }, [BasketProudct]);

  return (
    <div className='Payment'>
      <p>Welcome {auth.username}</p>
      <div className='sectionPayment'>
        <div className='RemoveSection' onClick={handleNav}>
          X
        </div>
        <div className='ContainerSectionPayment'>
          {BasketProudct.flat().map((item) => (
            <div className='dataOFpaymeny' key={item.id}>
              <div className='dataofPaymentImg'>
                <img src={item.imgItem} alt='' />
              </div>
              <div className='ProudctPAY'>
                <div className='titleCard'>
                  <span>{item?.titleProduct} </span>
                  <span>{item.PrixProduct} $</span>
                </div>
                <div className='btnRemove'>
                   <button>Buy</button> 
                  <button onClick={() => handleRemove(item.id)}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='x'>
          {BasketProudct.flat().length > 0 && (
            <button  className='buttoPaymebnt'>
              Buy All <small>{price > 0 && `${price}$`}</small>     
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreCad;
