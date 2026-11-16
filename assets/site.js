(function(){
 var shot=document.body.classList.contains('shot');
 // header compacts after scrolling past the hero top
 var h=document.getElementById('hdr');
 function onS(){ if(h) h.classList.toggle('compact',scrollY>60);
  document.querySelectorAll('[data-par]').forEach(function(el){var r=el.parentElement.getBoundingClientRect();var k=parseFloat(el.dataset.par)||.15;el.style.transform='translate3d(0,'+(-(r.top)*k).toFixed(1)+'px,0) scale(1.08)';});
  var tl=document.querySelector('.tl');if(tl){var r=tl.getBoundingClientRect();var p=Math.min(1,Math.max(0,(innerHeight*.55-r.top)/r.height));tl.style.setProperty('--p',p);
   tl.querySelectorAll('.ch').forEach(function(c){var cr=c.getBoundingClientRect();c.classList.toggle('lit',cr.top<innerHeight*.6)});}
 }
 if(!shot){addEventListener('scroll',onS,{passive:true});onS();
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.14,rootMargin:'0px 0px -6% 0px'});
  document.querySelectorAll('.rv').forEach(function(el){io.observe(el)});
 } else { document.querySelectorAll('.tl').forEach(function(t){t.style.setProperty('--p',1)}); document.querySelectorAll('.ch').forEach(function(c){c.classList.add('lit')}); }
 // pick the portrait hero video on phones
 document.querySelectorAll('img.poster[data-m]').forEach(function(i){if(matchMedia('(max-width:860px)').matches)i.src=i.dataset.m});document.querySelectorAll('video[data-mobile]').forEach(function(v){ if(matchMedia('(max-width:860px)').matches){v.src=v.dataset.mobile;v.poster=v.dataset.mposter||v.poster} });
})();
(function(){if(matchMedia('(prefers-reduced-motion: reduce)').matches){document.querySelectorAll('video[autoplay]').forEach(function(v){v.removeAttribute('autoplay');v.pause()})}})();

/* Nov 15, 2026 polish: working mobile menu */
(function(){
 var b=document.querySelector('.burger'); if(!b) return;
 var here=(location.pathname.split('/').pop()||'home.html');
 var items=[['home.html','Home'],['dog-training.html','Dog Training','Programs & prices'],['winter-training.html','Winter Training','Hoffman, NC'],['grouse-and-woodcock-hunting.html','Grouse & Woodcock','October'],['bear-hunting.html','Bear Hunting','September'],['rabbit-hunting.html','Rabbit Hunting','Pittsburg & Berlin'],['fishing.html','Fishing Charters','Apr – Sep'],['about-us.html','Our Story','Four generations'],['trialing.html','Results','Field trials']];
 var m=document.createElement('div'); m.className='m-menu'; m.setAttribute('role','dialog'); m.setAttribute('aria-modal','true'); m.setAttribute('aria-label','Menu');
 var h='<div class="mm-top"><a href="home.html"><img src="assets/img/logo-reverse.png" alt="Cee Dee Outdoors"></a><button class="mm-x" type="button" aria-label="Close menu">&times;</button></div><nav>';
 items.forEach(function(it){var cur=(here===it[0]||(here==='index.html'&&it[0]==='home.html'))?' class="cur" aria-current="page"':'';h+='<a href="'+it[0]+'"'+cur+'>'+it[1]+(it[2]?'<small>'+it[2]+'</small>':'')+'</a>'});
 h+='</nav><div class="mm-cta"><a class="btn" href="tel:6033812046">Call / Text 603-381-2046</a><a class="btn ghost" href="mailto:guide@westhilloutfitters.com">Email Adam</a></div><p class="mm-fine">Troy, NH · Pittsburg, NH · Lakes Region · Hoffman, NC</p>';
 m.innerHTML=h; document.body.appendChild(m);
 b.setAttribute('role','button'); b.setAttribute('aria-expanded','false');
 function open(e){if(e)e.preventDefault();m.classList.add('open');document.body.classList.add('mm-lock');b.setAttribute('aria-expanded','true');m.querySelector('.mm-x').focus()}
 function close(){m.classList.remove('open');document.body.classList.remove('mm-lock');b.setAttribute('aria-expanded','false')}
 b.addEventListener('click',open);
 m.querySelector('.mm-x').addEventListener('click',close);
 m.addEventListener('click',function(e){if(e.target.closest('nav a,.mm-cta a'))close()});
 document.addEventListener('keydown',function(e){if(e.key==='Escape')close()});
})();

/* Nov 15, 2026 polish: preview forms work (they open a pre-filled email to Adam).
   On the live Wix site these are replaced by the Wix forms. */
(function(){
 document.querySelectorAll('form').forEach(function(f){
  f.querySelectorAll('.chips').forEach(function(c){
   var multi=c.hasAttribute('data-multi');
   c.querySelectorAll('span').forEach(function(s){
    s.setAttribute('role',multi?'checkbox':'radio'); s.setAttribute('tabindex','0'); s.setAttribute('aria-checked',s.classList.contains('on')?'true':'false');
    function pick(){ if(multi){s.classList.toggle('on')} else {c.querySelectorAll('span').forEach(function(o){o.classList.remove('on');o.setAttribute('aria-checked','false')});s.classList.add('on')} s.setAttribute('aria-checked',s.classList.contains('on')?'true':'false') }
    s.addEventListener('click',pick); s.addEventListener('keydown',function(e){if(e.key===' '||e.key==='Enter'){e.preventDefault();pick()}});
   });
  });
  f.addEventListener('submit',function(e){
   e.preventDefault();
   if(!f.reportValidity()) return;
   var lines=[];
   f.querySelectorAll('.fld').forEach(function(d){var l=d.querySelector('label'),i=d.querySelector('input,textarea,select'); if(l&&i&&i.value) lines.push(l.textContent.replace('*','').trim()+': '+i.value)});
   f.querySelectorAll('.chips').forEach(function(c){var lb=c.previousElementSibling; var on=[].map.call(c.querySelectorAll('span.on'),function(s){return s.textContent.trim()}); if(on.length) lines.push((lb&&lb.textContent?lb.textContent.replace('*','').trim():'Interested in')+': '+on.join(', '))});
   var subj=f.getAttribute('data-subject')||'Website inquiry';
   location.href='mailto:guide@westhilloutfitters.com?subject='+encodeURIComponent(subj)+'&body='+encodeURIComponent(lines.join('\n')+'\n\nSent from the Cee Dee Outdoors website');
   f.classList.add('was-sent');
  });
 });
})();
