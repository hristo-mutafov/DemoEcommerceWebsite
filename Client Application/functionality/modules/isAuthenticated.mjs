export default async function isAuthenticated() {
    const VERIFY_TOKEN_URL = 'http://127.0.0.1:8000/token/validate/';
    const token = localStorage.getItem('refresh');

    if (token) {
        const fRes = await fetch(VERIFY_TOKEN_URL, {
            method: 'POST',
            body: JSON.stringify({ token: token }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (fRes.status === 200) {
            return true;
        }
    }
}
