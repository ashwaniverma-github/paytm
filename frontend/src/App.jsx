import { useState } from 'react'
import {BrowserRouter,Route,Routes} from "react-router-dom";
import { Signup } from "./pages/Signup";
// import { Signin } from "./pages/Signin";
// import { Dashboard } from "./pages/Dashboard";
// import { SendMoney } from "./pages/SendMoney";
import './App.css'

function App(){

  return(
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<Signup/>}/>
      {/* <Route path="/signin" element={<Signin/>}/>
      <Route path="/SendMoney" element={<SendMoney/>}/>
      <Route path="Dashboard" element={<Dashboard/>}/> */}
    </Routes>
    </BrowserRouter>
    </>

  )
}

export default App;
