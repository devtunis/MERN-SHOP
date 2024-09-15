import React, { useEffect, useState } from "react";
import Navbar from "./component/Navbar";
import Proudct from "./component/ApiProduct";
import AccCard from "./component/AccCard";
import Casquette from "./component/Casquette";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StoreCad from "./component/StoreCad";
import { ContextProvider, useGlobalContext } from "./component/context/GlobalContext";
import "./index.css";
import Login from "./component/Login";
import PageAdmin from "./component/PageAdmin";
import Alerte from "./Alerte";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Identify from "./component/Identify";
import FirstView from "./component/FirstView";
import FastView from "./component/FastView";
import FooterContainer from "./component/FooterContainer";
import Lunette from "./component/Lunette";
import Sac from "./component/Sac";
import THROWEROOR from "./THROWEROOR";
import AppStripe from "./component/AppStripe";
 
const App = () => {
  const Move = useGlobalContext();
  const [FatherReducernn, setFatherReducernn] = useState("Découvrir nos casquette");
  const [Data, setData] = useState("");
  const [Counter, setCounter] = useState(0);

  useEffect(() => {
    if (Move?.Section_User) {
      setFatherReducernn(Move.Section_User);
    }
  }, [Move?.Section_User]);

  // Update the image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(prevCounter => (prevCounter + 1) % 3);
    }, 8000);

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  const apiIamge = [
    { img1: "./iamges/img2.png" },
    { img1: "./iamges/img4.png" },
    { img1: "./iamges/img2.png" },
   
  ];


  useEffect(() => {
    setData(apiIamge[Counter].img1); // Corrected key name to 'img1'
  }, [Counter]);



  window.addEventListener('beforeunload', () => {

    localStorage.clear(); // this function should be when close the tab localStorage delet it
});


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
                    {/* Image Display */}
                    <img src={Data} alt="Dynamic" />
                  </div>
                  <div className="Acceuil__NavBar">
                    <div id="Ac">Acceuil</div>
                    <div className="itemAcceuilA">
                      {Proudct.map((item) => (
                        <AccCard key={item.id} id={item.id} imgLink={item.imgLink} title={item.title} />
                      ))}
                    </div>
                    <Casquette />
                    <br/><br/>
                    <FooterContainer />
                  </div>
                </>
              }
            />
            <Route path="/StoreCard" element={<StoreCad />} />
            {/* <Route path="/paymment" element={<ContactForm />} /> */}
            <Route path="/l" element={<Login />} />
            <Route path="/Admin" element={<PageAdmin />} />
            <Route path="/Alerete" element={<Alerte />} />
            <Route path="/Identify" element={<Identify />} />
            <Route path="/" element={<FirstView />} />
            <Route path="/fastView" element={<FastView />} />
            <Route path="/Lunette" element={<Lunette />} />
            <Route path="/SectionSac" element={<Sac/>} />
            <Route path="/*" element={<THROWEROOR/>} />
            <Route path="/Stripe" element={<AppStripe/>} />
            
          </Routes>
        </Router>
      </ContextProvider>
      <ToastContainer position="top-left" />
    </React.StrictMode>
  );
};

export default App;
