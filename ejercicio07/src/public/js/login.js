async function postLogin(email, password) {
    const data = { email, password }

    try {
        const response = await fetch('/api/session/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        const result = await response.json()
        return result
    } catch (error) {
        return { success: false, message: error.message }
    }
}

const loginForm = document.getElementById('login-form')

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const result = await postLogin(email, password)
    if (result.respuesta === 'success') {
        window.location.href = '/products'
    } else {
        alert('Datos incorrectos')
    }
})