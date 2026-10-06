import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import cartReducer from './slices/cartSlice'
import foodReducer from './slices/foodSlice'
import uiReducer from './slices/uiSlice'

export default configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    food: foodReducer,
    ui: uiReducer,
  },
})
