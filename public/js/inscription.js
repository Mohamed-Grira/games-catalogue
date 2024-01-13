let inputUsername = document.getElementById('input-username');
let inputPassword = document.getElementById('input-password');
let formLogin = document.getElementById('form-inscription');

formLogin.addEventListener('submit', async (event) => {
    event.preventDefault();

    const data = {
        username: inputUsername.value,
        password: inputPassword.value
    };

    let response = await fetch('/inscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if(response.ok) {
        window.location.replace('/');
    }
    else if(response.status === 409) {
        error.style.display = 'block';
        error.innerText = 'Le nom d\'utilisateur entré existe déjà.';
    }
});
