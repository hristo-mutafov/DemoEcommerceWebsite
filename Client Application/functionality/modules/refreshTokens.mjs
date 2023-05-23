export default async function getNewTokens(refreshToken) {
    const BASE_URL = 'http://127.0.0.1:8000/token/refresh/';
    const fRes = await fetch(BASE_URL, {
        method: 'POST',
        body: JSON.stringify({ refresh: refreshToken }),
        headers: { 'Content-Type': 'application/json' },
    });
    if (fRes.status !== 200) {
        localStorage.removeItem('refresh');
        localStorage.removeItem('access');
        window.location.href = '/';
    } else {
        const jsonRes = await fRes.json();
        localStorage.setItem('access', jsonRes.access);
    }
    
}
