"use strict";
E.gehen = {n:"Zügig gehen", h:"10 Minuten zügig gehen mit großem Armschwung, am besten draußen. Gern länger: 20–30 Minuten."};
E.marsch.takt = true; E.ueberkreuz.takt = true;
E.boxen.half = true; E.holzhacker.half = true;

const W = [
 {t:"Woche 1 · Ankommen",s:2,w:"8–10",i:"Anstrengung 5 von 10: vier bis fünf Wiederholungen wären noch möglich. Technik lernen, Stufe 1 jeder Übung."},
 {t:"Woche 2 · Aufbauen",s:3,w:"8–10",i:"Anstrengung 6 von 10. Ein Satz mehr, Stufe 2. Ab jetzt zügig hoch, langsam runter."},
 {t:"Woche 3 · Fordern",s:3,w:"10–12",i:"Anstrengung 7 von 10: zwei bis drei Wiederholungen in Reserve. Stufe 3. Wenn der Schmerz gelb zeigt, bei Stufe 2 bleiben."},
 {t:"Woche 4 · Festigen",s:3,w:"8–10",i:"Anstrengung 7 von 10 mit Stufe 4. Tag 28: nachmessen und vergleichen."}
];
const FOLGE = ["A","M1","B","M2","C","G","R"];
const TAGNAME = ["Kraft","Mobility","Kraft","Mobility","Kraft","Koordination","Erholung"];
const PAUSE_SATZ = 30, VORLAUF = 5;
const ATEM = [["Einatmen",4],["Ausatmen",7],["Ruhe",2]];

const T = (id,sec,s=1,side=false)=>({id,k:"t",sec,s,side});
const R = (id,reps,s=1,side=false)=>({id,k:"r",reps,s,side});
const B = (id,n,s=1,side=false)=>({id,k:"b",n,s,side});
const K = (id,side=false)=>({id,k:"k",side});

