import { apiUrl } from '../constants';
import axios from 'axios';

export const getPeaces = async() =>
    (await axios.get(`${apiUrl}/peaces`)).data;

export const getPeacesForUser = async(userId) =>
    (await axios.get(`${apiUrl}/user/${userId}/peaces`)).data;

export const createPeace = async(userId, text) =>
    (await axios.post(`${apiUrl}/peaces`, { user_id: userId, text })).data;