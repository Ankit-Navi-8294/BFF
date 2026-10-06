import api from './client'

export const foodApi = {
  getAll: (page = 0, size = 12) =>
    api.get('/foods', { params: { page, size } }),

  getById: (id) =>
    api.get(`/foods/${id}`),

  getTopRated: () =>
    api.get('/foods/top/rated'),

  search: (params) =>
    api.get('/foods/search', { params }),

  getByCategory: (categoryId, page = 0, size = 12) =>
    api.get(`/foods/category/${categoryId}`, { params: { page, size } }),

  getByRegion: (regionId, page = 0, size = 12) =>
    api.get(`/foods/region/${regionId}`, { params: { page, size } }),

  getByCuisine: (cuisineId, page = 0, size = 12) =>
    api.get(`/foods/cuisine/${cuisineId}`, { params: { page, size } }),

  getVegetarian: (page = 0, size = 12) =>
    api.get('/foods/vegetarian', { params: { page, size } }),
}

export const categoryApi = {
  getAll: () => api.get('/categories'),
}

export const regionApi = {
  getAll: () => api.get('/regions'),
}

export const cuisineApi = {
  getAll: () => api.get('/cuisines'),
}