function plan(typ,wk){
  const r = wk===0 ? 2 : 3;
  const auf = {n:"Aufwärmen",m:5,u:[B("atem",6),R("katze","8 langsam"),T("marsch",60),R("bandzug","12"),T("hocke",30,2)]};
  const P = {
   A:{typ:"kraft",t:"Kraft A · Beine und Ziehen",b:[auf,
     {n:"Mobility",m:7,u:[T("hueftbeuger",45,1,true),R("hueftknick","10"),T("verbeugung",30,2)]},
     {n:"Kraft, Paar 1 im Wechsel",m:6,pair:true,u:[K("kniebeuge"),K("trxrudern")]},
     {n:"Kraft, Paar 2 im Wechsel",m:6,pair:true,u:[K("kreuzheben"),K("facepull")]},
     {n:"Rumpf",m:3,u:[R("pallof","8",2,true)]},
     {n:"Ausklang",m:3,u:[T("haengen",25,2),B("rippenband",5)]}]},
   B:{typ:"kraft",t:"Kraft B · Drücken, Ziehen, Rumpf",b:[auf,
     {n:"Mobility",m:7,u:[R("buch","6",1,true),R("wandengel","8"),R("kinn","8, je 5 s halten")]},
     {n:"Kraft, Paar 1 im Wechsel",m:6,pair:true,u:[K("liegestuetz"),K("einarmrudern",true)]},
     {n:"Kraft, Paar 2 im Wechsel",m:6,pair:true,u:[K("druecken",true),R("aussenrot","12",1,true)]},
     {n:"Rumpf",m:3,u:[R("kaefer","6",2,true),T("seitstuetz",[15,25,15,25][wk],2,true)]},
     {n:"Ausklang",m:3,u:[T("brust",30,1,true),T("haengen",25),B("atem",5)]}]},
   C:{typ:"kraft",t:"Kraft C · Einbeinig und Tragen",b:[auf,
     {n:"Mobility",m:7,u:[R("sitz9090","6 Wechsel"),R("kniewand","8",1,true),R("beinheben","8, dann 30 s halten",1,true)]},
     {n:"Kraft, Paar 1 im Wechsel",m:6,pair:true,u:[K("ausfall",true),K("latzug")]},
     {n:"Kraft, Paar 2 im Wechsel",m:6,pair:true,u:[K("bruecke"),R("schulterzug","6")]},
     {n:"Rumpf",m:3,u:[T("tragen",30,wk<2?2:3,true)]},
     {n:"Ausklang",m:3,u:[T("figur4",30,1,true),B("krokodil",6)]}]},
   M1:{typ:"mob",t:"Mobility oben · Brustkorb, Schulter, Nacken",b:[auf,
     {n:"Atmung und Brustkorb",m:7,u:[B("rippenband",8),B("seitatmung",4,2,true),R("buch","8",1,true),T("verbeugung",30,3)]},
     {n:"Schulter und Nacken",m:10,u:[R("wandengel","8",2),T("brust",30,2,true),R("kinn","10, je 5 s halten"),R("nackendreh","5",1,true),R("nackeniso","4 Richtungen, je 3 × 6 s"),T("nackendehn",30,1,true)]},
     {n:"Leichte Aktivierung",m:5,u:[R("facepull","12 leicht",2),R("trxy","8",2)]},
     {n:"Ausklang",m:3,u:[T("haengen",30,2),B("krokodil",6)]}]},
   M2:{typ:"mob",t:"Mobility unten · Hüfte, Beinrückseite, Gleichgewicht",b:[auf,
     {n:"Hüfte und Beine",m:13,u:[T("hueftbeuger",45,2,true),R("beinheben","10, dann 30 s halten",1,true),R("sitz9090","8 Wechsel"),R("schaukel","8",1,true),R("kniewand","10",1,true),T("hocke",40,3)]},
     {n:"Gleichgewicht",m:4,u:[T("einbein",20,3,true),R("tandem","4 Bahnen")]},
     {n:"Leichte Aktivierung",m:5,u:[R("bruecke","12 ohne Gewicht",2),R("seitschritt","10 Schritte je Richtung",2)]},
     {n:"Ausklang",m:3,u:[T("figur4",45,1,true),B("atem",6)]}]},
   G:{typ:"koord",t:"Groß und schnell · Koordination und Schnellkraft",b:[auf,
     {n:"Zirkel: "+r+" Runden",m:r*6,auto:true,rounds:r,work:40,pause:20,note:"Läuft von allein: 40 Sekunden üben, 20 Sekunden wechseln. Bewegungen groß, laut mitzählen.",u:["ueberkreuz","aufstehen","boxen","seitschritt","reichweite","holzhacker"].map(id=>T(id,40))},
     {n:"Gleichgewicht",m:4,u:[T("einbein",20,2,true),R("tandem","4 Bahnen")]},
     ...(wk===0?[{n:"Mobility",m:6,u:[T("hueftbeuger",45,1,true),T("verbeugung",30,2),R("buch","6",1,true)]}]:[]),
     {n:"Ausklang",m:3,u:[T("haengen",25,2),B("atem",6)]}]},
   R:{typ:"ruhe",t:"Erholung · Atmung und Lockern",b:[
     {n:"Atmung",m:8,u:[B("atem",8),B("krokodil",8),B("rippenband",8),B("seitatmung",4,1,true)]},
     {n:"Sanfte Mobility",m:12,u:[R("katze","10 langsam"),R("buch","6",1,true),T("hueftbeuger",45,1,true),T("figur4",45,1,true),R("nackendreh","5",1,true),T("haengen",30,2)]},
     {n:"Gehen",m:10,u:[T("gehen",600)]}]}
  };
  return P[typ];
}
const wocheVon = nr => Math.floor((nr-1)/7);
const tagPlan = nr => plan(FOLGE[(nr-1)%7], wocheVon(nr));
const minuten = p => p.b.reduce((a,b)=>a+b.m,0);

function dosis(it,wk,b){
  const js = it.side ? " je Seite" : "";
  if(it.k==="k") return W[wk].s+" × "+W[wk].w+js;
  const s = b.pair ? W[wk].s : it.s, vor = s>1 ? s+" × " : "";
  if(it.k==="r") return vor+it.reps+js;
  if(it.k==="t") return vor+(it.sec>=120 ? (it.sec/60)+" min" : it.sec+" s")+js;
  return vor+it.n+" Atemzüge"+js;
}

