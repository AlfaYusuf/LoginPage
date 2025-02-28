import React, { useState, useEffect } from 'react';
import { Input, Spin } from 'antd';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import "../../../Css/Login.css";
import StickyText from "./../../../common/StickyText/StickyText.tsx";
import { ASCYLogin } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import { FetchLoginData } from '../../../common/services/Axios';

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
    const dispatch = useDispatch();

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [stickyVisible, setStickyVisible] = useState<boolean>(false);
    const [stickyType, setStickyType] = useState<string>("");
    const [stickyTitle, setStickyTitle] = useState<string>("");
    const [stickyMessage, setStickyMessage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        document.title = '® - Login Page';
    }, []);

    const showSticky = (isVisible: boolean, type: string, title: string, message: string) => {
        setStickyVisible(isVisible);
        setStickyType(type);
        setStickyTitle(title);
        setStickyMessage(message);
    };

    const login = async () => {
        if (!username) {
            showSticky(true, 'error', 'Error', 'Please enter Email');
            return;
        }
        if (!password) {
            showSticky(true, 'error', 'Error', 'Please enter password');
            return;
        }

        setLoading(true);
        try {
            const entityObject = { email: username, password: password };
            const response = await FetchLoginData('/authentication-contractor/login', true, entityObject);

            if (response?.data?.tokens) {
                const { access, refresh } = response.data.tokens;

                // Store access token securely
                sessionStorage.setItem('authToken', access.token);
                sessionStorage.setItem('refreshToken', refresh.token);

                dispatch(ASCYLogin({ jsonToken: access.token }));

                showSticky(true, 'success', 'Success', 'Login successful!');
            } else {
                showSticky(true, 'error', 'Error', 'Invalid credentials');
            }
        } catch (error: any) {
            console.error('Error during login:', error);

            if (error.response) {
                switch (error.response.status) {
                    case 400:
                        showSticky(true, 'error', 'Error', 'Invalid input format.');
                        break;
                    case 401:
                        showSticky(true, 'error', 'Unauthorized', 'Invalid credentials. Please check your username and password.');
                        break;
                    case 403:
                        showSticky(true, 'error', 'Error', 'Access denied.');
                        break;
                    case 500:
                        showSticky(true, 'error', 'Error', 'Something went wrong. Try again later.');
                        break;
                    default:
                        showSticky(true, 'error', 'Error', 'An unexpected error occurred.');
                }
            } else {
                showSticky(true, 'error', 'Error', 'Network error. Please check your internet connection.');
            }
        } finally {
            setLoading(false);
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
                            <button className="Sign_in" onClick={login} type="button" disabled={loading}>
                                {loading ? <Spin size="small" /> : "SIGN-IN"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
