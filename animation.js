"use strict";
/* Strichfigur-Animationen je Übung. Winkel in Grad: 0 = oben, 90 = rechts (vorn), 180 = unten.
   Figur schaut nach rechts; fv = Ansicht von vorn; nog = Ansicht von oben (kein Boden). */
const Anim = (() => {
  const L = {t:32,ua:15,fa:14,th:24,sh:24,ft:7,hd:7,nk:5}, BODEN = 108, VB = "0 0 160 116";
  const D = a => [Math.sin(a*Math.PI/180), -Math.cos(a*Math.PI/180)];
  const add = (q,a,l) => { const d = D(a); return [q[0]+d[0]*l, q[1]+d[1]*l]; };
  const S = {t:0,a:[178,176],l:[180,180]};
  const FV = {fv:1,t:0,a:[172,176],b:[188,184],l:[176,180],r:[184,180]};
  const HK = {t:0,a:[178,176],l:[92,180],r:[183,270]};
  const WAND = ["wand"];

  const U = {
    atem:{f:[{t:270,x:70,a:[90,55],l:[5,90]}],puls:1,pr:[["box",72,84,28,24]]},
    krokodil:{f:[{t:90,x:72,h:100,a:[45,140],l:[270,270]}],puls:1},
    rippenband:{f:[{...S,a:[195,70]}],puls:1},
    seitatmung:{fv:1,f:[{...FV,x:92,t:4,c:2,a:[130,90],b:[20,70]},{t:14,c:7,x:88}],puls:1,pr:[WAND],T:5},
    katze:{f:[{t:82,x:74,c:9,h:150,a:[180,180],l:[180,268]},{c:-5,h:60}],T:4},
    marsch:{f:[{...S,l:[95,185],r:[180,180],a:[230,215],b:[60,30]},{l:[180,180],a:[178,176],b:[178,176]},{r:[95,185],a:[60,30],b:[230,215]}],T:1.2},
    ueberkreuz:{f:[{...S,t:6,l:[75,180],r:[180,180],a:[230,220],b:[150,125]},{l:[180,180],a:[178,176],b:[178,176]},{r:[75,180],a:[150,125],b:[230,220]}],T:1.2},
    bandzug:{fv:1,f:[{...FV,a:[150,300],b:[210,60]},{a:[90,90],b:[270,270]}],pr:[["link","wA","wB"]]},
    hocke:{f:[{t:22,a:[75,75],l:[72,202]},{t:15,a:[72,72],l:[80,200]}],fix:{k:"wA",x:124},pr:[WAND],T:4},
    buch:{nog:1,f:[{x:84,y:66,t:270,a:[0,0],b:[0,0],l:[20,150],r:[26,156]},{as:0.15},{a:[180,180],n:-1},{as:1}],T:5},
    verbeugung:{f:[{t:70,a:[78,78],l:[178,180]},{t:88,c:-4,a:[84,84],l:[172,180]}],fix:{k:"wA",x:124},pr:[WAND],T:4},
    wandengel:{fv:1,f:[{...FV,a:[95,5],b:[265,355]},{a:[35,10],b:[325,350]}],T:4},
    haengen:{f:[{t:0,a:[12,12],l:[180,255]},{c:2,l:[176,250]}],fix:{k:"wA",x:122,y:16},pr:[WAND],T:4},
    schulterzug:{f:[{t:0,a:[10,10],l:[180,255]},{a:[42,-12]}],fix:{k:"wA",x:122,y:16},pr:[WAND]},
    kinn:{f:[{...S,hx:4},{hx:-4}]},
    nackendreh:{fv:1,f:[{...FV,n:-0.9},{n:0.9}],T:5},
    nackeniso:{f:[{...S,a:[40,330],hx:1},{hx:0}]},
    nackendehn:{f:[{t:0,h:0,a:[185,180],b:[178,176],l:[90,180]},{h:38,hx:1}],fix:{k:"aL",x:96},pr:[["box",60,81,24,27]],T:4},
    brust:{f:[{...S,a:[265,0],l:[172,182],r:[190,186]},{t:6,a:[248,0],l:[160,184],r:[196,188]}],fix:{k:"eA",x:58},pr:[["pfosten",55]],T:4},
    hueftbeuger:{f:[{...HK},{t:-3,l:[82,172],r:[203,270],b:[5,0]}],T:4},
    beinheben:{f:[{t:270,x:66,a:[60,75],l:[88,88],r:[90,90]},{l:[20,20]}],pr:[["link","wA","aL"]]},
    hueftknick:{f:[{...S},{t:50,l:[168,186],a:[180,180]}],fix:{k:"aL",x:76},pr:[["pfosten",61]]},
    sitz9090:{fv:1,f:[{...FV,t:6,a:[160,170],b:[200,190],l:[78,100],r:[84,262]},{t:0,l:[20,170],r:[-20,190]},{t:-6,l:[-84,98],r:[-78,260]}],T:5},
    kniewand:{f:[{t:0,a:[80,80],l:[165,185],r:[195,188]},{t:3,l:[145,205],r:[192,192]}],fix:{k:"aL",x:106},pr:[WAND]},
    schaukel:{nog:1,f:[{t:90,n:0,rs:0.1,a:[30,150],b:[150,30],l:[-8,-8],r:[270,270]},{a:[88,92],b:[92,88],l:[16,16]}],fix:{k:"wA",x:126,y:62},T:4},
    figur4:{f:[{t:270,x:70,a:[40,50],l:[15,95],r:[30,300]},{a:[25,40],l:[-5,80],r:[12,285]}],T:4},
    einbein:{fv:1,f:[{...FV,t:-2,a:[120,150],b:[240,210],r:[205,150]},{t:2,a:[110,140],b:[250,220]}],T:3},
    tandem:{f:[{...S,l:[168,180],r:[192,188],a:[150,160],b:[210,200]},{l:[192,188],r:[168,180]}],T:2.4},
    kniebeuge:{v:["kniebeuge_trx","kniebeuge","kniebeuge","kniebeuge"],f:[{...S,a:[150,25]},{t:28,l:[95,200]}],fix:{k:"aL",x:84},pr:[["hantel","wA"]]},
    kniebeuge_trx:{f:[{t:-4,a:[62,62],l:[178,178]},{t:8,a:[55,55],l:[92,200]}],fix:{k:"aL",x:86},pr:[WAND,["band",126,10,"wA"]]},
    kreuzheben:{f:[{...S,a:[180,180]},{t:82,h:70,l:[158,188]}],fix:{k:"aL",x:84},pr:[["hantel","wA"]],T:4},
    trxrudern:{f:[{t:-28,a:[55,55],l:[152,152]},{t:-12,a:[215,60],l:[168,168]}],fix:{k:"aL",x:92},pr:[WAND,["band",126,10,"wA"]]},
    facepull:{fv:1,cap:"Ansicht von vorn · Band kommt von vorn",f:[{...FV,a:[-25,-15],b:[25,15],as:0.5,bs:0.5},{a:[90,0],b:[-90,0],as:1,bs:1}]},
    pallof:{cap:"Band kommt von der Seite",f:[{...S,a:[150,30],l:[175,183]},{a:[92,92]}],pr:[["band",14,58,"wA"]]},
    liegestuetz:{v:["liegestuetz_hoch","liegestuetz_hoch","liegestuetz","liegestuetz"],f:[{t:69,h:75,a:[180,180],l:[249,249]},{t:80,h:84,a:[270,180],l:[260,260]}],fix:{k:"aL",x:40}},
    liegestuetz_hoch:{f:[{t:35,h:40,a:[100,100],l:[215,215]},{t:44,h:50,a:[142,36],l:[224,224]}],fix:{k:"aL",x:47},pr:[WAND]},
    einarmrudern:{f:[{t:80,a:[178,180],b:[180,180],l:[178,184],r:[160,268]},{a:[255,175]}],fix:{k:"aL",x:60},pr:[["box",62,82,44,26],["hantel","wA"]]},
    druecken:{v:["druecken","druecken","druecken_hoch","druecken_hoch"],f:[{...HK,a:[160,20],b:[178,176]},{a:[40,40]}],pr:[["band",64,104,"wA"]]},
    druecken_hoch:{f:[{...HK,a:[160,20],b:[178,176]},{a:[4,4]}],pr:[["hantel","wA"]]},
    aussenrot:{fv:1,f:[{...FV,a:[178,265]},{a:[178,95]}],pr:[["band",20,60,"wA"]]},
    kaefer:{v:["kaefer_beine","kaefer","kaefer","kaefer"],f:[{t:270,x:76,a:[0,0],b:[0,0],l:[0,90],r:[0,90]},{a:[-80,-85],r:[75,88]}],T:4},
    kaefer_beine:{f:[{t:270,x:76,a:[0,0],b:[0,0],l:[0,90],r:[0,90]},{r:[75,88]}],T:4},
    seitstuetz:{v:["seitstuetz_knie","seitstuetz_knie","seitstuetz","seitstuetz"],f:[{t:79,h:70,a:[180,92],b:[30,30],l:[259,259]},{b:[8,8]}],fix:{k:"aL",x:44}},
    seitstuetz_knie:{f:[{t:74,h:66,a:[180,92],b:[30,30],l:[254,285]},{b:[8,8]}],fix:{k:"kL",x:60}},
    trxy:{f:[{t:-18,a:[62,62],l:[162,162]},{t:-4,a:[15,15],l:[176,176]}],fix:{k:"aL",x:96},pr:[WAND,["band",126,10,"wA"]]},
    ausfall:{v:["ausfall_trx","ausfall_trx","ausfall","ausfall"],f:[{...S},{t:6,l:[80,180],r:[200,255],a:[178,170]}],fix:{k:"aL",x:92},pr:[["hantel","wA"]]},
    ausfall_trx:{f:[{...S,a:[70,70]},{t:6,l:[80,180],r:[200,255],a:[60,60]}],fix:{k:"aL",x:92},pr:[WAND,["band",126,10,"wA"]]},
    bruecke:{v:["bruecke","bruecke","bruecke_ein","bruecke_ein"],f:[{t:270,a:[95,95],l:[35,145]},{t:248,l:[62,172]}],fix:{k:"aL",x:96}},
    bruecke_ein:{f:[{t:270,a:[95,95],l:[35,145],r:[35,90]},{t:248,l:[62,172],r:[62,62]}],fix:{k:"aL",x:96}},
    latzug:{f:[{t:0,x:86,a:[30,30],l:[180,270]},{a:[150,15]}],pr:[WAND,["band",126,12,"wA"]]},
    tragen:{fv:1,f:[{...FV,l:[176,180],r:[192,168]},{r:[184,180]},{l:[168,192]}],pr:[["hantel","wA"]],T:1.6},
    aufstehen:{v:["aufstehen","aufstehen","aufstehen_h","aufstehen_h"],f:[{t:12,a:[150,30],l:[90,180]},{...S,a:[150,30]}],fix:{k:"aL",x:92},pr:[["box",56,81,24,27]],T:2.4},
    aufstehen_h:{f:[{t:12,a:[150,30],l:[90,180]},{...S,a:[150,30]}],fix:{k:"aL",x:92},pr:[["box",56,81,24,27],["hantel","wA"]],T:2.4},
    boxen:{f:[{t:8,a:[88,88],b:[160,20],l:[160,185],r:[202,192]},{a:[160,20],b:[88,88]}],T:1},
    seitschritt:{fv:1,f:[{...FV,x:68,a:[165,230],b:[195,130],l:[170,182],r:[190,178]},{x:84,l:[150,186],r:[186,180]}],pr:[["link","kL","kR"]],T:2},
    reichweite:{f:[{...S,a:[225,215]},{t:10,a:[25,20],l:[80,180],r:[200,255]}],fix:{k:"aR",x:56}},
    holzhacker:{fv:1,f:[{...FV,x:84,t:8,a:[140,130],b:[110,120]},{t:-8,a:[300,310],b:[320,315]}],pr:[WAND,["band",126,98,"wA"]]},
    lufttanker:{f:[{t:270,a:[95,95],l:[35,145]}],fix:{k:"aL",x:96},puls:1},
    luftwelle:{f:[{t:270,a:[60,110],l:[35,145]}],fix:{k:"aL",x:96},puls:1},
    schulterkreis:{f:[{...S,a:[180,180],b:[178,176]},{a:[90,90]},{a:[0,0]},{a:[-90,-90]},{a:[-180,-180]}],T:7},
    hueftkreis:{f:[{t:82,x:74,a:[180,180],l:[180,268],r:[180,268]},{l:[115,225]},{l:[250,300]}],T:5},
    schulterblattstuetz:{v:["schulterblattstuetz","schulterblattstuetz","schulterblattstuetz_hoch","schulterblattstuetz_hoch"],f:[{t:82,x:74,c:-3,h:95,a:[180,180],l:[180,268]},{c:6}],T:2.6},
    schulterblattstuetz_hoch:{f:[{t:69,h:75,c:-3,a:[180,180],l:[249,249]},{c:6}],fix:{k:"aL",x:40},T:2.6},
    wandgleiten:{f:[{...S,a:[95,5]},{a:[40,8]}],fix:{k:"aL",x:98},pr:[["pfosten",116]],T:4},
    bandschulter:{f:[{t:62,a:[58,58],b:[180,180],l:[176,182]}],puls:1,fix:{k:"aL",x:58},pr:[WAND,["band",126,14,"wA"]]},
    gesaessheben:{f:[{t:8,a:[100,100],l:[92,268]},{t:0,a:[150,165],l:[180,270]}],T:3.4},
    kosake:{fv:1,f:[{...FV,t:4,a:[150,300],b:[210,60],l:[105,195],r:[232,232]},{t:0,l:[152,176],r:[208,184]},{t:-4,l:[128,128],r:[255,165]}],T:5},
    blick:{fv:1,f:[{...FV,a:[-20,-10],as:0.45,n:-0.8},{n:0.8}],T:4},
    unterarmstuetz:{v:["unterarmstuetz_knie","unterarmstuetz_knie","unterarmstuetz","unterarmstuetz"],f:[{t:79,h:70,a:[180,92],l:[259,259]}],fix:{k:"aL",x:44},puls:1},
    unterarmstuetz_knie:{f:[{t:74,h:66,a:[180,92],l:[254,285]}],fix:{k:"kL",x:60},puls:1},
    birddog:{f:[{t:82,x:74,a:[180,180],b:[180,180],l:[180,268],r:[180,268]},{a:[84,84],r:[264,264]}],T:4},
    rolleflanke:{cap:"Seitlage, Rolle unter der Flanke",f:[{t:270,x:82,a:[-90,-90],b:[60,120],l:[100,80],r:[80,100]}],puls:1,pr:[["kreis",62,101,7]]},
    ballbrust:{f:[{...S,a:[215,205],b:[178,176]},{a:[130,120]}],fix:{k:"aL",x:70},pr:[["pfosten",84],["kreis",78,34,4]],T:3},
    gehen:{f:[{...S,l:[160,172],r:[200,205],a:[205,195],b:[150,140]},{l:[200,205],r:[160,172],a:[150,140],b:[205,195]}],T:1.2}
  };

  for (const id in U) {
    const d = U[id]; let vor = {};
    d.f = d.f.map(fr => {
      const p = Object.assign({}, vor, fr); vor = p;
      const q = Object.assign({}, p);
      if (!("b" in q)) q.b = q.a;
      if (!("r" in q)) q.r = q.l;
      if (!("h" in q)) q.h = q.t;
      q.c = q.c || 0; q.hx = q.hx || 0;
      if (!("as" in q)) q.as = 1;
      if (!("rs" in q)) q.rs = 1;
      if (!("bs" in q)) q.bs = 1;
      if (!("n" in q)) q.n = d.fv ? 0 : 1;
      if (!("x" in q)) q.x = 80;
      if (!("y" in q)) q.y = 60;
      return q;
    });
  }
  const mix = (a,b,k) => a + (b-a)*k;
  function pose(d,k) {
    const n = d.f.length;
    if (n === 1) return d.f[0];
    const pos = k*(n-1), i = Math.min(n-2, Math.floor(pos)), u = pos-i, A = d.f[i], B = d.f[i+1], p = {};
    for (const key of ["t","h","c","hx","n","x","y","as","rs","bs"]) p[key] = mix(A[key],B[key],u);
    for (const key of ["a","b","l","r"]) p[key] = [mix(A[key][0],B[key][0],u), mix(A[key][1],B[key][1],u)];
    return p;
  }
  function fuss(shin, fv) {
    if (fv) return null;
    let f = shin-90; const m = ((f%360)+360)%360, s = ((shin%360)+360)%360;
    if (m > 120 && m < 240 && !(s > 150 && s < 210)) f = shin;
    return f;
  }
  function punkte(d,p) {
    const P = {}, sw = d.fv ? 9 : 0, hw = d.fv ? 5 : 0, q = D(p.t+90);
    P.hip = [0,0]; P.neck = add(P.hip,p.t,L.t);
    P.sA = [P.neck[0]+q[0]*sw, P.neck[1]+q[1]*sw]; P.sB = [P.neck[0]-q[0]*sw, P.neck[1]-q[1]*sw];
    P.hA = [q[0]*hw, q[1]*hw]; P.hB = [-q[0]*hw, -q[1]*hw];
    const vorn = D(p.h+90);
    P.kopf = add(P.neck,p.h,L.nk+L.hd); P.kopf = [P.kopf[0]+vorn[0]*p.hx, P.kopf[1]+vorn[1]*p.hx];
    P.nase = d.fv ? [P.kopf[0]+p.n*5, P.kopf[1]+1] : [P.kopf[0]+vorn[0]*5*p.n, P.kopf[1]+vorn[1]*5*p.n];
    P.eA = add(P.sA,p.a[0],L.ua*p.as); P.wA = add(P.eA,p.a[1],L.fa*p.as);
    P.eB = add(P.sB,p.b[0],L.ua*p.bs); P.wB = add(P.eB,p.b[1],L.fa*p.bs);
    P.kL = add(P.hA,p.l[0],L.th); P.aL = add(P.kL,p.l[1],L.sh);
    P.kR = add(P.hB,p.r[0],L.th*p.rs); P.aR = add(P.kR,p.r[1],L.sh);
    const fl = fuss(p.l[1],d.fv), fr = fuss(p.r[1],d.fv);
    P.fL = fl === null ? P.aL : add(P.aL,fl,L.ft); P.fR = fr === null ? P.aR : add(P.aR,fr,L.ft);
    const mitte = [P.neck[0]/2, P.neck[1]/2];
    P.ctl = [mitte[0]-q[0]*p.c*2, mitte[1]-q[1]*p.c*2];
    P.brust = [P.neck[0]*0.62, P.neck[1]*0.62];
    let dx, dy;
    const unten = Math.max(...Object.keys(P).filter(k => k !== "ctl" && k !== "nase" && k !== "brust").map(k => P[k][1] + (k === "kopf" ? L.hd : 0)));
    if (d.fix) { dx = d.fix.x - P[d.fix.k][0]; dy = d.fix.y !== undefined ? d.fix.y - P[d.fix.k][1] : BODEN-2.5-unten; }
    else if (d.nog) { dx = p.x; dy = p.y; }
    else { dx = p.x; dy = BODEN-2.5-unten; }
    for (const k in P) P[k] = [P[k][0]+dx, P[k][1]+dy];
    return P;
  }
  const r1 = v => Math.round(v*10)/10;
  const pl = (cls, ...pts) => '<polyline class="'+cls+'" points="'+pts.map(p => r1(p[0])+","+r1(p[1])).join(" ")+'"/>';
  function svg(id,k,puls) {
    const d = U[id]; if (!d) return "";
    const p = pose(d,k), P = punkte(d,p);
    let s = '<svg viewBox="'+VB+'" role="img" aria-label="Bewegungsskizze"><g fill="none" stroke-linecap="round" stroke-linejoin="round">';
    if (!d.nog) s += '<line class="an-b" x1="6" y1="'+BODEN+'" x2="154" y2="'+BODEN+'"/>';
    for (const pr of d.pr || []) {
      if (pr[0] === "wand") { s += '<line class="an-g" x1="128" y1="8" x2="128" y2="'+BODEN+'"/>'; for (let y = 16; y < BODEN; y += 10) s += '<line class="an-g" x1="122" y1="'+y+'" x2="128" y2="'+y+'"/>'; }
      if (pr[0] === "pfosten") s += '<line class="an-g" x1="'+pr[1]+'" y1="8" x2="'+pr[1]+'" y2="'+BODEN+'"/>';
      if (pr[0] === "kreis") s += '<circle class="an-g" cx="'+pr[1]+'" cy="'+pr[2]+'" r="'+pr[3]+'"/>';
      if (pr[0] === "box") s += '<rect class="an-g" x="'+pr[1]+'" y="'+pr[2]+'" width="'+pr[3]+'" height="'+pr[4]+'" rx="2"/>';
      if (pr[0] === "band") s += pl("an-z",[pr[1],pr[2]],P[pr[3]]);
      if (pr[0] === "link") s += pl("an-z",P[pr[1]],P[pr[2]]);
    }
    s += pl("an-f",P.sB,P.eB,P.wB) + pl("an-f",P.hB,P.kR,P.aR,P.fR);
    if (d.fv) s += pl("an-k",P.sA,P.sB) + pl("an-k",P.hA,P.hB);
    s += '<path class="an-k" d="M'+r1(P.hip[0])+","+r1(P.hip[1])+" Q"+r1(P.ctl[0])+","+r1(P.ctl[1])+" "+r1(P.neck[0])+","+r1(P.neck[1])+'"/>';
    s += pl("an-k",P.hA,P.kL,P.aL,P.fL) + pl("an-k",P.sA,P.eA,P.wA);
    s += '<circle class="an-kopf" cx="'+r1(P.kopf[0])+'" cy="'+r1(P.kopf[1])+'" r="'+L.hd+'"/><circle class="an-nase" cx="'+r1(P.nase[0])+'" cy="'+r1(P.nase[1])+'" r="1.6"/>';
    if (d.puls) s += '<circle class="an-puls" cx="'+r1(P.brust[0])+'" cy="'+r1(P.brust[1])+'" r="'+r1(4+7*puls)+'"/>';
    for (const pr of d.pr || []) if (pr[0] === "hantel") s += '<circle class="an-h" cx="'+r1(P[pr[1]][0])+'" cy="'+r1(P[pr[1]][1])+'" r="4"/>';
    const cap = d.cap || (d.nog ? "Ansicht von oben" : d.fv ? "Ansicht von vorn" : "");
    return s + '</g>' + (cap ? '<text class="an-t" x="6" y="115">'+cap+'</text>' : "") + '</svg>';
  }

  const css = document.createElement("style");
  css.textContent = ".anim{width:100%;max-width:300px;margin:0 auto 10px}.anim svg{display:block;width:100%;height:auto}.anim.sp-anim{max-width:230px;margin:-6px auto 8px}"+
    ".an-k{stroke:var(--ink);stroke-width:4.5}.an-f{stroke:var(--muted);stroke-width:4.5;opacity:.55}"+
    ".an-kopf{fill:var(--card);stroke:var(--ink);stroke-width:3.5}.an-nase{fill:var(--ink);stroke:none}"+
    ".an-b{stroke:var(--line);stroke-width:2}.an-g{stroke:var(--muted);stroke-width:2;opacity:.7}"+
    ".an-z{stroke:var(--accent);stroke-width:2;stroke-dasharray:1 3.5}.an-h{fill:var(--accent);stroke:none}"+
    ".an-puls{fill:var(--accent);opacity:.3;stroke:none}.an-t{fill:var(--muted);font:7px sans-serif}";
  document.head.appendChild(css);

  let aktiv = [], laeuft = false;
  const ruhig = () => { try { return matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) { return false; } };
  function bild(now) {
    aktiv = aktiv.filter(a => a.el.isConnected && a.el.offsetParent !== null);
    for (const a of aktiv) {
      const d = U[a.id], T = (d.T || 3)*1000, ph = ((now-a.t0) % T)/T;
      const k = d.f.length > 1 ? (1-Math.cos(ph*2*Math.PI))/2 : 0;
      const at = (((now-a.t0) % 13000)/13000), puls = at < 4/13 ? at*13/4 : at < 11/13 ? 1-(at-4/13)*13/7 : 0;
      a.el.innerHTML = svg(a.id,k,puls);
    }
    if (aktiv.length) requestAnimationFrame(bild); else laeuft = false;
  }
  function start(el) {
    if (!el) return;
    let id = el.dataset.anim;
    if (U[id] && U[id].v) id = U[id].v[+el.dataset.wk || 0];
    if (!U[id]) { el.hidden = true; return; }
    if (ruhig()) { el.innerHTML = svg(id,1,0.5); return; }
    el.innerHTML = svg(id,0,0);
    aktiv = aktiv.filter(a => a.el !== el);
    aktiv.push({el,id,t0:performance.now()});
    if (!laeuft) { laeuft = true; requestAnimationFrame(bild); }
  }
  document.addEventListener("toggle", e => {
    if (e.target.matches && e.target.matches("details.ue") && e.target.open) start(e.target.querySelector(".anim"));
  }, true);
  return {start, svg, ids:() => Object.keys(U)};
})();
