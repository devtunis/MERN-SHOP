import React from 'react'
import "./Acc.css"
const AccCard = ({id,imgLink}) => {
  return (
    <div className='cardAcc'>

        <div className='imgCardAcc'> <img src={imgLink}/></div>
        <button>Découvrir nos casquettes</button>
    </div>
  )
}

export default AccCard