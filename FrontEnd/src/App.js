import React from "react";
import Navbar from "./component/Navbar";
import Proudct from "./component/ApiProduct";
import AccCard from "./component/AccCard";
import Casquette from "./component/Casquette";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StoreCad from "./component/StoreCad";
import { ContextProvider } from "./component/context/GlobalContext"; // Import only ContextProvider here
import "./index.css"
import ContactForm from "./component/PAYMENT";
import Login from "./component/Login";
import PageAdmin from "./component/PageAdmin"
import Alerte from "./Alerte";
const App = () => {
  return (
    <React.StrictMode>      
    <ContextProvider> {/* Move the ContextProvider to wrap the whole app */}
      <Router>
        <Routes>
          <Route
            path="/StoreData"
            element={
              <>
                <Navbar />
                <div className="ContainerImages" >
                  <img src="./iamges/img2.png"/>
                </div>

                <div className="Acceuil__NavBar">
                  <div id="Ac">Acceuil</div>
                  <div className="itemAcceuilA">
                      {Proudct.map((item) => (
                        <AccCard key={item.id} id={item.id} imgLink={item.imgLink} />
                      ))}
                  </div>
                </div>  

                <Casquette />
              </>
            }
          />
          <Route path="/StoreCard" element={<StoreCad />} />
          <Route path="/paymment" element={<ContactForm />} />
          <Route path="/" element={<Login/>} />
          <Route path="/Admin_dashboard" element={<PageAdmin/>} />
          <Route path="/Alerete" element={<Alerte/>} />
 

        </Routes>
      </Router>
      </ContextProvider>
      </React.StrictMode>
  );
};

export default App;
