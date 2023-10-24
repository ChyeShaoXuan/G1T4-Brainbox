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
const currSub = 'english'
let currPost = null
let currPage = 2

document.addEventListener('DOMContentLoaded', () => {
    let postsLength = 0
    onValue(postsRef,(snapshot) => {
        newStr = `<nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
        <a href="#" class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
          <span class="sr-only">Previous</span>
          <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
          </svg>
        </a>`
        snapshot.forEach(() => {
            postsLength++
        });
        document.getElementById('firstPage').innerText = '1'
        document.getElementById('lastPage').innerText = '5'
        document.getElementById('totalnumresults').innerText = postsLength
        document.getElementById('threads').innerText = 'Threads: ' + postsLength
        let noOfPages = Math.ceil(postsLength/5)
        for (let i=1;i<=noOfPages;i++) {
            if (i==1) {
                newStr += `<a href="#" id='p1' aria-current="page" class="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 page">1</a>`
            } else {
                newStr += `<a href="#" id='p${i}' class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 page">${i}</a>`
            }
        }
        newStr += `<a href="#" class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
        <span class="sr-only">Next</span>
        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
        </svg>
      </a>
    </nav>`
    document.getElementById('pagesBar').innerHTML = newStr
    for (let thisPage of document.getElementsByClassName('page')) {
        let pageNum = thisPage.innerText
        console.log(pageNum)
        document.getElementById('p'+ pageNum).addEventListener('click', () => {
            displayPage(Number(pageNum))
        })
    }
    })

})


function displayPage(page) {
    postsList = []
    let positionStr = ''
    let newStr = ''
    document.getElementById('p'+page).setAttribute('class','relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 page')
    document.getElementById('p'+currPage).setAttribute('class','relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 page')
    currPage = page
    onValue(userRef, (snapshot) => {
        const users = snapshot.val()
        onValue(postsRef,(snapshot2) => {
            snapshot2.forEach((childSnapshot) => {
                const childKey = childSnapshot.key;
                const postDetails = childSnapshot.val();
                uid = postDetails.uid
                postsList.push([childKey,postDetails,users[postDetails.uid].image,users[postDetails.uid].username])
            });
            postsList = postsList.reverse()
            let firstPage = (page-1)*5
            let lastPage = page*5
            for (let i=firstPage;i<lastPage;i++) {
                if (i >= postsList.length) {
                    document.getElementById('firstPage').innerText = firstPage+1
                    document.getElementById('lastPage').innerText = `${i}`
                    break;
                }
                document.getElementById('firstPage').innerText = firstPage+1
                document.getElementById('lastPage').innerText = lastPage
                currPost = postsList[i]
                newStr+= `
                    <li class="list-group-item p-3">
                                            <div class="flex flex-col items-center md:flex-row">
                                                <div class="w-full md:w-1/2 md:mb-0 text-center">
                                                    <a href="post.html?postID=${currPost[0]}&subject=${currSub}" class="text-blue-900 font-semibold hover:text-red-900">${currPost[1].title}</a>
                                                </div>
                                                <div class="w-1/2 md:w-1/8 md:w-1/4">
                                                    <div class="flex items-center">
                                                        <div class="w-1/2">
                                                            <img src="../Images/${currPost[2]}" class="w-10 h-10 rounded-full">
                                                        </div>
                                                        <div class="w-1/2">
                                                            <span style="font-size: 15px;">${currPost[3]}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div style="margin-top:1px;" class="w-1/2 md:w-1/8 md:w-1/4 md:mt-0">
                                                    Replies: ${currPost[1].comments}
                                                </div>
                                                <div style="margin-top:1px;" class="w-1/2 md:w-1/8 md:w-1/4 md:mt-0">
                                                    Views: ${currPost[1].views}
                                                </div>
                                            </div>
                                        </li>`
            }
            document.getElementById('posts').innerHTML = newStr

        },{
            onlyOnce:true
        });
    }, {
        onlyOnce:true
    });
}


document.addEventListener('DOMContentLoaded', () => {
    displayPage(1)
})


document.getElementById('create').addEventListener('click', function() {
    window.location.href = 'create.html';
})

