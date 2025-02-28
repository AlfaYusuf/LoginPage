
import axios from 'axios';
import { connect,useSelector,useDispatch} from 'react-redux';
import { increment, decrement } from './../../Module/redux/actions.js';
import { END_POINT_Login } from './../../Auth/API/Dev.ts'
import { END_POINT_RefreshToken } from './../../Auth/API/Dev.ts'
// Create an Axios instance with default configurations
import store from './../../Module/redux/store.js'
import { toggleSpinLoading } from './../../Module/redux/actions.js';

const axiosInstance = axios.create({
  baseURL: END_POINT_Login,
  headers: {
    'Content-Type': 'application/json',
  },
});
const axiosLoginInstance = axios.create({
  baseURL: END_POINT_Login,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add an interceptor to include the token in the request headers
axiosInstance.interceptors.request.use(
  (config) => {
    debugger
    const token = localStorage.getItem('authToken'); // Adjust to your token storage logic
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export const FetchLoginData = async (endpoint ,showSpinner,EntityObj = {}) => {
   debugger
  try {
    if (showSpinner) {
      store.dispatch(toggleSpinLoading(true));
    }
    const response = await axiosLoginInstance.post(endpoint, EntityObj);
    if (showSpinner) {
      store.dispatch(toggleSpinLoading(false));
    }
    return response.data;
  } catch (error) {
    throw error; // This will handle the error in your calling component
  }

};

const mapStateToProps = (state) => {
  return {
    Login: state.Login, // Mapping the Redux state `Login` to a prop
    SpinLoading:state.SpinLoading
  };
};

const mapDispatchToProps = {
  increment,
  decrement
};

export default connect(mapStateToProps, mapDispatchToProps)





