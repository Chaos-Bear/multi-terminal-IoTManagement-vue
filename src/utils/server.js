import http from "./http.js";


// console.log(import.meta.env)
//  
const request=http({
  baseURL:import.meta.env.VITE_BASE_URL
})

// 平板借还 
const tabletRequest=http({
  baseURL:import.meta.env.VITE_BASE_URL3
})
// 平板借还ws 
const tabletWSRequest=http({
  baseURL:import.meta.env.VITE_BASE_URL4
})

const noderedrequest=http({
  baseURL:import.meta.env.VITE_BASE_URL1
})

export {request,tabletRequest,noderedrequest,tabletWSRequest}