import axios, {AxiosInstance} from 'axios';
import * as process from 'node:process';


export const axiosInstance: AxiosInstance = axios.create({


                                                             baseURL: process.env.BACK_URI,
                                                             timeout: 0,
                                                             headers: {
                                                                 'Content-Type': 'application/json',
                                                             },
                                                         });