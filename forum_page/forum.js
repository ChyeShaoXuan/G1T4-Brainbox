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
  
//Initialise firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase()
let postsRef = ref(db, 'posts/english');

let postsUL = document.getElementById('posts')
let postsList = []
let uid = ''
const userRef = ref(db,'users')

let currSub = 'english'
let currPost = null
let currPage = 1


function showSearch() { //Show Pagebar
    let newStr = ''
    let postsLength = 0
    let commentsNum = 0
    onValue(postsRef,(snapshot) => { //Retrieves from database all posts in specific subject
        snapshot.forEach(snapshot => { 
            postsLength++ //No. of posts counter
            commentsNum += Number(snapshot.val().comments) //No. of comments counter
        });

        //Information in header bar of posts section
        document.getElementById('totalnumresults').innerText = postsLength 
        document.getElementById('threads').innerText = 'Threads: ' + postsLength
        document.getElementById('comments').innerText = 'Comments: ' + commentsNum

        let noOfPages = Math.ceil(postsLength/5) //5 posts per page
        for (let i=1;i<=noOfPages;i++) { // Creating page buttons, with unique ids
            if (i==1) {
                newStr += `<li class="page-item"><a class="page-link bg-info" id="p1">1</a></li>`
            } else {
                newStr += `<li class="page-item"><a class="page-link" id="p${i}">${i}</a></li>` 
            }
        }
   
    document.getElementById('pagesBar').innerHTML = newStr

    //Adding event listeners for each page button
    for (let thisPage of document.getElementsByClassName('page-link')) {
        let pageNum = thisPage.innerText 
        document.getElementById('p'+ pageNum).addEventListener('click', () => {
            displayPage(Number(pageNum))
        })
    }
    }, {
        onlyOnce: true
    })
}


function displayPage(page) {

    let positionStr = ''

    document.getElementById('subjectCaption').innerText = currSub.charAt(0).toUpperCase() + currSub.slice(1) //Changing subject to first letter uppercase
    onValue(userRef, (snapshot) => {

        const users = snapshot.val()
        onValue(postsRef,(snapshot2) => {
            postsList = []
            let newStr = ''
            snapshot2.forEach((childSnapshot) => {
                const childKey = childSnapshot.key;

                 //Timestamp string
                let date = new Date(Number(childKey))
                let dateStr = date.toLocaleDateString("en-SG")
                let timeStr = date.toLocaleTimeString("en-SG")
                let dateTime = dateStr + " " + timeStr


                const postDetails = childSnapshot.val();
                uid = postDetails.uid
                postsList.push([childKey,postDetails,users[uid].image,users[uid].username,dateTime])
            });
            if (postsList.length != 0) { //If at least 1 post,
                postsList = postsList.reverse() //Arrange in order of newest to oldest
                let firstPage = (page-1)*5
                let lastPage = page*5
                // console.log(firstPage,lastPage,postsList.length)

                // Counter 'i' tracks posts index in the total number of posts. E.g. page 2 will display posts 5-10, thus i will take value 5-10
                for (let i=firstPage;i<lastPage;i++) {  

                    //For populating "Show posts '1' to '5' of __ posts"
                    if (i >= postsList.length) { 
                        // console.log('test',firstPage,i)
                        document.getElementById('firstPage').innerText = firstPage+1
                        document.getElementById('lastPage').innerText = `${i}`
                        break;
                    }
                    document.getElementById('firstPage').innerText = firstPage+1
                    document.getElementById('lastPage').innerText = lastPage
                    currPost = postsList[i]


                    //Populating HTML
                    newStr+= `
                        <li class="list-group-item p-3 bg-blue-100">
                            <div class="flex flex-col items-center md:flex-row">
                                <div class="w-full md:w-1/3 mb-2 text-center text-2xl">
                                    <a href="post.html?postID=${currPost[0]}&subject=${currSub}" class="text-blue-900 text-md md:text-lg font-semibold hover:text-red-900">${currPost[1].title}</a>
                                </div>
                                <div class="w-1/2">
                                    <div class="flex items-center">
                                        <div class="w-full md:w-1/2 p-2 md:p-0 flex justify-end items-center">
                                            <img src="../Images/${currPost[2]}" class="w-14 h-14 rounded-full">
                                        </div>
                                        <div class="w-full md:w-1/2 p-2 md:p-0 text-md md:text-lg justify-center">
                                            <span>${currPost[3]}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="text-center mt-3 md:mb-3 text-md md:text-lg w-1/4">
                                    Replies: ${currPost[1].comments}
                                </div>
                                <div class="text-center mt-3 md:mb-3 text-md md:text-lg w-1/4">
                                    Views: ${currPost[1].views}
                                </div>
                                <div class="text-center mt-3 md:mb-3 text-md md:text-lg md:w-1/4">
                                    Posted: ${currPost[4]}
                                </div>
                            </div>
                        </li>`
                }
                document.getElementById('posts').innerHTML = newStr
                // console.log(page,currPage)

                //Setting styling for selected page
                document.getElementById('p'+currPage).setAttribute('class','page-link')
                document.getElementById('p'+page).setAttribute('class','page-link bg-info')

                currPage = page
            } else { //If no posts in database
                document.getElementById('posts').innerHTML = ''
                document.getElementById('firstPage').innerText = 0
                document.getElementById('lastPage').innerText = 0
            }
        });
    }, {
        onlyOnce:true
    }, {
        onlyOnce:true
    });
}


