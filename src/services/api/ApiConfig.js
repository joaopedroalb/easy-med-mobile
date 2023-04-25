import axios from 'axios'

import Constants from "expo-constants";
const { manifest } = Constants;

const BASE_URL = 'https://easymed.onrender.com/api/v1'
// const BASE_URL = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
//   ? 'http://'+manifest.debuggerHost.split(`:`).shift().concat(`:8000/api/v1`)
//   : `http://localhost:8000/api/v1`;

export const Api = () => {
    return axios.create({
        baseURL:BASE_URL,
    })
}