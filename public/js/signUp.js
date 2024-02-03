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
<<<<<<< HEAD
=======
      const json = await response.json();
      console.log(json);

      //  send an email using some email sending service or library.
      // The exact implementation of the Email.send() function is not provided in the code snippet,
      //  but it seems to handle the sending of emails.

      /* SecureToken: This appears to be an authentication token required by the email sending service/library.
        To: The email address of the user who signed up.
        From: The sender's email address.
        Subject: The subject of the email.
        Body: The body content of the email, which includes HTML formatting.
        */
      try {
        const message = await Email.send({
          SecureToken: json.smtpjs_secure_token,
          To: email,
          From: 'TotallyRealFakeStore@gmail.com',
          Subject: 'Thank you - Real Fake Store',
          Body: `
    <img src="https://imgur.com/OTK4tfx.png" alt="StoreLogo"/>
    <p style="padding: 12px; border-left: 4px solid #d0d0d0; font-style: italic;">

      We hope this email finds you well and in great spirits. On behalf of the entire Fake Store team, we would like to extend a warm welcome and express our sincere gratitude for joining our website.

      Thank you for signing up with us! Your decision to become a part of the Fake Store family means a lot to us, and we are thrilled to have you on board.

      By becoming a member, you now have access to exclusive updates, special promotions, and a first look at our latest Comments. We are confident that you will find great value in being a part of our community, and we are committed to delivering an exceptional shopping experience for you.

      <br>
      <br>

      We encourage you to explore our website regularly, as we frequently update our Comment offerings and promotions. If you have any questions or need assistance, our dedicated customer support team is always here to help.

      Once again, thank you for choosing Fake Store. We look forward to serving you and providing you with a fantastic shopping experience.


      </p>
      <p>
        Warm regards,<br>Real Fake Store Team
      </p>`,
        });
        if (message === 'OK') {
          console.log('check your email');
        } else {
          console.log('something went wrong');
        }
      } catch (err) {
        console.log(err);
        console.log('You signed up');
      }
>>>>>>> 9a53ed70d64bcef68c2cff53f47635f81debb21e
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
