const urlParams = new URLSearchParams(window.location.search)
const testSub = urlParams.get('subject')
const testDif = urlParams.get('difficulty')

const app = Vue.createApp({
    data() {
        return {
            questions: []
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
                // console.log(this.questions)
                
            })
            .catch((error) => {
                console.error('Error loading questions:', error);
            });
    }
});

app.mount('#app');
