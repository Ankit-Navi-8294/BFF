import api from './client'

export const ordersApi = {
  createOrder: (deliveryAddress, phoneNumber, specialInstructions = '') =>
    api.post('/orders', { deliveryAddress, phoneNumber, specialInstructions }),

  getOrders: (page = 0, size = 10) =>
    api.get('/orders', { params: { page, size } }),

  getOrderById: (orderId) =>
    api.get(`/orders/${orderId}`),
}
