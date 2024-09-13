import React, { useReducer, createContext, useContext, useEffect } from "react";

// Load from localStorage or use initialState
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  BasketProudct: JSON.parse(localStorage.getItem("BasketProudct")) || [],
  auth: JSON.parse(localStorage.getItem("auth")) || null ,
  Section_User : "Découvrir nos casquette",
  fastView :JSON.parse(localStorage.getItem("fastView")) || null,
};

// Reducer function
const reducer = (state, action) => {



  switch (action.type) {
    case "Fast__View":{
      const UpdateFastView = action.paylodF
      localStorage.setItem("fastView",JSON.stringify(UpdateFastView))
      return{                     // do this in local storage
        ...state,
        fastView:action.paylodF
      }
    }



    case "CHANGE__SECTION__USER":
      return{
        ...state,
        Section_User : action.paylod
      }



    case "ADD__TO__CARD":
      const updatedBasket = [action.payload];
      localStorage.setItem("BasketProudct", JSON.stringify(updatedBasket)); // Save to localStorage
      return {
        ...state,
        BasketProudct: updatedBasket,
      };
    case "REMOVE__FROM__CARD":
      const filteredBasket = state.BasketProudct.filter(
        (item) => item.id !== action.payload
      );
      console.log(filteredBasket)
      localStorage.setItem("BasketProudct", JSON.stringify(filteredBasket)); // Save updated basket
      return {
        ...state,
        BasketProudct: filteredBasket,
      };
    case "AUTH":
      localStorage.setItem("auth", JSON.stringify(action.payload)); // Save auth object to localStorage
      return {
        ...state,
        auth: action.payload
      };
    default:
      return state;
  }
};

// Create context
const GlobalContext = createContext();

// Context provider component
export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state,"this currently state")
  useEffect(() => {
    // Sync user data with localStorage

    if (state.user) {
      localStorage.setItem("user", JSON.stringify(state.user));
    }
  }, [state.user]);

  useEffect(() => {
    // Sync auth data with localStorage
    if (state.auth) {
      localStorage.setItem("auth", JSON.stringify(state.auth)); // Ensure auth is saved as JSON string
    } else {
      localStorage.removeItem("auth"); // Clear auth from localStorage if state.auth is null
    }
  }, [state.auth]);

  return (
    <GlobalContext.Provider
      value={{
        dispatch,
        user: state.user,
        BasketProudct: state.BasketProudct,
        auth: state.auth,
        Section_User : state.Section_User,
        fastView : state.fastView
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to use context
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
