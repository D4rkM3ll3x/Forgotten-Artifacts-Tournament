// Rendering for the Teams, Brackets & Matches and Scoreboard views.
// Data lives in data.js. Texts for each language are in L below.
{
const lang=['ru','de'].includes(document.documentElement.lang)?document.documentElement.lang:'en';
const L={
 en:{
  tbd:'TBD',notSched:'Not scheduled yet',round:'Round',
  pairAfter:r=>'Pairings after Round '+r,awaiting:'Awaiting teams',completed:'Completed',inProgress:'In progress',
  pairOnce:r=>'Pairings are published once Round '+r+' is complete.',
  team:'Team',played:'Played',open:'Open',scheduled:'Scheduled',
  pairPrev:'Pairings for this round are published once the previous round is complete.',
  standEmpty:'Standings appear here after the first results of Round 1 are reported.',
  spEmpty:'No Style Points awarded yet. Commentators award them during the Main Event.',
  soloEmpty:'No solo players at the moment.',discord:'Discord',form:'Form',
  thPlayer:'Player',thFaction:'Faction',thDiscord:'Discord'
 },
 de:{
  tbd:'Offen',notSched:'Noch kein Termin',round:'Runde',
  pairAfter:r=>'Paarungen nach Runde '+r,awaiting:'Warten auf Teams',completed:'Abgeschlossen',inProgress:'Läuft',
  pairOnce:r=>'Paarungen erscheinen, sobald Runde '+r+' abgeschlossen ist.',
  team:'Team',played:'Gespielt',open:'Offen',scheduled:'Angesetzt',
  pairPrev:'Paarungen für diese Runde erscheinen, sobald die vorherige Runde abgeschlossen ist.',
  standEmpty:'Die Tabelle erscheint, sobald die ersten Ergebnisse aus Runde 1 gemeldet sind.',
  spEmpty:'Noch keine Style Points vergeben. Die Kommentatoren vergeben sie während des Hauptturniers.',
  soloEmpty:'Aktuell keine Einzelspieler.',discord:'Discord',form:'Form',
  thPlayer:'Spieler',thFaction:'Fraktion',thDiscord:'Discord'
 },
 ru:{
  tbd:'Не определено',notSched:'Время не назначено',round:'Раунд',
  pairAfter:r=>'Пары после раунда '+r,awaiting:'Ожидание команд',completed:'Завершён',inProgress:'Идёт',
  pairOnce:r=>'Пары публикуются после завершения раунда '+r+'.',
  team:'Команда',played:'Сыгран',open:'Открыт',scheduled:'Назначен',
  pairPrev:'Пары этого раунда публикуются после завершения предыдущего.',
  standEmpty:'Таблица появится после первых результатов раунда 1.',
  spEmpty:'Очки стиля ещё не начислены. Комментаторы начисляют их во время основного этапа.',
  soloEmpty:'Сейчас нет игроков без команды.',discord:'Discord',form:'Форма',
  thPlayer:'Игрок',thFaction:'Фракция',thDiscord:'Discord'
 }
}[lang];
// faction names per language (data.js uses the English names)
const FX={ru:{'Necrons':'Некроны','Space Marines':'Космический десант','Astra Militarum':'Имперская Гвардия','Orks':'Орки','Tyranids':'Тираниды','Chaos Space Marines':'Космодесант Хаоса',"T'au":'Тау','Craftworld Aeldari':'Крафтворлдские Эльдары','Adeptus Mechanicus':'Адептус Механикус','Adepta Sororitas':'Сёстры Битвы','Drukhari':'Друкхари'}}[lang]||{};
const fxn=f=>FX[f]||f;
T._={n:'TBD',p:[],ph:1};
const esc=x=>String(x).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'})[c]);
const opt=x=>x?esc(x):'<span class="tbdn">?</span>';
const optF=x=>opt(x&&fxn(x));
const pl=k=>T[k].p.map(x=>x[0]+' ('+(x[1]?fxn(x[1]):'?')+')').join(' · ');
const nm=k=>(T[k].ph?'<span class="tbdn">'+L.tbd+'</span>':esc(T[k].n))+(T[k].wc?' <span class="tag">WC</span>':'');
const stTxt=s=>s==='Not scheduled yet'?L.notSched:s;
// record before each round
const rec={},form={};Object.keys(T).forEach(k=>{rec[k]=[0,0];form[k]=[]});
const before=[];
R.forEach(ms=>{
 const snap={};Object.keys(T).forEach(k=>snap[k]=rec[k].slice());before.push(snap);
 ms.forEach(m=>{if(!m[2])return;const w=m[2],l=m[0]===w?m[1]:m[0];rec[w][0]++;rec[l][1]++;form[w].push('W');form[l].push('L')});
});
// registered teams and solo players
const real=Object.keys(T).filter(k=>!T[k].ph);
document.getElementById('teams').innerHTML=real.slice().sort((x,y)=>T[x].n.localeCompare(T[y].n)).map(k=>`<div class="box tcard"><h4>${nm(k)}</h4><ul class="pl">${T[k].p.map(x=>`<li><span class="pn">${esc(x[0])}</span><span class="pf">${optF(x[1])}</span><span class="pd">${L.discord}: ${opt(x[2])}</span></li>`).join('')}</ul></div>`).join('');
document.getElementById('tcount').textContent=real.length;
document.getElementById('scount').textContent=S.length;
document.getElementById('solo').innerHTML=S.length?S.map(x=>`<li><b>${esc(x[0])}</b>${x[3]?` <span class="tag">${esc(x[3])}</span>`:''}<span class="sf">${optF(x[1])}</span><span class="sd">${L.discord}: ${opt(x[2])}</span></li>`).join(''):`<li class="sd">${L.soloEmpty}</li>`;
// swiss overview
const sw=document.getElementById('swiss');
sw.innerHTML=R.map((ms,i)=>{
 const status=ms.length===0?L.pairAfter(i):ms.every(m=>T[m[0]].ph)?L.awaiting:ms.every(m=>m[2])?L.completed:L.inProgress;
 if(!ms.length)return `<div class="rcol"><h4>${L.round} ${i+1}<small>${status}</small></h4><div class="empty">${L.pairOnce(i)}</div></div>`;
 const g={};ms.forEach(m=>{const r=before[i][m[0]].join('–');(g[r]=g[r]||[]).push(m)});
 const keys=Object.keys(g).sort((x,y)=>(+y.split('–')[0]-+y.split('–')[1])-(+x.split('–')[0]-+x.split('–')[1]));
 return `<div class="rcol"><h4>${L.round} ${i+1}<small>${status}</small></h4>`+keys.map(r=>`<div class="grpb"><p class="lab">${r}</p>`+g[r].map(m=>{
  const row=(k,ab)=>`<div class="${m[2]?(m[2]===k?'w':'l'):''}"><span><span class="abm">${ab}</span>${T[k].ph?'<span class="tbdn">'+L.tbd+'</span>':esc(T[k].n)}</span><span class="r">${m[2]?(m[2]===k?'W':'L'):''}</span></div>`;
  return `<div class="mini${m[2]?'':' open'}">${row(m[0],'A')}${row(m[1],'B')}</div>`}).join('')+'</div>').join('')+'</div>';
}).join('');
// round detail
const sel=document.getElementById('rsel'),list=document.getElementById('rlist');
let cur=R.findIndex(ms=>!ms.length||ms.some(m=>!m[2]));if(cur<0)cur=R.length-1;
const drawR=()=>{
 sel.innerHTML=R.map((_,i)=>`<button type="button" id="rbtn${i+1}" aria-pressed="${i===cur}" data-r="${i}">${L.round} ${i+1}</button>`).join('');
 const ms=R[cur];
 list.innerHTML=ms.length?ms.map(m=>{
  const done=!!m[2],side=(k,c)=>`<div class="side ${c}${done&&m[2]!==k?' lose':''}"><span class="ab">${L.team} ${c.toUpperCase()}</span><h5>${nm(k)}${done?`<span class="res ${m[2]===k?'W':'L'}">${m[2]===k?'W':'L'}</span>`:''}</h5><p>${esc(pl(k))}</p></div>`;
  const notS=m[3]==='Not scheduled yet';
  const mid=done?`<div class="mid"><div class="score">${m[2]===m[0]?'1 – 0':'0 – 1'}</div><span class="chip">${L.played}</span></div>`:`<div class="mid"><div class="score">vs</div><span class="st">${esc(stTxt(m[3]))}</span><span class="chip${notS?'':' live'}">${notS?L.open:L.scheduled}</span></div>`;
  return `<div class="match">${side(m[0],'a')}${mid}${side(m[1],'b')}</div>`}).join(''):`<div class="empty">${L.pairPrev}</div>`;
};
sel.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;cur=+b.dataset.r;drawR()});
drawR();
// standings
const st=real.slice().sort((x,y)=>rec[y][0]-rec[x][0]||rec[x][1]-rec[y][1]||T[x].n.localeCompare(T[y].n));
let rank=0,prev='';
const anyPlayed=R.some(ms=>ms.some(m=>m[2]));
document.getElementById('stand').innerHTML=!anyPlayed?`<tr><td colspan="6" class="emptyrow">${L.standEmpty}</td></tr>`:st.map((k,i)=>{const key=rec[k].join();if(key!==prev){rank=i+1;prev=key}
 const fm=form[k].map(r=>`<i class="${r}">${r}</i>`).join('')+'<i class="O"></i>'.repeat(5-form[k].length);
 return `<tr><td class="rk">${rank}</td><td><span class="tm">${nm(k)}</span><span class="fx">${esc(pl(k))}</span></td><td class="n hm">${rec[k][0]+rec[k][1]}</td><td class="n">${rec[k][0]}</td><td class="n">${rec[k][1]}</td><td class="hm"><span class="form" aria-label="${L.form}">${fm}</span></td></tr>`}).join('');
