import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { schoolApi } from '../services/schoolApi'
import { schoolZonalApi } from '../services/schoolZonalApi'
import { complaintApi } from '../services/complaintApi'

export const store = configureStore({
  reducer: {
    [schoolApi.reducerPath] : schoolApi.reducer,
    [schoolZonalApi.reducerPath] : schoolZonalApi.reducer,
    [complaintApi.reducerPath] : complaintApi.reducer
  },
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(schoolApi.middleware,schoolZonalApi.middleware,complaintApi.middleware),
})


setupListeners(store.dispatch)