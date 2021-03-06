import axios from 'axios';
import { API_URL } from '../../constants';
import { getToken } from '../../helpers/auth/auth';
import { Friend } from './types'

const getAll = async () => {

    const token = getToken();
    if (!token) throw new Error("Invalid token");

    const response = await axios.get(
        `${API_URL}/friends`,
        {
            headers: { authorization: token }
        }
    );

    return response;
};

const search = async (displayedName?: string, page?: number, limit?: number) => {

    const token = getToken();
    // if(!token) return {error: "Invalid token"};

    return await axios.get(
        `${API_URL}/friends`,
        {
            headers: { authorization: token },
            params: {
                page,
                limit,
                displayedName,
            }
        }
    );
};

const invite = async (friendId: string) => {

    const token = getToken();
    // if(!token) return {error: "Invalid token"};

    return await axios.post(
        `${API_URL}/friends/invite/${friendId}`,
        {},
        {
            headers: { authorization: token },
        }
    );
};

const acceptInvitation = async (invitationId: string) => {

    const token = getToken();
    // if(!token) return {error: "Invalid token"};

    return await axios.post(
        `${API_URL}/friends/accept/${invitationId}`,
        {},
        {
            headers: { authorization: token },
        }
    );

}

const declineInvitation = async (invitationId: string) => {

    const token = getToken();
    // if(!token) return {error: "Invalid token"};

    return await axios.post(
        `${API_URL}/friends/decline/${invitationId}`,
        {},
        {
            headers: { authorization: token },
        }
    );
}

const getFriendById = async (friendId: string) => {

    const token = getToken();

    return await axios.get<Friend>(
        `${API_URL}/friends/${friendId}`,
        {
            headers: { authorization: token },
        }
    );
};

const getInvitations = async () => {

    const token = getToken();

    return await axios.get(
        `${API_URL}/friends/invitations`,
        {
            headers: { authorization: token },

        }
    );
};

export { getAll, search, invite, acceptInvitation, declineInvitation, getFriendById, getInvitations }