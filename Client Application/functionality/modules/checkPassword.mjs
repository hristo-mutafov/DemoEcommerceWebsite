export default async function checkPassword(password) {
    const BASE_URL = `http://127.0.0.1:8000/user/validate_password/`;

    const fRes = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('access'),
        },
        body: JSON.stringify({ password }),
    });
    if (fRes.status === 200) {
        return true;
    }
}
