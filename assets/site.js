(function(){
  'use strict';
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#primary-navigation');
  function closeMenu(){
    if(!toggle || !nav) return;
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded','false');
    toggle.setAttribute('aria-label','Open navigation menu');
    toggle.innerHTML='<span aria-hidden="true">☰</span> Menu';
  }
  if(toggle && nav){
    toggle.addEventListener('click',function(){
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded',String(open));
      toggle.setAttribute('aria-label',open?'Close navigation menu':'Open navigation menu');
      toggle.innerHTML=open?'<span aria-hidden="true">✕</span> Close':'<span aria-hidden="true">☰</span> Menu';
    });
    nav.querySelectorAll('a').forEach(function(link){link.addEventListener('click',closeMenu);});
    document.addEventListener('keydown',function(event){if(event.key==='Escape') closeMenu();});
    document.addEventListener('click',function(event){if(nav.classList.contains('is-open')&&!nav.contains(event.target)&&!toggle.contains(event.target))closeMenu();});
  }
  const year = document.querySelector('[data-year]');
  if(year) year.textContent = String(new Date().getFullYear());

  /* Configure this to a real, approved HTTPS form endpoint before enabling online submissions. */
  const FORM_ENDPOINT = '';
  const form = document.querySelector('#contact-form');
  if(form){
    const status = document.querySelector('#form-status');
    const submit = form.querySelector('[type="submit"]');
    form.addEventListener('submit',async function(event){
      event.preventDefault();
      if(!form.reportValidity()) return;
      if(!FORM_ENDPOINT){
        if(status){
          status.classList.add('error');
          status.textContent='Online submission is not connected yet. The site administrator needs to configure the approved enquiry form service before messages can be sent.';
        }
        return;
      }
      if(submit){submit.disabled=true;submit.setAttribute('aria-busy','true');submit.textContent='Sending…';}
      if(status){status.classList.remove('error');status.textContent='Sending your enquiry…';}
      try{
        const response=await fetch(FORM_ENDPOINT,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}});
        if(!response.ok) throw new Error('Form endpoint returned '+response.status);
        form.reset();
        if(status) status.textContent='Thank you. Your enquiry has been submitted.';
      }catch(error){
        if(status){status.classList.add('error');status.textContent='We could not submit your enquiry. Please try again later or contact the group through its approved contact channel.';}
      }finally{
        if(submit){submit.disabled=false;submit.removeAttribute('aria-busy');submit.innerHTML='Send enquiry <span aria-hidden="true">→</span>';}
      }
    });
  }
})();
