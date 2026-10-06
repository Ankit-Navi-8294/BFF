import api from './client'

export const cartApi = {
  getCart: () =>
    api.get('/cart'),

  addItem: (foodId, quantity = 1) =>
    api.post('/cart/items', { foodId, quantity }),

  updateItem: (cartItemId, quantity) =>
    api.put(`/cart/items/${cartItemId}`, null, { params: { quantity } }),

  removeItem: (cartItemId) =>
    api.delete(`/cart/items/${cartItemId}`),

  clearCart: () =>
    api.delete('/cart'),
}
