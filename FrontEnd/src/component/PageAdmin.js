import React, { useEffect, useState, useCallback } from 'react';
import "./PageAdmin.css";
import axios from "./axios";
import { useGlobalContext } from './context/GlobalContext';
import BASEADDDATA from './BASEADDDATA';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import Copy from './Copy';
import LunetteForm from './LunetteForm';
import SacForm from './SacForm';

const PageAdmin = () => {
    const { auth } = useGlobalContext();
    const [usersForAdmin, setUsersForAdmin] = useState([]);
    const [userCasquette, setUserCasquette] = useState([]);
    const [RemoveID,setRemoveId] = useState("")
   

 










    const fetchApiData = useCallback(async () => {
        try {
            const response = await axios.get("/ADMIN");
            const response2 = await axios.get("/casquettes");
            setUserCasquette(response2.data);
            setUsersForAdmin(response.data);
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    }, []);


    const HandelDelte = async()=>{
      try{
         const response =     await axios.delete(`dlp/${RemoveID}`)
         if(response){
         
          window.location.reload()
         }else{
          alert("this item not deltede ")
         }
      }
      catch(error){
        console.log(`this error by ${error}`)
      }
      
    }



    useEffect(() => {
        fetchApiData();
    }, [fetchApiData]);





    return (
        <div
            className="PageAdmin"
            style={auth.testAdmin === "true" ? { display: "flex" } : { display: "none" }}
        >
            <h2>Welcome to Page Admin </h2>
            <br />
            <Link to={"/StoreData"}>   <span className="material-symbols-outlined">local_convenience_store</span></Link>

            <div className="ContainerPageAdmin">
                <div className="x dataFromDataBase">
                    <div className='User__Data__Base'>
                        <div className='APPcontainerData'>
                            <div className='xd'>users {usersForAdmin.length}</div>
                            {usersForAdmin.map((item) => (
                                <div className='cardData' key={item._id}>
                                    <h2><span>id: </span>{item._id}</h2>
                                    <h2 ><span>username: </span >{item.username}</h2>
                                   
                                    <h2><span>email: </span>{item.email}</h2>
                                </div>
                            ))}
                        </div>
                        <div className='card__casquette'>
                            <div className='titleCard'> Numero de Casquette - {userCasquette?.length}-</div>
                            <div className='containerCasquetetex'>
                                {userCasquette.map((item) => (
                                    <div className='CardOwner' key={item._id}>
                                       
                       <p style={{display:"flex",justifyContent:"center",alignItems:"center",gap:"4px"}}>
                        
                         
                           <Copy  passId={item._id} />
                           
                           
                            <span style={{fontSize:"16px",fontWeight:"bold"}}>{item._id}  </span>   
                                           
                            </p> 
                                         
                                        <img src={`${process.env.REACT_APP_API_URL}/${item.imgItem}`} alt={`Casquette ${item._id}`} />
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* <div className='card__casquette'>
                            <div className='titleCard'>sac</div>
                            <div className='containerCasquetetex'>
                                {userCasquette.map((item) => (
                                    <div className='CardOwner' key={item._id}>
                                        <p>{item._id}</p>
                                        <img src={`http://localhost:5000/${item.imgItem}`} alt={`Sac ${item._id}`} />
                                    </div>
                                ))}
                            </div>


                            
                        </div> */}
                        {/* <div className='card__casquette'>
                            <div className='titleCard'>Lunette</div>
                            <div className='containerCasquetetex'>
                                {userCasquette.map((item) => (
                                    <div className='CardOwner' key={item._id}>
                                        <p>{item._id}</p>
                                        <img src={`http://localhost:5000/${item.imgItem}`} alt={`Sac ${item._id}`} />
                                    </div>
                                ))}
                            </div>


                            
                        </div> */}
                    </div>
                    
                </div>
                <div className="x DataBaseCasquette">
                    <BASEADDDATA />
                    <br />



                    <div className='delte__section'>
                        <input type='text' placeholder='saisir id référence' value={RemoveID} onChange={(e)=>setRemoveId(e.target.value)}  />
                        <button onClick={HandelDelte}>DELETE</button>
                    </div>
                </div>
                <div className="x DataBaseLunnete">
                    <LunetteForm/>
                  
                </div>
                <div className="x DataBaseSAQUE">
                    <SacForm/>
                </div>
               
            </div>
        </div>
    );
}

export default React.memo(PageAdmin);
