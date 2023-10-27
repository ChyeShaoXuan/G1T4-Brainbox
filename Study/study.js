// study.js

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
      `<div class='row mb-3 gap-0'>
          <div class='col-sm-1'></div>
          <div class='col-sm-5 hover:scale-125' style='transition: transform .2s'>
             <img src="${image}" style="max-width:100%;
             max-height:100%;">
          </div>
          <div class='col-sm-5 text-center rounded  ms-0 hover:scale-125' style='transition: transform .2s;background-image:url("../Images/study_content_frame.jpg");background-size:cover;background-repeat: no-repeat;'>
               <p class="text-yellow-400 font-semibold text-md text-align-center m-5">${text}</p>
               <p class="text-orange-500 font-semibold text-md text-align-center m-5">${examples}</p>
                
          </div>

     </div>`
    }
    let contents= document.getElementById('notes')
    contents.innerHTML=new_html
      

    })
    .catch(error => {

        // ERROR
        // Something went wrong
        console.log(error.message)
    })
}


function populate_page(){
  let api_endpoint_url = "study.json"

    axios.get(api_endpoint_url)
    .then(response => {  
      let dropdown=document.getElementById('dropdown_topics');
      let value=dropdown.value;
      
      let string_arr= value.split("-");
      let subject=string_arr[0];
      let topic=string_arr[1];
      let data_arr=(response.data[`${subject}`][`${topic}`])
      console.log(data_arr)
      new_html=``;
    for (let i=0; i<data_arr.length;i++){
      let image=data_arr[i].image_url;
      let text=data_arr[i].front_text;
      let examples=data_arr[i].examples;
      new_html+=
      `<div class='row mb-3 gap-0'>
      <div class='col-sm-1'></div>
      <div class='col-sm-5 hover:scale-125' style='transition: transform .2s'>
         <img src="${image}" style="max-width:100%;
         max-height:100%;z-index:-1">
      </div>
      <div class='col-sm-5 text-center rounded  ms-0 hover:scale-125' style='transition: transform .2s;background-image:url("../Images/study_content_frame.jpg");background-size:cover;background-repeat: no-repeat;'>
           <p class="text-yellow-400 font-semibold text-md  text-align-center m-5">${text}</p>
           <p class="text-orange-500 font-semibold text-md text-align-center m-5">${examples}</p>
            
      </div>

 </div>`
    }
    let contents= document.getElementById('notes')
    contents.innerHTML=new_html
    
  
  })
    .catch(error => {

        // ERROR
        // Something went wrong
        console.log(error.message)
    })


}
