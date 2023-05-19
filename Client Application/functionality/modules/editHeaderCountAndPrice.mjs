export default function editHeaderCountAndPrice(
    productPrice,
    substract = false
) {
    if (!substract) {
        localStorage.setItem(
            'totalPrice',
            (
                Number(localStorage.getItem('totalPrice')) +
                productPrice
            ).toFixed(2)
        );
        localStorage.setItem(
            'cartItem',
            Number(localStorage.getItem('cartItem')) + 1
        );
    } else {
        localStorage.setItem(
            'totalPrice',
            (
                localStorage.getItem('totalPrice') -
                productPrice
            ).toFixed(2)
        );
        localStorage.setItem(
            'cartItem',
            localStorage.getItem('cartItem') - 1
        );
    }
}
