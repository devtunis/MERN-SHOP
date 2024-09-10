import React, { useEffect, useState } from 'react'
import "./Login.css"
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast, useToast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import { useGlobalContext } from './context/GlobalContext';
 


const Login = () => {
 
 
    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPasword] =useState("")
    const Nav = useNavigate()
    const Move = useGlobalContext()

    const HandelClick = async(e)=>{
    
     
       
        
        try{
             const response = await axios.post("http://localhost:5000/register",{
                 username,
                 email,
                 password,
                 testAdmin :username==="admin" ? "true" : "false"
             })
             
       
            // {
            //     userId :response.data.data__user._id,
            //     username: response.data.data__user.username,
            //     email   : response.data.data__user.email,
            //     password  : response.data.data__user.password,
            //     basket : response.data.data__user.basket,
            //     testAdmin :  response.data.data__user.testAdmin
            // }
        //    console.log(response)
            // Move.dispatch({
            //  type :"UPLOAD__DATA",
            //  payload : {
            //     userId :response.data.data__user._id,
            //     username: response.data.data__user.username,
            //     email   : response.data.data__user.email,
            //     password  : response.data.data__user.password,
            //     basket : response.data.data__user.basket,
            //     testAdmin :  response.data.data__user.testAdmin
            //  }
            // })
                     
            //  setTimeout(()=>{
            //      Nav("/StoreData")
            //  },1000)

            Move.dispatch({
                type:"AUTH",
                payload :{
               userId :response.data.data__user._id,
                 username: response.data.data__user.username,
                 email   : response.data.data__user.email,
                 password  : response.data.data__user.password,
                 basket : response.data.data__user.basket,
                 testAdmin :  response.data.data__user.testAdmin
                }
    
             })
                  setTimeout(()=>{
                   Nav("/storeData")
               },1000)

        }
        catch(eroor){
            console.log(`this eroor by ${eroor}`)

        }
 
        toast.success("Success")
        console.log(Move,"current")
    }


useEffect(()=>{
    console.log(Move)
},[Move])
  return (
 <>
 <div className='formConainter'>              
 
<div class="form-box">
<div class="form">
    <span class="title">Sign up</span>
    <span class="subtitle">Create a free account with your email.</span>
    <div class="form-container">
           <input type="text" class="input" placeholder="Full Name"     value={username}  onChange={(e)=>{setUsername(e.target.value)}}      />
			<input type="email" class="input" placeholder="Email"        value={email}  onChange={(e)=>{setEmail(e.target.value)}}   />
			<input type="password" class="input" placeholder="Password"   value={password}  onChange={(e)=>{setPasword(e.target.value)}}   />
    </div>
    <button onClick={HandelClick}>Sign up</button>
</div>
<div class="form-section">
  <p>Have an account? <a href="">Log in</a> </p>
</div>
</div>
</div>    
<ToastContainer /> 
</> 
  )
}

export default Login