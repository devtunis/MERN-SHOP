import React, { useEffect, useState } from 'react'
import { useGlobalContext } from './context/GlobalContext'
import "./Identify.css"
import axios from "./axios"
import { Link, useNavigate } from 'react-router-dom'
const Identify = () => {
    const [username,setUsername] = useState("")
    const [password,setpassword] = useState("")
    const Move = useGlobalContext()
    const [error,seterror] = useState(null)
    const Nav = useNavigate()
    const [loading,setloading] = useState(null)

    const HandelLogin = async()=>{

  
        setloading(true)
     try{
       const reponse = await axios.post("/identify",{
        username :username,
        password :password ,
       }) 
       
    
        Move.dispatch({
            type :"ADD__TO__CARD",         
            payload :  reponse.data.users.basket,
        })




         Move.dispatch({
          type:"AUTH",
          payload :{
           userId :reponse.data.users._id,
           username: reponse.data.users.username,
           email   : reponse.data.users.email,
           password  : reponse.data.users.password,
           
           testAdmin :  reponse.data.users.testAdmin
          }

       })
       setloading(true)
         

       setTimeout(()=>{
        Nav("/storeData")
    },1000)

        



     } 
     catch(eroor){
        console.log(`this eroor by ${eroor}`)
        setloading(false)
         

        setTimeout(()=>{
            seterror(true)
               },1000)

               
        
     }

     
   }
   setTimeout(()=>{
    setloading(true)
       },2500)

  return (
     

    <div className='Identify__Container'>
 
        <input type='text'
        style={{border:`1px solid ${loading==false ?'red':'black' }`}}
        placeholder=' username' onChange={(e)=>setUsername(e.target.value)}/>
        <br/>
        <input type='password' 
        
        style={{border:`1px solid ${loading==false ?'red' :'black'}`}}
        
        placeholder=' password' onChange={(e)=>setpassword(e.target.value)}/>
        
       <br/>
        <button onClick={HandelLogin} style={{backgroundColor:loading==false && "red"}}>{loading==false ? "eroor" :"login"}</button>
        {error && <p className="error-message">check you username or your password or     <Link to={"/l"} style={{textDecoration:"none"}}><span style={{color:"red"}}> Sigin</span></Link>  if you dont have account ? </p>}
 
    </div>
  )
}

export default Identify