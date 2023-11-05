import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import {getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js"

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
const auth = getAuth(app)
let hasRun = false
function unsubscribe() {
    onAuthStateChanged(auth, user => {
        // console.log('testersee')
        if (hasRun) { //If loginstatus has been checked once, don't check again
            return
        }
        hasRun = true;
        // console.log(hasRun)
        breakme: {
        if (user) { 
            if (document.URL.includes('Login/index.html')) { //If logged in user accesses login page, redirect to home
                window.location.replace("../Home/home.html")
                break breakme
            }
            document.getElementById('contentBlock').style.display = null //Display page after authenticated
            // console.log('user logged in')
            // console.log(user.uid)

        } else {
            if (!document.URL.includes('Login/index.html')) { //If not logged in user accesses any page other than login, redirect to login
                window.location.replace("../Login/index.html")
                break breakme
            }
            document.getElementById('contentBlock').style.display = null //Display page after authenticated
            // console.log('test2')
        }
    }
    })
}



unsubscribe()

