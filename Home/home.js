import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js"
import {getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js"

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
onAuthStateChanged(auth, user => {
        if (user) {
            const reference = ref(db,'users/' + user.uid + '/username')
            onValue(reference, (snapshot) => {
                document.getElementById('username').innerText = snapshot.val()
            })
        }
    })


const logout = async() => {
    await signOut(auth)
}

document.getElementById('logout').addEventListener('click',logout);

window.addEventListener('load', () => {
    const options = {
        strings: ["Hello ", document.getElementById('username').innerText, "! Shall we learn something new today?"],
        typeSpeed: 50, 
        backSpeed: 30, 
        startDelay: 1000, 
        backDelay: 1000, 
        loop: true, 
    };
    new Typed(".text-4xl", options);
});
