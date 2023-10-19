const inputs = document.querySelectorAll(".input-field");
const toggle_btn = document.querySelectorAll(".toggle");
const main = document.querySelector("main");
const bullets = document.querySelectorAll(".bullets span");
const images = document.querySelectorAll(".image");
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-analytics.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js"
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js"



inputs.forEach((inp) => {
  inp.addEventListener("focus", () => {
    inp.classList.add("active");
  });
  inp.addEventListener("blur", () => {
    if (inp.value != "") return;
    inp.classList.remove("active");
  });
});

toggle_btn.forEach((btn) => {
  btn.addEventListener("click", () => {
    main.classList.toggle("sign-up-mode");
  });
});

function moveSlider() {
  let index = this.dataset.value;

  let currentImage = document.querySelector(`.img-${index}`);
  images.forEach((img) => img.classList.remove("show"));
  currentImage.classList.add("show");

  const textSlider = document.querySelector(".text-group");
  textSlider.style.transform = `translateY(${-(index - 1) * 2.2}rem)`;

  bullets.forEach((bull) => bull.classList.remove("active"));
  this.classList.add("active");
}


bullets.forEach((bullet) => {
  bullet.addEventListener("click", moveSlider);
});




const firebaseConfig = {
    apiKey: "AIzaSyCEjW5Rq4jgHbSS1GCJy0pl6hpPrFQ9pUI",
    authDomain: "wad2-4fc9e.firebaseapp.com",
    projectId: "wad2-4fc9e",
    storageBucket: "wad2-4fc9e.appspot.com",
    messagingSenderId: "83590678050",
    appId: "1:83590678050:web:6c98cdb011612eb4f5ac7b",
    measurementId: "G-NY0ZMNMQLZ",
    databaseURL: "https://wad2-4fc9e-default-rtdb.asia-southeast1.firebasedatabase.app"
  };
  


  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  const auth = getAuth(app)

  const signupEmailPassword = async () => { 
    
    const signupEmail = document.getElementById('signupEmail').value;
    const signupPassword = document.getElementById('signupPassword').value;
    const signupName = document.getElementById('name').value;
    console.log(signupEmail,signupPassword)
    console.log(document.querySelector("[name='agree']").checked)

    if (signupName.length == 0 || signupEmail.length == 0 || signupPassword.length == 0) {
      showSignUpError('blank')
    } else if (signupPassword.length <6) {
      showSignUpError('short')
    } else if (!document.querySelector("[name='agree']").checked) {
      console.log('wat')
      showSignUpError('checkbox')
    } else {
      showSignUpError('none')
      try {

        const userCredential = await createUserWithEmailAndPassword(auth, signupEmail, signupPassword)

        document.getElementById('signinMessage').innerText="You have successfully signed up!"
        document.getElementById('signinMessage').setAttribute("style","color:green")

        clearFields()
        main.classList.toggle("sign-up-mode")

      }
      catch(error) {
        console.log(error);
        showSignUpError(error.code);
      }
    }}

    const loginEmailPassword = async () => {
      const loginEmail = document.getElementById('loginEmail').value;
      const loginPassword = document.getElementById('loginPassword').value;
      if (loginEmail == '' || loginPassword == '') {
        showLogInError('blank');
      } else {
        console.log(loginEmail,loginPassword)
        try {
        const loginCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
        window.location.href = "../Home/home.html"
        }
        catch(error) {
          console.log(error);
          showLogInError('invalid')
        }
      }
    }

    // const monitorAuthState = async () => {
    //   onAuthStateChanged(auth, user => {
    //     if (user) {
    //       console.log('true')
    //     } else {
    //       console.log('false')
    //     }
    //   });
    // }
    // monitorAuthState();

    function showSignUpError(error) {
          console.log(error)
          var msgSpace = document.getElementById('signupError')
          if (error == 'auth/email-already-in-use'){
            msgSpace.innerText= 'Email already exists!'
          } else if (error == 'short') {
            msgSpace.innerText= 'Password has to be more than 6 characters!'
          } else if (error == 'blank') {
            msgSpace.innerText = 'Please fill in the blanks!'
          } else if (error == 'checkbox') {
            msgSpace.innerText = 'Please agree to our terms and services!'
          } else if (error == 'none') {
            msgSpace.innerText = ''
          }
            
    }

    function showLogInError(error) {
      var loginMsg = document.getElementById('signinMessage')
      loginMsg.setAttribute('style','color:red')
      if (error == 'blank') {
        loginMsg.innerText = 'Please fill in the blanks!'
      } else if (error == 'invalid') {
        loginMsg.innerText = 'Wrong email or password!'
      }
    }

    function clearFields() {
      let fields = document.getElementsByClassName('input-field')
      for (let field of fields) {
        console.log(field)
        field.value = ''
      }
    }


  
  document.getElementById('signup').addEventListener('click',signupEmailPassword);

  document.getElementById('login').addEventListener('click',loginEmailPassword);



  document.getElementById("signup").addEventListener("click", function(event){
    event.preventDefault()
  });

  document.getElementById("login").addEventListener("click", function(event){
    event.preventDefault()
  });