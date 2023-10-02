const firebaseConfig = {
  apiKey: "AIzaSyAW0iGcENIp6RoAt3puV-9c6AsjRvlP2wA",
  authDomain: "alx-app-project-bc2f9.firebaseapp.com",
  databaseURL: "https://alx-app-project-bc2f9-default-rtdb.firebaseio.com",
  projectId: "alx-app-project-bc2f9",
  storageBucket: "alx-app-project-bc2f9.appspot.com",
  messagingSenderId: "824028472152",
  appId: "1:824028472152:web:14d278b8258aa43b46fb2d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//referencing the database
const database = firebase.database();
//const signupFormDB = firebase.database().ref("signupForm");
const signupFormDB = database.ref("users");

//get IDs
const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");
const showSignup = document.getElementById("showSignup");
const showLogin = document.getElementById("showLogin"); 
const errorEmail = document.getElementById("error-email");
const errorPhone = document.getElementById("error-phone");
const phoneNumberInput = document.getElementById("signupPhoneNumber");
const emailInput = document.getElementById("signupEmail");


//toggle between signup and login forms
showSignup.addEventListener("click", function() {
signupForm.classList.remove("hidden");
loginForm.classList.add("hidden");
document.getElementById("signupEmail").focus();
});

showLogin.addEventListener("click", function() {
loginForm.classList.remove("hidden");
signupForm.classList.add("hidden");
document.getElementById("loginEmail").focus();
});

//check for valid phone number
phoneNumberInput.addEventListener("input", function(){
  const inputValue = phoneNumberInput.value;
  const numericValue = inputValue.replace(/\D/g, "");
  if (numericValue.length === 11){
     errorPhone.textContent = "";
  } else if(inputValue == numericValue){
    errorPhone.textContent = '';
  }
   else {
    errorPhone.textContent = "Enter 11 digit numbers only"
  }
  phoneNumberInput.value = numericValue;
});

/
//listen for signup form submit
signupForm.addEventListener("submit", function(e) {
e.preventDefault();
const email = document.getElementById("signupEmail").value;
const password = document.getElementById("signupPassword").value;
const confirmPassword = document.getElementById("signupConfirmPassword").value;
const phoneNumber = document.getElementById("signupPhoneNumber").value;

if (password === confirmPassword && email !== "") {
  saveDetails(email, password, phoneNumber); 
  document.querySelector(".alert").style.display = "block";
  setTimeout(function() {
    document.querySelector(".alert").style.display = "none";
  },3000);
  signupForm.reset();
  }else {
    alert("Passwords do not match or email is empty.");
  }
});

//listen for login form submit
loginForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  // Reference to the users' data location in Firebase 
  const usersRef = firebase.database().ref("users");
  usersRef.orderByChild("email").equalTo(email).once("value")
    .then(snapshot => {
      if (snapshot.exists()) {
        // User with the provided email exists in the database
        snapshot.forEach(childSnapshot => {
          const userData = childSnapshot.val();
          if (userData.password === password) {
            document.querySelector(".alert").style.display = "block";
            setTimeout(function() {
              document.querySelector(".alert").style.display = "none";
            },2000);
            setTimeout(function(){
              window.location.href = "index.html";
            },1000);
            
          } else {
            // Password does not match
            alert("Invalid email or password.");
          }
        });
      } else {
        // User with the provided email does not exist
        alert("Invalid email or password.");
      }
    })
    .catch(error => {
      console.error("Error reading data:", error);
      alert("An error occurred while logging in.");
    });
});

function saveDetails(email, password, phoneNumber){
  const newAccount = signupFormDB.push();
  newAccount.set({
    email: email,
    password: password,
    phoneNumber: phoneNumber
  });
};
