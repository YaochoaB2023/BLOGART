import axios from  './axios.js'

export const getCarritoArteRequest = () => axios.get(`/carrito`)

export const createCarritoArteRequest = (carrito) => axios.post(`/carrito`, carrito)

export const putCarritoRequest = (obrasId, query, carrito ) => {
    return axios.put(`/carrito/${obrasId}?query=${query}`, carrito)
}