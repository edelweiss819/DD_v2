import axios, {AxiosInstance} from 'axios';


//  Для WSL http://172.17.54.32:3000
//  Для деплоя https://dd-v2.onrender.com
export const axiosInstance: AxiosInstance = axios.create({


                                                             baseURL: 'http://172.17.54.32:3000',
                                                             timeout: 0,
                                                             headers: {
                                                                 'Content-Type': 'application/json',
                                                             },
                                                         });