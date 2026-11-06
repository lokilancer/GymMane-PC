const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const KEY='gymmane-pc-v1';
const starterExercises=[
 ['Push-up','Upper body'],['Dumbbell bench press','Upper body'],['Overhead press','Upper body'],['Lat pulldown','Upper body'],['Seated row','Upper body'],['Biceps curl','Upper body'],['Triceps extension','Upper body'],['Bodyweight squat','Lower body'],['Goblet squat','Lower body'],['Romanian deadlift','Lower body'],['Reverse lunge','Lower body'],['Calf raise','Lower body'],['Glute bridge','Lower body'],['Plank','Core'],['Dead bug','Core'],['Bird dog','Core'],['Mountain climber','Full body'],['Step-up','Full body']
].map(([name,group])=>({name,group}));
let data=load(), current=[], timerSeconds=90, timerInterval=null, timerRunning=false;
function load(){try{return JSON.parse(localStorage.getItem(KEY))||{sessions:[],routines:[],custom:[]}}catch{return {sessions:[],routines:[],custom:[]}}}
function save(){localStorage.setItem(KEY,JSON.stringify(data));renderAll()}
function allExercises(){return [...starterExercises,...data.custom]}
function toast(msg){const el=$('#toast');el.textContent=msg;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),2200)}
function page(name){$$('.page').forEach(p=>p.classList.toggle('active',p.id==='page-'+name));$$('.nav[data-page]').forEach(n=>n.classList.toggle('active',n.dataset.page===name));$('#crumb').textContent=name[0].toUpperCase()+name.slice(1);if(name==='exercises')renderExercises();if(name==='history')renderHistory();if(name==='routines')renderRoutines()}
$$('.nav[data-page]').forEach(b=>b.addEventListener('click',()=>page(b.dataset.page)));
$$('[data-goto]').forEach(b=>b.addEventListener('click',()=>page(b.dataset.goto)));
$('#today').textContent=new Date().toLocaleDateString(undefined,{weekday:'short',month:'short',day:'numeric',year:'numeric'});
function renderAll(){renderOverview();renderRoutines();renderExercises();renderHistory()}
function renderOverview(){
 $('#statSessions').textContent=data.sessions.length;
 const weekAgo=Date.now()-7*86400000;
 $('#statWeek').textContent=data.sessions.filter(s=>new Date(s.date).getTime()>=weekAgo).length;
 $('#statSets').textContent=data.sessions.reduce((n,s)=>n+s.exercises.reduce((a,e)=>a+e.sets.length,0),0);
 const days=new Set(data.sessions.map(s=>new Date(s.date).toDateString()));let streak=0,d=new Date();while(days.has(d.toDateString())){streak++;d.setDate(d.getDate()-1)}$('#statStreak').innerHTML=`${streak} <small>days</small>`;
 const recent=data.sessions.slice().reverse().slice(0,3);
 $('#recentList').innerHTML=recent.length?recent.map(s=>`<div class="recent-item"><div><b>${esc(s.name)}</b><small>${new Date(s.date).toLocaleDateString()} · ${s.exercises.length} exercises</small></div><span class="muted">${s.exercises.reduce((n,e)=>n+e.sets.length,0)} sets</span></div>`).join(''):'<div class="empty">Your completed sessions will appear here.</div>';
 const labels=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];const today=new Date();const vals=Array.from({length:7},(_,i)=>{const x=new Date(today);x.setDate(today.getDate()-6+i);return data.sessions.filter(s=>new Date(s.date).toDateString()===x.toDateString()).length});
 $('#weekChart').innerHTML=vals.map((v,i)=>`<div class="bar-col"><div class="bar ${i===6?'today':''}" style="height:${Math.max(3,v*26)}px" title="${v} sessions"></div><small>${labels[new Date(today.getFullYear(),today.getMonth(),today.getDate()-6+i).getDay()]}</small></div>`).join('');
}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function renderExercises(){
 const q=($('#exerciseSearch')?.value||'').toLowerCase(),g=$('#muscleFilter')?.value||'';
 const list=allExercises().filter(e=>e.name.toLowerCase().includes(q)&&(!g||e.group===g));
 $('#exerciseList').innerHTML=list.map(e=>`<div class="exercise-card"><div><b>${esc(e.name)}</b><small>${esc(e.group)}</small></div><button data-add="${esc(e.name)}">＋ Add</button></div>`).join('')||'<div class="empty">No exercises match your search.</div>';
 $$('[data-add]').forEach(b=>b.onclick=()=>{addExercise(b.dataset.add);page('workout')});
}
function addExercise(name){current.push({name,sets:[{reps:10,load:0},{reps:10,load:0},{reps:10,load:0}]});renderWorkout();toast('Exercise added')}
$('#exerciseSearch').addEventListener('input',renderExercises);$('#muscleFilter').addEventListener('change',renderExercises);
function renderWorkout(){
 const box=$('#workoutExercises');
 if(!current.length){box.innerHTML='<div class="empty">Add exercises to begin your session.</div>';return}
 box.innerHTML=current.map((e,i)=>`<div class="exercise-row"><div class="exercise-row-head"><b>${esc(e.name)}</b><button class="remove-btn" data-remove="${i}">Remove</button></div>${e.sets.map((s,j)=>`<div class="set-row"><span>SET ${j+1}</span><label>REPS<input type="number" min="0" value="${s.reps}" data-i="${i}" data-j="${j}" data-k="reps"></label><label>LOAD (KG)<input type="number" min="0" step=".5" value="${s.load}" data-i="${i}" data-j="${j}" data-k="load"></label><button class="text-btn" data-delset="${i},${j}">× Set</button></div>`).join('')}<button class="text-btn" data-set="${i}">＋ Add set</button></div>`).join('');
 $$('[data-remove]').forEach(b=>b.onclick=()=>{current.splice(+b.dataset.remove,1);renderWorkout()});
 $$('[data-set]').forEach(b=>b.onclick=()=>{current[+b.dataset.set].sets.push({reps:10,load:0});renderWorkout()});
 $$('[data-delset]').forEach(b=>b.onclick=()=>{const [i,j]=b.dataset.delset.split(',').map(Number);current[i].sets.splice(j,1);renderWorkout()});
 $$('[data-k]').forEach(inp=>inp.onchange=()=>{current[+inp.dataset.i].sets[+inp.dataset.j][inp.dataset.k]=Math.max(0,+inp.value||0)});
}
$('#addExercise').onclick=()=>openExercisePicker();
function openExercisePicker(){openModal(`<h2>Add an exercise</h2><input class="field" id="pickSearch" placeholder="Search or add a movement"><div id="pickResults" style="margin-top:12px"></div><div class="modal-actions"><button class="secondary-btn" id="pickCustom">＋ Create custom</button></div>`);const update=()=>{const q=$('#pickSearch').value.toLowerCase();$('#pickResults').innerHTML=allExercises().filter(e=>e.name.toLowerCase().includes(q)).slice(0,8).map(e=>`<div class="exercise-card"><div><b>${esc(e.name)}</b><small>${esc(e.group)}</small></div><button data-pick="${esc(e.name)}">Add</button></div>`).join('')};$('#pickSearch').oninput=update;update();$('#pickCustom').onclick=()=>{const name=$('#pickSearch').value.trim();if(name){data.custom.push({name,group:'Full body'});save();addExercise(name);closeModal()}};$('#pickResults').onclick=e=>{const b=e.target.closest('[data-pick]');if(b){addExercise(b.dataset.pick);closeModal()}}}
$('#finishWorkout').onclick=()=>{const exercises=current.filter(e=>e.sets.length);if(!exercises.length){toast('Add at least one exercise first');return}data.sessions.push({name:$('#workoutName').value.trim()||'Workout',date:new Date().toISOString(),exercises:JSON.parse(JSON.stringify(exercises))});current=[];$('#workoutName').value='My workout';renderWorkout();save();page('overview');toast('Session saved on this device')};
$('#clearWorkout').onclick=()=>{current=[];renderWorkout()};
function renderRoutines(){$('#routineList').innerHTML=data.routines.length?data.routines.map((r,i)=>`<article class="routine-card"><span class="pill">SAVED ROUTINE</span><h3>${esc(r.name)}</h3><p>${r.exercises.map(esc).join(' · ')||'No exercises yet'}</p><div class="card-actions"><button class="primary-btn" data-start="${i}">Start routine</button><button class="secondary-btn" data-edit="${i}">Edit</button><button class="danger-btn" data-rdel="${i}">×</button></div></article>`).join(''):'<div class="empty">No routines yet. Create one to save a session structure.</div>';
 $$('[data-start]').forEach(b=>b.onclick=()=>{current=data.routines[+b.dataset.start].exercises.map(name=>({name,sets:[{reps:10,load:0},{reps:10,load:0},{reps:10,load:0}]}));$('#workoutName').value=data.routines[+b.dataset.start].name;renderWorkout();page('workout')});
 $$('[data-edit]').forEach(b=>b.onclick=()=>routineModal(+b.dataset.edit));$$('[data-rdel]').forEach(b=>b.onclick=()=>{data.routines.splice(+b.dataset.rdel,1);save()})}
