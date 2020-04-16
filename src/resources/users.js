import axios from 'axios';

export const insertUpdateUser = async(email, username) =>
{
    debugger;
    const response = await axios.post('http://localhost:3001/users', { email,  username });
    return response.data;
}