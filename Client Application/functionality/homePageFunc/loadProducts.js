import domFactory from '../modules/domConstructor.mjs'

const main = document.querySelector('#main.index_page')
const BASE_URL = 'http://127.0.0.1:8000/products/'

fetch(BASE_URL, {
    method: 'GET',
})
    .then((res) => res.json())
    .then((data) => {
        for(const product of data) {
            const {id, image, name, price, added_on} = product
            const [year, mount, day] = added_on.split('-')
            const productCreateDate = new Date(year, mount, day)
            const todayDate = new Date()
            const diff = productCreateDate.getDate() - todayDate.getDate()
            
            const divWrapper = domFactory(
                'div',
                null,
                main,
                {'class': 'product', 'id': id}
            )
            
            if (Math.abs(diff) < 3) {
                domFactory(
                    'p',
                    'New',
                    divWrapper,
                    {'class': 'new_product'}
                )
            }
            
            
            domFactory(
                'img',
                null,
                divWrapper,
                {'class': 'image', 'src': image}
            )

            const textContainer = domFactory(
                'div',
                null,
                divWrapper,
                {'class': 'text_container'}
            )
            
            domFactory(
                'h3',
                name,
                textContainer,
                {'class': 'heading'}
            )

            domFactory(
                'p',
                `${price}lv`,
                textContainer,
                {'class': 'price'}
            )

            divWrapper.addEventListener('click', () => window.location.href = `../../pages/product/product.html?product=${divWrapper.id}`)
        }
    })