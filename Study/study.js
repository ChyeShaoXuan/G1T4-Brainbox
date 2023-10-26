function display_default(){
  let api_endpoint_url = "study.json"

    axios.get(api_endpoint_url)
    .then(response => {  
      let default_data_arr=(response.data.english.grammar)
      new_html=``;
    for (let i=0; i<default_data_arr.length;i++){
      let image=default_data_arr[i].image_url;
      let text=default_data_arr[i].front_text;
      let examples=default_data_arr[i].examples;
      new_html+=
      `<div class='row mb-3'>
          <div class='col-sm-1'></div>
          <div class='col-sm-5'>
             <img src="${image}" style="height:100%;width:100%">
          </div>
          <div class='col-sm-5 text-center rounded  ms-0 hover:scale-125' style='transition: transform .2s;background-image:url("../images/study_grammarbackground.jpeg");background-size:100%'>
               <p class="text-red-900 font-semibold text-md text-align-center m-5">${text}</p>
               <p class="text-blue-400 font-semibold text-md text-align-center">${examples}</p>
                
          </div>

     </div>`
    }
    let contents= document.getElementById('contents')
    contents.innerHTML=new_html
      

    })
    .catch(error => {

        // ERROR
        // Something went wrong
        console.log(error.message)
    })
}


function populate_page(subject,topic){
  let api_endpoint_url = "study.json"

    axios.get(api_endpoint_url)
    .then(response => {  
      let data_arr=(response.data[`${subject}`][`${topic}`])
      
      new_html=``;
      //loop through data_arr for specific topic and subject to get image, text and examples
    for (let i=0; i<data_arr.length;i++){
      let image=data_arr[i].image_url;
      let text=data_arr[i].front_text;
      let examples=data_arr[i].examples;
      new_html+=
      `<div class='row mb-3'>
          <div class='col-sm-1'></div>
          <div class='col-sm-5'>
             <img src="${image}" style="height:100%;width:100%">
          </div>
          <div class='col-sm-5 text-center rounded  ms-0 hover:scale-125' style='transition: transform .2s;background-image:url("../images/study_grammarbackground.jpeg");background-size:cover;background-repeat: no-repeat;'>
               <div class="text-red-900 font-semibold text-md text-align-center m-5">${text}</div>
               <p class="text-blue-400 font-semibold text-md text-align-center">${examples}</p>
                
          </div>

     </div>`
    }
    let contents= document.getElementById('contents')
    contents.innerHTML=new_html
    })
    .catch(error => {

        // ERROR
        // Something went wrong
        console.log(error.message)
    })


}
