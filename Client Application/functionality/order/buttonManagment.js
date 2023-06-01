const deliveryForm = document.getElementById('deliveryMethodForm');
const paymentForm = document.getElementById('paymentForm')

deliveryForm.addEventListener('change', deliveryChangeFunc);
paymentForm.addEventListener('change', paymentChangeFunc)

function deliveryChangeFunc(e) {
    const inputLabelForAddress = document.getElementById('addressOrOfficeLabel')
    const selectedOption = e.target.id;
    if (selectedOption === 'to_address') {
        inputLabelForAddress.textContent = 'Address*:'
    } else {
        inputLabelForAddress.textContent = 'Office*:'
    }
}

function paymentChangeFunc(e) {
    const selectedOption = e.target.id
    const wrapper = document.getElementById('cardInfoWrapper')
    if (selectedOption === 'strypes_payment') {
        wrapper.style.display = 'block'
    } else {
        wrapper.style.display = 'none'
    }
}
