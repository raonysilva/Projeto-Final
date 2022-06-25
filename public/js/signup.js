const form = document.querySelector('form');

function loadSignupSubmit() {
  form.onsubmit = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    const user = { name, email, password };

    const configRequest = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    };

    const url = '/users';

    fetch(url, configRequest);

    location.href = '/signin.html';
  };
}

loadSignupSubmit();