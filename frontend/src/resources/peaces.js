import { apiUrl } from '../constants';
import axios from 'axios';

export const getPeaces = async(userId, page = 1, date) =>
    (await axios.get(`${apiUrl}/peaces`, { params: { user_id: userId, page, date: date } })).data;

export const getPeacesForUser = async(userId, page = 1) =>
    (await axios.get(`${apiUrl}/user/${userId}/peaces`, { params: { page } })).data;

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

export const lovePeace = async(peaceId, userId) =>
    (await axios.post(`${apiUrl}/loves/${peaceId}`, {user_id: userId})).data;

//TODO: delete by loveid
export const unlovePeace = async(peaceId, userId) =>
    (await axios.delete(`${apiUrl}/loves/${peaceId}`, { data: {user_id: userId}})).data;

export const flagPeace = async(peaceId, userId) =>
    (await axios.post(`${apiUrl}/flags/${peaceId}`, {user_id: userId})).data;
    