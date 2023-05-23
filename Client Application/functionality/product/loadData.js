import isAuthenticated from "../../functionality/modules/isAuthenticated.mjs";
import getNewTokens from "../../functionality/modules/refreshTokens.mjs";
import getDate from '../../functionality/modules/getDate.mjs'

const queryparams = new URLSearchParams(window.location.search);
const productId = queryparams.get("product");
const GET_URL = `http://127.0.0.1:8000/get/product/${productId}`;

// Getting fields
const imageField = document.getElementById("rpoductImage");
const nameField = document.getElementById("productName");
const descriptionField = document.getElementById("productDescription");
const madeInField = document.getElementById("productMadeIn");
const bigPriceField = document.getElementById("bigPrice");
const smallPriceField = document.getElementById("smallPrice");
const categoryField = document.getElementById("productCategory");
const inStockWrapper = document.getElementById("inStockWrapper");
const insStockIcon = document.getElementById("inStockIcon");
const brandField = document.getElementById("productBrand");
const fastShippingDate = document.getElementById("fast_date");
const normalShipingDates = {
    first: document.getElementById("normal_date1"),
    second: document.getElementById("normal_date2"),
};
const buyButton = document.getElementById("buyBtn");
const headerPrice = document.querySelector(".header .wrapper #headerPrice");
const cartItemsField = document.querySelector('.header .wrapper #cartItemsCount')
const heartIcon = document.querySelector('.product_page .price_section .add_to_favorites i')
const addToFavoriteWrapper = document.querySelector('.product_page .price_section .add_to_favorites')

main();

async function main() {
    const [productPrice, idProduct] = await loadThePage();
    const POST_URL = `http://127.0.0.1:8000/cart/add/${idProduct}/`;
    buyButton.addEventListener("click", addToCart);

    async function loadThePage() {
        const requestHeaders = {}
        const token = localStorage.getItem("access")
        if (token) {
            requestHeaders.Authorization = `Bearer ${token}`
        }

        const fRes = await fetch(GET_URL, {
            method: "GET",
            headers: requestHeaders
        });

        if (fRes.status !== 200) {
            await getNewTokens(localStorage.getItem("refresh"))
            return loadThePage()
        }

        const jsonRes = await fRes.json();
        const {
            id,
            image,
            name,
            description,
            made_in,
            price,
            category,
            quantity,
            brand,
            in_favorites
        } = jsonRes;

        imageField.src = image;
        nameField.textContent = name;
        descriptionField.textContent = description;
        madeInField.textContent = made_in;
        const [big, small] = price.split(".");
        bigPriceField.textContent = big;
        smallPriceField.textContent = `,${small}`;
        categoryField.textContent = category;
        brandField.textContent = brand;

        if (Number(quantity) > 0) {
            inStockWrapper.classList.add("green");
        } else {
            inStockWrapper.classList.add("red");
            insStockIcon.className = "fas fa-times";
            buyButton.disabled = true
        }
        fastShippingDate.textContent = getDate(2);
        normalShipingDates.first.textContent = getDate(2);
        normalShipingDates.second.textContent = getDate(4);

        if (in_favorites) {
            heartIcon.classList = 'fas fa-heart'
        }

        addToFavoriteWrapper.addEventListener('click', async() => {
            await editFavoriteList(id, token, in_favorites, requestHeaders)
        })
        return [price, id];
    }

    async function addToCart() {
        const isLogin = await isAuthenticated();
        if (!isLogin) {
            window.location.href = "../../pages/auth/register.html";
        }
        const fRes = await fetch(POST_URL, {
            method: "PATCH",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("access"),
            },
        });
        if (fRes.status === 401) {
            getNewTokens(localStorage.getItem("refresh"));
            return addToCart();
        }
        const totalPrice = (
            Number(headerPrice.textContent) + Number(productPrice)
        ).toFixed(2);

        headerPrice.textContent = totalPrice;
        const cartItems = localStorage.getItem("cartItem")
        if (!cartItems) {
            localStorage.setItem("cartItem", 1)
            cartItemsField.textContent = 1
        } else {
            localStorage.setItem("cartItem", Number(cartItems) + 1)
            cartItemsField.textContent = Number(cartItems) + 1
        }
        localStorage.setItem('totalPrice', totalPrice);
    }

    async function editFavoriteList(id, token, in_favorites, requestHeaders) {
        if (token) {
            let request;
            if (in_favorites) {
                request = await fetch(
                    `http://127.0.0.1:8000/favorites/remove/${id}/`,
                    {
                        method: 'PATCH',
                        headers: requestHeaders,
                    }
                );
                window.location.reload()
            } else {
                request = await fetch(
                    `http://127.0.0.1:8000/favorites/add/${id}/`,
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
    }
}
