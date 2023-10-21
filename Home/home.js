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

const username = document.getElementById('username').innerText
console.log(username)
const textElement = document.getElementById('typed-text');
const text = textElement.textContent;
textElement.textContent = '';     
let index = 0;
        
function typeText() {
    if (index < text.length) {
        textElement.textContent += text.charAt(index);
        index++;
        setTimeout(typeText, 50); 
        }
    }
    window.addEventListener('load', typeText);

const logout = async() => {
    await signOut(auth)
}

document.getElementById('logout').addEventListener('click',logout);

