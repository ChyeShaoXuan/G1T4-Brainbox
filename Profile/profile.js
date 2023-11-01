import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js"
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
  

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getDatabase()

const root = Vue.createApp({
    data() {
      return {
        displayed_bio: localStorage.getItem('bio') ||"[ABOUT ME]",
        input_bio: "",
        isEditing: false,
        isSelecting: false,
        username: '',
      }
    },
    methods: {
      editBio() {
        // Switch to editing mode
        this.input_bio = '';
        this.isEditing = true;
      },
      saveBio() {
        // Save the changes and switch back to viewing mode
        this.displayed_bio = this.input_bio;
        this.isEditing = false;

        localStorage.setItem('bio', this.displayed_bio)
      },
      editAvatar() {
        this.isSelecting = true;
      },
      saveAvatar() {
        this.isSelecting = false;
      }
    }, 
    created() {
      onAuthStateChanged(auth, user => {
        const userRef = ref(db, 'users/'+ user.uid)
        onValue(userRef, (snapshot) => {
            this.username = snapshot.val().username
        })
    })
    }
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    root.mount("#root");
  });


const progress = Vue.createApp({
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
  created() {
    onAuthStateChanged(auth, user => {
      const studyRef = ref(db, 'studyCompletion/' + user.uid)
      const studyTotal = ref(db,'studyCompletion/total')
      const testRef = ref(db, 'testCompletion/' + user.uid)
      const testTotal = ref(db,'testCompletion/total')
      onValue(studyTotal, (snapshot) => {
        let totalStudies = snapshot.val()
        let count = 0
        onValue(studyRef, (snapshot2) => {
          snapshot2.forEach(() => {
            count++
          })
          this.studyCompleted = count + '/' + totalStudies
          let percentage = Math.floor((Number(count)/Number(totalStudies))*100)
          this.studyWidth = "width:" + percentage + "%"
        }, {
          onlyOnce: true
        })
      }, {
        onlyOnce: true
      })

      onValue(testTotal, (snapshot) => {
        let totalTests = snapshot.val()
        let count = 0
        onValue(testRef, (snapshot2) => {
          snapshot2.forEach(() => {
            count++
          })
          count--
          this.testCompleted = count + '/' + totalTests
          let percentage = Math.floor((Number(count)/Number(totalTests))*100)
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

// JavaScript for avatar selection carousel
document.addEventListener("DOMContentLoaded", function () {
    const avatarImage = document.getElementById("avatar-image");
    const avatarThumbnails = document.querySelectorAll(".avatar-thumbnail");
    const prevButton = document.getElementById("prev-avatar");
    const nextButton = document.getElementById("next-avatar");
    const confirmButton = document.getElementById("confirm-avatar");
    let currentAvatarIndex = 0;

    function showAvatar(index) {
        avatarImage.src = avatarThumbnails[index].getAttribute("data-src");
    }

    showAvatar(currentAvatarIndex);


    prevButton.addEventListener("click", function () {
        currentAvatarIndex = (currentAvatarIndex - 1 + avatarThumbnails.length) % avatarThumbnails.length;
        showAvatar(currentAvatarIndex);
        console.log("prev");
    });

    nextButton.addEventListener("click", function () {
        currentAvatarIndex = (currentAvatarIndex + 1) % avatarThumbnails.length;
        showAvatar(currentAvatarIndex);
    });

    confirmButton.addEventListener("click", function () {
        // Handle confirmation logic here

        // To retrieve selected image file
        var avatar_chosen = document.getElementById("avatar-image").src
        var image_file = avatar_chosen.split("Images/")[1]
        console.log(image_file)
    });
});

