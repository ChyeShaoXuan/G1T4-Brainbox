import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import {getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js"
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js"





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

            let postTitle = document.getElementById('title').value
            let postContent = document.getElementById('content').value
            const postSubject = document.getElementById('subject').value
            postTitle = postTitle.trim()
            postContent = postContent.trim()
            if (postTitle != "" && postContent != "") {
            console.log(postTitle,postContent,postSubject)

            const current = new Date()
            const reference = ref(db, 'posts/' + postSubject + '/' + current.getTime())
            const userRef = ref(db, 'users/' + user.uid + '/username')
            set(reference, {
                uid: user.uid,
                title: postTitle,
                content: postContent,
                views: 0,
                comments: 0,
            }).then(() => {
                console.log('submitted')
                window.location.href = "forum.html" 
            }).catch(error => {
                console.log(error.message)
            })
            } else {
                // Show Modal
                var myModal = new bootstrap.Modal(document.getElementById('error'))
                myModal.show()
            }  
        } else {
            console.log('not logged in')
        }
    })

}



document.getElementById('submit').addEventListener('click',monitorAuthState)