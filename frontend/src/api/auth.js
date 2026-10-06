import api from './client'

export const authApi = {
  login: (email, password) =>
    api.post('/auth/login', { email, password }),

  register: (firstName, lastName, email, password) =>
    api.post('/auth/register', { firstName, lastName, email, password }),

  refresh: (refreshToken) =>
    api.post('/auth/refresh', { refreshToken }),

  logout: () =>
    api.post('/auth/logout'),

  me: () =>
    api.get('/auth/me'),
}
