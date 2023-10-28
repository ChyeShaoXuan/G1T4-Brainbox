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
                console.log(this.questions);
                document.getElementById('header').innerText= "This test is for " + testDif +" "+ testSub 
                // random 10 qns
                for (let i=0;i<10;i++){
                    let radnum=Math.floor(Math.random()*(this.questions.length))
                    let spliced_qns=this.questions.splice(radnum,1)[0]
                    spliced_qns.number=i+1
                    this.ran_qns.push(spliced_qns)
                }
                
                //console.log(this.ran_qns)
                
                this.ran_qns.forEach(element => {
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
            checked_rads=[]
            let counter = 0

            for (var i=0;i<rads.length;i++){
                var rad=rads[i]
                if(rad.checked){
                    checked_rads.push(rad.value)
                }
            }
            console.log(checked_rads)
            if (checked_rads.length==this.answers.length){
                for (var i=0;i<rads.length;i++){
                    var rad=rads[i]
                    if (rad.checked){
                        var correct = (rad.value==this.answers[counter])

                    if (correct){
                        rad.closest("label").classList.toggle("correct");

                        this.score+=1
                    }
                    else{
                        rad.closest("label").classList.toggle('error')
                    }
                    counter++
                }
                }
                
                document.getElementById('submit').style.display='none'
                document.getElementById('mark').style.display='block'
                this.show=true

            }
            else{
                alert("Please answer all the questions!")
            }
            
    },
        

    
    
}
})

    



app.mount('#app');



