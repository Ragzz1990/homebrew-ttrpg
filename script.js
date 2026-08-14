const peoples=[
{name:"Human",tag:"Adaptable descendants of the Crossing",desc:"Humanity arrived in the galaxy as an outsider species and survived by adapting to environments, cultures and technologies it did not evolve alongside.",traits:[["Adaptable","Gain flexibility when choosing trained skills or background talents."],["Crossing Legacy","Human cultures carry contradictory fragments of ancient Earth traditions."],["Versatile","Humans integrate readily with a wide range of equipment and cybernetics."]]},
{name:"Khelt",tag:"A person made of a colony",desc:"A Khelt is not a single organism. Thousands of symbiotic lifeforms inhabit and maintain a mineral skeleton, collectively forming one thinking person.",traits:[["Colony Mind","A Khelt experiences identity as a coordinated multitude rather than one biological organism."],["Mineral Frame","Their internal structure offers unusual resilience but requires specialised medical treatment."],["Distributed Life","Parts of the colony may survive injuries that would destroy a conventional organism."]]},
{name:"Orrin",tag:"They see electricity, not light",desc:"Orrin evolved without conventional sight. Their sensory organs map electromagnetic activity, allowing technology and nervous systems to appear as luminous structures.",traits:[["Electrosense","Detect nearby active electronics and unusual electrical activity."],["Sightless","Visual art and unpowered objects can be difficult to perceive without assistive equipment."],["Signal Reader","Orrin excel at noticing powered devices, energy discharge and electrical faults."]]},
{name:"Velari",tag:"Bodies reshaped by gravity",desc:"Velari bodies are dense biological fluid held around a flexible internal lattice. Their proportions alter naturally under different gravitational conditions.",traits:[["Fluid Frame","Squeeze and move through spaces difficult for rigid-bodied peoples."],["Gravity Form","Your physical proportions adapt over time to local gravity."],["Pressure Tolerance","Velari physiology handles pressure change differently from most humanoid life."]]},
{name:"Naruun",tag:"Two minds sharing one body",desc:"Naruun possess two neurologically distinct brains working in parallel: one handles deliberate thought while the other processes instinct, threat and subconscious information.",traits:[["Parallel Thought","Maintain awareness while concentrating on complex tasks."],["Second Instinct","Strong resistance to effects that overwhelm or deceive a single line of thought."],["We / I","Naruun cultures differ on whether the two minds are one person or lifelong partners."]]},
{name:"Echoed",tag:"Memory survives. Identity may not.",desc:"Echoed are biological memory-organisms housed inside artificial bodies. When a shell is destroyed, the organism can sometimes be transferred—but memory degradation accumulates.",traits:[["Synthetic Shell","Your body is constructed rather than grown in the conventional sense."],["Continuity","Echoed can potentially survive bodily destruction if their memory-organism is recovered."],["Memory Scars","Ancient Echoed may remember events without knowing whether the memories were originally theirs."]]}
];

const careers=[
{name:"Bounty Hunter",role:"Tracker • Target Specialist",desc:"Find people who do not want to be found and decide whether the contract matters more than the truth.",paths:["Deadeye","Bloodhound","Juggernaut"]},
{name:"Voidrunner",role:"Smuggler • Infiltrator • Opportunist",desc:"Get into places you should not be, move things that should not move and disappear before anyone can object.",paths:["Ghost","Corsair","Fixer"]},
{name:"Vanguard",role:"Soldier • Mercenary",desc:"A professional combatant trained to hold ground, break enemy positions and survive firefights.",paths:["Breacher","Sentinel","Weapons Specialist"]},
{name:"Gearwright",role:"Engineer • Mechanic • Inventor",desc:"Keep the crew's ship alive, modify equipment and turn wreckage into solutions.",paths:["Shipwright","Dronewright","Experimentalist"]},
{name:"Xenobiologist",role:"Scientist • Explorer • Field Medic",desc:"Understand life that evolved under alien suns and keep the crew alive when the environment wants them dead.",paths:["Field Surgeon","Exobiologist","Hazard Specialist"]},
{name:"Envoy",role:"Trader • Diplomat • Negotiator",desc:"Win conflicts before weapons are drawn, manipulate markets and turn relationships into resources.",paths:["Broker","Diplomat","Operator"]},
{name:"Riftborn",role:"Vein-Touched • Anomaly",desc:"Interact with the unknown force behind the Vein Gates. What others call impossible, you experience as instinct.",paths:["Wayfinder","Resonant","Fracture"]},
];

