import isAuthenticated from '../modules/isAuthenticated.mjs';
import getNewTokens from '../modules/refreshTokens.mjs';

const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};

const loadData = async () => {
    const fRes = await fetch(BASE_URL, {
        method: 'GET',
        headers: { Authorization: `Bearer ${localStorage.getItem('access')}` },
    });
    if (fRes.status === 401) {
        await getNewTokens(localStorage.getItem('refresh'));
        loadData()
    } else {
        const jsonRes = await fRes.json();
        console.log(jsonRes);
        // TODO Fill the fields
    }
    
  
};

const authenticated = await isAuthenticated();
if (!authenticated) {
    window.location.href = '/';
}

const userId = parseJwt(localStorage.getItem('access')).user_id;
const BASE_URL = `http://127.0.0.1:8000/user/${userId}`;

window.addEventListener('load', loadData);
