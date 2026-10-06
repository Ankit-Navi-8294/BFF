import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  total: 0,
  subtotal: 0,
  isLoading: false,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.items = action.payload.items || []
      state.subtotal = action.payload.subtotal || 0
      state.total = (state.subtotal * 1.05) + 50
    },
    addToCartStart: (state) => {
      state.isLoading = true
    },
    addToCartSuccess: (state, action) => {
      state.isLoading = false
      state.items = action.payload.items || []
      state.subtotal = action.payload.subtotal || 0
      state.total = (state.subtotal * 1.05) + 50
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload)
      state.subtotal = state.items.reduce((sum, item) => sum + item.total, 0)
      state.total = (state.subtotal * 1.05) + 50
    },
    clearCart: (state) => {
      state.items = []
      state.subtotal = 0
      state.total = 0
    },
  },
})

export const { setCart, addToCartStart, addToCartSuccess, removeFromCart, clearCart } = cartSlice.actions
export default cartSlice.reducer