const cybers=[
{name:"Civilian Optic",tier:"Civilian",slot:"Ocular",text:"Replacement eye with recording, magnification and common-spectrum correction."},
{name:"Second Heart",tier:"Professional",slot:"Torso",text:"Redundant artificial cardiovascular support designed to keep its owner alive through catastrophic trauma."},
{name:"Deadeye Mk III",tier:"Military",slot:"Ocular",text:"Predictive targeting, rangefinding and extreme optical zoom used by professional marksmen."},
{name:"Titan Arm",tier:"Professional",slot:"Arms",text:"Industrial lifting prosthetic with integrated tool mounts. Popular with asteroid and dock workers."},
{name:"Reflex Spine",tier:"Military",slot:"Neural / Torso",text:"Motor-response accelerator built to reduce the delay between decision and physical action."},
{name:"Ghostskin",tier:"Restricted",slot:"Dermal",text:"Subdermal light-manipulation mesh capable of limited active camouflage."},
{name:"Whisper Jack",tier:"Restricted",slot:"Neural",text:"Silent short-range communication with compatible implants and authorised devices."},
{name:"Smuggler's Palm",tier:"Restricted",slot:"Arms",text:"Concealed micro-storage engineered to defeat routine security searches."},
{name:"Borrowed Reflexes",tier:"Prototype",slot:"Neural",text:"Recorded motor patterns from another person. Users occasionally report memories that are not their own."},
{name:"Vein Lens",tier:"Precursor",slot:"Ocular",text:"Unknown artefact that reveals patterns around active Vein technology. It continues functioning when disconnected from power."}
];

const bounties=[
{name:"Sera Venn",reward:18000,status:"ALIVE",crimes:"Corporate espionage",faction:"Vanta Combine",danger:"◆◆◇",hook:"Last traced to an independent refuelling station."},
{name:"The Hollow Choir",reward:42000,status:"EITHER",crimes:"Ship seizure / disappearances",faction:"Unknown",danger:"◆◆◆",hook:"Multiple witnesses describe the same impossible distress signal."},
{name:"Korr Dax",reward:7600,status:"ALIVE",crimes:"Cargo theft",faction:"Free Trader Guild",danger:"◆◇◇",hook:"Known to hide among legitimate merchant crews."}
];

const markets={
mining:{name:"Khepri Belt",prices:{Metals:65,Food:140,Medicine:125,Luxuries:175}},
agri:{name:"Merrow",prices:{Metals:130,Food:55,Medicine:95,Luxuries:120}},
core:{name:"Vanta Prime",prices:{Metals:105,Food:100,Medicine:90,Luxuries:85}},
frontier:{name:"Orison-9",prices:{Metals:145,Food:155,Medicine:220,Luxuries:75}}
};

function renderPeople(){
 const tabs=document.querySelector("#peopleTabs"),detail=document.querySelector("#peopleDetail"),select=document.querySelector("#charPeople");
 peoples.forEach((p,i)=>{
   const b=document.createElement("button"); b.textContent=p.name; if(i===0)b.classList.add("active");
   b.onclick=()=>{tabs.querySelectorAll("button").forEach(x=>x.classList.remove("active"));b.classList.add("active");showPeople(p)};
   tabs.appendChild(b);
   const o=document.createElement("option");o.textContent=p.name;select.appendChild(o);
 });
 showPeople(peoples[0]);
}
function showPeople(p){
 document.querySelector("#peopleDetail").innerHTML=`<p class="eyebrow">${p.tag.toUpperCase()}</p><h3>${p.name}</h3><p>${p.desc}</p><div class="traits">${p.traits.map(t=>`<div class="trait"><b>${t[0]}</b><p>${t[1]}</p></div>`).join("")}</div>`;
}

