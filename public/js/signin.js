import Auth from './services/auth.js';

const form = document.querySelector('form');

function showToast(message) {
  document.querySelector('.toast-header strong').innerText = message;
  const toast = new bootstrap.Toast(document.querySelector('#liveToast'));
  toast.show();
}

function loadSigninSubmit() {
  form.onsubmit = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    const user = { email, password };

    const configRequest = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    };

    const url = '/signin';

    const { auth, token } = await (await fetch(url, configRequest)).json();

    if (auth) {
      Auth.signin(token);
    } else {
      //showToast('Error no login');
      document.querySelector( '[data-js="result"]' ).innerHTML = ("Senha ou Usuario Invalido");       

    }
  };
}

loadSigninSubmit();
