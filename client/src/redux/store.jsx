import { configureStore } from '@reduxjs/toolkit'
import announcementSlice from './slices/announcementSlice'

const store = configureStore({
  reducer: {
    announcements : announcementSlice
  }
})

export default store