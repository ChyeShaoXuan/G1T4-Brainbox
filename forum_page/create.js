import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import {getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js"
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js"

const current = new Date()



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

function monitorAuthState() {
    onAuthStateChanged(auth, user => {
        if (user) {

            const postTitle = document.getElementById('title').value
            const postContent = document.getElementById('content').value
            const postSubject = document.getElementById('subject').value

            console.log(postTitle,postContent,postSubject)
            console.log('submitted')

            const reference = ref(db, 'posts/' + current.getTime())

            set(reference, {
                uid: user.uid,
                title: postTitle,
                content: postContent,
                subject: postSubject,
            })
        } else {
            console.log('not logged in')
        }
    })
}



document.getElementById('submit').addEventListener('click',monitorAuthState)