

const initialState = {
  Login: 0,
  DarkMode: false,
  userInfo: {},
  SpinLoading:false
};

// Utility functions for basic encoding/decoding
const encryptData = (data) => btoa(JSON.stringify(data)); // Basic encoding
const decryptData = (data) => JSON.parse(atob(data)); // Basic decoding

const counterReducer = (state = initialState, action) => {
  // // debugger
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: action.payload };

    case 'DECREMENT':
      return { ...state, count: action.payload };

    case 'TOGGLE_DARK_MODE':
      debugger
      return {
        ...state,
        DarkMode: action.payload,
      };

      case 'spin_loading':
       debugger
      return {
        ...state,
        SpinLoading: action.payload,
      };

    case 'Login':
       debugger
      localStorage.setItem("Login", "true")
      return {
        ...state,
        isAuthenticated: true,
        userInfo: action.payload.userInfo,
        token: action.payload.jsonToken,
      };

    // Retrieve and decrypt the data to pass as payload (for demonstration)
    default:
      if (localStorage.getItem("Login") === "true") {
        let userinfo = localStorage.getItem("userInfo");
        return {
          ...state,
          Login: 1,
          isAuthenticated: true,
          userInfo: JSON.parse(userinfo)[0],
          // token: action.payload.jsonToken,
        };
      }
      else {
        return state;
      }

  }
};

export default counterReducer;
