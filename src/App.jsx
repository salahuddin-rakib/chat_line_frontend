import './App.css'
import Login from "./pages/Login.jsx";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {authenticate} from "./util/authenticate.jsx";
import HomePage from "./pages/HomePage.jsx";
import {useState} from "react";
import {Registration} from "./pages/Registration.jsx";

function App() {

  // return (
  //   <BrowserRouter>
  //     {
  //       !authenticate && (
  //         <Route path='/login' exact element={<Login/>}/>
  //       )
  //     }
  //     {
  //       <Routes>
  //         <Route path='/' exact element={authenticate === true ? <HomePage/> : <Login/>}/>
  //       </Routes>
  //     }
  //   </BrowserRouter>
  // )
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <div className="App">
      {
        currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Registration onFormSwitch={toggleForm} />
      }
    </div>
  );
}

export default App;
