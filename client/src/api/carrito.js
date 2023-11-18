import axios from  './axios.js'

export const getCarritoArteRequest = () => axios.get(`/carrito`)

export const createCarritoArteRequest = (carrito) => axios.post(`/carrito`, carrito)

export const putCarritoRequest = (arteId, query, carrito ) => {
    return axios.put(`/carrito/${arteId}?query=${query}`, carrito)
}