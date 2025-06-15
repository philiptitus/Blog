import { combineReducers } from '@reduxjs/toolkit';
import blogReducer from './slices/blogSlice';

const rootReducer = combineReducers({
  blogs: blogReducer,
  // Add other reducers here as needed
});

export default rootReducer; 