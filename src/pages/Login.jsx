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

  const handleSubmit = async (e) => {
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
        const response = await POST(`/users/login`, {...loginInfo});
        console.log("Printing response: ", response);
        window.localStorage.setItem('auth_token', response?.data?.token);
        window.localStorage.setItem('username', response?.data?.username);
        window.location.href = `/home`
        setLoginInfo(initialLoginInfo);
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
      {response.status === 'error' && <p>{response.message}</p>}
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        { emptyEmail && <p style={{color: 'red'}}>Email is needed.</p>}
        { emptyPassword && <p style={{color: 'red'}}>Password is needed.</p>}
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
