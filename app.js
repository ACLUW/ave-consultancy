import { services } from './data/services.js';
import { matchServices, buildBrief } from './data/matching.js';
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
let toastTimer;
function notify(message){$('#toast').textContent=message;$('#toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),4500);}
function el(tag,text,cls=''){const n=document.createElement(tag);n.textContent=text;if(cls)n.className=cls;return n;}
function goTo(n){n.focus({preventScroll:true});n.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});}
function download(text){const url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));const a=el('a','');a.href=url;a.download='ave-project-enquiry.txt';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),10000);}
$$('[data-year]').forEach(n=>n.textContent=new Date().getFullYear());
const menu=$('.menu-toggle');
function closeMenu(){$('#main-nav').classList.remove('open');menu.setAttribute('aria-expanded','false');}
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));$('#main-nav').classList.toggle('open',open);});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){const open=menu?.getAttribute('aria-expanded')==='true';closeMenu();$$('.nav-dropdown[open]').forEach(n=>n.open=false);if(open)menu.focus();}});
document.addEventListener('click',e=>{if(!e.target.closest('.nav-dropdown'))$$('.nav-dropdown[open]').forEach(n=>n.open=false);});
$('#quick-service')?.addEventListener('submit',e=>{e.preventDefault();const id=$('#quick-service-select').value;if(services.some(s=>s.id===id))location.href=id+'.html';});
// Retain public comparison IDs only. Never retain personal enquiry details.
let selected=[];try{const data=JSON.parse(sessionStorage.getItem('ave-compare')||'[]');if(Array.isArray(data))selected=[...new Set(data)].filter(id=>services.some(s=>s.id===id)).slice(0,3);}catch{}
function save(){try{sessionStorage.setItem('ave-compare',JSON.stringify(selected));}catch{}}
function sync(){
  $$('[data-compare]').forEach(n=>n.checked=selected.includes(n.dataset.compare));if(!$('#compare-bar'))return;
  $('#compare-bar').hidden=!selected.length;$('#compare-count').textContent=`${selected.length} service${selected.length===1?'':'s'} selected`;$('#show-comparison').disabled=selected.length<2;if(selected.length<2)$('#comparison').hidden=true;
}
function renderComparison(){
  const out=$('#comparison-content');out.replaceChildren();
  services.filter(s=>selected.includes(s.id)).forEach(s=>{const card=el('article','','comparison-card');card.append(el('span',s.number+' / '+s.category,'eyebrow'),el('h3',s.name),el('p',s.description));
    for(const [title,items] of [['Typical scope',s.scope.slice(0,3)],['Useful to prepare',s.prepare.slice(0,2)]]){card.append(el('h4',title));const ul=el('ul','');items.forEach(t=>ul.append(el('li',t)));card.append(ul);}
    const link=el('a','Explore this service ↗','text-link');link.href=s.id+'.html';card.append(link);out.append(card);
  });
}
$$('[data-compare]').forEach(n=>n.addEventListener('change',()=>{const id=n.dataset.compare;if(n.checked){if(selected.length>=3){n.checked=false;notify('Choose up to 3 services. Clear a selection to add another.');return;}selected.push(id);}else selected=selected.filter(v=>v!==id);save();sync();if(!$('#comparison').hidden)renderComparison();}));
$('#show-comparison')?.addEventListener('click',()=>{renderComparison();$('#comparison').hidden=false;goTo($('#comparison'));});
$('#clear-comparison')?.addEventListener('click',()=>{selected=[];save();sync();notify('Comparison cleared.');});
$('#close-comparison')?.addEventListener('click',()=>{$('#comparison').hidden=true;$('#show-comparison').focus();});sync();
let filter='all';function filterServices(){const q=$('#service-search').value.trim().toLowerCase();let count=0;$$('[data-service-card]').forEach(n=>{const show=(filter==='all'||n.dataset.serviceCard===filter)&&n.dataset.search.includes(q);n.hidden=!show;if(show)count++;});$('#service-count').textContent=`${count} service area${count===1?'':'s'}`;$('#service-empty').hidden=count>0;}
$('#service-search')?.addEventListener('input',filterServices);
$$('[data-filter]').forEach(b=>b.addEventListener('click',()=>{filter=b.dataset.filter;$$('[data-filter]').forEach(n=>{n.classList.toggle('active',n===b);n.setAttribute('aria-pressed',String(n===b));});filterServices();}));
$('#reset-services')?.addEventListener('click',()=>{$('#service-search').value='';$('[data-filter="all"]').click();$('#service-search').focus();});
$$('[data-example]').forEach(b=>b.addEventListener('click',()=>{$('#need').value=services.find(s=>s.id===b.dataset.example).example;$('#need').focus();}));
$('#navigator-form')?.addEventListener('submit',e=>{
  e.preventDefault();if(!e.currentTarget.reportValidity())return;const matches=matchServices($('#need').value),out=$('#match-results');out.replaceChildren();$('#match-initial').hidden=true;out.hidden=false;
  out.append(el('h2',matches.length?'A useful place to start.':'Let’s discuss your requirement.'),el('p',matches.length?'These capabilities may be relevant to your goal. Explore their scope and confirm suitability with AVE.':'No clear keyword match was found. A direct conversation can clarify whether AVE can help.'));
  matches.forEach((s,i)=>{const card=el('article','','match-card'),body=el('div','');card.append(el('span',String(i+1).padStart(2,'0'),'match-number'));body.append(el('h3',s.name),el('p',s.description));const a=el('a','Explore scope ↗','text-link');a.href=s.id+'.html';body.append(a);card.append(body);out.append(card);});
  const link=el('a',matches.length?'Build an enquiry with these services ↗':'Build a general enquiry ↗','button');link.href='contact.html'+(matches.length?'?services='+matches.map(s=>s.id).join(','):'');out.append(link,el('p','Only service selections carry over. Add your requirement in the enquiry builder. Matches do not confirm feasibility, price or availability.','fine-print'));
  $('#match-status').textContent=matches.length?`${matches.length} potential service matches found.`:'No clear service match. Contact AVE for a personal review.';goTo($('#match-panel'));
});
const tabs=$$('[role="tab"]');function activate(tab){tabs.forEach(n=>{const active=n===tab;n.setAttribute('aria-selected',String(active));n.tabIndex=active?0:-1;$('#'+n.getAttribute('aria-controls')).hidden=!active;});}
tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>activate(tab));tab.addEventListener('keydown',e=>{let next;if(['ArrowRight','ArrowDown'].includes(e.key))next=(i+1)%tabs.length;if(['ArrowLeft','ArrowUp'].includes(e.key))next=(i-1+tabs.length)%tabs.length;if(e.key==='Home')next=0;if(e.key==='End')next=tabs.length-1;if(next!==undefined){e.preventDefault();activate(tabs[next]);tabs[next].focus();}});});
function diligence(){const n=$$('#diligence-checks input:checked').length;$('#diligence-progress').value=n;$('#diligence-count').textContent=`${n} of 8 reviewed`;}
$$('#diligence-checks input').forEach(n=>n.addEventListener('change',diligence));$('#reset-diligence')?.addEventListener('click',()=>{$$('#diligence-checks input').forEach(n=>n.checked=false);diligence();});
const form=$('#enquiry-form');let brief='';
if(form){
  const steps=$$('.wizard-step');let step=0;form.classList.add('wizard-enhanced');form.noValidate=true;
  const params=new URLSearchParams(location.search),chosen=(params.get('services')||params.get('service')||'').split(',');$$('[name="service"]').forEach(n=>n.checked=chosen.includes(n.value));if(params.get('audience')==='partnership')form.elements.audience.value='Partnership discussion';
  function render(){steps.forEach((n,i)=>n.hidden=i!==step);$$('[data-wizard-marker]').forEach((n,i)=>{n.classList.toggle('current',i===step);n.classList.toggle('complete',i<step);if(i===step)n.setAttribute('aria-current','step');else n.removeAttribute('aria-current');});$('#wizard-back').hidden=step===0;$('#wizard-next').hidden=step===2;$('#generate-brief').hidden=step!==2;$('#wizard-step-label').textContent=`Step ${step+1} of 3`;}
  function valid(){for(const n of steps[step].querySelectorAll('input,select,textarea')){if(n.required&&n.type!=='checkbox'){const value=n.value.trim();n.setCustomValidity(!value?'Please complete this field.':n.minLength>0&&value.length<n.minLength?`Please enter at least ${n.minLength} characters.`:'');}if(!n.reportValidity())return false;}return true;}
  function focusStep(){const legend=steps[step].querySelector('legend');legend.tabIndex=-1;legend.focus({preventScroll:true});}
  $('#wizard-next').addEventListener('click',()=>{if(valid()){step++;render();focusStep();}});$('#wizard-back').addEventListener('click',()=>{if(step>0){step--;render();focusStep();}});render();
  function invalidate(){$('#brief-preview').hidden=true;$('#brief-status').textContent='';brief='';}form.addEventListener('input',invalidate);form.addEventListener('change',invalidate);
  form.addEventListener('submit',e=>{e.preventDefault();if(step<2){$('#wizard-next').click();return;}for(let i=0;i<steps.length;i++){step=i;render();if(!valid())return;}
    const data=new FormData(form),values=Object.fromEntries([...data].map(([k,v])=>[k,String(v).trim()]));values.services=data.getAll('service').map(id=>services.find(s=>s.id===id)?.name).filter(Boolean).join(', ');brief=buildBrief(values);$('#brief-text').textContent=brief;$('#email-brief').href=`mailto:aveconsultancy15@gmail.com?subject=${encodeURIComponent('AVE project enquiry — '+(values.services||values.audience))}&body=${encodeURIComponent(brief)}`;$('#brief-preview').hidden=false;$('#copy-status').textContent='';$('#brief-status').textContent='Your brief is ready to review. Nothing has been sent.';goTo($('#brief-preview'));
  });
  $('#copy-brief').addEventListener('click',async()=>{if(!brief)return;try{await navigator.clipboard.writeText(brief);$('#copy-status').textContent='Brief copied to your clipboard.';}catch{$('#copy-status').textContent='Clipboard access is unavailable. Select the brief text to copy it, or use Download.';}});
  $('#download-brief').addEventListener('click',()=>{if(brief){download(brief);$('#copy-status').textContent='Your brief has been downloaded. Nothing has been sent.';}});
  $('#email-brief').addEventListener('click',()=>{$('#copy-status').textContent='Your email app has been requested. Review and send the draft there. If it does not open, copy or download the brief and email AVE directly.';});
}
$('#faq-search')?.addEventListener('input',e=>{const q=e.target.value.trim().toLowerCase();let count=0;$$('[data-faq-text]').forEach(n=>{const show=n.dataset.faqText.includes(q);n.hidden=!show;if(show)count++;});$('#faq-count').textContent=`${count} question${count===1?'':'s'}`;$('#faq-empty').hidden=count>0;});
$('#print-overview')?.addEventListener('click',()=>window.print());
