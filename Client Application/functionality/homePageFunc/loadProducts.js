import domFactory from '../modules/domConstructor.mjs';
import getNewTokens from '../modules/refreshTokens.mjs';

const main = document.querySelector('#main.index_page .products_wrapper');

const BASE_URL = `http://127.0.0.1:8000/products/${window.location.search}`;
const token = localStorage.getItem('access');
const requestHeaders = {};
if (token) {
    requestHeaders.Authorization = `Bearer ${token}`;
}

fetch(BASE_URL, {
    method: 'GET',
    headers: requestHeaders,
})
    .then((res) => {
        if (res.status === 401) {
            getNewTokens(localStorage.getItem('refresh'));
            window.location.reload();
        }
        return res;
    })
    .then((res) => res.json())
    .then((data) => {
        if (!data.length) {
            domFactory(
                'h1',
                'There are no products added here yet.',
                document.querySelector('#main.index_page'),
                {'class': 'emptyPageMassage'}
            )
        }
        for (const product of data) {
            const { id, image, name, price, added_on, in_favorites } = product;
            const [year, mount, day] = added_on.split('-');
            const productCreateDate = new Date(year, mount, day);
            const todayDate = new Date();
            const diff = productCreateDate.getDate() - todayDate.getDate();

            const divWrapper = domFactory('div', null, main, {
                class: 'product',
                id: id,
            });

            if (Math.abs(diff) < 3) {
                domFactory('p', 'New', divWrapper, { class: 'new_product' });
            }

            domFactory('img', null, divWrapper, { class: 'image', src: image });

            const data_section_container = domFactory('div', null, divWrapper, {
                class: 'data_section',
            });

            const textContainer = domFactory(
                'div',
                null,
                data_section_container,
                { class: 'text_container' }
            );

            domFactory('h3', name, textContainer, { class: 'heading' });

            domFactory('p', `${price}lv`, textContainer, { class: 'price' });

            const heartIcon = domFactory('i', null, data_section_container, {
                id: 'icon',
            });

            if (in_favorites) {
                heartIcon.classList = 'fas fa-heart';
            } else {
                heartIcon.classList = 'far fa-heart';
            }


            divWrapper.addEventListener(
                'click', async(e) => {
                    if (e.target.classList.contains('fa-heart')) {
                        if (token) {
                            let request;
                            if (in_favorites) {
                                request = await fetch(
                                    `http://127.0.0.1:8000/favorites/remove/${divWrapper.id}/`,
                                    {
                                        method: 'PATCH',
                                        headers: requestHeaders,
                                    }
                                );
                                window.location.reload()
                            } else {
                                request = await fetch(
                                    `http://127.0.0.1:8000/favorites/add/${divWrapper.id}/`,
                                    {
                                        method: 'PATCH',
                                        headers: requestHeaders,
                                    }
                                );
                                window.location.reload()
                            }
        
                            if (request.status !== 200) {
                                getNewTokens(localStorage.getItem('refresh'));
                                return addEventListener.click();
                            }
                        } else {
                            window.location = '../../pages/auth/register.html';
                        }
                    } else {
                        window.location.href = `../../pages/product/product.html?product=${divWrapper.id}`
                    }
                }
            )
        }

        
    });
