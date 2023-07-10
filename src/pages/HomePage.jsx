import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {GET} from "../api/axios.jsx";
import {Button, message} from 'antd';

const HomePage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([])

  const getUsers = async () => {
    try {
      const response = await GET(`/users`);
      setUsers(response?.data?.users);
    } catch (error) {
      if (!error) {
        message.error('Error happened!');
      } else if (error.response?.status === 401) {
        message.error('Unauthorized.');
        navigate('/login');
      } else {
        message.error('Error happened!');
      }
    }
  }

  useEffect(() => {
    getUsers();
  }, [])

  return (
    <>
      <div className="auth-form-container">
        <h2>Customers</h2>
        <>
          {
            users && users.map((user) => (
              <Button key={user.id} style={{width: '200px', marginBottom: '5px'}}
                      onClick={() => navigate(`/users/messages/${user.id}`)}>
                {user.full_name}
              </Button>
            ))
          }
        </>
      </div>
    </>
  )
}

export default HomePage;
