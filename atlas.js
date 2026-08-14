
document.addEventListener("DOMContentLoaded",()=>{
  const status=document.querySelector("#atlasStatus");
  try{
    const ATLAS=window.GALAXY_ATLAS||[];
    if(!ATLAS.length){
      if(status) status.innerHTML="<strong>Galaxy data did not load.</strong> Check that <code>galaxy-data.js</code> is uploaded beside <code>index.html</code>.";
      return;
    }
    const map=document.querySelector("#galaxyMap"),
          markers=document.querySelector("#planetMarkers"),
          dossier=document.querySelector("#planetDossier"),
          routes=document.querySelector("#routeLayer"),
          regionSel=document.querySelector("#atlasRegion"),
          lawSel=document.querySelector("#atlasLaw"),
          search=document.querySelector("#atlasSearch");

    if(!map||!markers||!dossier||!routes||!regionSel||!lawSel||!search){
      if(status) status.innerHTML="<strong>Atlas interface could not initialise.</strong>";
      return;
    }

    const regions=[...new Set(ATLAS.map(p=>p.region))].sort();
    regionSel.innerHTML='<option value="">All regions</option>'+regions.map(x=>`<option value="${x}">${x}</option>`).join("");

    function cssClass(p){
      let a=(p.blackMarket==="Extreme"||String(p.law).toLowerCase().includes("lawless"))?" lawless":"";
      if(["Wealthy","Opulent"].includes(p.wealth)) a+=" wealthy";
      if(p.wealth==="Unknown") a+=" unknown";
      return a;
    }

    function renderRoutes(){
      routes.innerHTML="";
      const seen=new Set();
      ATLAS.forEach((p,i)=>{
        const near=ATLAS.map((q,j)=>({q,j,d:Math.hypot(p.x-q.x,p.y-q.y)}))
          .filter(o=>o.j!==i).sort((a,b)=>a.d-b.d).slice(0,2);
        near.forEach(o=>{
          const key=[i,o.j].sort((a,b)=>a-b).join("-");
          if(seen.has(key)) return;
          seen.add(key);
          const l=document.createElementNS("http://www.w3.org/2000/svg","line");
          l.setAttribute("x1",p.x);l.setAttribute("y1",p.y);
          l.setAttribute("x2",o.q.x);l.setAttribute("y2",o.q.y);
          routes.appendChild(l);
        });
      });
    }

    function selectPlanet(p,b){
      document.querySelectorAll(".planet-marker").forEach(x=>x.classList.remove("active"));
      if(b)b.classList.add("active");
      const exp=(p.exports||[]).length?p.exports.map(x=>`<span>${x}</span>`).join(""):"<span>Unknown</span>";
      const imp=(p.imports||[]).length?p.imports.map(x=>`<span>${x}</span>`).join(""):"<span>Unknown</span>";
      dossier.innerHTML=`
        <img class="planet-hero" src="${p.image}" alt="Original stylised artwork of ${p.name}"
             onerror="this.style.display='none';this.insertAdjacentHTML('afterend','<div class=&quot;image-missing&quot;>Planet image unavailable — lore data still loaded.</div>')">
        <div class="dossier-body">
          <span class="atlas-badge">${String(p.region).toUpperCase()}</span>
          <h3>${p.name}</h3>
          <p>${p.lore}</p>
          <div class="planet-meta">
            <div><small>WEALTH</small><strong>${p.wealth}</strong></div>
            <div><small>LAW</small><strong>${p.law}</strong></div>
            <div><small>INDUSTRY</small><strong>${p.industry}</strong></div>
            <div><small>CONTROL</small><strong>${p.faction}</strong></div>
            <div><small>BLACK MARKET</small><strong>${p.blackMarket}</strong></div>
            <div><small>REGION</small><strong>${p.region}</strong></div>
          </div>
          <h4>Exports</h4><div class="trade-tags">${exp}</div>
          <h4>Imports</h4><div class="trade-tags">${imp}</div>
          <h4>Local Rumour</h4><p class="rumour">“${p.rumour}”</p>
          <h4>Adventure Profile</h4><div class="trade-tags">${(p.hooks||[]).map(x=>`<span>${x}</span>`).join("")}</div>
        </div>`;
    }

    function renderMarkers(){
      const q=search.value.trim().toLowerCase(),region=regionSel.value,law=lawSel.value;
      markers.innerHTML="";
      let count=0;
      ATLAS.forEach(p=>{
        const hay=(p.name+" "+p.region+" "+p.industry+" "+p.faction+" "+p.lore).toLowerCase();
        if(q&&!hay.includes(q))return;
        if(region&&p.region!==region)return;
        if(law&&p.blackMarket!==law)return;
        const b=document.createElement("button");
        b.className="planet-marker"+cssClass(p);
        b.dataset.name=p.name;
        b.style.left=p.x+"%";
        b.style.top=p.y+"%";
        b.title=p.name+" — "+p.industry;
        b.setAttribute("aria-label",p.name);
        b.onclick=()=>selectPlanet(p,b);
        markers.appendChild(b); count++;
      });
      if(status) status.textContent=`${count} locations shown • ${ATLAS.length} in atlas`;
    }

    [regionSel,lawSel].forEach(x=>x.addEventListener("change",renderMarkers));
    search.addEventListener("input",renderMarkers);

    renderRoutes();
    renderMarkers();

    // Auto-select first world so user immediately sees it working.
    const first=markers.querySelector(".planet-marker");
    if(first){
      const p=ATLAS.find(x=>x.name===first.dataset.name);
      if(p) selectPlanet(p,first);
    }

    // Underworld cards
    const uc=document.querySelector("#underworldCards");
    if(uc)uc.innerHTML=`
      <div class="card" data-page="23_SMUGGLER"><span class="tag">CAREER</span><h3>Smuggler</h3><p>A full level 1–20 career with Blockade Runner, Black-Market Broker and Ghost Hauler paths.</p></div>
      <div class="card" data-page="24_CONTRABAND"><span class="tag">UNDERWORLD</span><h3>Contraband & Drug Runs</h3><p>Fictional controlled substances, customs inspections, Heat and high-risk margins.</p></div>
      <div class="card" data-page="08_ECONOMY_BOUNTIES_REPUTATION"><span class="tag">ECONOMY</span><h3>Heat & Reputation</h3><p>Every illegal run can change who trusts you and who hunts you.</p></div>`;

    // Smuggling run planner
    const origin=document.querySelector("#runOrigin"),dest=document.querySelector("#runDest");
    if(origin&&dest){
      const eligible=ATLAS.filter(p=>p.blackMarket!=="Unknown");
      const opts=eligible.map(p=>`<option value="${p.slug}">${p.name} — ${p.blackMarket} black market</option>`).join("");
      origin.innerHTML=opts;dest.innerHTML=opts;
      dest.selectedIndex=Math.min(5,dest.options.length-1);
      const mult={"Low":1.2,"Medium":1.5,"High":2.0,"Very High":2.6,"Extreme":3.4,"Restricted":3.8,"Unknown":1.0};
      const btn=document.querySelector("#planRun");
      if(btn)btn.onclick=()=>{
        const o=ATLAS.find(p=>p.slug===origin.value),d=ATLAS.find(p=>p.slug===dest.value),
              parts=document.querySelector("#runCargo").value.split("|"),
              base=+parts[0],name=parts[1];
        const lawRisk=mult[d.blackMarket]||1.5, dist=Math.hypot(o.x-d.x,o.y-d.y), routeBonus=1+Math.min(.8,dist/100);
        const sale=Math.round(base*lawRisk*routeBonus/100)*100, profit=sale-base,
              heat=Math.max(2,Math.round((lawRisk-1)*7+dist/15));
        document.querySelector("#runResult").innerHTML=`<h3>${name}: ${o.name} → ${d.name}</h3><p><strong>Buy:</strong> ₡${base.toLocaleString()} / unit<br><strong>Estimated sale:</strong> ₡${sale.toLocaleString()} / unit<br><strong>Gross margin:</strong> ₡${profit.toLocaleString()} / unit<br><strong>Estimated Heat exposure:</strong> ${heat}</p><p>Destination enforcement: <strong>${d.law}</strong>. Black-market presence: <strong>${d.blackMarket}</strong>.</p>`;
      };
    }
  }catch(err){
    console.error("Far Reach Atlas error:",err);
    if(status) status.innerHTML="<strong>Atlas error:</strong> "+String(err.message||err);
  }
});
