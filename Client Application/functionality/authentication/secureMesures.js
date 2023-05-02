const preventAccess = () => {
    const token = localStorage.getItem('refresh')
    if (token) {
        window.location.href = "/";
    }
}

window.addEventListener('load', preventAccess)