function schritte(nr){
  const wk = wocheVon(nr), p = tagPlan(nr), out = [];
  const push = (b,it,satz,von,seite,extra)=>out.push(Object.assign({b:b.n,id:it.id,k:it.k==="k"?"r":it.k,
    sec:it.sec,n:it.n,reps:it.k==="k"?W[wk].w:it.reps,side:it.side,satz,von,seite,wk},extra||{}));
  for(const b of p.b){
    if(b.auto){
      for(let r=1;r<=b.rounds;r++) b.u.forEach((it,x)=>push(b,it,r,b.rounds,0,
        {auto:true,pause:b.pause,erste:r===1&&x===0,runde:true}));
      out[out.length-1].letzteAuto = true;
    } else if(b.pair){
      for(let r=1;r<=W[wk].s;r++) for(const it of b.u) push(b,it,r,W[wk].s,0,{rest:PAUSE_SATZ});
    } else {
      for(const it of b.u){
        const s = it.k==="k" ? W[wk].s : it.s;
        for(let r=1;r<=s;r++){
          if(it.side && it.k!=="r" && it.k!=="k"){ push(b,it,r,s,1); push(b,it,r,s,2); }
          else push(b,it,r,s,0,{rest:(it.k==="r"||it.k==="k")&&r<s?20:0});
        }
      }
    }
  }
  return out;
}

const store = {
  get(k,d){try{const v=localStorage.getItem("tp28_"+k);return v===null?d:v}catch(e){return d}},
  set(k,v){try{localStorage.setItem("tp28_"+k,v)}catch(e){}},
  clear(){try{Object.keys(localStorage).filter(k=>k.startsWith("tp28_")).forEach(k=>localStorage.removeItem(k))}catch(e){}}
};
const $ = s => document.querySelector(s);
const erledigt = nr => store.get("tag_"+nr,"0")==="1";

let ac = null;
function ton(f,d,vol){
  if(store.get("ton","1")!=="1") return;
  try{
    ac = ac || new (window.AudioContext||window.webkitAudioContext)();
    if(ac.state==="suspended") ac.resume();
    const o = ac.createOscillator(), g = ac.createGain();
    o.frequency.value = f; o.connect(g); g.connect(ac.destination);
    g.gain.setValueAtTime(vol||0.25,ac.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001,ac.currentTime+d);
    o.start(); o.stop(ac.currentTime+d);
  }catch(e){}
}
const tonEnde = ()=>{ton(880,.18);setTimeout(()=>ton(1175,.3),200);try{navigator.vibrate&&navigator.vibrate([150,80,150])}catch(e){}};

let tm = null, taktIv = null, wake = null;
function stoppe(){ if(tm){clearInterval(tm.iv);tm=null} if(taktIv){clearInterval(taktIv);taktIv=null} }
function countdown(sec,tick,done,piep){
  stoppe();
  const o = {end:Date.now()+sec*1000,total:sec,paused:false,last:null};
  o.iv = setInterval(()=>{
    if(o.paused) return;
    const l = Math.max(0,Math.ceil((o.end-Date.now())/1000));
    if(l!==o.last){ o.last=l; tick(l,o); if(piep&&l<=3&&l>0) ton(660,.08); }
    if(l<=0){ clearInterval(o.iv); if(tm===o) tm=null; done(); }
  },200);
  tm = o; return o;
}
function pauseToggle(){
  if(!tm) return false;
  if(tm.paused){ tm.end = Date.now()+tm.rem; tm.paused=false; }
  else { tm.rem = tm.end-Date.now(); tm.paused=true; }
  return tm.paused;
}
async function wachBleiben(an){
  try{
    if(an && "wakeLock" in navigator) wake = await navigator.wakeLock.request("screen");
    else if(!an && wake){ await wake.release(); wake=null; }
  }catch(e){}
}
document.addEventListener("visibilitychange",()=>{ if(document.visibilityState==="visible" && !$("#spieler").hidden) wachBleiben(true); });

function heuteNr(){
  const s = store.get("start","");
  if(!s) return 0;
  const a = new Date(s+"T00:00:00"), h = new Date(); h.setHours(0,0,0,0);
  return Math.round((h-a)/864e5)+1;
}
const iso = d => d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");

function zeile(it,wk,b){
  const e = E[it.id];
  const stufe = e.st ? '<br><b class="stufe">Stufe diese Woche:</b> '+e.st[wk] : "";
  return '<details class="ue"><summary><span>'+e.n+'</span><span class="dosis">'+dosis(it,wk,b)+'</span></summary><div class="wie"><div class="anim" data-anim="'+it.id+'"></div>'+e.h+(e.c?'<br><b>Achte auf:</b> '+e.c:"")+stufe+'</div></details>';
}

