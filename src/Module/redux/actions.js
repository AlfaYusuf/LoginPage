


export const increment = (payload) => {
  // // debugger
  return {
    type: 'INCREMENT',
    payload: payload
  };
};

export const decrement = (payload) => {
  // // debugger
  return {
    type: 'DECREMENT',
    payload: payload
  };
};
export const ASCYLogin = (payload) => {
   // webApi call 
   
  return {
    type: 'Login',
    payload: payload
  };
};

export const toggleDarkMode = (payload) => {
   debugger
  return {
  type: 'TOGGLE_DARK_MODE',
  payload: payload,
}
};

export const  toggleSpinLoading = (payload) =>{
    debugger
  return {
    type:'spin_loading',
    payload: payload
  }
}



