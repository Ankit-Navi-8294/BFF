import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  foods: [],
  categories: [],
  regions: [],
  cuisines: [],
  isLoading: false,
  error: null,
}

const foodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {
    setFoods: (state, action) => {
      state.foods = action.payload
    },
    setCategories: (state, action) => {
      state.categories = action.payload
    },
    setRegions: (state, action) => {
      state.regions = action.payload
    },
    setCuisines: (state, action) => {
      state.cuisines = action.payload
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
  },
})

export const { setFoods, setCategories, setRegions, setCuisines, setLoading, setError } = foodSlice.actions
export default foodSlice.reducer
