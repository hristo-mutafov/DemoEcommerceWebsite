import isAuthenticated from '../modules/isAuthenticated.mjs';

async function loadAuthenticatedHome(path) {
    const authenticated = await isAuthenticated();
    if (authenticated) {
        const cartCountField = document.querySelector(
            '.header .wrapper #cartItemsCount'
        );
        const currentPriceField = document.querySelector(
            '.header .wrapper #headerPrice'
        );

        const listItems = Array.from(
            document.querySelectorAll('.header .list_item')
        );
        listItems.forEach((item) => item.classList.remove('disabled'));
        listItems[0].querySelector('a').href =
            '../../pages/profile/profile.html';

        if (Number(localStorage.getItem('cartItem')) > 0) {
            cartCountField.textContent = localStorage.getItem('cartItem');
        }
        listItems[2].children[0].href = '../../pages/cart/cart_page.html'
        currentPriceField.textContent = localStorage.getItem('totalPrice');
    }
}

window.addEventListener('load', loadAuthenticatedHome);
