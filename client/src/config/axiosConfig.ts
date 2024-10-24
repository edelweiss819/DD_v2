import axios, {AxiosInstance} from 'axios';

export const axiosInstance: AxiosInstance = axios.create({
                                                             baseURL: import.meta.env.VITE_BACKEND_URI,
                                                             timeout: 0,
                                                             headers: {
                                                                 'Content-Type': 'application/json',
                                                             },
                                                         });
