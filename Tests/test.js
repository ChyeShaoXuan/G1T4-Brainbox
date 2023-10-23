







function show_test(difficulty,subject){
    api_endpoint_url='questions.json'
          
    
    
    
    
    axios.get(api_endpoint_url)
    .then(response => {  
        
        

        let questions_arr=(response.data[`${subject}`][`${difficulty}`])
        let content_section=document.getElementById('content_section')
        let new_html=`<div class=" ms-3 relative overflow-x-auto shadow-md sm:rounded-lg bg-cyan-200 p-3">
        <div class="text-blue-900 ms-3 me-3 text-center text-xl font-bold">Difficulty - ${difficulty}</div>
        
            <div class="  container text-center rounded bg-gradient-to-r from-blue-200 to-blue-300 my-5 text-red-900 font-semibold" 
            style="width: fit-content;">Do you want this test to be timed? <br>If you click yes, you will be eligible for points!</div>
         
         <div class="container text-center rounded bg-gradient-to-r from-blue-200 to-blue-300 my-5 text-red-900 font-semibold" 
         style="width: fit-content;"><button class=btn btn-primary' onclick='display_questions("easy","english")'>Start Test!</button></div>
         </div>`;
        content_section.innerHTML=new_html;
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
        let questions_arr=(response.data[`${subject}`][`${difficulty}`])
        let content_section=document.getElementById('content_section')
        
        
        let new_html=`<div id="carouselExampleCaptions" class="carousel slide md:ms-3 sm:mt-3">
        
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
        
    )
    .catch(error => {

        // ERROR
        // Something went wrong
        console.log(error.message)
    })
        

    }
