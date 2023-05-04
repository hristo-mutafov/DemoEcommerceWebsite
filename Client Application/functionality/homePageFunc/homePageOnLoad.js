import isAuthenticated from '../modules/isAuthenticated.mjs';

async function loadAuthenticatedHome() {
    const authenticated = await isAuthenticated();
    if (authenticated) {
        const listItems = Array.from(
            document.querySelectorAll('.header .list_item')
        );
        listItems.forEach((item) => item.classList.remove('disabled'));
        listItems[0].querySelector('a').href =
            'pages/profile/profile.html';
    }
};

window.addEventListener('load', loadAuthenticatedHome);
