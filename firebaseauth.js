// Import necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCP9QM4gVgyKRgAt5IIAWwbK6vgTcb2NMg",
    authDomain: "demoproject-a-6a550.firebaseapp.com",
    projectId: "demoproject-a-6a550",
    storageBucket: "demoproject-a-6a550.firebasestorage.app",
    messagingSenderId: "1029036910489",
    appId: "1:1029036910489:web:52b8aa1c10a1f4f2b35508",
    measurementId: "G-ZRKYWDVELM"
};

// Initialize Firebase services
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

// Handle user sign-up
document.getElementById("submitSignUp").addEventListener("click", async (event) => {
    event.preventDefault();
    const firstName = document.getElementById("fName").value;
    const lastName = document.getElementById("lName").value;
    const email = document.getElementById("rEmail").value;
    const password = document.getElementById("rPassword").value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
            firstName,
            lastName,
            email,
            createdAt: new Date(),
        });

        Swal.fire({
            icon: "success",
            title: "Account Created",
            text: "Your account has been created successfully!",
            timer: 2000,
            showConfirmButton: false,
        }).then(() => {
            window.location.href = "dashboard.html";
        });
    } catch (error) {
        const errorMessage =
            error.code === "auth/email-already-in-use"
                ? "Email already in use!"
                : "Failed to create account. Please try again.";

        Swal.fire({
            icon: "error",
            title: "Sign-Up Failed",
            text: errorMessage,
        });
        console.error("Error during sign-up:", error);
    }
});

document.getElementById("submitSignIn").addEventListener("click", async (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        Swal.fire({
            icon: "success",
            title: "Login Successful",
            text: "You are now logged in!",
            timer: 2000,
            showConfirmButton: false,
        }).then(() => {
            window.location.href = "dashboard.html";
        });
    } catch (error) {
        const errorMessage =
            error.code === "auth/wrong-password" || error.code === "auth/user-not-found"
                ? "Invalid email or password."
                : "Login failed. Please try again.";

        Swal.fire({
            icon: "error",
            title: "Login Failed",
            text: errorMessage,
        });
        console.error("Error during sign-in:", error);
    }
});
