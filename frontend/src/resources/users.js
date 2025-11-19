import axios from 'axios';
import { apiUrl } from '../constants';

export const insertUpdateUser = async(email, username) =>
{
    const response = await axios.post(`${apiUrl}/users`, { email,  username });
    return response.data;
}

export const getLovesForUser = async(userId) =>
    (await axios.get(`${apiUrl}/users/${userId}/loves`)).data;