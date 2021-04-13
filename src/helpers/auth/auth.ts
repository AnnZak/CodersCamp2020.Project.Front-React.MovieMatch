const TTL = 1000 * 60 * 60; //in ms
const KEY = 'authorization';

type TokenItem = {
    token: string,
    expiry: number
}

const setToken = (token: string) => {

    const now = new Date();

    const tokenItem = JSON.stringify({
        token: `Bearer ${token}`,
        expiry: now.getTime() + TTL
    })

    localStorage.setItem(KEY, tokenItem);
};

const getToken = () => {

    const itemStr = localStorage.getItem(KEY);
    if(!itemStr) return null;
    
    const item = JSON.parse(itemStr) as TokenItem;
    
    const now = new Date();
    if(now.getTime() > item.expiry) {
        localStorage.removeItem(KEY);
        return null;
    }
    return item.token;
}

const deleteToken = () => {
    localStorage.removeItem(KEY);
}

export {getToken, setToken, deleteToken}