function zeigePlan(){
  const h = heuteNr(), fertig = [...Array(28)].filter((_,i)=>erledigt(i+1)).length;
  let kopf = "";
  if(!h){
    kopf = '<div class="card heute"><h3>Wann geht es los?</h3><p class="klein">Mit einem Starttag zeigt die App jeden Tag die passende Einheit.</p><div class="reihe"><button class="btn haupt" id="startHeute" type="button">Heute beginnen</button><input type="date" id="startDatum" aria-label="Starttag wählen"></div></div>';
  } else if(h>28){
    kopf = '<div class="card heute"><h3>Die 28 Tage sind um</h3><p class="klein">'+fertig+' von 28 Einheiten erledigt. Trag die Messwerte von Tag 28 ein und vergleiche.</p></div>';
  } else if(h<1){
    kopf = '<div class="card heute"><h3>Start in '+(1-h)+' Tag(en)</h3><p class="klein">Du kannst schon jetzt jede Einheit ansehen oder ausprobieren.</p></div>';
  } else {
    const p = tagPlan(h);
    kopf = '<div class="card heute"><div class="klein">Heute · Tag '+h+' von 28</div><h3>'+p.t+'</h3><p class="klein">'+minuten(p)+' Minuten · '+W[wocheVon(h)].t+'</p><div class="reihe"><button class="btn haupt" data-start="'+h+'" type="button">'+(erledigt(h)?"Noch einmal starten":"Einheit starten")+'</button><a class="btn" href="#tag'+h+'" data-auf="'+h+'">Übungen ansehen</a></div></div>';
  }
  let html = kopf+'<div class="fortschritt"><span class="min">'+fertig+' / 28</span><div class="balken"><i style="width:'+(fertig/28*100)+'%"></i></div></div>';
  for(let wk=0;wk<4;wk++){
    html += '<section class="woche"><div class="woche-kopf"><h3>'+W[wk].t+'</h3><span class="klein">Kraftteil: '+W[wk].s+' Sätze × '+W[wk].w+' Wiederholungen</span></div><div class="woche-info">'+W[wk].i+'</div>';
    for(let d=0;d<7;d++){
      const nr = wk*7+d+1, p = tagPlan(nr), ok = erledigt(nr);
      const sv = store.get("schmerz_"+nr,"");
      html += '<details class="tag'+(nr===h?" ist-heute":"")+'" id="tag'+nr+'"><summary><span class="nr">Tag '+nr+'</span><span class="typ t-'+p.typ+'">'+TAGNAME[d]+'</span><span class="titel">'+p.t+' <span class="klein">· '+minuten(p)+' min</span></span><span class="haken'+(ok?" an":"")+'" aria-label="'+(ok?"erledigt":"offen")+'">'+(ok?"✓":"")+'</span></summary><div class="tag-inhalt"><div class="reihe"><button class="btn haupt" data-start="'+nr+'" type="button">Einheit starten</button><button class="btn" data-haken="'+nr+'" type="button">'+(ok?"Als offen markieren":"Als erledigt markieren")+'</button>'+(sv?'<span class="klein">Schmerz vorher → nachher: '+sv+'</span>':"")+'</div>';
      if(nr===1) html += '<div class="block"><div class="block-notiz">Vor der ersten Einheit: unter „Messwerte“ die Tests machen und eintragen (5 Minuten).</div></div>';
      if(nr===28) html += '<div class="block"><div class="block-notiz">Zum Schluss: dieselben Tests wie an Tag 1 unter „Messwerte“ eintragen und vergleichen.</div></div>';
      for(const b of p.b) html += '<div class="block"><div class="block-kopf"><span>'+b.n+'</span><span class="min">'+b.m+' min</span></div>'+(b.note?'<div class="block-notiz">'+b.note+'</div>':"")+b.u.map(u=>zeile(u,wk,b)).join("")+'</div>';
      html += '</div></details>';
    }
    html += '</section>';
  }
  $("#plan").innerHTML = html;
  const sh = $("#startHeute");
  if(sh){
    sh.onclick = ()=>{store.set("start",iso(new Date()));zeigePlan()};
    $("#startDatum").onchange = e=>{ if(e.target.value){store.set("start",e.target.value);zeigePlan()} };
  }
}
$("#plan").addEventListener("click",e=>{
  const s = e.target.closest("[data-start]"), k = e.target.closest("[data-haken]"), a = e.target.closest("[data-auf]");
  if(s) starte(+s.dataset.start);
  if(k){ const nr=k.dataset.haken; store.set("tag_"+nr,erledigt(nr)?"0":"1"); zeigePlan(); const d=$("#tag"+nr); if(d) d.open=true; }
  if(a){ const d=$("#tag"+a.dataset.auf); if(d) d.open=true; }
});

