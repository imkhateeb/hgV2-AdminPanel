import { configureStore} from '@reduxjs/toolkit';
import announcementSlice from './slices/announcementSlice';
import feedSlice from './slices/feedSlice';
import authSlice from './slices/authSlice';
import wingSlice from './slices/wingSlice';
import topicSlice from './slices/topicSlice';
const store = configureStore({
  reducer: {
    announcements: announcementSlice,
    feeds: feedSlice,
    auth: authSlice,
    wings: wingSlice,
    topics: topicSlice,
  },
})

export default store;