function renderCareers(){
 const list=document.querySelector("#careerList"),select=document.querySelector("#charCareer");
 careers.forEach((c,i)=>{
   const d=document.createElement("article");d.className="career";
   d.innerHTML=`<div class="career-head"><span class="career-num">${String(i+1).padStart(2,"0")}</span><div><h3>${c.name}</h3><small>${c.role}</small></div><span>＋</span></div><div class="career-body"><p>${c.desc}</p><div class="paths">${c.paths.map(p=>`<span>${p}</span>`).join("")}</div></div>`;
   d.querySelector(".career-head").onclick=()=>d.classList.toggle("open");list.appendChild(d);
   const o=document.createElement("option");o.textContent=c.name;select.appendChild(o);
 });
}

function renderCyber(filter="all"){
 const grid=document.querySelector("#cyberGrid");grid.innerHTML="";
 cybers.filter(c=>filter==="all"||c.tier===filter).forEach(c=>{
   const a=document.createElement("article");a.innerHTML=`<small>${c.tier.toUpperCase()} • ${c.slot.toUpperCase()}</small><h3>${c.name}</h3><p>${c.text}</p>`;grid.appendChild(a);
 });
}
document.querySelectorAll("#cyberFilters button").forEach(b=>b.onclick=()=>{document.querySelectorAll("#cyberFilters button").forEach(x=>x.classList.remove("active"));b.classList.add("active");renderCyber(b.dataset.filter)});

function renderBounties(){
 const board=document.querySelector("#bountyBoard");
 bounties.forEach(b=>{const a=document.createElement("article");a.className="bounty";a.innerHTML=`<small>${b.status==="ALIVE"?"WANTED ALIVE":"WANTED "+b.status}</small><h3>${b.name}</h3><div class="credits">₡${b.reward.toLocaleString()}</div><dl><dt>Crimes</dt><dd>${b.crimes}</dd><dt>Faction</dt><dd>${b.faction}</dd><dt>Danger</dt><dd class="danger">${b.danger}</dd></dl><p>${b.hook}</p>`;board.appendChild(a)});
}
const heat=document.querySelector("#heatSlider");
heat.oninput=()=>{const v=+heat.value;document.querySelector("#heatValue").textContent=v;document.querySelector("#heatText").textContent=v<20?"Unknown crew. Nobody important is looking for you.":v<45?"Local authorities and minor hunters have begun circulating your description.":v<70?"Your ship and crew are recognised across multiple systems. Professional hunters may pursue you.":"Major factions consider your crew a priority target. Expect elite hunters, frozen accounts and hostile ports."};

function renderMarket(){
 const buy=markets[document.querySelector("#buyWorld").value],sell=markets[document.querySelector("#sellWorld").value],box=document.querySelector("#marketTable");
 let rows=`<div class="market-row header"><span>CARGO</span><span>BUY</span><span>SELL</span><span>RETURN</span></div>`;
 Object.keys(buy.prices).forEach(g=>{const a=buy.prices[g],b=sell.prices[g],pct=Math.round((b-a)/a*100);rows+=`<div class="market-row"><strong>${g}</strong><span>₡${a}</span><span>₡${b}</span><span class="${pct>=0?"profit":"loss"}">${pct>=0?"+":""}${pct}%</span></div>`});
 box.innerHTML=rows;
}
document.querySelector("#buyWorld").onchange=renderMarket;document.querySelector("#sellWorld").onchange=renderMarket;

