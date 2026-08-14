
const D=window.FAR_REACH_DATA, $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
$("#navToggle").onclick=()=>$("#nav").classList.toggle("open");
$$("nav a").forEach(a=>a.onclick=()=>$("#nav").classList.remove("open"));
$$(".tab").forEach(b=>b.onclick=()=>{$$(".tab").forEach(x=>x.classList.remove("active"));$$(".tool").forEach(x=>x.classList.remove("active"));b.classList.add("active");$("#"+b.dataset.tool).classList.add("active");if(b.dataset.tool==="sheet")renderSaved()});

function options(el,arr){el.innerHTML=arr.map(x=>`<option>${x}</option>`).join("")}
options($("#people"),D.people);options($("#background"),D.backgrounds);options($("#career"),Object.keys(D.careers));
function updateSpecs(){options($("#spec"),D.careers[$("#career").value]||[])} $("#career").onchange=updateSpecs;updateSpecs();

D.abilities.forEach((a,i)=>$("#abilities").insertAdjacentHTML("beforeend",`<div class="ability"><b>${a}</b><input data-ability="${a}" type="number" min="3" max="20" value="${[15,14,13,12,10,8][i]}"><small id="m${a}">+2</small></div>`));
function mod(n){return Math.floor((n-10)/2)} function sign(n){return n>=0?`+${n}`:`${n}`}
function refreshMods(){$$("[data-ability]").forEach(x=>$("#m"+x.dataset.ability).textContent=sign(mod(+x.value)))} $$("[data-ability]").forEach(x=>x.oninput=refreshMods);refreshMods();

function charObj(){let abilities={};$$("[data-ability]").forEach(x=>abilities[x.dataset.ability]=+x.value);return{name:$("#charName").value||"Unnamed Drifter",people:$("#people").value,background:$("#background").value,career:$("#career").value,spec:$("#spec").value,level:+$("#level").value,abilities}}
function summary(c){let pb=2+Math.floor((Math.max(1,c.level)-1)/4);return `<h3>${c.name}</h3><p><strong>Level ${c.level} ${c.people} ${c.career}</strong> — ${c.spec}<br>${c.background} background • Proficiency +${pb}</p><div class="console-grid">${Object.entries(c.abilities).map(([k,v])=>`<span>${k} <strong>${v} (${sign(mod(v))})</strong></span>`).join("")}</div>`}
$("#saveChar").onclick=()=>{let c=charObj();localStorage.setItem("farReachCharacter",JSON.stringify(c));$("#charSummary").innerHTML=summary(c)+"<p>Saved locally in this browser.</p>"}
$("#randomChar").onclick=()=>{let pick=a=>a[Math.floor(Math.random()*a.length)];$("#charName").value=pick(["Vex","Mara","Kell","Soren","Iria","Tarn","Nia","Rook"])+" "+pick(["Vale","Renn","Kade","Voss","Orin","Sable","Quill"]);$("#people").value=pick(D.people);$("#background").value=pick(D.backgrounds);$("#career").value=pick(Object.keys(D.careers));updateSpecs();$("#spec").value=pick(D.careers[$("#career").value]);let arr=[15,14,13,12,10,8].sort(()=>Math.random()-.5);$$("[data-ability]").forEach((x,i)=>x.value=arr[i]);refreshMods();$("#charSummary").innerHTML=summary(charObj())}
function renderSaved(){let c=JSON.parse(localStorage.getItem("farReachCharacter")||"null");$("#savedSheet").innerHTML=c?summary(c):"No character saved yet."}

$("#saveCrew").onclick=()=>{let c={name:$("#crewName").value||"Unnamed Crew",credits:+$("#credits").value,heat:+$("#heat").value,ship:$("#ship").value,notes:$("#crewNotes").value};localStorage.setItem("farReachCrew",JSON.stringify(c));$("#crewOutput").innerHTML=`<h3>${c.name}</h3><p>${c.ship} • ₡${c.credits.toLocaleString()} • Heat ${c.heat}/100</p><p>${c.notes.replaceAll("<","&lt;")}</p>`}
$("#roll").onclick=()=>{let sides=+$("#die").value.slice(1),n=+$("#diceCount").value,m=+$("#diceMod").value,rolls=Array.from({length:n},()=>1+Math.floor(Math.random()*sides)),total=rolls.reduce((a,b)=>a+b,0)+m;$("#diceResult").innerHTML=`${total}<div style="font-size:14px;color:#7f9ba0">${rolls.join(" + ")} ${m?sign(m):""}</div>`}

const reader=$("#reader"), body=$("#readerBody");
function openPage(id){let p=D.pages.find(x=>x.id===id);body.innerHTML=p.html;reader.showModal()}
$("#closeReader").onclick=()=>reader.close();
reader.onclick=e=>{if(e.target===reader)reader.close()}

