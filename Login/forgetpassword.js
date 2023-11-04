import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import {getAuth, sendPasswordResetEmail} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js"

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
  


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
document.getElementById("submitEmail").addEventListener("click", () => {
    const email = document.getElementById("email").value
    console.log(email)
    sendPasswordResetEmail(auth, email)
    .then(() => {
        console.log('email sent')
    }).catch(error => {
        console.log(error.message)
        var myModal = new bootstrap.Modal(document.getElementById('error'))
        myModal.show()
    })
  })

