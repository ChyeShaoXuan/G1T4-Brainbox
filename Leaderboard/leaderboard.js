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
  
const app = initializeApp(firebaseConfig);
const db = getDatabase()
const auth = getAuth(app)
const testRef = ref(db, 'testCompletion')
const userRef = ref(db, 'users')
const root = Vue.createApp({
    data() {
        return {
            scores: {},
            images: {},
            names: {},
            rankedUsers: [],
            top5: [],
            currUser: -1,
        }
    },

    methods: {
        
    },
    created() {
        onValue(userRef, (snapshot) => {
            let usersArr = []
            onValue(testRef, (snapshot2) => {
                snapshot2.forEach((user) => {
                    if (user.key != "total") {
                        usersArr.push([user.key,user.val()])
                    }
                })
                usersArr.sort((a, b) => b[1].totalScore - a[1].totalScore)
                console.log(usersArr)
                usersArr.forEach((user) => {
                    var userDet = snapshot.val()[user[0]]
                    console.log(userDet,user)
                    this.rankedUsers.push({
                        username:userDet.username,
                        image:userDet.image,
                        score:user[1].totalScore,
                        uid:user[0]
                    })
                    console.log(this.rankedUsers)
                }) 

                if (this.rankedUsers.length < 5) {
                    this.top5 = this.rankedUsers
                } else {
                    this.top5 = this.rankedUsers.slice(0,5)
                }
                
                onAuthStateChanged(auth, (user) => {
                    this.currUser = this.rankedUsers.findIndex(person => person.uid === user.uid)
                })

            }, {
                onlyOnce:true
            })
        }, {
            onlyOnce:true
        })
    }
})

root.mount("#root")