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
    if (password.length < 8) {
      invalidPassword();
    }
    if (response.ok) {
      document.location.replace('/profile');
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

// This is event is executed when the password input is invalid
// Makes a div, that is hidden by the class "hidden", visible by .classList.remove('hidden');
// Uses a timer to determine for how long the div should be visible for
const invalidPassword = () => {
  var quickTimerCtr = 20;
  hiddenElement = document.querySelector('#invalid-password');
  const quickTimer = setInterval(function () {
    quickTimerCtr--;
    hiddenElement.classList.remove('hidden');
    if (quickTimerCtr <= 0) {
      hiddenElement.classList.add('hidden');
      clearInterval(quickTimer);
    }
  }, 100);
};

document
  .querySelector('.new-user-form')
  .addEventListener('click', signupFormHandler);

document
  .querySelector('#login-route')
  .addEventListener('click', loginRouteHandler);
