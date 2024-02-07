let URLactual = window.location
let URL = URLactual.toString()
let URLsplit = URL.split("/")

let cartId = URLsplit[URLsplit.length - 1]

async function subtract(pid) {

    const URL = `/cart/${cartId}/product/${pid}`

    const response = await fetch(`${URL}`, {
        method: "DELETE",
    })
    const data = await response.json()
    window.location.reload()
}
async function add(pid) {

    const URL = `/cart/${cartId}/product/${pid}`

    const response = await fetch(URL, {
        method: "PUT",
    });
    const data = await response.json()
    window.location.reload()
}
