import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getDatabase, ref, onValue, update, set, remove} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js"
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
  

//Initialise Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase()
const auth = getAuth(app)

//Retrieve Chosen subject and and postId from URL (GET)
const urlParams = new URLSearchParams(window.location.search)
const postID = urlParams.get('postID')
const postSub = urlParams.get('subject')
const postRef = ref(db,'posts/'+ postSub + '/' + postID)
const commentsRef = ref(db,'comments/' + postID)
const userRef = ref(db,'users')
// console.log(postID,postSub)

//Vue
const root = Vue.createApp({
    data() {
        return {
            retTitle:'',
            retContent:'',
            commentText: '',
            commentsList: [],
            authorName: '',
            authorPic: '',
            authorTime: '',
            deleteButton: false,
        }
    },
    methods: {
        submit() {
            this.commentText = this.commentText.trim() //Cut whitespace
            if (this.commentText.length == 0) { //If input fields empty
                var myModal = new bootstrap.Modal(document.getElementById('error'))
                myModal.show()
            } else {
                let current = new Date() //Set current UNIX timestamp as comment key
                let currentCommentRef = ref(db,'comments/' + postID + '/' + current.getTime()) //Comments are inserted into seperate branch in data tree, with postID as primary ID.
                onAuthStateChanged(auth, user => {
                    if (user) {
                        set(currentCommentRef, {
                            uid:user.uid,
                            text:this.commentText,
                        }).then(() => {
                            console.log('submitted')
                        }).catch(error => {
                            console.log(error.message)
                        })
                        this.commentText = ''
                    } else {
                        console.log('not logged in')
                    }
                })

                
                onValue(postRef, (snapshot) => {
                    const postContent = snapshot.val()
                    if (snapshot.val() == null){
                        window.location.href = "forum.html"
                    }
                    let replies = postContent.comments + 1 //Increase comment counter for posts
                    const updates = {
                        comments: replies
                    }
                    update(ref(db, 'posts/' + postSub + '/' + postID),updates) //Update
                }, {
                    onlyOnce:true
                })

                this.display() //Display comments
            }
        },

        display() {
            onValue(userRef, (snapshot) => {
                const users = snapshot.val()
                onValue(commentsRef,(snapshot2) => { 
                    let newCommentsList = []
                    snapshot2.forEach((childSnapshot) => { //For each comment
                        const childKey = childSnapshot.key;
                        const commentsDet = childSnapshot.val();
                        let uid = commentsDet.uid

                        //Convert comment key to timestamp
                        let timeStamp = Number(childKey)
                        let date = new Date(timeStamp);
                        let dateStr = date.toLocaleDateString("en-SG")
                        let timeStr = date.toLocaleTimeString("en-SG")
                        let dateTime = "Posted: " + dateStr + " " + timeStr


                        newCommentsList.push([childKey,commentsDet,users[uid].image,users[uid].username,dateTime])
                    });
                    this.commentsList = newCommentsList
                });
            });
        },

        deletePost() {
            const postDeleteRef = ref(db,'posts/' + postSub)
            const commentDeleteRef = ref(db,'comments/')
            let deleteUpdate = {}
            deleteUpdate[postID] = null //delete post entry in db
            update(postDeleteRef,deleteUpdate)
            update(commentDeleteRef,deleteUpdate)
            .then(() => {
                window.location.href = "forum.html" //Redirect to forum page
            })
            // commentsDeleteRef.remove()
            
        }
    },
    
    created() { //On load
        onValue(postRef, (snapshot) => {
            const postContent = snapshot.val()
            let currViews = postContent.views + 1 //Increase viewcount in database
            const updates = {
                views: currViews
            }
            update(ref(db,'posts/'+ postSub + '/' + postID),updates) //Update
            onAuthStateChanged(auth, user => {
                if (user) {
                    if(user.uid == postContent.uid) { //If viewing user(logged in user) is same as author
                        // console.log('yes')
                        this.deleteButton = true; //Display delete button
                    }
                } else {
                    // console.log('test')
                }
            })
            this.retTitle = postContent.title
            this.retContent = postContent.content
            const userDetailsRef = ref(db,'users/' + postContent.uid)
            onValue(userDetailsRef, (snapshot2) => { //Retrieve user details
                const userContent = snapshot2.val()
                this.authorName = userContent.username
                this.authorPic = userContent.image
            })

            //Convert post key to timestamp
            let timeStamp = Number(postID)
            let date = new Date(timeStamp);
            let dateStr = date.toLocaleDateString("en-SG")
            let timeStr = date.toLocaleTimeString("en-SG")
            this.authorTime = "Posted: " + dateStr + " " + timeStr

            
        }, {
            onlyOnce: true
        })

        this.display()
    }
})

root.mount('#root')