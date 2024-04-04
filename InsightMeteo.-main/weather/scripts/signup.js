    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
    import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
    import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

    //Firebase configuration
     const firebaseConfig = {
   apiKey: "AIzaSyC1Qnqjetogw6QtyUOhl0l_18Vl1X2eiAo",
   authDomain: "weather-36ae6.firebaseapp.com",
   databaseURL: "https://weather-36ae6-default-rtdb.firebaseio.com",
   projectId: "weather-36ae6",
   storageBucket: "weather-36ae6.appspot.com",
   messagingSenderId: "522097498531",
   appId: "1:522097498531:web:b29655894ba5739135e216"
};

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    const auth = getAuth();

    const signUpButton = document.getElementById("signUp");
    const loginButton = document.getElementById("login");

    signUpButton.addEventListener('click', (e) => {
        e.preventDefault(); 

        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm-password').value;
        const username = document.getElementById('signup-username').value;

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        if (password.length < 8) {
            alert('Password is too weak. It must be at least 8 characters long.');
            return;
        }

        if (!/[A-Z]/.test(password)) {
            alert('Password is too weak. It must contain at least one uppercase letter.');
            return;
        }

        if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)) {
            alert('Password is too weak. It must contain at least one symbol.');
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
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
                
                const user = userCredential.user;

                const dt = new Date();
                return update(ref(database, 'users/' + user.uid), {
                    last_login: dt,
                });
            })
            .then(() => {
                alert('User logged in');
                window.location.href = "main.html";
            })
            .catch((error) => {
                alert(error.message);
            });
    });      

const togglePasswordVisibility = (passwordInputId, togglePasswordIconId) => {
        const passwordInput = document.getElementById(passwordInputId);
        const togglePasswordIcon = document.getElementById(togglePasswordIconId);

        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);

        togglePasswordIcon.classList.toggle('bi-eye');
        togglePasswordIcon.classList.toggle('bi-eye-slash');
    };

    document.getElementById('togglePassword').addEventListener('click', () => {
        togglePasswordVisibility('signup-password', 'togglePassword');
    });

    document.getElementById('toggleConfirmPassword').addEventListener('click', () => {
        togglePasswordVisibility('signup-confirm-password', 'toggleConfirmPassword');
    });