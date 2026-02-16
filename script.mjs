function registeruser() {
    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log("register button clicked");
fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password
    })
})
.then(response => response.text())
.then(result => alert(result));

}

function login() {

    const email=document.getElementById("email").value;
    const password= document.getElementById("password").value;
    const error=document.getElementsByClassName("errormsg");
    error[0].style.display="none";
    error[1].style.display="none";
    if (email === "" && password === "") {
        error[0].style.display="block";
        error[1].style.display="block";
        
    } else if (email === "") {
        error[0].style.display="block";
        error[1].style.display="none";
        
    } else if  (password === ""){
        error[0].style.display="none";
        error[1].style.display="block";
        
    } else{
        error[0].style.display="none";
        error[1].style.display="none";
    fetch("http://localhost:3000/login",{
        method: "POST",
        headers :{"Content-Type" : "application/json"},
        body: JSON.stringify({email,password})
    })
    .then(response => response.text())
    .then(result => {
        if(result === "LOGIN_SUCCESS"){
            
            window.location.href = "dashboard.html";
        } else {
            error[1].textContent="Invalid password for the given email";
            error[1].style.display="block";
        }
});
}
}
document.getElementById("logpage").addEventListener("click", function() {
    this.getElementsByClassName("emailin")[0].value="";
    this.getElementsByClassName("passwordlogin")[0].value="";
});

function forgotpassword() {
    const link = document.getElementById("forgotLink");
const transition = document.querySelector(".fishimage");
const scalein=document.querySelector(".login-container");
const forgot=document.querySelector(".forgot-container");
link.addEventListener("click", function(e) {
  e.preventDefault(); // stop immediate navigation
  

  
  setTimeout(() => {
    window.location.href = "forgotpass.html";
  }, 500); // match CSS duration
});
    
    const email=document.getElementById("email").value;
    
    fetch("http://localhost:3000/forgot-password",{

});
}


 function resetpassword(){
    const email=document.getElementById('email');
    const emailcont=document.getElementsByClassName('emailcontainer');
    const passwordcont=document.getElementsByClassName('passwordcontainer');
    const resetbtn=document.getElementById('resetbtn');
    const errormsg=document.getElementById('errormsg');
    const errormsg2=document.getElementById('errmsg2');
    const loginbtn1=document.getElementsByClassName('loginbtn1');
    const loginbtn2=document.getElementsByClassName('loginbtn2');


    if (email.value.includes('@') || email.value.includes('.')){
        resetbtn.style.display='none';
        emailcont[0].style.display='none';
        passwordcont[0].style.display='block';
        errormsg.style.display="none";
        errormsg2.style.display="none";
        loginbtn1[0].style.display="none";
        loginbtn2[0].style.display="block";
    } else {
        errormsg.style.display="block";
    }
}

function samepassword(){
    const newpass=document.getElementById('password');
    const conpass=document.getElementById('confirmpassword');
    const errmsg=document.getElementById("errmsg2");
    const errmsg3=document.getElementById('errmsg3');
    const loginbtn2=document.getElementsByClassName('loginbtn2');
    

    errmsg.style.display="none";
    errmsg3.style.display="none";

    if ((newpass.value.length<8 )|| (conpass.value.length<8)){
        errmsg3.style.display="block";
        return;
    } 
    if (newpass.value!=conpass.value) {
        errmsg.style.display="block";
    
    } else {
        loginbtn2[0].textContent="Resetting...";
        loginbtn2[0].diabled=true;
        setTimeout(() =>{
            window.location.href='login.html';
        },2000);
    }
}
   


