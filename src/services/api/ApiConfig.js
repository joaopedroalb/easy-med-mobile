import axios from 'axios'

export const Api = () => {
    const baseUrl = 'http://localhost:8000/api/v1'

    return axios.create({
        baseURL:baseUrl,
    })
}