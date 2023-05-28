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
        
        listItems[4].querySelector('a').href =
        '../../pages/profile/profile.html';

        listItems[1].querySelector('a').href =
        '/?favorites=true';

        listItems[5].querySelector('a').href =
        '/?favorites=true';

        if (Number(localStorage.getItem('cartItem')) > 0) {
            cartCountField.textContent = localStorage.getItem('cartItem');
        }
        listItems[2].children[0].href = '../../pages/cart/cart_page.html'
        currentPriceField.textContent = localStorage.getItem('totalPrice');
    }

}

window.addEventListener('load', loadAuthenticatedHome);
const navWrapper = document.querySelector('.header .wrapper.mobile')
const mobileButton = document.getElementById('mobile-menu')

mobileButton.addEventListener('click', () => {
    if (!navWrapper.style.display || navWrapper.style.display === 'none') {
        navWrapper.style.display = 'flex'

    } else {
        navWrapper.style.display = 'none'
    }
    mobileButton.classList.toggle('active')
})
