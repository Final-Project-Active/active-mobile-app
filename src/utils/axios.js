import axios from "axios";

export const serverRequest = axios.create({
  // baseURL: 'http://localhost:3000'
  baseURL: 'http://13.229.104.123'
})
