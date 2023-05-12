const queryparams = new URLSearchParams(window.location.search);
const userId = queryparams.get("product");
const BASE_URL = `http://127.0.0.1:8000/get/product/${userId}`;

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

fetch(BASE_URL, {
    method: "GET",
})
    .then((res) => res.json())
    .then((data) => {
        const {
            image,
            name,
            description,
            made_in,
            price,
            category,
            quantity,
            brand,
        } = data;
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
    });

function getDate(days) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
}
