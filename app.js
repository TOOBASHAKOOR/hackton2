// importing
import {collection, addDoc, auth, db, signInWithPopup, GoogleAuthProvider,  createUserWithEmailAndPassword } from "./firebase.js";
// import Swal from "sweetalert2";

// const auth = getAuth();
const googleProvider = new GoogleAuthProvider();


let googleLoginBtn = document.getElementById("googleLoginBtn");
let signupBtn = document.getElementById("signupBtn");
let signupEmail = document.getElementById("signupEmail");
let signupPassword = document.getElementById("signupPassword");
let phoneNO = document.getElementById("phoneNO");
let fullname = document.getElementById("fullname");

let users = {
    phoneNumer : phoneNO.value,
    fullName: fullname.value
}

// Regular expression to validate email format
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



signupBtn.addEventListener("click", async() => {
    // Check if fields are not empty and if email follows the valid format
    if (signupEmail.value.trim() && signupPassword.value.trim()) {
        if (!emailPattern.test(signupEmail.value)) {
            console.log("Please enter a valid email address");
            return;
        }
        // ------------firestore-----
        try {
            const docRef = await addDoc(collection(db, "users"), {
              ...users
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        //   ---------


        createUserWithEmailAndPassword(auth, signupEmail.value, signupPassword.value)
            .then((userCredential) => {
                const user = userCredential.user;
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Account successfully created!",
                    showConfirmButton: false,
                    timer: 1500
                  });
                console.log(user);
                location.href = "login.html";
            })

            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
                switch (errorMessage) {
                    case "Firebase: Error (auth/email-already-in-use).":
                        Swal.fire({
                            title: "The Internet?",
                            text: "Please use a different email",
                            icon: "question"
                          });
                        // console.log("Please use a different email.");
                        break;
                }
            });
    } 
    else {
        Swal.fire("Please enter your data.!");
    }

    // location.href = "login.html";
});

             
// Google Sign-In
googleLoginBtn.addEventListener("click", () => {
    signInWithPopup(auth, googleProvider)
        .then((result) => {
            // Access token for Google API
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            
             // The signed-in user info
            const user = result.user;
            setTimeout(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Logged in with Google!",
                    showConfirmButton: false,
                    timer: 1500
                });
                console.log(user);
                location.href = "dashboard.html";
            }, 1500);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            Swal.fire({
                title: "Error!",
                text: "Google sign-in failed",
                icon: "error"
            });
        });
});





