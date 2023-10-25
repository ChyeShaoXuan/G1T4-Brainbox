function display_default(){
  let api_endpoint_url = "study.json"

    axios.get(api_endpoint_url)
    .then(response => {  
      let default_data_arr=(response.data.english.grammar)
      let first_text=default_data_arr[0].front_text;
      let first_image=default_data_arr[0].image_url;
      let first_examples=default_data_arr[0].examples;
      new_html=``;
    for (let i=0; i<default_data_arr.length;i++){
      let image=default_data_arr[i].image_url;
      let text=default_data_arr[i].front_text;
      let examples=default_data_arr[i].examples;
      new_html+=
      `<div class='row mb-3'>
          <div class='col-sm-1'></div>
          <div class='col-sm-5'>
             <img src="${image}" style="height:100%">
          </div>
          <div class='col-sm-5 text-center rounded  ms-0 hover:scale-125' style='transition: transform .2s;background-image:url("../Images/study_grammarbackground.jpeg");background-size:100%'>
               <div class="text-red-900 font-semibold text-xl text-align-center m-5">${text}</div>
                
          </div>

     </div>`
    }
    let study_carousel= document.getElementById('contents')
    study_carousel.innerHTML=new_html
      

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
      console.log(response)
    })
    .catch(error => {

        // ERROR
        // Something went wrong
        console.log(error.message)
    })


}
