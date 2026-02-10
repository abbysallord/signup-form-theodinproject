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
    fetch("http://localhost:3000/login",{
        method: "POST",
        headers :{"Content-Type" : "application/json"},
        body: JSON.stringify({email,password})
    })
}
