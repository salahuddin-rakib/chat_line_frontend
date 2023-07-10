import './App.css'
import Login from "./pages/Login.jsx";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {authenticate} from "./util/authenticate.jsx";
import HomePage from "./pages/HomePage.jsx";
import {useState} from "react";
import {Registration} from "./pages/Registration.jsx";
import UserMessages from "./pages/UserMessages.jsx";

function App() {
  return (<>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path='/login' exact element={<Login/>}/>
            <Route path='/registration' exact element={<Registration/>}/>
            <Route path='/home' exact element={<HomePage/>}/>
            <Route path='/users/messages/:id' exact element={<UserMessages isAdmin={true}/>}/>
            <Route path='/messages/:id' exact element={<UserMessages isAdmin={false}/>}/>
            <Route path='/' exact element={<HomePage/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
