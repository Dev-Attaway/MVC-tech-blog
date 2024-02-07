const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#name-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      console.log(response);
    }
  }
};

// This function is executed when the button whose id is login-route is pressed
// Routes the user back to the login page
const loginRouteHandler = async (event) => {
  event.preventDefault();
  const response = await fetch('/login', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    document.location.replace('/login');
  } else {
    console.log(response.statusText);
  }
};

document
  .querySelector('.new-user-form')
  .addEventListener('click', signupFormHandler);

document
  .querySelector('#login-route')
  .addEventListener('click', loginRouteHandler);
