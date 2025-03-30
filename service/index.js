import axios from 'axios';
import { API_BASE_URL, TOKEN } from '@/config/appConfig';

const BASE_URL = API_BASE_URL;

const apiService = axios.create({
    baseURL: BASE_URL,
});

const apiCall = async ({ url, method = 'GET', params = {}, data = {}, headers = {} }) => {

    try {
        const response = await apiService.request({
            url,
            method,
            params,
            data,
            headers: {
                Authorization: "Bearer " + TOKEN,
                ...headers,
            },
        });
        return response.data;
    } catch (error) {

        throw error;
    }
};

export default apiCall;
