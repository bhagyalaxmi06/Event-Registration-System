const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let participants = [];
let idCounter = 1000;

// REGISTER
app.post("/register", (req,res)=>{
  const {name,email,phone} = req.body;
  idCounter++;
  participants.push({
    id:idCounter,
    name,email,phone,
    checked:false
  });
  res.json({id:idCounter});
});

// SEARCH
app.get("/participant/:id", (req,res)=>{
  const p = participants.find(x=>x.id==req.params.id);
  if(!p) return res.json({message:"Not found"});
  res.json(p);
});

// DELETE
app.delete("/delete/:id", (req,res)=>{
  participants = participants.filter(x=>x.id!=req.params.id);
  res.json({message:"Deleted"});
});

// CHECK-IN
app.post("/checkin/:id", (req,res)=>{
  const p = participants.find(x=>x.id==req.params.id);
  if(!p) return res.json({message:"Not found"});
  p.checked=true;
  res.json({message:"Checked-In"});
});

// STATS
app.get("/stats", (req,res)=>{
  const total = participants.length;
  const checked = participants.filter(p=>p.checked).length;
  res.json({total, checked, pending: total-checked});
});

// DATABASE
app.get("/participants",(req,res)=>{
  res.json(participants);
});

app.listen(3000, ()=>console.log("Backend running on 3000"));