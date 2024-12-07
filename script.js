const signUpButton = document.getElementById('signUpButton');
const signInButton = document.getElementById('signInButton');
const signInForm = document.getElementById('signIn');
const signUpForm = document.getElementById('signup');
const submitSignInButton = document.getElementById('submitSignIn');
const submitSignUpButton = document.getElementById('submitSignUp');

// Toggle between Sign Up and Sign In forms
signUpButton.addEventListener('click', function() {
    signInForm.style.display = "none";
    signUpForm.style.display = "block";
});

signInButton.addEventListener('click', function() {
    signInForm.style.display = "block";
    signUpForm.style.display = "none";
});

// When the user clicks on "Sign In"
submitSignInButton.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent form submission

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Assuming you're using Firebase authentication (or similar backend)
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // If login is successful, redirect to the homepage
            window.location.href = "homepage.html";  // Redirect to homepage after successful login
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            // Display error message if login fails
            const signInMessage = document.getElementById('signInMessage');
            signInMessage.style.display = 'block';
            signInMessage.innerHTML = `Error: ${errorMessage}`;
        });
});