const M = [
 ["schmerz","Schmerz im Schnitt (0–10)","Mittelwert der letzten drei Tage an der schlimmsten Stelle"],
 ["vorbeuge","Vorbeuge: Abstand Finger–Boden (cm)","Beine gestreckt, locker hängen lassen, Abstand messen"],
 ["hocke","Tiefe Hocke ohne Festhalten (s)","Fersen am Boden; 0, wenn es nur mit Festhalten geht"],
 ["liege","Liegestütze am Stück","Saubere Wiederholungen am Boden"],
 ["hang","Aushängen (s)","Bis der Griff nachlässt, höchstens 60 s"],
 ["nackenl","Nackendrehung links","Wie weit siehst du? Etwa: Kinn bis Mitte Schlüsselbein / bis Schulter"],
 ["nackenr","Nackendrehung rechts","Wie links"],
 ["brustkorb","Brustkorb-Dehnung (cm)","Maßband auf Höhe der Brustbeinspitze: Umfang voll eingeatmet minus voll ausgeatmet"],
 ["engel","Wandengel","Bleiben Handrücken und Ellbogen an der Wand? ja / teilweise / nein"],
 ["einbeinl","Einbeinstand links (s)","Arme locker, höchstens 30 s"],
 ["einbeinr","Einbeinstand rechts (s)","Wie links"]
];
function zeigeMesswerte(){
  $("#messwerte").innerHTML = M.map(m=>'<tr><td><b>'+m[1]+'</b><div class="klein">'+m[2]+'</div></td><td><input data-m="'+m[0]+'_1" aria-label="'+m[1]+' Tag 1"></td><td><input data-m="'+m[0]+'_28" aria-label="'+m[1]+' Tag 28"></td></tr>').join("");
  document.querySelectorAll("input[data-m]").forEach(i=>{
    i.value = store.get("m_"+i.dataset.m,"");
    i.oninput = ()=>store.set("m_"+i.dataset.m,i.value);
  });
}

let S = null;
function starte(nr){
  S = {nr,steps:schritte(nr),i:0,start:Date.now()};
  document.querySelectorAll("main > section.ansicht, nav.tabs").forEach(x=>x.hidden=true);
  $("#spieler").hidden = false;
  ton(1,.01,0.001);
  wachBleiben(true);
  zeigeSchritt(false);
  window.scrollTo(0,0);
}
function beende(){
  stoppe(); wachBleiben(false);
  $("#spieler").hidden = true; $("nav.tabs").hidden = false;
  S = null; zeigePlan(); tab(location.hash.slice(1)||"plan");
}
function zahl(l){ return l>=60 ? Math.floor(l/60)+":"+String(l%60).padStart(2,"0") : String(l); }