// style points
const mx=SP.length?SP[0][1]:1;
document.getElementById('sp').innerHTML=SP.length?SP.map((r,i)=>`<li><div class="top"><span><b>${i+1}.</b> ${nm(r[0])}</span><b>${r[1]}</b></div><div class="bar"><span style="width:${r[1]/mx*100}%"></span></div><div class="why">${esc(r[2])}</div></li>`).join(''):`<li class="empty">${L.spEmpty}</li>`;
// routing
const views=['rulebook','teams','matches','scoreboard'];
const route=()=>{
 const h=location.hash.slice(1);
 const v=views.includes(h)?h:'rulebook';
 views.forEach(x=>{document.getElementById('v-'+x).hidden=x!==v});
 document.querySelectorAll('.tabs a').forEach(a=>{if(a.dataset.v===v)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});
 if(views.includes(h))window.scrollTo(0,0);
 // keep the current view when switching language
 document.querySelectorAll('.lang a').forEach(a=>{a.href=a.dataset.base+(views.includes(h)?'#'+h:'')});
};
window.addEventListener('hashchange',route);route();
// top bar: one row when it fits, otherwise title + language on top and tabs below
const bar=document.querySelector('.topbar .in');
const fit=()=>{bar.classList.remove('stack');if(bar.scrollWidth>bar.clientWidth+1)bar.classList.add('stack')};
const barRO=new ResizeObserver(fit);barRO.observe(document.body);
if(document.fonts)document.fonts.ready.then(fit);
fit();
}
