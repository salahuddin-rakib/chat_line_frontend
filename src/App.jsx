import './App.css'
import Login from "./pages/Login.jsx";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {authenticate} from "./util/authenticate.jsx";
import HomePage from "./pages/HomePage.jsx";
import {useState} from "react";
import {Registration} from "./pages/Registration.jsx";

function App() {
  return (<>
      <div className="App">
        <BrowserRouter>
          {
            authenticate !== true && (
              <Routes>
                <Route path='/login' exact element={<Login/>}/>
                <Route path='/registration' exact element={<Registration/>}/>
                <Route path='/' exact element={<Login/>}/>
              </Routes>
            )
          }
          {
            authenticate === true && (
              <Routes>
                {/*<Route path='/login' exact element={<Login/>} />*/}
                {/*<Route path="/dealerships" element={(props)=>{*/}
                {/*  return <DealershipsRenderer {...props} handleNoAuth={handleNoAuth} allowedActions={allowedActionsData}/>*/}
                {/*}}*/}
                {/*/>*/}
                <Route path='/' exact element={<HomePage/>}/>
              </Routes>
            )
          }
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
