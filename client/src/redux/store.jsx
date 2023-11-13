import { configureStore } from '@reduxjs/toolkit';
import announcementSlice from './slices/announcementSlice';
import feedSlice from './slices/feedSlice';

const store = configureStore({
  reducer: {
    announcements : announcementSlice,
    feeds : feedSlice,
  }
})

export default store;