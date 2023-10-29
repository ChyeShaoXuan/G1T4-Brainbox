// study.js

function display_default(){
  let api_endpoint_url = "study.json"

    axios.get(api_endpoint_url)
    .then(response => { 
      console.log(response.data["english"]);
      let default_data_arr=(response.data['english']['grammar'])
      
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

function show_dictionary(){
  
      // function to show the dictionary section if the topic is vocabulary
     
      let dictionary_section=document.getElementById('dictionary_section');
      let new_html=`<div class="col-md-4 col-2"></div>
      <div class="col-8 col-md-4"><div class="mb-3">
        <label for="wordsearch" class=" mt-3 form-label text-red-900 font-semibold text-lg">Find any word you would like with our free dictionary!</label>
        <input type="email" class="form-control rounded-full" id="wordsearch" placeholder="Type your word here..."><div class="col-auto">
        <button type="submit" class="btn bg-blue-900 text-light hover:bg-blue-500 font-semibold mt-3 mb-3" onclick="find_searchword_meaning()">Search</button>
      </div>
      </div>
      <div class="col-2 col-md-4"></div>
      </div>
      <div class='row text-red-900 bg-gradient-to-r from-blue-300 via-green-200 to-yellow-300 rounded' id='searchresultdisplay'><div>`
      dictionary_section.innerHTML=new_html;
    


}
function play_audio(audio_link){
  var music = new Audio(audio_link);
  music.play();

}

function find_searchword_meaning(){
  let wordsearch=document.getElementById('wordsearch');
  let word=wordsearch.value;
  if(word!=""){
  
  let api_endpoint_url= `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  axios.get(api_endpoint_url)
    .then(response => {  
      let new_html=``
      //dealing with audio
      

      
      // console.log(response.data[0].meanings)
      let meanings=response.data[0].meanings
      for(meaning of meanings){
        let html_to_add=``
        let wordform=meaning.partOfSpeech;
        let definition_arr=meaning.definitions;
        
        html_to_add+=`<br><p class='text-red-900 font-semibold'>Wordform : ${wordform} </p> <p class='text-purple-700'><span class='text-red-900 mb-2 font-semibold'>Definitions : </span>`;
        for(definition_individual of definition_arr){
          definition=definition_individual.definition;
          html_to_add+=`${definition}<br><br>`
          

        }
        
        html_to_add+='</p>'
        new_html+=html_to_add;


      }
      console.log(response.data[0].phonetics)
      let phonetics=response.data[0].phonetics;
      for(phonetic of phonetics){
        console.log(phonetic.audio)
        if(phonetic.audio!=''){
          new_html+=`<div class='row'>
          <div class='col-4'></div>
          <div class='col-4'>
           <button type="button" class="btn mb-3 bg-gradient-to-r from-yellow-200 via-pink-200 to-pink-400 rounded-full" onclick='play_audio("${phonetic.audio}")'>Pronunciation</button>
          </div>
          <div class='col-4'></div>
        </div>`
          { break; }
          
        }}
      let searchresultdisplay=document.getElementById('searchresultdisplay');
      
      searchresultdisplay.innerHTML=new_html;

    })
    .catch(error => {

        // ERROR
        // Something went wrong
        console.log(error.message)
    })


}
else{
  let searchresultdisplay=document.getElementById('searchresultdisplay');
  searchresultdisplay.innerHTML="<span class='mx-auto'>This cannot be empty!</span>"
}
  
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
      if(subject=='english' && topic=='vocabulary'){
        show_dictionary();
      }  
      else {
        let dictionary_section = document.getElementById('dictionary_section');
        dictionary_section.innerHTML = ''; 
      }

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
