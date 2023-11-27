import React, {useState, useEffect} from 'react';
import {GET, POST} from "../api/axios.jsx";
import {useNavigate, useParams} from 'react-router-dom';
import {Button, Input, message} from "antd";

const UserMessages = (props) => {
  const {id} = useParams()
  const {isAdmin} = props
  const navigate = useNavigate();
  const [messages, setMessages] = useState([])
  const [tempMessage, setTempMessage] = useState('')
  const [limit, setLimit] = useState(10)

  const getMessages = async () => {
    try {
      const response = await GET(`/users/${id}/messages?page=${0}&limit=${limit}`);
      setMessages(response?.data?.response);
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

  const increasePageLimit = () => {
    if (limit === 100) {
      message.info("You won't be able to load more than 100 messages.");
    } else if (limit + 10 > 100) {
      setLimit(100);
      getMessages();
    } else {
      setLimit(limit + 10);
      getMessages();
    }
  }

  const sendMessage = async () => {
    if (tempMessage !== '') {
      try {
        const response = await POST(`/users/${id}/create_message`, {message: tempMessage});
        setMessages(response?.data?.response);
        setTempMessage('');
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
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setTempMessage('');
    sendMessage();
    event.target.reset();
  };

  const handleChange = (event) => {
    setTempMessage(event.target.value);
  };

  useEffect(() => {
    getMessages();
  }, [])

  return (<>
    <div className="auth-form-container">
      <h2>Messages</h2>
      <div style={{width: '300px'}}>
        {(messages && messages !== []) && (
          <Button style={{float: 'right', color: 'blue', height: '20px', fontSize: '10px', marginBottom: '10px'}}
                  onClick={increasePageLimit}>See more</Button>
        )}
      </div>
      <div className="chatWindow">
        <ul className="chat" id="chatList">
          {messages && messages.map((message) => (
            // <div key={message.id} style={{marginBottom: '5px'}}>{message.text}</div>
            <div key={message.id}>
              {((isAdmin && message.sender_type === 'admin') || (id === message.sender_id)) ? (
                <li className="self">
                  <div className="msg">
                    <p>{message.sender}</p>
                    <div className="message"> {message.text}</div>
                  </div>
                </li>
              ) : (
                <li className="other">
                  <div className="msg">
                    <p>{message.sender}</p>
                    <div className="message"> {message.text} </div>
                  </div>
                </li>
              )}
            </div>
          ))}
        </ul>
        <div className="chatInputWrapper">
          <form onSubmit={handleSubmit}>
            <input
              className="textarea input"
              type="text"
              placeholder="Enter your message..."
              onChange={handleChange}
            />
          </form>
        </div>
      </div>
    </div>
  </>)
}

export default UserMessages;
