import axios, {AxiosInstance} from 'axios';


export const axiosInstance: AxiosInstance = axios.create({


                                                             baseURL: 'https://dd-v2.onrender.com',
                                                             timeout: 0,
                                                             headers: {
                                                                 'Content-Type': 'application/json',
                                                             },
                                                         });