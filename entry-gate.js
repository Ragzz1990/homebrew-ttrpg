
(function(){
  const gate=document.getElementById("entryGate");
  const button=document.getElementById("beginScan");
  const status=document.getElementById("scanStatus");
  const progress=document.getElementById("scanProgress");
  const message=document.getElementById("entryMessage");
  const rows=[...document.querySelectorAll("#statusList b")];

  document.body.classList.add("entry-locked");

  function setRow(i,text,cls="ok"){
    rows[i].textContent=text;
    rows[i].className=cls;
  }

  function closeGate(){
    gate.classList.add("hidden");
    document.body.classList.remove("entry-locked");
    sessionStorage.setItem("farReachBiometricPassed","1");
  }

  if(sessionStorage.getItem("farReachBiometricPassed")==="1"){
    gate.style.display="none";
    document.body.classList.remove("entry-locked");
    return;
  }

  button.addEventListener("click",()=>{
    button.disabled=true;
    gate.classList.add("scanning");
    status.textContent="SCANNING BIOMETRIC SIGNATURE";
    message.textContent="DO NOT REMOVE HAND FROM SCANNER.";
    progress.style.width="12%";

    setTimeout(()=>{setRow(0,"MATCHED");progress.style.width="28%";message.textContent="IDENTITY PATTERN ACCEPTED.";},700);
    setTimeout(()=>{setRow(1,"STABLE");progress.style.width="44%";message.textContent="NEURAL RESPONSE WITHIN TOLERANCE.";},1350);
    setTimeout(()=>{setRow(2,"DETECTED","warn");progress.style.width="61%";message.textContent="CYBERNETIC SIGNATURE LOGGED. NO ACTIVE THREAT.";},2000);
    setTimeout(()=>{setRow(3,"TRACE PRESENT","warn");progress.style.width="78%";message.textContent="VEIN RESONANCE ANOMALY RECORDED.";},2650);
    setTimeout(()=>{
      gate.classList.remove("scanning");
      gate.classList.add("granted");
      setRow(4,"GRANTED");
      progress.style.width="100%";
      status.textContent="ACCESS GRANTED";
      message.textContent="ENTERING FAR REACH...";
      button.textContent="AUTHORISED";
    },3350);
    setTimeout(closeGate,4550);
  });
})();
