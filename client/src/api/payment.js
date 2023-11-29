import axios from "./axios";

export const createOrderRequest = () => axios.post('/create-order');