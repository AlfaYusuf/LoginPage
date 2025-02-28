import { createStore, applyMiddleware } from 'redux';
import counterReducer from './reducers';  // Assuming this is your reducer
import { thunk } from 'redux-thunk';
 // Correct import for redux-thunk

// Create store with thunk middleware
const store = createStore(
  counterReducer,  // Your root reducer
  applyMiddleware(thunk)  // Apply redux-thunk middleware
);

export default store;