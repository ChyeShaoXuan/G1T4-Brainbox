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
        }
    },

    methods: {

        editBio() {
            this.input_bio = this.displayed_bio; // Initialize input with current bio
            this.isEditing = true;
        },
        saveBio() {
            this.displayed_bio = this.input_bio; // Update displayed bio
            this.isEditing = false;
        }
    }
        
})

        document.addEventListener('DOMContentLoaded', () => {
            root.mount("#root");
        });
