import axios from "axios"

const instance = axios.create({
    timeout: 5000,
    method: 'GET'
})
export default instance