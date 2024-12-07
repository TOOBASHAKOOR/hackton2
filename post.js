import {
    collection,
    addDoc,
    db,
    query,
    where,
    onSnapshot,
} from "./firebase.js";

// Track the selected category
let selectedCategory = ""; // Default category

// Add event listener for dropdown items
const dropdownItems = document.querySelectorAll('.dropdown-item');
dropdownItems.forEach(item => {
    item.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent default link behavior
        selectedCategory = this.textContent; // Get the text of the selected item
        document.getElementById('dropdown').textContent = this.textContent; // Update dropdown button text
        console.log("Selected Category:", selectedCategory);
        filterPosts(selectedCategory); // Automatically filter posts by category
    });
});

// Search button functionality
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('btnNavbarSearch');

searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim().toLowerCase(); // Get search term
    console.log("Searching for:", searchTerm);
    filterPosts(searchTerm); // Filter posts by search term
});

// Function to filter posts based on search term or category
function filterPosts(searchTerm) {
    const usersRef = collection(db, "users");
    let q = query(usersRef);

    // If a search term is provided, filter by category
    if (searchTerm) {
        q = query(usersRef, where("category", "==", searchTerm));
    }

    onSnapshot(q, (querySnapshot) => {
        const postsContainer = document.getElementById("posts");
        postsContainer.innerHTML = ""; // Clear existing posts

        if (querySnapshot.empty) {
            postsContainer.innerHTML = "<p>No posts found.</p>";
            return;
        }

        querySnapshot.forEach((doc) => {
            const data = doc.data(); // Fetch document data

            // Check if required fields exist
            if (data.postTitle && data.postDescription && data.category) {
                postsContainer.innerHTML += `
                    <div class="card mb-3">
                        <div class="card-header">@Posts</div>
                        <div class="card-body">
                            <h5 class="card-title">${data.category}</h5>
                            <h5 class="card-title">${data.postTitle}</h5>
                            <p class="card-text">${data.postDescription}</p>
                        </div>
                        <div class="d-flex gap-2 p-4">
                            <button type="button" class="btn btn-primary" onclick="edit(event)">Edit</button>
                            <button type="button" class="btn btn-danger" onclick="remove(event)">Delete</button>
                        </div>
                    </div>`;
            }
        });
    });
}

// Submit post functionality
const submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", async () => {
    const postTitle = document.getElementById('post-title').value.trim();
    const postDescription = document.getElementById('post-description').value.trim();

    // Validation
    if (!selectedCategory) {
        alert("Please select a category!");
        return;
    }
    if (!postTitle || !postDescription) {
        alert("Please provide both title and description!");
        return;
    }

    try {
        const docRef = await addDoc(collection(db, "post"), {
            postTitle,
            postDescription,
            category: selectedCategory,
        });
        console.log("Document written with ID:", docRef.id);

        // Clear inputs after successful submission
        document.getElementById('post-title').value = "";
        document.getElementById('post-description').value = "";

        // Append the new post directly to the posts section
        const postsContainer = document.getElementById("posts");
        const newPostHTML = `
            <div class="card mb-3">
                <div class="card-header">@Posts</div>
                <div class="card-body">
                    <h5 class="card-title">${selectedCategory}</h5>
                    <h5 class="card-title">${postTitle}</h5>
                    <p class="card-text">${postDescription}</p>
                </div>
                <div class="d-flex gap-2 p-4">
                    <button type="button" class="btn btn-primary" onclick="edit(event)">Edit</button>
                    <button type="button" class="btn btn-danger" onclick="remove(event)">Delete</button>
                </div>
            </div>`;
        postsContainer.innerHTML += newPostHTML; // Add the new post to the bottom

        Swal.fire("post submitted sucessfully!");
    } catch (error) {
        console.error("Error adding document:", error);
    }
});



// Initially load all posts (without filtering)
filterPosts("");
