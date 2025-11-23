import axios from 'axios';
import { baseUrl } from './baseUrl';

export const headerConfigKeyName = 'Joe13';

export function getHeaderConfig() {
    if (typeof localStorage !== 'undefined' && localStorage.getItem(headerConfigKeyName)) {
        return {
            headers: {
                'Content-Type': 'multipart/form-data',
                Accept: 'application/json',
                'Accept-Language': 'ar',
                Authorization: ` Bearer ${JSON.parse(localStorage.getItem(headerConfigKeyName))}`,
            },
        };
    } else {
        return {
            headers: {
                'Content-Type': 'multipart/form-data',
                Accept: 'application/json',
                'Accept-Language': 'en',
            },
        };
    }
}

export let api = axios.create({
    baseURL: baseUrl,
    timeout: 200000,
    headers: getHeaderConfig().headers,
});
