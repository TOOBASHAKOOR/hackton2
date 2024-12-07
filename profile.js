import {
    getAuth,
    onAuthStateChanged,
    sendEmailVerification,
    updateProfile,
    signOut,
    updateEmail,
    deleteUser,
} from "./firebase.js";

const auth = getAuth();




let profilePage = document.getElementById("profile-page");

onAuthStateChanged(auth, (user) => {
    const profilePage = document.getElementById("profile-page");

    if (user) {
        const uid = user.uid;
        console.log(user);

        profilePage.innerHTML = `
            <div class="row gap-2 py-5 row-cols-1 row-cols-lg-3 justify-content-around">
                <div class="col">
                    <div class="custom-card">
                        <div class="user-image">
                            <img src="${user.photoURL || 'https://bootdey.com/img/Content/avatar/avatar7.png'}" alt="User-Profile-Image">
                        </div>
                        <p class="heading">${user.displayName || 'No Name'}</p>
                        <p>Email: ${user.email}</p>
                        <p>Email Verified: ${user.emailVerified ? 'Yes' : 'No'}</p>
                        <div class="user-social-link px-6">
                            <a href="#" class="mx-2"><i class="fa-brands fa-square-facebook fa-lg"></i></a>
                            <a href="#" class="mx-2"><i class="fa-brands fa-instagram fa-lg"></i></a>
                            <a href="#" class="mx-2"><i class="fa-brands fa-linkedin fa-lg"></i></a>
                        </div>
                    </div>
                </div>

                <div class="col">
                    <div class="custom-card">
                        <div class="row gap-2 py-2 row-cols-1 row-cols-lg-1 justify-content-around pt-1">
                            <div class="col mb-3">
                                <button type="button" class="button-85" id="verifyEmail">Verify your email</button>
                            </div>
                            <div class="col mb-3">
                                <button type="button" class="button-85" id="updateProfile">Update profile</button>
                            </div>
                            <div class="col mb-3">
                                <button type="button" class="button-85" id="updateEmail">Update Email</button>
                            </div>
                            <div class="col mb-3">
                                <button type="button" class="button-85" id="deleteAccount">Delete Account</button>
                            </div>
                            <div class="col mb-3">
                                <button type="button" class="button-85" id="signOut">Sign Out</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;

        // Verify Email
        document.getElementById("verifyEmail").addEventListener("click", () => {
            sendEmailVerification(auth.currentUser).then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Email Has Been Sent!",
                    showConfirmButton: false,
                    timer: 1500
                });
            });
        });

        // Update Profile
        document.getElementById("updateProfile").addEventListener("click", () => {
            Swal.fire({
                title: 'Update Profile',
                html: `
                    <input type="text" id="swal-input-name" class="swal2-input" placeholder="Enter your name">
                    <input type="text" id="swal-input-photoURL" class="swal2-input" placeholder="Enter photo URL">
                `,
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonText: 'Save',
                preConfirm: () => {
                    const name = document.getElementById('swal-input-name').value;
                    const photoURL = document.getElementById('swal-input-photoURL').value;

                    if (!name || !photoURL) {
                        Swal.showValidationMessage(`Please enter both name and photo URL`);
                        return;
                    }
                    return { name, photoURL };
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    const { name, photoURL } = result.value;

                    updateProfile(auth.currentUser, {
                        displayName: name,
                        photoURL: photoURL
                    }).then(() => {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Profile updated successfully!",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }).catch((error) => {
                        Swal.fire({
                            icon: "error",
                            title: "Error updating profile",
                            text: error.message
                        });
                    });
                }
            });
        });

        // Update Email
        document.getElementById("updateEmail").addEventListener("click", () => {
            Swal.fire({
                title: 'Update Email',
                input: 'email',
                inputPlaceholder: 'Enter your new email',
                showCancelButton: true,
                confirmButtonText: 'Update',
                preConfirm: (email) => {
                    if (!email) {
                        Swal.showValidationMessage(`Please enter a valid email`);
                        return;
                    }
                    return email;
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    const newEmail = result.value;

                    updateEmail(auth.currentUser, newEmail)
                        .then(() => {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Email updated successfully!",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        })
                        .catch((error) => {
                            Swal.fire({
                                icon: "error",
                                title: "Error updating email",
                                text: error.message
                            });
                        });
                }
            });
        });

        // Delete Account
        document.getElementById("deleteAccount").addEventListener("click", () => {
            Swal.fire({
                title: 'Are you sure?',
                text: "This action cannot be undone!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, keep it'
            }).then((result) => {
                if (result.isConfirmed) {
                    const user = auth.currentUser;

                    deleteUser(user).then(() => {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Your account has been deleted!",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        location.href = "index.html";
                    }).catch((error) => {
                        Swal.fire({
                            icon: "error",
                            title: "Error deleting account",
                            text: error.message
                        });
                    });
                }
            });
        });

        // Sign Out
        document.getElementById("signOut").addEventListener("click", () => {
            signOut(auth).then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "User has been signed out!",
                    showConfirmButton: false,
                    timer: 1500
                });
                location.href = "login.html"; // Redirect to login page
            }).catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Error signing out",
                    text: error.message
                });
            });
        });
    } else {
        // No user is logged in
        Swal.fire("User is logged out");
        location.href = "login.html"; // Redirect to login page
    }
});