document.addEventListener('DOMContentLoaded', () => { //On load, display the page bar and display whole page
    showSearch()
    displayPage(1)
})

//Start of styling changes and post updates when clicking on subjects
document.getElementById('english').addEventListener('click', () => { 
    postsRef = ref(db, 'posts/english');
    currPage = 1
    currSub = 'english'

    document.getElementById('english').setAttribute("class","btn btn-danger btn-lg custom-btn text-2xl text-center font-bold mb-2")
    document.getElementById('english').disabled = true

    document.getElementById('math').setAttribute("class","btn btn-primary btn-lg custom-btn text-2xl text-center font-bold mb-2")
    document.getElementById("math").disabled = false

    document.getElementById('science').setAttribute("class","btn btn-primary btn-lg custom-btn text-2xl text-center font-bold mb-2")
    document.getElementById("science").disabled = false

    showSearch()
    displayPage(1)
})

document.getElementById('math').addEventListener('click', () => {
    postsRef = ref(db, 'posts/math');
    currPage = 1
    currSub = 'math'

    document.getElementById('math').setAttribute("class","btn btn-danger btn-lg custom-btn text-2xl text-center font-bold mb-2")
    document.getElementById('math').disabled = true

    document.getElementById('english').setAttribute("class","btn btn-primary btn-lg custom-btn text-2xl text-center font-bold mb-2")
    document.getElementById("english").disabled = false

    document.getElementById('science').setAttribute("class","btn btn-primary btn-lg custom-btn text-2xl text-center font-bold mb-2")
    document.getElementById("science").disabled = false

    showSearch()
    displayPage(1)
})

document.getElementById('science').addEventListener('click', () => {
    postsRef = ref(db, 'posts/science');
    currPage = 1
    currSub = 'science'

    document.getElementById('science').setAttribute("class","btn btn-danger btn-lg custom-btn text-2xl text-center font-bold mb-2")
    document.getElementById('science').disabled = true

    document.getElementById('english').setAttribute("class","btn btn-primary btn-lg custom-btn text-2xl text-center font-bold mb-2")
    document.getElementById("english").disabled = false

    document.getElementById('math').setAttribute("class","btn btn-primary btn-lg custom-btn text-2xl text-center font-bold mb-2")
    document.getElementById("math").disabled = false

    showSearch()
    displayPage(1)
})
//End of styling changes and post updates when clicking on subjects

//Redirect to create page when clicked on
document.getElementById('create').addEventListener('click', function() {
    window.location.href = 'create.html';
})


