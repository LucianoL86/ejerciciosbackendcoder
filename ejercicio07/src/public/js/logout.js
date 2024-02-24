const logout = document.getElementById('logout');
logout.addEventListener('click', async () => {
    await fetch('/session/logout', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    window.location.href = '/login'
})