







function show_test(difficulty,subject){
    api_endpoint_url='questions.json'
          



    
    axios.get(api_endpoint_url)
    .then(response => {  
        if(subject=="english"){
            if(difficulty=="easy"){
        console.log(response.data.english.easy[0])
        let content_section=document.getElementById('content_section')
        let new_html=`<div class=" ms-3 relative overflow-x-auto shadow-md sm:rounded-lg bg-cyan-200 p-3">
        <div class="text-blue-900 ms-3 me-3 text-center text-xl font-bold">Test 1 - ${difficulty}</div>
        
            <div class="  container text-center rounded bg-gradient-to-r from-blue-200 to-blue-300 my-5 text-red-900 font-semibold" 
            style="width: fit-content;">Do you want this test to be timed? <br>If you click yes, you will be eligible for points!</div>
         
         <div class="container text-center rounded bg-gradient-to-r from-blue-200 to-blue-300 my-5 text-red-900 font-semibold" 
         style="width: fit-content;"><button class=btn btn-primary' onclick='display_questions("easy","english")'>Start Test!</button></div>
         </div>`;
        content_section.innerHTML=new_html;
        
    }
    
    
    
    
    }
    })
    .catch(error => {

        // ERROR
        // Something went wrong
        console.log(error.message)
    })

    }

    


    function display_questions(difficulty,subject){
        api_endpoint_url='questions.json'
          



    
    axios.get(api_endpoint_url)
    .then(response => {  
        if(subject=="english"){
            if(difficulty=="easy"){
        
        let content_section=document.getElementById('content_section')
        let questions_arr=response.data.english.easy;
        console.log(questions_arr)
        let new_html=`<div id="carouselExampleCaptions" class="carousel slide">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 4"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 5"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 6"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 7"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 8"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 9"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 10"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 11"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 12"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 13"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 14"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 15"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 16"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 17"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 18"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 19"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 20"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 21"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 22"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 23"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 24"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 25"></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active bg-blue-100">
            
          <div class="card">
          <div class='card-header bg-gradient-to-r from-green-300 via-blue-500 to-purple-600'>${questions_arr[0].number}. ${questions_arr[0].question}</div>
          <div class="card-body bg-blue-300">
              
              <br>
              <ul class="list-group list-group-flush">
                 <li class="list-group-item bg-blue-300" >${questions_arr[0].answers[0]}</li>
                 <li class="list-group-item bg-blue-300" >${questions_arr[0].answers[1]}</li>
                 <li class="list-group-item bg-blue-300" >${questions_arr[0].answers[2]}</li>
                 <li class="list-group-item bg-blue-300" >${questions_arr[0].answers[3]}</li>
              </ul>

          </div>

      </div>
          </div>`;
        
        for(let i=1;i<questions_arr.length;i++){
            new_html+=`<div class="carousel-item">
            
            <div class="card">
                <div class='card-header bg-gradient-to-r from-green-300 via-blue-500 to-purple-600'>${questions_arr[i].number}. ${questions_arr[i].question}</div>
            <div class="card-body bg-blue-300">
                
                <br>
                <ul class="list-group list-group-flush">
                   <li class="list-group-item bg-blue-300" >${questions_arr[i].answers[0]}</li>
                   <li class="list-group-item bg-blue-300"  >${questions_arr[i].answers[1]}</li>
                   <li class="list-group-item bg-blue-300" >${questions_arr[i].answers[2]}</li>
                   <li class="list-group-item bg-blue-300" >${questions_arr[i].answers[3]}</li>
                </ul>
  
            </div>
  
        </div>
            </div>`
            

        }
          
        new_html+=`</div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span class="carousel-control-prev-icon bg-blue-200" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span class="carousel-control-next-icon bg-blue-200" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>`;
     
        content_section.innerHTML=new_html;
        
    }
    
    
    
    
    }
    })
    .catch(error => {

        // ERROR
        // Something went wrong
        console.log(error.message)
    })
        

    }
