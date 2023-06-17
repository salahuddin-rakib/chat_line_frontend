import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {POST} from "../api/axios.jsx";

export const Registration = (props) => {
  const navigate = useNavigate();
  const initialRegistrationInfo = {full_name: '', email: '', phone_number: '', password: '', password_confirmation: ''};
  const [registrationInfo, setRegistrationInfo] = useState(initialRegistrationInfo);
  const [response, setResponse] = useState({status: '', message: ''});
  const [emptyName, setEmptyName] = useState(false);
  const [emptyEmail, setEmptyEmail] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);
  const [passwordDifferent, setPasswordDifferent] = useState(false);

  useEffect(() => {
    setResponse({status: '', message: ''});
  }, [registrationInfo])

  const allInputFieldsOk = () => {
    let allInputFieldsOk = true;
    if (registrationInfo.full_name === '') {
      setEmptyName(true);
      allInputFieldsOk = false;
    } else if (registrationInfo.email === ''){
      setEmptyName(false);
      setEmptyEmail(true);
      allInputFieldsOk = false;
    } else if (registrationInfo.password === ''){
      setEmptyName(false);
      setEmptyEmail(false);
      setEmptyPassword(true);
      allInputFieldsOk = false;
    } else if (registrationInfo.password !== registrationInfo.password_confirmation){
      setEmptyName(false);
      setEmptyEmail(false);
      setEmptyPassword(false);
      setPasswordDifferent(true);
      allInputFieldsOk = false;
    } else {
      setEmptyName(false);
      setEmptyEmail(false);
      setEmptyPassword(false);
      setPasswordDifferent(false);
    }

    return allInputFieldsOk;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (allInputFieldsOk()){
      try {
        await POST(`/users/create`, {...registrationInfo});
        navigate('/login')
      } catch (error) {
        if (!error) {
          setResponse({status: 'error', message: 'No server response'})
        } else if (error.response?.status === 400) {
          setResponse({status: 'error', message: 'Missing username and/or password.'})
        } else if (error.response?.status === 401) {
          setResponse({status: 'error', message: 'Unauthorized.'})
        } else {
          setResponse({status: 'error', message: 'Login Failed.'})
        }
      }
    }
  }

  return (
    <div className="auth-form-container">
      <h2>Register</h2>
      {response.status === 'error' && <p>{response.message}</p>}
      { emptyName && <p style={{color: 'red'}}>Full name is needed.</p>}
      { emptyEmail && <p style={{color: 'red'}}>Email is needed.</p>}
      { emptyPassword && <p style={{color: 'red'}}>Password is needed.</p>}
      { passwordDifferent && <p style={{color: 'red'}}>Password and confirm password is not same.</p>}
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Full name</label>
        <input
          value={registrationInfo.full_name}
          name="name"
          onChange={(e) => setRegistrationInfo({...registrationInfo, full_name: e.target.value})}
          id="name"
          placeholder="Full name"
        />

        <label htmlFor="email">Email</label>
        <input
          value={registrationInfo.email}
          onChange={(e) => setRegistrationInfo({...registrationInfo, email: e.target.value})}
          type="email"
          placeholder="youremail@gmail.com"
          id="email"
          name="email"
        />

        <label htmlFor="password">Password</label>
        <input
          value={registrationInfo.password}
          onChange={(e) => setRegistrationInfo({...registrationInfo, password: e.target.value})}
          type="password"
          placeholder="********"
          id="password"
          name="password"
        />

        <label htmlFor="password_confirmation">Confirm Password</label>
        <input
          value={registrationInfo.password_confirmation}
          onChange={(e) => setRegistrationInfo({...registrationInfo, password_confirmation: e.target.value})}
          type="password"
          placeholder="********"
          id="password_confirmation"
          name="password_confirmation"
        />

        <label htmlFor="phone_number">Phone Number</label>
        <input
          value={registrationInfo.phone_number}
          onChange={(e) => setRegistrationInfo({...registrationInfo, phone_number: e.target.value})}
          placeholder="+8801........."
          id="phone_number"
          name="phone_number"
        />
        <button type="submit">Log In</button>
      </form>
      <button className="link-btn" onClick={() => navigate('/login')}>Already have an account? Login here.</button>
    </div>
  )
}
