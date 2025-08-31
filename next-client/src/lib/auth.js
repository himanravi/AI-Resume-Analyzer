import api from './api';

export const login  = (body) => api.post('/auth/login', body).then(r => r.data);
export const register = (body) => api.post('/auth/register', body).then(r => r.data);
export const verifyToken = () => api.get('/auth/refresh').then(r => r.data);