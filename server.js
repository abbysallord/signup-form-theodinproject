const http = require("http");
const fs=require("fs");
const PORT=3000;

if(!fs.existsSync("users.json")){
  fs.writeFileSync("users.json","[]");
}

function getusers(){
    const data=fs.readFileSync("users.json");
    return JSON.parse(data);
}

function saveUsers(){
  fs.writeFileSync("users.json",JSON.stringify(useSyncExternalStore,null,2));
}

const server=http.createServer((req,res)=>{
  if (req.method==="POST" && req.url==="/users"){
    let body="";
     req.on("data",chunk => body +=chunk);
     req.on("end",()=>{
        const {name,email,password}= JSON.parse(body);
     })
     const users=getusers();
     const exist=users.find(user => user.email === email);
     if (exist) {
      req.end=("Users already exists");
      return;

     } else {
      users.push({name,email,password});
     saveUsers(users);
    }
    res.end("Registered Successfully");
  } 
  if (req.method==="POST" && req.url === "/login"){
    const {email , password}= JSON.parse(body);
    const users = users.find( u => u.email ===email );
    const user1= users.find(u=>password === password);
    if (users && user1){
      res.end("LOGIN_SUCCESS");
    } else if (!users) {
      res.end("Invalid email");
    } else {
      res.end("Invalid password");
    }
    
  }

});

server.listen (PORT ,()=>{
  console.log(`server is running on http://localhost:${PORT}`);
});


