function card(id,title,tag,desc){return `<div class="card" data-page="${id}"><span class="tag">${tag}</span><h3>${title}</h3><p>${desc}</p></div>`}
$("#rulesCards").innerHTML=[
card("01_CORE_RULES","Core Rules","SYSTEM","Checks, combat, Defence, shields, rests and character creation."),
card("07_SHIPS","Ship Combat","SYSTEM","Crew stations, manoeuvres, critical damage and boarding."),
card("08_ECONOMY_BOUNTIES_REPUTATION","Trade & Bounties","SYSTEM","Markets, contracts, Reputation, Heat and player bounties."),
card("09_RIFT","Rift Powers","SYSTEM","Focus, Vein techniques and reality-bending abilities.")
].join("");
$("#characterCards").innerHTML=[
card("02_PEOPLES","Peoples","CHARACTER","Human, Khelt, Orrin, Velari, Naruun and Echoed."),
card("03_BACKGROUNDS","Backgrounds","CHARACTER","Fourteen origins, contacts and features."),
card("04_CAREERS","Careers","CHARACTER","Eight complete level 1–20 career progressions."),
card("05_SPECIALISATIONS","Specialisations","CHARACTER","Twenty-four distinct career paths.")
].join("");
$("#compendiumCards").innerHTML=[
card("06_EQUIPMENT_CYBERNETICS","Gear & Cybernetics","COMPENDIUM","Weapons, armour, shields, consumables and implants."),
card("07_SHIPS","Ships & Modules","COMPENDIUM","The Wayfarer, modules, weapons and running costs."),
card("11_BESTIARY_NPCS","Bestiary","COMPENDIUM","Enemies, anomalies, creatures and NPC templates.")
].join("");
$("#gmCards").innerHTML=[card("12_GM_GUIDE","GM Guide","GM","Campaign structure, generators, exploration and balance principles."),card("13_STARTER_ADVENTURE","Dead Signal at Orison-9","ADVENTURE","A levels 1–3 starter campaign.")].join("");
$("#galaxyContent").innerHTML=D.pages.find(x=>x.id==="10_GALAXY_FACTIONS").html;
document.addEventListener("click",e=>{let c=e.target.closest("[data-page]");if(c)openPage(c.dataset.page)});

$("#search").oninput=e=>{let q=e.target.value.trim().toLowerCase();if(q.length<2){$("#searchResults").innerHTML="";return}let hits=D.pages.filter(p=>p.raw.toLowerCase().includes(q)).slice(0,8);$("#searchResults").innerHTML=hits.map(p=>`<div class="search-hit" data-page="${p.id}"><strong>${p.title}</strong><br><small>Contains “${q.replaceAll("<","&lt;")}”</small></div>`).join("")||"<div class='output'>No results.</div>"}

function pick(a){return a[Math.floor(Math.random()*a.length)]}
$("#genJob").onclick=()=>{let j=D.jobs;let danger=1+Math.floor(Math.random()*5), ranges=[[500,2000],[2000,8000],[8000,30000],[30000,100000],[100000,250000]],r=ranges[danger-1],reward=Math.round((r[0]+Math.random()*(r[1]-r[0]))/100)*100;$("#jobOutput").innerHTML=`<span class="tag">DANGER ${danger}</span><h3>${pick(j.job)}</h3><p><strong>Employer:</strong> ${pick(j.employer)}<br><strong>Reward:</strong> ₡${reward.toLocaleString()}<br><strong>Complication:</strong> ${pick(j.complication)}<br><strong>Pressure:</strong> ${pick(j.pressure)}.</p>`}

// FINAL BUILD EXTENSIONS
function extraCard(id,title,tag,desc){return `<div class="card" data-page="${id}"><span class="tag">${tag}</span><h3>${title}</h3><p>${desc}</p></div>`}
document.addEventListener("DOMContentLoaded",()=>{
 const cc=document.querySelector("#characterCards");
 if(cc) cc.insertAdjacentHTML("beforeend",extraCard("16_TALENTS","Talents","CHARACTER","45 talents covering combat, tech, social, exploration, cybernetics and Rift play."));
 const cp=document.querySelector("#compendiumCards");
 if(cp) cp.insertAdjacentHTML("beforeend",
   extraCard("17_WEAPONS","Expanded Weapons","COMPENDIUM","29 weapons across sidearms, rifles, heavy, energy and melee.")+
   extraCard("18_CYBERNETICS","Expanded Cybernetics","COMPENDIUM","24 implants from civilian prosthetics to Precursor technology.")+
   extraCard("19_SHIP_CATALOGUE","Ship Catalogue","COMPENDIUM","Ten playable ship frames for trade, pursuit, exploration and war.")+
   extraCard("20_HACKING","Hacking","SYSTEM","Security tiers, Alert, Quick Hacks and network actions.")+
   extraCard("21_CRAFTING","Crafting & Mods","SYSTEM","Repair, modification, Parts and prototype rules.")+
   extraCard("22_EXPANDED_BESTIARY","Expanded Bestiary","GM","Twenty ready-to-use enemies and alien threats.")
 );
});
