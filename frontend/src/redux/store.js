import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import issueReducer from './slices/issueSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    issues: issueReducer,
  },
});

export default store;
