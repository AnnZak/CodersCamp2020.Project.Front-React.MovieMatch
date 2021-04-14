import axios from "axios";
import { API_URL } from '../../constants';
import { getToken } from "../../helpers/auth/auth";

export const confirmRegistration = async (regToken: string) => {

    return await axios.put(
        `${API_URL}/users/register/${regToken}`,
    );
};

export const getUserData = async () =>  {

    const token = getToken();
    if(!token) throw new Error("no token");

    return await axios.get(
        `${API_URL}/users`,
        {
            headers: { authorization: token },
        }
    );
};

export const searchUsers = async (dispName: string) =>  {

    const token = getToken();
    if(!token) throw new Error("no token");

    return await axios.get(
        `${API_URL}/users`,
        {
            headers: { authorization: token },
            params: { displayedName : dispName }
        }
    );
};

export const forgotPassword = async (email:string) => {
    return await axios.post(
        `${API_URL}/users/forgotpassword`,
        {
            email
        },
    );
}