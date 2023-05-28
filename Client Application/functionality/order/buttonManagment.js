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
        wrapper.innerHTML = '<h2 class="heading">YOUR CARD INFORMATION</h2> <div class="field_wrapper"> <label for="phone_field" class="phone_label">Card Number:</label> <input type="text" id="cardNumberField"> </div> <div class="field_wrapper"> <label for="name_field" class="name_label">Expiration Date:</label> <div class="exp_date"> <select name="expireMM" id="expireMM"> <option value="">Month</option> <option value="01">January</option> <option value="02">February</option> <option value="03">March</option> <option value="04">April</option> <option value="05">May</option> <option value="06">June</option> <option value="07">July</option> <option value="08">August</option> <option value="09">September</option> <option value="10">October</option> <option value="11">November</option> <option value="12">December</option> </select> <span>/</span> <select name="expireYY" id="expireYY"> <option value="">Year</option> <option value="20">2020</option> <option value="21">2021</option> <option value="22">2022</option> <option value="23">2023</option> <option value="24">2024</option> </select> <input class="inputCard" type="hidden" name="expiry" id="expiry" maxlength="4"/> </div> </div> <div class="field_wrapper"> <label for="address_field" class="address_label">CVC:</label> <input type="cvc" id="cvcField"> </div>'
    } else {
        wrapper.innerHTML = ''
    }
}
