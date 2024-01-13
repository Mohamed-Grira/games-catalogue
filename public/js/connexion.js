let inputUsername = document.getElementById('input-username');
let inputPassword = document.getElementById('input-password');
let formLogin = document.getElementById('form-connexion');
let error = document.getElementById('error');

formLogin.addEventListener('submit', async (event) => {
    event.preventDefault();

    const data = {
        username: inputUsername.value,
        password: inputPassword.value
    };

    let response = await fetch('/connexion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        window.location.replace('/liste');
    }
    else if(response.status === 401) {
        let data = await response.json();
        error.style.display = 'block';
        if (data.message === 'wronguser') {
            error.innerText = 'Le nom d\'utilisateur entré n\'existe pas.';
        }
        else if(data.message === 'wrongpassword') {
            error.innerText = 'Le mot de passe ne correspond pas à l\'utilisateur.';
        }
        else {
            error.innerText = 'Le nom d\'utilisateur ou le mot de passe entré est incorrect.';
        }
    }
});
