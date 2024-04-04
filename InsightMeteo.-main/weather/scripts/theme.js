import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, set, ref, update, onValue } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

(function () {
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

    var icon = document.getElementById("icon");

    onAuthStateChanged(auth, (user) => {
        if (user) {
            const userId = user.uid;
            const userRef = ref(database, 'users/' + userId);
            onValue(userRef, (snapshot) => {
                const userData = snapshot.val();
                if (userData && userData.theme === "dark-theme") {
                    document.body.classList.add("dark-theme");
                }
            });
        }
    });

    icon.onclick = function () {
        toggleDarkTheme();
    };

    function toggleDarkTheme() {
        document.body.classList.toggle("dark-theme");
        var iconSrc = icon.src.includes("sun.png") ? "img/moon.png" : "img/sun.png";
        icon.src = iconSrc;
        const theme = document.body.classList.contains("dark-theme") ? "dark-theme" : "";
        const user = auth.currentUser;
        if (user) {
            const userId = user.uid;
            const userRef = ref(database, 'users/' + userId);
            update(userRef, { theme: theme });
        }
    }
})();