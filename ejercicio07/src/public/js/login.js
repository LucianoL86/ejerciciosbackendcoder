async function postLogin(email, password) {
    const response = await fetch('session/login', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })

    const data = await response.json()

    if (data.respuesta === 'success') {
        if (data.user) {
            const { first_name, last_name } = data.user
            alert(`¡Bienvenido, ${first_name} ${last_name}!`)
        } else {
            alert('¡Bienvenido, Administrador!')
        }
        window.location.href = '/products'

    } else {
        alert('Datos incorrectos')
    }
}

const loginForm = document.getElementById('login-form')

loginForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    postLogin(email, password)
})