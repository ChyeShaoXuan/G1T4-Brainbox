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
                this.questions = response.data;
                console.log(this.questions[testSub][testDif].question)
            })
            .catch((error) => {
                console.error('Error loading questions:', error);
            });
    }
});

app.mount('#app');
