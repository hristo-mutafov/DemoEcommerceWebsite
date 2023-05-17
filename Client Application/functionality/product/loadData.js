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

main();

async function main() {
    const [productPrice, idProduct] = await loadThePage();
    const POST_URL = `http://127.0.0.1:8000/cart/add/${idProduct}/`;
    buyButton.addEventListener("click", addToCart);

    async function loadThePage() {
        const fRes = await fetch(GET_URL, {
            method: "GET",
        });
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
        }
        fastShippingDate.textContent = getDate(2);
        normalShipingDates.first.textContent = getDate(2);
        normalShipingDates.second.textContent = getDate(4);
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
}
