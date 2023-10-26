const urlParams = new URLSearchParams(window.location.search)
const testSub = urlParams.get('subject')
const testDif = urlParams.get('difficulty')

const app = Vue.createApp({
    data() {
        return {
            questions: [],
            answers:[],
            score: 0
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
            test = document.getElementById("test");
            rads = test.querySelectorAll("input[type=radio]"); // all radios in the quiz
            
            let counter = 0
            for (var i=0;i<rads.length;i++) { // loop over all radios in the form
                var rad = rads[i];

                if (rad.checked) {
                    console.log(rad.value,this.answers[counter])
                    var correct = (rad.value==this.answers[counter]);
                    console.log(correct)
                    
                    if (correct) {
                        rad.closest("label").classList.toggle("correct");
                        this.score +=1;
                    }  
                    else{
                        
                        rad.closest("label").classList.toggle("error")
                    }  
                    counter++
                }

            }
            document.getElementById('mark').style.display='block'
            document.getElementById('submit').style.display='none'
            //document.getElementById("mark").setAttribute('value',score)
    },

    
    
    } 
})

    



app.mount('#app');



