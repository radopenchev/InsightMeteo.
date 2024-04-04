import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyC1Qnqjetogw6QtyUOhl0l_18Vl1X2eiAo",
    authDomain: "weather-36ae6.firebaseapp.com",
    databaseURL: "https://weather-36ae6-default-rtdb.firebaseio.com",
    projectId: "weather-36ae6",
    storageBucket: "weather-36ae6.appspot.com",
    messagingSenderId: "522097498531",
    appId: "1:522097498531:web:b29655894ba5739135e216"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

const signUpButton = document.getElementById("signUp");
const loginButton = document.getElementById("login");
const forgotPasswordLink = document.getElementById('forgot-password');

signUpButton.addEventListener('click', (e) => {
    e.preventDefault(); 

    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const username = document.getElementById('signup-username').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            return set(ref(database, 'users/' + user.uid), {
                username: username,
                email: email
            });
        })
        .then(() => {
            alert('User created!');
            window.location.href = "signin.html";
        })
        .catch((error) => {
            alert(error.message);
        });
});

loginButton.addEventListener('click', (e) => {
    e.preventDefault(); 

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;

            const dt = new Date();
            return update(ref(database, 'users/' + user.uid), {
                last_login: dt,
            });
        })
        .then(() => {
            window.location.href = "main.html";
        })
        .catch((error) => {
            alert(error.message);
        });
});      

forgotPasswordLink.addEventListener('click', (e) => {
    e.preventDefault();
    
    const email = prompt("Please enter your email:");
    
    if (email) {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('Password reset email sent. Please check your inbox.');
            })
            .catch((error) => {
                console.error(error);
                alert('Failed to send password reset email. Please try again.');
            });
    }
});

const togglePasswordVisibility = (inputField, toggleIcon) => {
    const type = inputField.getAttribute('type') === 'password' ? 'text' : 'password';
    inputField.setAttribute('type', type);

    toggleIcon.classList.toggle('bi-eye');
    toggleIcon.classList.toggle('bi-eye-slash');
};

document.getElementById('togglePassword').addEventListener('click', () => {
    const signupPasswordInput = document.getElementById('signup-password');
    const togglePasswordIcon = document.getElementById('togglePassword');
    togglePasswordVisibility(signupPasswordInput, togglePasswordIcon);
});

document.getElementById('toggleLoginPassword').addEventListener('click', () => {
    const loginPasswordInput = document.getElementById('login-password');
    const toggleLoginPasswordIcon = document.getElementById('toggleLoginPassword');
    togglePasswordVisibility(loginPasswordInput, toggleLoginPasswordIcon);
});