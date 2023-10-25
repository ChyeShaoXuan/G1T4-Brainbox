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
                console.log(this.questions.English.Easy)
            })
            .catch((error) => {
                console.error('Error loading questions:', error);
            });
    }
});

app.mount('#app');
