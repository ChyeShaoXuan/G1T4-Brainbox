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
const postsRef = ref(db, 'posts/english');

let postsUL = document.getElementById('posts')
let newStr = ''
let postsList = []
let uid = ''
const userRef = ref(db,'users')
onValue(userRef, (snapshot) => {
    const users = snapshot.val()
    onValue(postsRef,(snapshot2) => {
        snapshot2.forEach((childSnapshot) => {
            const childKey = childSnapshot.key;
            const childValue = childSnapshot.val();
            uid = childValue.uid
            postsList.push([childKey,childValue,users[childValue.uid].image,users[childValue.uid].username])
        });
        postsList = postsList.reverse()
        console.log(postsList)
        for (let post of postsList) {
            newStr+= `
                <li class="list-group-item p-3">
                                        <div class="flex flex-col items-center md:flex-row">
                                            <div class="w-full md:w-1/2 md:mb-0 text-center">
                                                <a href="#" class="text-blue-900 font-semibold hover:text-red-900">${post[1].title}</a>
                                            </div>
                                            <div class="w-1/2 md:w-1/8 md:w-1/4">
                                                <div class="flex items-center">
                                                    <div class="w-1/2">
                                                        <img src="../Images/${post[2]}" class="w-10 h-10 rounded-full">
                                                    </div>
                                                    <div class="w-1/2">
                                                        <span style="font-size: 15px;">${post[3]}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style="margin-top:1px;" class="w-1/2 md:w-1/8 md:w-1/4 md:mt-0">
                                                Replies: 100
                                            </div>
                                            <div style="margin-top:1px;" class="w-1/2 md:w-1/8 md:w-1/4 md:mt-0">
                                                Views: 1.2k
                                            </div>
                                        </div>
                                    </li>`
        }
        document.getElementById('posts').innerHTML = newStr
    });
});

        

console.log(postsList)



document.getElementById('create').addEventListener('click', function() {
    window.location.href = 'create.html';
})