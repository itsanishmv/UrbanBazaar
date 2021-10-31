import React from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Checkout from "./components/Checkout";
import { Route, Switch } from 'react-router-dom'
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useEffect,useContext } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "@firebase/auth";
import { contextCreated } from "./components/ContextAPI";
import Payments from "./components/Payments";
import ProductDetails from "./components/ProductDetails";
import Orders from "./components/Orders";

const  App = () => {
  const [{user}, dispatch] = useContext(contextCreated)
  
  useEffect(() => {
    onAuthStateChanged(auth, (authuser) => {
      if (authuser) {
        dispatch({
          type: "User",
          user: authuser.email
        })
       
      } else {
        dispatch({
          type: "User",
          user: null
        })
      }
      
    })
    console.log(user)
  }, [dispatch,user])
  

   return (
     <div>
    
       <Switch>
           <Route exact path="/login">
                  <Login/>
           </Route>
            <Route exact path="/signup">
                  <Signup/>
            </Route>
            <Route exact path="/">
                    <Header />
                    <Home/>
           </Route>
           <Route exact path="/payments">
                    <Header />
                    <Payments/>
            </Route>
            <Route exact path="/cart">
                    <Header />
                    <Checkout/>
          </Route>
         <Route exact path={`/product_details/:id`}>
                      <Header />
                    <ProductDetails/>
         </Route>
         <Route exact path={`/orders`}>
           <Header/>
                 <Orders/>
          </Route>
          </Switch>
  
    </div>
  )
 }
export default App;