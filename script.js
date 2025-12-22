const API = "http://localhost:3000";

// Navigation
function showPage(id){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  if(id === "databasePage") renderDatabaseTable();
}

// REGISTER
async function registerParticipant(){
  const n = regName.value;
  const e = regEmail.value;
  const p = regPhone.value;

  const res = await fetch(API + "/register", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({name:n, email:e, phone:p})
  });

  const data = await res.json();
  alert("Registered! ID: " + data.id);
}

// FEATURES
async function searchParticipant(){
  const id = featID.value;
  const res = await fetch(API + "/participant/" + id);
  const data = await res.json();
  featResult.innerText = data.message || 
    `${data.name} - ${data.email} [${data.checked?"Checked-In":"Pending"}]`;
}

async function deleteParticipant(){
  const id = featID.value;
  await fetch(API + "/delete/" + id, {method:"DELETE"});
  alert("Deleted");
}

async function checkInParticipant(){
  const id = featID.value;
  await fetch(API + "/checkin/" + id, {method:"POST"});
  alert("Checked-In");
}

async function showStatistics(){
  const res = await fetch(API + "/stats");
  const s = await res.json();
  alert(`Total:${s.total}\nChecked:${s.checked}\nPending:${s.pending}`);
}

// DATABASE
async function renderDatabaseTable(){
  const res = await fetch(API + "/participants");
  const data = await res.json();

  if(!data.length){
    dbTable.innerHTML="<p>No data</p>";
    return;
  }

  let html="<table><tr><th>ID</th><th>Name</th><th>Email</th><th>Status</th></tr>";
  data.forEach(p=>{
    html+=`<tr>
      <td>${p.id}</td>
      <td>${p.name}</td>
      <td>${p.email}</td>
      <td>${p.checked?"Checked":"Pending"}</td>
    </tr>`;
  });
  dbTable.innerHTML=html+"</table>";
}