function mod(v){return Math.floor((v-10)/2)}
function updateCharacter(){
 const name=document.querySelector("#charName").value.trim()||"Unnamed Traveller",people=document.querySelector("#charPeople").value,career=document.querySelector("#charCareer").value,bg=document.querySelector("#charBackground").value;
 document.querySelector("#sheetName").textContent=name;document.querySelector("#sheetPeople").textContent=people;document.querySelector("#sheetCareer").textContent=career;document.querySelector("#sheetBackground").textContent=bg;
 const stats=[...document.querySelectorAll(".ability")].map(i=>({n:i.dataset.ability,v:+i.value,m:mod(+i.value)}));
 document.querySelector("#sheetStats").innerHTML=stats.map(s=>`<div class="stat"><b>${s.n}</b><strong>${s.v}</strong><small>${s.m>=0?"+":""}${s.m}</small></div>`).join("");
 const p=peoples.find(x=>x.name===people),c=careers.find(x=>x.name===career);
 document.querySelector("#sheetIdentity").textContent=`${p.tag}. As a ${career}, ${c.desc.charAt(0).toLowerCase()+c.desc.slice(1)}`;
}
["#charName","#charPeople","#charCareer","#charBackground"].forEach(s=>document.querySelector(s).addEventListener("input",updateCharacter));
document.querySelectorAll(".ability").forEach(i=>i.addEventListener("input",updateCharacter));
document.querySelector("#saveCharacter").onclick=()=>{const data={name:document.querySelector("#charName").value,people:document.querySelector("#charPeople").value,career:document.querySelector("#charCareer").value,background:document.querySelector("#charBackground").value,abilities:[...document.querySelectorAll(".ability")].map(i=>i.value)};localStorage.setItem("farReachCharacter",JSON.stringify(data));document.querySelector("#saveStatus").textContent="Saved locally on this device.";showToast("Character saved");};
function loadCharacter(){try{const d=JSON.parse(localStorage.getItem("farReachCharacter"));if(!d)return;document.querySelector("#charName").value=d.name||"";document.querySelector("#charPeople").value=d.people;document.querySelector("#charCareer").value=d.career;document.querySelector("#charBackground").value=d.background;(d.abilities||[]).forEach((v,i)=>{if(document.querySelectorAll(".ability")[i])document.querySelectorAll(".ability")[i].value=v})}catch(e){}}

const dice=[4,6,8,10,12,20,100],diceBox=document.querySelector("#dice"),out=document.querySelector("#result"),label=document.querySelector("#label");
dice.forEach(d=>{const b=document.createElement("button");b.textContent="d"+d;b.onclick=()=>{label.textContent="d"+d+" roll";out.textContent=Math.floor(Math.random()*d)+1};diceBox.appendChild(b)});

const overlay=document.querySelector("#searchOverlay"),searchInput=document.querySelector("#searchInput"),results=document.querySelector("#searchResults");
document.querySelector("#searchOpen").onclick=()=>{overlay.hidden=false;setTimeout(()=>searchInput.focus(),10)};
document.querySelector("#searchClose").onclick=()=>overlay.hidden=true;
overlay.onclick=e=>{if(e.target===overlay)overlay.hidden=true};
searchInput.oninput=()=>{
 const q=searchInput.value.toLowerCase().trim();results.innerHTML="";if(!q){results.innerHTML="<p>Search lore, rules, peoples, careers, equipment and systems.</p>";return}
 const sections=[...document.querySelectorAll("section[id]")].filter(s=>(s.dataset.search||"").includes(q)||s.innerText.toLowerCase().includes(q));
 sections.slice(0,8).forEach(s=>{const r=document.createElement("div");r.className="search-result";const h=s.querySelector("h2");r.innerHTML=`<b>${h?h.textContent:s.id}</b><p>${(s.querySelector("p:not(.eyebrow)")?.textContent||"").slice(0,140)}…</p>`;r.onclick=()=>{overlay.hidden=true;s.scrollIntoView({behavior:"smooth"})};results.appendChild(r)});
 if(!sections.length)results.innerHTML="<p>No match yet. As the compendium grows, more entries will become searchable.</p>";
};

document.querySelector("#navToggle").onclick=()=>document.querySelector("#nav").classList.toggle("open");
document.querySelectorAll("#nav a").forEach(a=>a.onclick=()=>document.querySelector("#nav").classList.remove("open"));
function showToast(t){const x=document.querySelector("#toast");x.textContent=t;x.classList.add("show");setTimeout(()=>x.classList.remove("show"),1800)}

renderPeople();renderCareers();renderCyber();renderBounties();renderMarket();loadCharacter();updateCharacter();
