import React from 'react'
import "./Acc.css"
import { useGlobalContext } from './context/GlobalContext'
const AccCard = ({id,imgLink,title}) => {
   const {dispatch} = useGlobalContext()
  const HandelPushStateMangement = ()=>{
  
 dispatch({
  type :"CHANGE__SECTION__USER",
  paylod :title
 })
  }
  return (
    <div className='cardAcc'>

        <div className='imgCardAcc'> <img src={imgLink}/></div>
        <button onClick={HandelPushStateMangement}  >{title}</button>
    </div>
  )
}

export default AccCard