function zeigeSchritt(autostart){
  stoppe();
  const st = S.steps[S.i], e = E[st.id], n = S.steps.length, nxt = S.steps[S.i+1];
  let gross, klein = "";
  if(st.k==="t") gross = zahl(st.sec);
  else if(st.k==="b") gross = st.n+" Atemzüge";
  else gross = st.reps+(/^[\d–]+$/.test(st.reps)?" Wdh.":"");
  if(st.side && st.k==="r") klein = "je Seite";
  if(st.seite) klein = "Seite "+st.seite+" von 2"+(st.seite===1?" · steifere Seite zuerst":"");
  const satz = st.von>1 ? (st.runde?"Runde ":"Satz ")+st.satz+" von "+st.von : "";
  const stufe = e.st ? '<p><b class="stufe">Stufe diese Woche:</b> '+e.st[st.wk]+'</p>' : "";
  $("#spieler").innerHTML =
   '<div class="sp-kopf"><button class="btn" id="spZu" type="button" aria-label="Einheit beenden">Beenden</button><div class="balken"><i style="width:'+(S.i/n*100)+'%"></i></div><span class="klein">'+(S.i+1)+' / '+n+'</span></div>'+
   '<div class="sp-block">'+st.b+(satz?' · '+satz:"")+'</div>'+
   '<h2 class="sp-name">'+e.n+'</h2>'+
   '<div class="anim sp-anim" data-anim="'+st.id+'"></div>'+
   '<div class="sp-buehne" id="buehne"><div class="kreis" id="kreis" hidden></div><div class="sp-zahl '+(st.k==="t"?"":"text")+'" id="zahl">'+gross+'</div><div class="sp-phase" id="phase">'+klein+'</div></div>'+
   '<div class="sp-tasten"><button class="btn haupt gross" id="spHaupt" type="button"></button></div>'+
   '<div class="sp-neben"><button class="btn" id="spZurueck" type="button"'+(S.i===0?" disabled":"")+'>Zurück</button><button class="btn" id="spWeiter" type="button">Überspringen</button></div>'+
   '<div class="card sp-wie"><p>'+e.h+'</p>'+(e.c?'<p><b>Achte auf:</b> '+e.c+'</p>':"")+stufe+'</div>'+
   '<p class="klein sp-naechste">'+(nxt?'Danach: '+E[nxt.id].n:'Das ist die letzte Übung.')+'</p>';
  const haupt = $("#spHaupt"), z = $("#zahl"), ph = $("#phase");
  if(window.Anim || typeof Anim!=="undefined") Anim.start($("#spieler .anim"));
  $("#spZu").onclick = ()=>{ if(confirm("Einheit beenden? Der Tag wird nicht als erledigt markiert.")) beende(); };
  $("#spZurueck").onclick = ()=>{ S.i=Math.max(0,S.i-1); zeigeSchritt(false); };
  $("#spWeiter").onclick = ()=>weiter(false);

  const fertigAnzeige = ()=>{ haupt.textContent = nxt?"Weiter":"Einheit abschließen"; haupt.onclick = ()=>weiter(false); haupt.disabled=false; };

  if(st.k==="r"){
    haupt.textContent = "Geschafft";
    haupt.onclick = ()=>{
      if(st.rest && nxt){
        ph.textContent = "Pause · danach: "+E[nxt.id].n;
        z.classList.remove("text");
        haupt.textContent = "Pause überspringen"; haupt.onclick = ()=>weiter(false);
        countdown(st.rest,l=>z.textContent=zahl(l),()=>{tonEnde();weiter(false)},true);
      } else weiter(false);
    };
  } else if(st.k==="t"){
    const lauf = ()=>{
      ph.textContent = klein || "Los";
      $("#buehne").classList.add("laeuft");
      if(e.takt && store.get("takt","1")==="1") taktIv = setInterval(()=>{ if(tm && !tm.paused) ton(440,.04,0.15); },600);
      haupt.textContent = "Pause"; haupt.onclick = ()=>{ haupt.textContent = pauseToggle() ? "Fortsetzen" : "Pause"; };
      countdown(st.sec,l=>{
        z.textContent = zahl(l);
        if(e.half && l===Math.floor(st.sec/2)){ ton(520,.25); ph.textContent = "Seite wechseln"; }
      },()=>{
        if(taktIv){clearInterval(taktIv);taktIv=null}
        $("#buehne").classList.remove("laeuft");
        tonEnde();
        if(st.auto && nxt && !st.letzteAuto){
          ph.textContent = "Wechseln · danach: "+E[nxt.id].n;
          haupt.textContent = "Pause"; haupt.onclick = ()=>{ haupt.textContent = pauseToggle() ? "Fortsetzen" : "Pause"; };
          countdown(st.pause,l=>z.textContent=zahl(l),()=>weiter(true),true);
        } else { z.textContent = "✓"; ph.textContent = "Fertig"; fertigAnzeige(); }
      },true);
    };
    const vorlauf = ()=>{
      ph.textContent = "Bereit machen";
      haupt.textContent = "Sofort starten"; haupt.onclick = lauf;
      countdown(VORLAUF,l=>z.textContent=zahl(l),lauf,true);
    };
    if(autostart) lauf();
    else { haupt.textContent = st.auto && st.erste ? "Zirkel starten" : "Timer starten"; haupt.onclick = vorlauf; }
  } else {
    const kreis = $("#kreis");
    haupt.textContent = "Atem-Takt starten";
    haupt.onclick = ()=>{
      kreis.hidden = false; z.classList.add("text");
      haupt.textContent = "Pause"; haupt.onclick = ()=>{ haupt.textContent = pauseToggle() ? "Fortsetzen" : "Pause"; };
      let zug = 1, p = 0;
      const phase = ()=>{
        const [name,sek] = ATEM[p];
        z.textContent = name;
        kreis.style.transitionDuration = (p===2?0.2:sek)+"s";
        if(p===0) kreis.classList.add("voll"); if(p===1) kreis.classList.remove("voll");
        if(p<2) ton(p===0?392:294,.25,0.12);
        countdown(sek,l=>{ ph.textContent = "Atemzug "+zug+" von "+st.n+" · "+l; },()=>{
          p++; if(p>2){ p=0; zug++; }
          if(zug>st.n){ kreis.hidden=true; z.textContent="✓"; ph.textContent="Fertig"; tonEnde(); fertigAnzeige(); }
          else phase();
        },false);
      };
      phase();
    };
  }
}
function weiter(autostart){
  stoppe();
  if(S.i>=S.steps.length-1) return abschluss();
  S.i++; zeigeSchritt(autostart);
  if(!autostart) window.scrollTo(0,0);
}
function abschluss(){
  stoppe();
  const min = Math.max(1,Math.round((Date.now()-S.start)/60000));
  const reihe = name => '<div class="skala" data-skala="'+name+'">'+[...Array(11)].map((_,i)=>'<button type="button" class="btn" data-w="'+i+'">'+i+'</button>').join("")+'</div>';
  $("#spieler").innerHTML = '<h2 class="sp-name">Tag '+S.nr+' geschafft</h2><p class="klein">Dauer: '+min+' Minuten.</p>'+
   '<div class="card"><h3>Schmerz vor dem Training (0–10)</h3>'+reihe("vor")+'<h3 style="margin-top:16px">Schmerz jetzt (0–10)</h3>'+reihe("nach")+
   '<p class="klein" style="margin-top:12px">Mehr als 2 Punkte Unterschied nach oben oder morgen früh noch erhöht: beim nächsten Mal einen Satz weniger oder die leichtere Stufe.</p></div>'+
   '<div class="sp-tasten"><button class="btn haupt gross" id="spSpeichern" type="button">Speichern und zurück</button></div>';
  const w = {};
  $("#spieler").querySelectorAll(".skala").forEach(sk=>sk.onclick = e=>{
    const b = e.target.closest("[data-w]"); if(!b) return;
    sk.querySelectorAll(".btn").forEach(x=>x.classList.remove("haupt")); b.classList.add("haupt");
    w[sk.dataset.skala] = b.dataset.w;
  });
  $("#spSpeichern").onclick = ()=>{
    store.set("tag_"+S.nr,"1");
    if(w.vor!==undefined || w.nach!==undefined) store.set("schmerz_"+S.nr,(w.vor??"–")+" → "+(w.nach??"–"));
    beende();
  };
  window.scrollTo(0,0);
}

