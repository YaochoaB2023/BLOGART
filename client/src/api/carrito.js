import axios from  './axios.js'

export const getCarritoArteRequest = () => axios.get(`/carrito`)

export const createCarritoArteRequest = (carrito) => axios.post(`/carrito`, carrito)

export const deleteArteRequest = (arteId) => axios.delete(`/carrito/${arteId}`);
