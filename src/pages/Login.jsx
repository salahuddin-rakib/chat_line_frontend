import React, {useState, useEffect} from 'react';
import {POST} from "../api/axios.jsx";
import {useNavigate} from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const initialLoginInfo = {email: '', password: ''};
  const [loginInfo, setLoginInfo] = useState(initialLoginInfo);
  const [response, setResponse] = useState({status: '', message: ''});
  const [emptyEmail, setEmptyEmail] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);

  useEffect(() => {
    setResponse({status: '', message: ''});
  }, [loginInfo])

  const setAuthData = async (data) => {
    await window.localStorage.clear();
    await window.localStorage.setItem('authToken', data?.token);
    await window.localStorage.setItem('userName', data?.username);
    return true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loginInfo.email === '') {
      setEmptyEmail(true);
    } else if (loginInfo.password === '') {
      setEmptyEmail(false);
      setEmptyPassword(true);
    } else {
      setEmptyEmail(false);
      setEmptyPassword(false);
      try {
        POST(`/users/login`, {...loginInfo}).then((response) => {
          if (response.status === 200) {
            setAuthData(response?.data).then(navigate('/'))
          } else {
            setResponse({status: 'error', message: 'Login Failed.'})
          }
        })
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

  return (<>
    <div className="auth-form-container">
      <h2>Login</h2>
      {response.status === 'error' && <p className="error-message">{response.message}</p>}
      {emptyEmail && <p className="error-message">Email is needed.</p>}
      {emptyPassword && <p className="error-message">Password is needed.</p>}
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          value={loginInfo.email}
          onChange={(e) => setLoginInfo({...loginInfo, email: e.target.value})}
          type="email"
          placeholder="youremail@gmail.com"
          id="email"
          name="email"
        />

        <label htmlFor="password">Password</label>
        <input
          value={loginInfo.password}
          onChange={(e) => setLoginInfo({...loginInfo, password: e.target.value})}
          type="password"
          placeholder="********"
          id="password"
          name="password"
        />
        <button type="submit">Log In</button>
      </form>
      <button className="link-btn" onClick={() => navigate('/registration')}>Don't have an account? Register
        here.
      </button>
    </div>
  </>)
}

export default Login;
