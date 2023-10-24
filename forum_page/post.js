import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getDatabase, ref, onValue, get} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js"
import {getAuth, signOut} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js"

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
const urlParams = new URLSearchParams(window.location.search)
const postID = urlParams.get('postID')
const postSub = urlParams.get('subject')
console.log(postID,postSub)

const postRef = ref(db,'posts/'+ postSub + '/' + postID)

onValue(postRef, (snapshot) => {
    const postContent = snapshot.val()
    console.log(postContent)
    document.getElementById('title').innerText = postContent.title
    document.getElementById('content').innerText = postContent.content
})