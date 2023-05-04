import isAuthenticated from '../modules/isAuthenticated.mjs'

const preventAccess = async () => {
    const authenticated = await isAuthenticated()
    if (authenticated) {
        window.location.href = '/'
    }
}

window.addEventListener('load', preventAccess)