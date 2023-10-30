import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js"
import {getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js"

const firebaseConfig = {
    apiKey: "AIzaSyCEjW5Rq4jgHbSS1GCJy0pl6hpPrFQ9pUI",
    authDomain: "wad2-4fc9e.firebaseapp.com",
    projectId: "wad2-4fc9e",
    storageBucket: "wad2-4fc9e.appspot.com",
    messagingSenderId: "83590678050",
    appId: "1:83590678050:web:6c98cdb011612eb4f5ac7b",
    measurementId: "G-NY0ZMNMQLZ",
    databaseURL: "https://wad2-4fc9e-default-rtdb.asia-southeast1.firebasedatabase.app"
    };
  

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getDatabase()

function insertName() {
    onAuthStateChanged(auth, user => {
        if (user) {
            const userRef = ref(db, 'users/'+ user.uid)
            onValue(userRef, (snapshot) => {
                document.getElementById('name').innerText = snapshot.val().username
            })
        } else {
            window.location.replace("../Login/index.html")
        }
    })
}

document.addEventListener('DOMContentLoaded',insertName)

const root = Vue.createApp({
    data() {
      return {
        displayed_bio: "[ABOUT ME]",
        input_bio: "",
        isEditing: false,
        isSelecting: false
      }
    },
    methods: {
      editBio() {
        // Switch to editing mode
        this.input_bio = '';
        this.isEditing = true;
      },
      saveBio() {
        // Save the changes and switch back to viewing mode
        this.displayed_bio = this.input_bio;
        this.isEditing = false;
      },
      editAvatar() {
        this.isSelecting = true;
      },
      saveAvatar() {
        this.isSelecting = false;
      }
    }
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    root.mount("#root");
  });

// JavaScript for avatar selection carousel
document.addEventListener("DOMContentLoaded", function () {
    const avatarImage = document.getElementById("avatar-image");
    const avatarThumbnails = document.querySelectorAll(".avatar-thumbnail");
    const prevButton = document.getElementById("prev-avatar");
    const nextButton = document.getElementById("next-avatar");
    const confirmButton = document.getElementById("confirm-avatar");
    let currentAvatarIndex = 0;

    function showAvatar(index) {
        avatarImage.src = avatarThumbnails[index].getAttribute("data-src");
    }

    showAvatar(currentAvatarIndex);

    prevButton.addEventListener("click", function () {
        currentAvatarIndex = (currentAvatarIndex - 1 + avatarThumbnails.length) % avatarThumbnails.length;
        showAvatar(currentAvatarIndex);
        console.log("prev");
    });

    nextButton.addEventListener("click", function () {
        currentAvatarIndex = (currentAvatarIndex + 1) % avatarThumbnails.length;
        showAvatar(currentAvatarIndex);
    });

    confirmButton.addEventListener("click", function () {
        // Handle confirmation logic here
        alert("Avatar Confirmed!");
    });
});
