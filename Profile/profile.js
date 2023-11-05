import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getDatabase, ref, onValue, update } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js"
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
const db = getDatabase()
const avatarImage = document.getElementById("avatar-image");
const avatarThumbnails = document.querySelectorAll(".avatar-thumbnail");



const root = Vue.createApp({ //Initialise VUE
    data() {
      return {
        isEditing: false,
        isSelecting: false,
        username: '',
        currentAvatarIndex: 0,
        currentAvatar: ''
      }
    },
    methods: {
      editAvatar() { //Toggle showing avatar buttons
        this.isSelecting = !this.isSelecting;
      },
      showAvatar(index) { // Update image 
        avatarImage.src = avatarThumbnails[index].src;
      },
      movePrev() { 
        this.currentAvatarIndex = (this.currentAvatarIndex - 1 + avatarThumbnails.length) % avatarThumbnails.length; // Change thumbnail to previous image
        // console.log("prev");
        this.currentAvatar = "../" + avatarThumbnails[this.currentAvatarIndex].src.split("Brainbox/")[1]
      },
      moveNext() { 
        this.currentAvatarIndex = (this.currentAvatarIndex + 1) % avatarThumbnails.length; //Change thumbnail to next image
        // console.log("next");
        this.currentAvatar = "../" + avatarThumbnails[this.currentAvatarIndex].src.split("Brainbox/")[1]
      },
      confirmAvatar() {
        this.isSelecting = !this.isSelecting;
        var avatar_chosen = document.getElementById("avatar-image").src
        var image_file = avatar_chosen.split("Images/")[1]
        onAuthStateChanged(auth, user => { //Retrieve logged in user info
          //Update user avatar in database
          const userRef = ref(db, 'users/' + user.uid) 
            let updates = {
              image: image_file
            }
            update(userRef, updates)
        })
      }
    }, 
    created() { //On load, display user name and user avatar
      onAuthStateChanged(auth, user => { //Retrieve logged in user info
        const userRef = ref(db, 'users/' + user.uid)
        onValue(userRef, (snapshot) => {
            this.username = snapshot.val().username
            if (Number(snapshot.val().image[6]) == 0) {
              this.currentAvatarIndex = 0
            } else {
              this.currentAvatarIndex = Number(snapshot.val().image[6]) - 1 
            }
            this.currentAvatar = "../" + avatarThumbnails[this.currentAvatarIndex].src.split("Brainbox/")[1]
            console.log(this.currentAvatar)
        }, {
          onlyOnce:true
        })
    })
    }
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    root.mount("#root");
  });

const progress = Vue.createApp({ //Initialise vue object for progress section
  data() {
    return {
      studyWidth: '',
      testWidth: '',
      studyCompleted: '',
      testCompleted: '',
      username: '',
    }
  },
  methods: {

  },
  created() { // On load
    onAuthStateChanged(auth, user => { //Retrieve logged in user info
      const studyRef = ref(db, 'studyCompletion/' + user.uid)
      const studyTotal = ref(db,'studyCompletion/total')
      const testRef = ref(db, 'testCompletion/' + user.uid)
      const testTotal = ref(db,'testCompletion/total')
      onValue(studyTotal, (snapshot) => { //Retrieve total num of study topics
        let totalStudies = snapshot.val()
        let count = 0
        onValue(studyRef, (snapshot2) => { //Retrieve user's completed study topics
          snapshot2.forEach(() => {
            count++
          })
          this.studyCompleted = count + '/' + totalStudies
          let percentage = Math.floor((Number(count)/Number(totalStudies))*100) //Whole number percentage for styling width
          this.studyWidth = "width:" + percentage + "%"
        }, {
          onlyOnce: true
        })
      }, {
        onlyOnce: true
      })

      onValue(testTotal, (snapshot) => { //Retrieve total num of tests
        let totalTests = snapshot.val()
        let count = 0
        onValue(testRef, (snapshot2) => { //Retrieve user completed tests

          snapshot2.forEach(() => { //Count user's number of completed
            count++
          })
          count-- //Account for extra value "total"
          if (snapshot2.val() == null) { //If user does not have any completed
            count = 0
          }  
          this.testCompleted = count + '/' + totalTests
          let percentage = Math.floor((Number(count)/Number(totalTests))*100) //Styling width percentage in whole number
          this.testWidth = "width:" + percentage + "%"
        }, {
          onlyOnce:true
        })
      }, {
        onlyOnce:true
      })
    })
  }
})

progress.mount("#progress")