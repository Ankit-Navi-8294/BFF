import api from './client'

export const favoritesApi = {
  getFavorites: (page = 0, size = 12) =>
    api.get('/favorites', { params: { page, size } }),

  addFavorite: (foodId) =>
    api.post(`/favorites/${foodId}`),

  removeFavorite: (foodId) =>
    api.delete(`/favorites/${foodId}`),

  checkFavorite: (foodId) =>
    api.get(`/favorites/${foodId}/is-favorited`),
}
