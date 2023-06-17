import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

export const Registration = (props) => {
  const navigate = useNavigate();
  const initialRegistrationInfo = {full_name: '', email: '', phone_number: '', password: '', password_confirmation: ''};
  const [registrationInfo, setRegistrationInfo] = useState(initialRegistrationInfo);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  }

  return (
    <div className="auth-form-container">
      <h2>Register</h2>
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

        <label htmlFor="phone_number">Email</label>
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
