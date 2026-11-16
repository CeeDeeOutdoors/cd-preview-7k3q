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
