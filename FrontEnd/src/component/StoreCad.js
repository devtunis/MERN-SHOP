import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalContext } from './context/GlobalContext';
import axios from "axios";
import './NavNar.css';
import './Store.css';

const StoreCad = () => {
  const [currently, setCurrently] = useState([]);
  const { BasketProudct, dispatch, auth } = useGlobalContext();
  const navigate = useNavigate();
  const [price, setPrice] = useState(0);

  const handleRemove = async (id) => {
    try {
      console.log(id);
      await axios.delete(`http://localhost:5000/removeItem/${auth.userId}?id1=${id}`);
    } catch (error) {
      console.log(`This error occurred: ${error}`);
    }

    try {
      const userResponse = await axios.get(`http://localhost:5000/Udata/${auth.userId}`);
      console.log(userResponse.data);

      dispatch({
        type: 'ADD__TO__CARD',
        payload: userResponse.data,
      });
    } catch (error) {
      console.error(`Error removing item from database: ${error.response?.data || error.message}`);
    }
  };

  const handleNav = () => {
    navigate('/storeData');
  };

  useEffect(() => {
    let total = 0;
    BasketProudct.forEach((item) => {
      item.forEach((product) => {
        total += Number(product.PrixProduct);
      });
    });
    setPrice(total);
  }, [BasketProudct]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/findoneUser/${auth.userId}`);
      const flattenedData = response.data.flat();
      setCurrently(flattenedData);
    } catch (error) {
      console.log(`This error occurred: ${error}`);
    }
  };

  useEffect(() => {
    if (auth.userId) {
      fetchData();
    }
  }, [auth.userId]);

  return (
    <>
      <div className='Payment'>
        <p className='titleWelcome'>Welcome <span style={{ color: "purple" }}>{auth.username}</span></p>
        <div className='sectionPayment'>
          <div className='RemoveSection' onClick={handleNav}>X</div>
          <div className='ContainerSectionPayment'>
            {BasketProudct.flat().length > 0 ? (
              BasketProudct.flat().map((item) => (
                <div className='dataOFpaymeny' key={item.id}>
                  <div className='dataofPaymentImg'>
                    <img src={item.imgItem} alt='' />
                  </div>
                  <div className='ProudctPAY'>
                    <div className='titleCard'>
                      <span>{item?.titleProduct}</span>
                      <span>{item.PrixProduct} $</span>
                    </div>
                    <div className='btnRemove'>
                      <button>Buy</button>
                      <button onClick={() => handleRemove(item.id)}>Remove</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No items in your basket go buy something <Link to={"/StoreData"}>Store</Link></p>
            )}
          </div>
          <div className='x'>
            {BasketProudct.flat().length > 0 && (
              <button className='buttoPaymebnt'>
                Buy All <small>{price > 0 && `${price}$`}</small>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default StoreCad;
