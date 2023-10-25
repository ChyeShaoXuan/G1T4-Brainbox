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
                let something = response.data[testSub][testDif]
                for(let i=0;i<5;i++) {
                    this.questions.push(something[i])
                }
                // this.questions = response.data[testSub][testDif];
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
            console.log('ululu');
        var rads, test; // need to be set after load
        //window.addEventListener("load",function() { // when page loads
        test = document.getElementById("test");
        rads = test.querySelectorAll("input[type=radio]"); // all radios in the quiz
        // console.log(rads);
        //document.getElementById("submit").addEventListener("click",function(e) { // on click of scoreme
            var score = 0;
            // console.log(rads)
            // console.log(this.answers)
            let counter = 0
            for (var i=0;i<rads.length;i++) { // loop over all radios in the form
                var rad = rads[i];

                if (rad.checked) {
                    //var idx = rad.name.substring(1)-1; //remove the q from the name - JS arrays start at 0
                    console.log(rad.value,this.answers[counter])
                    var correct = (rad.value==this.answers[counter]);
                    console.log(correct)
                    
                    if (correct) {
                        rad.closest("label").classList.toggle("correct");
                        score +=1;
                    }  
                    else{
                        score--;
                        rad.closest("label").classList.toggle("error")
                    }  
                    counter++
                }

            }
            // var scoreper = Math.round(score * 100 / rads.length);
            // document.querySelector("#percentage").innerHTML = scoreper + "%";
            //test.value = score;
            document.getElementById("mark").setAttribute('value',score)
        //});  
//});
    }
    
    } 
})

    



app.mount('#app');



