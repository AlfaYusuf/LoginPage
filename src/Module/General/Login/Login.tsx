import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import "./../../../Css/Login.css";
import StickyText from "./../../../common/StickyText/StickyText.tsx"
import { ASCYLogin } from '../../redux/actions'
import { useDispatch } from 'react-redux'
import { FetchLoginData } from '../../../common/services/Axios'

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [stickyVisible, setStickyVisible] = useState(false);
  const [stickyType, setStickyType] = useState("");
  const [stickyTitle, setStickyTitle] = useState("");
  const [stickyMessage, setStickyMessage] = useState("");

  useEffect(() => {
    document.title = '® - Login Page';
  }, []);

  const showSticky = (isVisible, type, title, message) => {
    setStickyVisible(isVisible);
    setStickyType(type);
    setStickyTitle(title);
    setStickyMessage(message);
  };

  const login = async () => {
    try {
      if (!username ) {
        showSticky(true, 'error', 'Error', 'Please enter  Email');
        return;
      }
      if (!password ) {
        showSticky(true, 'error', 'Error', 'Please enter password');
        return;
      }

      const entityObject = {
        email: username,
        password: password,
      };
      const showSpinner = true

      const response = await FetchLoginData('/authentication-contractor/login', showSpinner,entityObject);

      if (response?.data?.tokens) {
        const { access, refresh } = response.data.tokens;


      document.cookie = `authToken=${access.token}; Secure; HttpOnly; SameSite=Strict`;
      document.cookie = `refreshToken=${refresh.token}; Secure; HttpOnly; SameSite=Strict`;


        sessionStorage.setItem('authToken', access.token);
        sessionStorage.setItem('refreshToken', refresh.token);

        dispatch(ASCYLogin({ jsonToken: access.token }));

        showSticky(true, 'success', 'Success', 'Login successful!');
      } else {
        showSticky(true, 'error', 'Error', 'Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);

    if (error.response && error.response.status === 401) {
      showSticky(true, 'error', 'Unauthorized', 'Invalid credentials. Please check your username and password.');
    }else
      showSticky(true, 'error', 'Error', 'Service Not Working');
    }
  };

  const handleStickyClose = () => setStickyVisible(false);

  return (
    <>
      {stickyVisible && (
        <StickyText
          display={stickyVisible}
          sticky_type={stickyType}
          sticky_title={stickyTitle}
          sticky_message={stickyMessage}
          sendData={handleStickyClose}
        />
      )}

      <div className="Main_login">
        <div className="Login_body">
          <h1>Start Tracking Your Products Here</h1>
          <div className="Login_Form">
            <div className="divFlex">
              <Input
                required
                placeholder="Email"
                className="Email"
                autoComplete="off"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="divFlex">
              <Input.Password
                required
                placeholder="Password"
                className="Password"
                autoComplete="off"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </div>
            <br />
            <div className="sign_in_out_buttons">
              <button className="Sign_in" onClick={login} type="button">
                SIGN-IN
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
