import axios from 'axios';
import store from './configureStore';
import {tokenSelector} from '../selector/selectors';

const instance = axios.create({baseURL: process.env.REACT_APP_BACKEND_URL,});

instance.interceptors.request.use((config) => {
    config.headers.Authorization = tokenSelector(store.getState());
    return config;
});

export default instance;
