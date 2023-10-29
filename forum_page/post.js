import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getDatabase, ref, onValue, update, set} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js"
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
const urlParams = new URLSearchParams(window.location.search)
const postID = urlParams.get('postID')
const postSub = urlParams.get('subject')
const postRef = ref(db,'posts/'+ postSub + '/' + postID)
const commentsRef = ref(db,'comments/' + postID)
const userRef = ref(db,'users')
console.log(postID,postSub)


const root = Vue.createApp({
    data() {
        return {
            retTitle:'',
            retContent:'',
            commentText: '',
            commentsList: [],
            authorName: '',
            authorPic: '',
        }
    },
    methods: {
        submit() {
            if (this.commentText.length == 0) {
                alert("Please fill up comment!")
            }
            let current = new Date()
            let currentCommentRef = ref(db,'comments/' + postID + '/' + current.getTime())
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
                } else {
                    console.log('not logged in')
                }
            })

            
            onValue(postRef, (snapshot) => {
                const postContent = snapshot.val()
                let replies = postContent.comments + 1
                const updates = {
                    comments: replies
                }
                update(ref(db, 'posts/' + postSub + '/' + postID),updates)
            }, {
                onlyOnce:true
            })

            this.display()
        },

        display() {
            onValue(userRef, (snapshot) => {
                const users = snapshot.val()
                onValue(commentsRef,(snapshot2) => {
                    let newCommentsList = []
                    snapshot2.forEach((childSnapshot) => {
                        const childKey = childSnapshot.key;
                        const commentsDet = childSnapshot.val();
                        let uid = commentsDet.uid
                        newCommentsList.push([childKey,commentsDet,users[uid].image,users[uid].username])
                        for(let comment of newCommentsList) {
                            console.log(comment)
                        }
                    });
                    if (newCommentsList.length != 0) {
                        newCommentsList = newCommentsList.reverse()
                        this.commentsList = newCommentsList
                    } 
                },{
                    onlyOnce:true
                });
            }, {
                onlyOnce:true
            });
        }
    },
    
    created() {
        onValue(postRef, (snapshot) => {
            const postContent = snapshot.val()
            let currViews = postContent.views + 1
            const updates = {
                views: currViews
            }
            update(ref(db,'posts/'+ postSub + '/' + postID),updates)
        
            this.retTitle = postContent.title
            this.retContent = postContent.content
            const userDetailsRef = ref(db,'users/' + postContent.uid)
            onValue(userDetailsRef, (snapshot2) => {
                const userContent = snapshot2.val()
                this.authorName = userContent.username
                this.authorPic = userContent.image
            })
            // document.getElementById('title').innerText = postContent.title
            // document.getElementById('content').innerText = postContent.content
            
        }, {
            onlyOnce: true
        })

        this.display()
    }
})








root.mount('#root')