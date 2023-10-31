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
            top3: [],
            test: 'asdawdawd'
        }
    },

    methods: {
        
    },
    created() {
        onValue(userRef, (snapshot) => {
            let usersArr = []
            let userDet = ''
            // console.log(snapshot.val())

            onValue(testRef, (snapshot2) => {
                snapshot2.forEach((user) => {
                    if (user.key != "total") {
                        // console.log(user.key)
                        usersArr.push([user.key,user.val()])
                    }
                })
                usersArr.sort((a, b) => b[1].totalScore - a[1].totalScore)
                // console.log(usersArr)
                for (let i=0;i<3;i++) {
                    let userDet = snapshot.val()[usersArr[i][0]]
                    console.log(userDet)
                    this.top3.push([userDet.username,userDet.image])
                }
                console.log(this.top3)
            })
        })
    }
})

root.mount("#root")