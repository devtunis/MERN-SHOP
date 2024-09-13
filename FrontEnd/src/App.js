import React, { useEffect,useState } from "react";
import Navbar from "./component/Navbar";
import Proudct from "./component/ApiProduct";
import AccCard from "./component/AccCard";
import Casquette from "./component/Casquette";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StoreCad from "./component/StoreCad";
import { ContextProvider, useGlobalContext } from "./component/context/GlobalContext"; 
import "./index.css";
// import ContactForm from "./component/PAYMENT";
import Login from "./component/Login";
import PageAdmin from "./component/PageAdmin";
import Alerte from "./Alerte";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Identify from "./component/Identify";
import FirstView from "./component/FirstView";
import FastView from "./component/FastView"
import FooterContainer from "./component/FooterContainer";


const App = () => {
  const Move = useGlobalContext();
   const [FatherReducernn, setFatherReducernn] = useState("Découvrir nos casquette");
  
  useEffect(() => {
    if (Move?.Section_User) {
      setFatherReducernn(Move?.Section_User);
    }
    console.log(Move?.Section_User, '<== Section_User');
  }, [Move?.Section_User]);


  
  // Dynamically render component based on FatherReducernn value
  // const renderComponent = () => {
  //   switch (FatherReducernn) {
  //     case "Découvrir nos casquette":
  //       return <Casquette />;
  //     case "Découvrir nos sac":
  //       return <p>Sac Component (Coming Soon)</p>;
  //     default:
  //       return <p>No component found for this section</p>;
  //   }
  // };
  useEffect(()=>{
    console.log(Move)
   },[])
    
  return (
    <React.StrictMode>      
      <ContextProvider>
        <Router>
          <Routes>
            <Route
              path="/StoreData"
              element={
                <> 
                  <Navbar />
                  <div className="ContainerImages">
                    <img src="./iamges/img2.png" alt="Main Store" />
                  </div>
                  <div className="Acceuil__NavBar">
                    <div id="Ac">Acceuil</div>
                    <div className="itemAcceuilA" >
                      {Proudct.map((item) => (
                        <AccCard key={item.id} id={item.id} imgLink={item.imgLink} title={item.title} />
                      ))} 
                    </div>
                   <Casquette/>
                   <FooterContainer/>
                      
                  </div>
                </>
              }
            />
            <Route path="/StoreCard" element={<StoreCad />} />
            {/* <Route path="/paymment" element={<ContactForm />} /> */}
            <Route path="/l" element={<Login />} />
            <Route path="/Admin" element={<PageAdmin />} />
            <Route path="/Alerete" element={<Alerte />} />
            <Route path="/Identify" element={<Identify/>}/>
            <Route path="/" element={<FirstView/>}/>
            <Route path="/fastView" element={<FastView/>}/>
          </Routes>
        </Router>
      </ContextProvider>
      <ToastContainer position="top-left" />
    </React.StrictMode>
  );
};

export default App;
