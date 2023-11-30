import axios from './axios'

//const API = 'http://localhost:5000/api'

export const registerRequest = user => axios.post( `/register`, user )

export const loginRequest = user => axios.post( `/login`, user )

export const logoutRequest = () => axios.post( `/logout` )

export const verifyTokenRequest = () => axios.get(`/verify` )

export const getProfileRequest = () => axios.get('/profile');

export const updateProfileRequest = (userData) => axios.put('/updateUser', userData);