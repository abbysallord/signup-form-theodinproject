
import http from "http"
import fs from "fs"


const PORT =process.env.port || 3000;

// create database if not exists
if (!fs.existsSync("users.json")) {
  fs.writeFileSync("users.json", "[]");
}

function getUsers() {
  return JSON.parse(fs.readFileSync("users.json"));
}

function saveUsers(users) {
  fs.writeFileSync("users.json", JSON.stringify(users, null, 2));
}

const server = http.createServer((req, res) => {
res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }
  // REGISTER
  if (req.method === "POST" && req.url === "/users") {
    console.log("REGISTER endpoint hit");
    let body = "";

    req.on("data", chunk => body += chunk);
    res.writeHead(200, { "Content-Type": "text/plain" });
    req.on("end", () => {
      const { firstname, lastname, email, password } = JSON.parse(body);
      const users = getUsers();

      const exists = users.find(u => u.email === email);
      if (exists) {
        res.end("User already exists");
        return;
      }

      users.push({ firstname, lastname, email, password });
      saveUsers(users);
      
      console.log("User saved:", users);
      console.log("Saving users to file...");
      setTimeout(()=>{
        res.end("saving profile....");

      },2000);
      res.end("Registered Successfully");
    });
    return;
  }

  // LOGIN
  if (req.method === "POST" && req.url === "/login") {
    let body = "";

    req.on("data", chunk => body += chunk);
    res.writeHead(200, { "Content-Type": "text/plain" });
    req.on("end", () => {
      const { email, password } = JSON.parse(body);
      const users = getUsers();

      const user = users.find(u => u.email === email);

      if (!user) {
        res.end("Invalid email");
      } else if (user.password !== password) {
        res.end("Invalid password");
      } else {
        res.end("LOGIN_SUCCESS");
      }
    });
    return;
  }

  if (req.method==="POST" && req.url==="/forgotpass"){
    console.log("email check came")
     let body="";
     req.on("data",chunk => body+=chunk)
     req.on("end",()=>{
      const {email} =JSON.parse(body)
      const users=getUsers();
      const user=users.find(u=>u.email===email);
      if (!user){
        res.end("Email Not Found")
      
      } else {
        res.end("Email Found");
      }

     });
     return;
  }
});

if (req.metod==='POST'&& req.url==="/setpassword"){
  
}

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

















