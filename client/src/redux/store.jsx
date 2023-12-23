import { configureStore} from '@reduxjs/toolkit';
import announcementSlice from './slices/announcementSlice';
import feedSlice from './slices/feedSlice';
import authSlice from './slices/authSlice';
import wingSlice from './slices/wingSlice';
import levelSlice from './slices/levelSlice';
import subTopicSlice from './slices/subTopicSlice';
const store = configureStore({
  reducer: {
    announcements : announcementSlice,
    feeds : feedSlice,
    auth : authSlice,
    wings: wingSlice,
    levels : levelSlice,
    subtopics : subTopicSlice
  },
})

export default store;