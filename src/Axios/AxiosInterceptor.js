import axios from "axios"
import Cookies from "js-cookie"


const apiUrl = "http://localhost:5000/api/v1"


// const apiUrl = "https://physiohub.onrender.com/api/v1";


const api = axios.create({
    baseURL : apiUrl,
    headers : {
        'Content-Type' : 'application/json'
    },
    withCredentials : false  //only for token and cookie
})

api.interceptors.request.use((config)=> {

    const accessToken = Cookies.get("token")

    if(accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }

    if(config.data instanceof FormData) {
        config.headers['Content-Type'] = "multipart/form-data"
    }

    return config
},

(error) => {
    return Promise.reject(error)
})

export default api

