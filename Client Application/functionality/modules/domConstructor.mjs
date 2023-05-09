export default function domFactory(tag, content, parent, attrs=null) {
    const element = document.createElement(tag)

    if (content && tag !== 'input') {
        element.textContent = content
    }

    if (content && tag === 'input') {
        element.value = content
    }

    
    if (attrs) {
        for (const attr in attrs) {
            element.setAttribute(attr, attrs[attr])
        }
    }

    parent.appendChild(element)
    return element
}