$('#newRoutine').onclick=()=>routineModal(-1);
function routineModal(index){const r=index<0?{name:'',exercises:[]}:data.routines[index];openModal(`<h2>${index<0?'New':'Edit'} routine</h2><label>ROUTINE NAME</label><input class="field" id="rName" value="${esc(r.name)}"><label>EXERCISES (one per line)</label><textarea class="field" id="rExercises" rows="6">${esc(r.exercises.join('\n'))}</textarea><div class="modal-actions"><button class="secondary-btn" id="cancelRoutine">Cancel</button><button class="primary-btn" id="saveRoutine">Save routine</button></div>`);$('#cancelRoutine').onclick=closeModal;$('#saveRoutine').onclick=()=>{const item={name:$('#rName').value.trim()||'My routine',exercises:$('#rExercises').value.split('\n').map(x=>x.trim()).filter(Boolean)};if(index<0)data.routines.push(item);else data.routines[index]=item;save();closeModal();toast('Routine saved')}}
function renderHistory(){$('#historyList').innerHTML=data.sessions.length?data.sessions.slice().reverse().map((s,i)=>`<div class="history-item"><div><b>${esc(s.name)}</b><small>${s.exercises.map(e=>esc(e.name)).join(' · ')}</small></div><div class="history-meta">${new Date(s.date).toLocaleDateString()}<br>${s.exercises.reduce((n,e)=>n+e.sets.length,0)} SETS <button class="remove-btn" data-hdel="${data.sessions.length-1-i}">Delete</button></div></div>`).join(''):'<div class="empty">No sessions logged yet.</div>';$$('[data-hdel]').forEach(b=>b.onclick=()=>{if(confirm('Delete this session?')){data.sessions.splice(+b.dataset.hdel,1);save()}})}
function openModal(html){$('#modalBody').innerHTML=html;$('#modal').classList.add('show')}function closeModal(){$('#modal').classList.remove('show')}$('#modalClose').onclick=closeModal;$('#modal').onclick=e=>{if(e.target.id==='modal')closeModal()};
function exportData(){const blob=new Blob([JSON.stringify({format:'gymmane-pc-backup',version:1,...data},null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='gymmane-pc-backup.json';a.click();URL.revokeObjectURL(a.href);toast('Backup exported')}
$('#exportBtn').onclick=exportData;$('#settingsExport').onclick=exportData;
$('#importFile').onchange=async e=>{try{const obj=JSON.parse(await e.target.files[0].text());if(!Array.isArray(obj.sessions)||!Array.isArray(obj.routines))throw Error();data={sessions:obj.sessions,routines:obj.routines,custom:obj.custom||[]};save();toast('Backup imported')}catch{toast('That backup file could not be read')}e.target.value=''};
$('#clearData').onclick=()=>{if(confirm('Permanently clear local sessions, routines and custom exercises?')){data={sessions:[],routines:[],custom:[]};save();toast('Local data cleared')}};
function updateTimer(){const m=String(Math.floor(timerSeconds/60)).padStart(2,'0'),s=String(timerSeconds%60).padStart(2,'0');$('#timer').textContent=`${m}:${s}`;$('#timerToggle').textContent=timerRunning?'Pause':'Start'}
$('#timerToggle').onclick=()=>{timerRunning=!timerRunning;if(timerRunning){timerInterval=setInterval(()=>{timerSeconds=Math.max(0,timerSeconds-1);updateTimer();if(!timerSeconds){clearInterval(timerInterval);timerRunning=false;toast('Rest timer complete');updateTimer()}},1000)}else clearInterval(timerInterval);updateTimer()};
$('#timerPlus').onclick=()=>{timerSeconds+=15;updateTimer()};$('#timerMinus').onclick=()=>{timerSeconds=Math.max(0,timerSeconds-15);updateTimer()};
renderWorkout();renderAll();updateTimer();
if('serviceWorker' in navigator && location.protocol.startsWith('http'))navigator.serviceWorker.register('./sw.js').catch(()=>{});