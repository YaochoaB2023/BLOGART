import axios from './axios'

//const API = 'http://localhost:5000/api'

export const registerRequest = user => axios.post( `/register`, user )

export const loginRequest = user => axios.post( `/login`, user )

export const verifyTokenRequest = () => axios.get(`/verify` )