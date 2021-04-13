import axios from "axios";
import { API_URL } from '../../constants';

export const confirmRegistration = async (regToken: string) => {

    return await axios.put(
        `${API_URL}/users/register/${regToken}`,
    );
};