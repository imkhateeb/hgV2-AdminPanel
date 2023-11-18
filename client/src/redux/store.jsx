import { configureStore} from '@reduxjs/toolkit';
import announcementSlice from './slices/announcementSlice';
import feedSlice from './slices/feedSlice';
import authSlice from './slices/authSlice';
import { validateTokenMiddleware } from '../components/authentication/validateTokemMiddleware';

const store = configureStore({
  reducer: {
    announcements : announcementSlice,
    feeds : feedSlice,
    auth : authSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(validateTokenMiddleware)
})

export default store;