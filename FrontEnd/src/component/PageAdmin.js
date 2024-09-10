import React, { useEffect, useState, useCallback } from 'react';
import "./PageAdmin.css";
import axios from "./axios";
import { useGlobalContext } from './context/GlobalContext';
import BASEADDDATA from './BASEADDDATA';

const PageAdmin = () => {
    const { auth } = useGlobalContext();
    const [usersForAdmin, setUsersForAdmin] = useState([]);
    const [userCasquette, setUserCasquette] = useState([]);
    const [RemoveID,setRemoveId] = useState("")
    // useCallback to memoize the function
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
          alert("item succes delte it ")
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
            <h2>Welcome to Page Admin</h2>
            <br />
            
            <div className="ContainerPageAdmin">
                <div className="x dataFromDataBase">
                    <div className='User__Data__Base'>
                        <div className='APPcontainerData'>
                            <div className='xd'>users {usersForAdmin.length}</div>
                            {usersForAdmin.map((item) => (
                                <div className='cardData' key={item._id}>
                                    <h2><span>id: </span>{item._id}</h2>
                                    <h2><span>username: </span>{item.username}</h2>
                                    <h2><span>email: </span>{item.email}</h2>
                                </div>
                            ))}
                        </div>
                        <div className='card__casquette'>
                            <div className='titleCard'>Casquette {userCasquette?.length}</div>
                            <div className='containerCasquetetex'>
                                {userCasquette.map((item) => (
                                    <div className='CardOwner' key={item._id}>
                                        <p>{item._id}</p>
                                        <img src={`http://localhost:5000/${item.imgItem}`} alt={`Casquette ${item._id}`} />
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
                <div className="x DataBaseSAQUE"></div>
                <div className="x DataBaseLunnete"></div>
            </div>
        </div>
    );
}

export default React.memo(PageAdmin);
