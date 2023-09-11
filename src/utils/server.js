import http from "./http.js";


// console.log(import.meta.env)
const request=http({
  baseURL:import.meta.env.VITE_BASE_URL
})
const noderedrequest=http({
  baseURL:import.meta.env.VITE_BASE_URL1
})

export {request,noderedrequest}