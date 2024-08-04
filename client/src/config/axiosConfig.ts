import axios, {AxiosInstance} from 'axios';

export const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'http://172.17.54.32:3000',
    timeout: 0,
    headers: {
        'Content-Type': 'application/json',
    },
});