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



const logout = async() => {
    await signOut(auth)
}

document.getElementById('logout').addEventListener('click',logout);

document.addEventListener("DOMContentLoaded", function () {
    onAuthStateChanged(auth, user => {
        if (user) {
            const reference = ref(db,'users/' + user.uid + '/username')
            onValue(reference, (snapshot) => {
                let usernameVal = snapshot.val()
                console.log(usernameVal)
                const options = {
                    strings: [`Hello ${usernameVal}! Shall we learn something new today?`], // Initial string without username
                    typeSpeed: 75,
                    showCursor: true, 
                    contentType: 'html',
                  };
                const typed = new Typed("#animated-text", options);
            })
        }
    })
  });

document.addEventListener("DOMContentLoaded", function () {
    const body = document.body;
        
    function createFallingObject() {
        const object = document.createElement("div");
        object.className = "falling-object";
        object.innerHTML = getEmoji();
        object.style.left = Math.random() * 100 + "vw";
        body.appendChild(object);
            
        object.style.top = "-5vh";
            
        const animationDuration = Math.random() * 5 + 5 + "s";
        object.style.animationDuration = animationDuration;
        
        object.addEventListener("animationend", function () {
            body.removeChild(object);
        });
    }
        
    function getEmoji() {
        const emojis = [
            "😊", "❤️", "⭐", "🌈", "🎈", "🌸", "🐻", "🍭", "🌻", "🐱",
            "🦄", "🍩", "🌟", "🍓", "🐾", "🌼", "🐥", "🍦", "🌞", "🐰",
            "🎀", "🌺", "🐶", "🍰", "🎂", "🍁", "🦋", "🐝", "🍍", "🍉",
            "🍇", "🐢", "🌹", "🌍", "🍒", "🍔", "🦉", "🍄", "🌴", "🍎",
            "🌽", "🐷", "🎁", "🌳", "🐦", "🍟", "🐨", "🍕", "🍀", "🌱"
        ];
                
    return emojis[Math.floor(Math.random() * emojis.length)];
    }
    setInterval(createFallingObject, 100);
});
