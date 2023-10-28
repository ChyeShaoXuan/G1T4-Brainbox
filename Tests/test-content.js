const urlParams = new URLSearchParams(window.location.search)
const testSub = urlParams.get('subject')
const testDif = urlParams.get('difficulty')

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
        axios.get('questions.json')
            .then((response) => {
                this.questions= response.data[testSub][testDif]

                // random 10 qns
                for (let i=0;i<10;i++){
                    let radnum=Math.floor(Math.random()*(this.questions.length))
                    let spliced_qns=this.questions.splice(radnum,1)[0]
                    ran_qns.push(spliced_qns)
                }
                
                console.log(this.ran_qns)
                
                this.ran_qns.forEach(element => {
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
            this.show=true
            //document.getElementById("mark").setAttribute('value',score)
    },
        

    
    
    } 
})

    



app.mount('#app');



