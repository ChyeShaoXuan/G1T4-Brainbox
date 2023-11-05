
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getDatabase, ref, onValue, get, set, update} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js"
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
  
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase()
const auth = getAuth(firebaseApp)
const urlParams = new URLSearchParams(window.location.search)
const testSub = urlParams.get('subject')
const testDif = urlParams.get('difficulty')

// Vue
const app = Vue.createApp({
    data() {
        return {
            questions: [],
            ran_qns:[],
            answers:[],
            score: 0,
            show: false

        }
    },
    mounted() {
        // Connect to API
        axios.get('questions.json')
            .then((response) => {
                this.questions= response.data[testSub][testDif]
                // console.log(this.questions);
                document.getElementById('header').innerText= "This test is for " + testDif.toLowerCase() +" "+ testSub.toLowerCase() +"." //test heading
                // Generate random 10 qns
                for (let i=0;i<10;i++){
                    let radnum=Math.floor(Math.random()*(this.questions.length))
                    let spliced_qns=this.questions.splice(radnum,1)[0]
                    spliced_qns.number=i+1
                    this.ran_qns.push(spliced_qns)
                }
                
                //console.log(this.ran_qns)
                
                this.ran_qns.forEach(element => { //Push correct answers into ran_qns
                    this.answers.push(element.correct_answer)
                });
                
                //console.log(this.answers)
            })
            .catch((error) => {
                console.error('Error loading questions:', error);
            });
    },
    methods:{
        submit(){
            var rads, test; // need to be set after load
            test = document.getElementById("test");
            rads = test.querySelectorAll("input[type=radio]"); // all radios in the quiz
            let checked_rads=[]
            let counter = 0

            for (var i=0;i<rads.length;i++){
                var rad=rads[i]
                if(rad.checked){ //push in checked options of all radio buttons
                    checked_rads.push(rad.value)
                }
            }
            // console.log(checked_rads)
            if (checked_rads.length==this.answers.length){ //If all questions answered
                for (var i=0;i<rads.length;i++){
                    var rad=rads[i]
                    if (rad.checked){ //For every checked option, check if correct
                        var correct = (rad.value==this.answers[counter])

                    if (correct){ //Styling for correct answeres
                        rad.closest("label").classList.toggle("correct");

                        this.score+=1
                    }
                    else{ //Styling for wrong answers
                        rad.closest("label").classList.toggle('error')
                    }
                    counter++
                }
                }
                
                document.getElementById('submit').style.display='none'
                this.show=true
                //console.log(this.show)

                onAuthStateChanged(auth, user => {
                    const completeRef = ref(db, 'testCompletion/' + user.uid)
                    let value = 0

                    let updates = {}
                    let testKey = testSub+testDif //Set key as test subject and difficulty
                    updates[testKey] = true //Mark test as completed
                    onValue(completeRef, (snapshot) => {

                        if (testDif == "Medium") {
                            value = Number(this.score) * 2 //2x multiplier for medium
                        } else if (testDif == "Hard") {
                            value = Number(this.score) * 3 //3x multiplier for hard
                        } else {
                            value = Number(this.score)
                        }
                        if (snapshot.val() == null) { //If user has no testCompletion entry
                            // console.log('nulltest')
                            updates.totalScore = value
                        } else {
                            updates.totalScore = value + snapshot.val().totalScore
                        } 
                        update(completeRef, updates) //Update user data
                        // console.log('submitted')
                    }, {
                        onlyOnce:true
                    })
                })

            }
            else{ //Not completed
                var myModal = new bootstrap.Modal(document.getElementById('error'))
                myModal.show()
            }
            

    },
        

    
    
}
})

    



app.mount('#app');



