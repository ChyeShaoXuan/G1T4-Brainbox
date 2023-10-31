import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getDatabase, ref, onValue, get, set, update} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js"
import {getAuth, signOut, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js"

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
const db = getDatabase()
const auth = getAuth(app)
document.getElementById("completedButton").addEventListener("click", () => {
    onAuthStateChanged(auth, user => {
        const completeRef = ref(db, 'studyCompletion/' + user.uid)
        let value = document.getElementById("dropdown_topics").value
        let updates = {}
        updates[value] = true;
        onValue(completeRef, (snapshot) => {
            console.log(snapshot.val())
            update(completeRef, updates)
            console.log('submitted')
        }, {
            onlyOnce:true
        })
    })  
})