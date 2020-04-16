import axios from 'axios';
import { apiUrl } from '../constants';

export const insertUpdateUser = async(email, username) =>
{
    debugger;
    const response = await axios.post(`${apiUrl}/users`, { email,  username });
    return response.data;
}