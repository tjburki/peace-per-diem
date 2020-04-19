import { apiUrl } from '../constants';
import axios from 'axios';

export const getPeaces = async() =>
    (await axios.get(`${apiUrl}/peaces`)).data;

export const getPeacesForUser = async(userId) =>
    (await axios.get(`${apiUrl}/user/${userId}/peaces`)).data;

export const createUpdatePeace = async(peace) => {
    if (peace.peace_id) {
        //Update
        return (await axios.put(`${apiUrl}/peaces/${peace.peace_id}`, peace)).data;
    }
    else {
        //Create
        return (await axios.post(`${apiUrl}/peaces`, peace)).data;
    }
};

export const deletePeace = async(peaceId) =>
    (await axios.delete(`${apiUrl}/peaces/${peaceId}`)).data;
    