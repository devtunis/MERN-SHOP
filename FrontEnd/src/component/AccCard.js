import React, { useRef } from 'react';
import './Acc.css';
import { useGlobalContext } from './context/GlobalContext';
import { useNavigate } from 'react-router-dom';

const AccCard = ({ id, imgLink, title }) => {
  const Nav = useNavigate();
  const { dispatch } = useGlobalContext();
  const refA = useRef(null);

  const HandlePushStateManagement = () => {
    if (title === 'Découvrir nos lunette') {
      Nav('/Lunette');
    }
    if (title === 'Découvrir nos casquette') {
      console.log(refA)
      refA.current.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    }
  };

  return (
    <div className='cardAcc'>
      <div className='imgCardAcc'>
        <img src={imgLink} alt={title} style={{ cursor: 'not-allowed' }} />
      </div>
      <button onClick={HandlePushStateManagement} className='TITLECARDACD' ref={refA}>
        {title}
      </button>
    </div>
  );
};

export default AccCard;
