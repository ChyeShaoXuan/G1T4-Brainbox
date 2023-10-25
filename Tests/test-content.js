const urlParams = new URLSearchParams(window.location.search)
const testSub = urlParams.get('subject')
const testDif = urlParams.get('difficulty')

const app = Vue.createApp({
    data() {
        return {
            questions: [],
            answers:[]
        }
    },
    mounted() {
        axios.get('questions.json')
            .then((response) => {
                
                this.questions = response.data[testSub][testDif];
                console.log(this.questions)
                // console.log(response.data[testSub][testDif])
                // console.log(this.questions[testSub][testDif][0].question)
                // this.questions[testSub][testDif].forEach(element => {
                    // console.log(element)
                    // counter++;
                    // this.questions.push({number:counter,question:element.question})
                // });
                
                this.questions.forEach(element => {
                    this.answers.push(element.correct_answer)
                });
                
                console.log(this.answers)
            })
            .catch((error) => {
                console.error('Error loading questions:', error);
            });
    },
    methods:{
        submit(){
        var rads, test; // need to be set after load
        window.addEventListener("load",function() { // when page loads
        quiz = document.getElementById("test");
        rads = quiz.querySelectorAll("input[type=radio]"); // all radios in the quiz
        document.getElementById("submit").addEventListener("click",function(e) { // on click of scoreme
            var score = 0;
            for (var i=0;i<rads.length;i++) { // loop over all radios in the form
            var rad = rads[i];
            var idx = rad.name.substring(1)-1; //remove the q from the name - JS arrays start at 0
            var checked = rad.checked;
            var correct = rad.value==this.answers[idx];
            
            if (correct) {
                rad.closest("label").classList.toggle("correct");
                if (checked) score +=3;
            }  
            else if (checked) {
                score--;
                rad.closest("label").classList.toggle("error")
            }  
            }
            // var scoreper = Math.round(score * 100 / rads.length);
            // document.querySelector("#percentage").innerHTML = scoreper + "%";
            test.mark.value = score;
        });  
});
    }
    
    } 
})

    



app.mount('#app');



