import getNewTokens from '../../modules/refreshTokens.mjs';

const ulWrapper = document.getElementById('order_wrapper');

window.addEventListener('load', controller);

async function controller() {
    const orders = await loadOrders();
    if (orders.length > 0) {
        updateDom(orders);
        attachButtonListeners()
    } else {
        loadEmptyScreen();
    }
}

async function loadOrders() {
    const URL = 'http://127.0.0.1:8000/orders/short_list/';
    const fRes = await fetch(URL, {
        method: 'GET',
        headers: { Authorization: 'Bearer ' + localStorage.getItem('access') },
    });
    if (fRes.status === 401) {
        await getNewTokens(localStorage.getItem('refresh'));
        return loadOrders();
    }
    const jsonRes = await fRes.json();
    return jsonRes;
}

function updateDom(orders) {
    for (const orderObj of orders) {
        const { order_number, date, price, order_number_short } = orderObj;
        ulWrapper.innerHTML += '<li class="list_item"> <div class="order_data"> <div class="field_wrapper"> <div class="field_label"> <i class="fab fa-slack-hash"></i> <p>Order Number</p> </div> <div class="field_data" id="order_number"></div> </div> <div class="field_wrapper"> <div class="field_label"> <i class="far fa-clock"></i> <p>Date</p> </div> <div id="order_date" class="field_data"></div> </div> <div class="field_wrapper"> <div class="field_label"> <i class="fas fa-money-bill-alt"></i> <p>Price</p> </div> <div id="prder_price" class="field_data"></div> </div> </div> <button id="viewBtn" class="btn"><i class="fas fa-eye"></i> View Order</button> </li>'
        const orderNumber = Array.from(document.querySelectorAll('#order_number')).pop()
        orderNumber.textContent = order_number_short
        const dateField = Array.from(document.querySelectorAll('#order_date')).pop()
        dateField.textContent = date
        const priceField = Array.from(document.querySelectorAll('#prder_price')).pop()
        priceField.textContent = `${price}lv`
        const viewOrderButton = Array.from(document.querySelectorAll('#viewBtn')).pop()
        Array.from(ulWrapper.querySelectorAll('.list_item')).pop().id = order_number

    }
}

function loadEmptyScreen() {}

function attachButtonListeners() {
    const buttons = Array.from(ulWrapper.querySelectorAll('#viewBtn.btn'))
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            window.location.href = `../../../pages/profile/profile_orders.html?order=${button.parentNode.id}'`
        })
    })
    
}


