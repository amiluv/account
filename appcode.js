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
var signupFormDB = firebase.database().ref("singupForm");
  
//get IDs
const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");
const showSignup = document.getElementById("showSignup");
const showLogin = document.getElementById("showLogin"); 

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

//listen for signup form submit

signupForm.addEventListener("submit", function(e) {
e.preventDefault();
const email = document.getElementById("signupEmail").value;
const password = document.getElementById("signupPassword").value;
const confirmPassword = document.getElementById("signupConfirmPassword").value;
const phoneNumber = document.getElementById("signupPhoneNumber").value;

if (password === confirmPassword) {
  //localStorage.setItem(email, JSON.stringify({ password, phoneNumber }));
  saveDetails(email, password, phoneNumber);    
           
  alert("Signup successful!");

  signupForm.reset();
}
else {
  alert("Passwords do not match.");
}
//console.log(email, password, phoneNumber);
});

//listen for login form submit

loginForm.addEventListener("submit", function(e) {
e.preventDefault();
const email = document.getElementById("loginEmail").value;
const password = document.getElementById("loginPassword").value;
const storedData = JSON.parse(localStorage.getItem(email));

if (storedData && storedData.password === password) {
  alert("Login successful!");
  loginForm.reset();
} 
else {
  alert("Invalid email or password.");
}
});

//save account details to data base
function saveDetails(email, password, phoneNumber){
var newAccount = signupFormDB.push();
newAccount.set({
  email: email,
  password: password,
  phoneNumber: phoneNumber
});
};

