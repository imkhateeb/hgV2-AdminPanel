import { configureStore } from '@reduxjs/toolkit';
import announcementSlice from './slices/announcementSlice';
import feedSlice from './slices/feedSlice';
import authSlice from './slices/authSlice';

const store = configureStore({
  reducer: {
    announcements : announcementSlice,
    feeds : feedSlice,
    auth : authSlice
  }
})

export default store;