function tab(name){
  if(!["plan","messwerte","hinweise"].includes(name)) name = "plan";
  if(S) return;
  document.querySelectorAll("main > section.ansicht").forEach(x=>x.hidden = x.id!=="ansicht-"+name);
  document.querySelectorAll("nav.tabs a").forEach(a=>a.classList.toggle("an",a.getAttribute("href")==="#"+name));
}
window.addEventListener("hashchange",()=>{ const h=location.hash.slice(1); if(!h.startsWith("tag")&&!h.startsWith("q")) {tab(h);window.scrollTo(0,0);} });

function einstellungen(){
  const t = $("#optTon"), k = $("#optTakt");
  t.checked = store.get("ton","1")==="1"; k.checked = store.get("takt","1")==="1";
  t.onchange = ()=>{store.set("ton",t.checked?"1":"0"); ton(880,.15)};
  k.onchange = ()=>store.set("takt",k.checked?"1":"0");
  const d = $("#optStart"); d.value = store.get("start","");
  d.onchange = ()=>{ store.set("start",d.value); zeigePlan(); };
  $("#optReset").onclick = ()=>{ if(confirm("Wirklich alle Häkchen, Messwerte und den Starttag löschen?")){ store.clear(); zeigePlan(); zeigeMesswerte(); einstellungen(); } };
}

zeigePlan(); zeigeMesswerte(); einstellungen();
tab(location.hash.slice(1)||"plan");
if("serviceWorker" in navigator && location.protocol.startsWith("http")) navigator.serviceWorker.register("sw.js").catch(()=>{});
