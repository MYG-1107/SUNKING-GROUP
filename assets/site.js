(function(){
  'use strict';
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#primary-navigation');
  function closeMenu(restoreFocus){
    if(!toggle || !nav) return;
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded','false');
    toggle.setAttribute('aria-label','Open navigation menu');
    toggle.innerHTML='<span aria-hidden="true">☰</span><span class="menu-toggle-label">Menu</span>';
    if(restoreFocus) toggle.focus();
  }
  if(toggle && nav){
    toggle.addEventListener('click',function(){
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded',String(open));
      toggle.setAttribute('aria-label',open?'Close navigation menu':'Open navigation menu');
      toggle.innerHTML=open?'<span aria-hidden="true">✕</span><span class="menu-toggle-label">Close</span>':'<span aria-hidden="true">☰</span><span class="menu-toggle-label">Menu</span>';
      if(open){
        const firstLink=nav.querySelector('a');
        if(firstLink && window.matchMedia('(max-width: 1080px)').matches) firstLink.focus();
      }
    });
    nav.querySelectorAll('a').forEach(function(link){link.addEventListener('click',function(){closeMenu(false);});});
    document.addEventListener('keydown',function(event){if(event.key==='Escape'&&nav.classList.contains('is-open')) closeMenu(true);});
    document.addEventListener('click',function(event){if(nav.classList.contains('is-open')&&!nav.contains(event.target)&&!toggle.contains(event.target)) closeMenu(false);});
  }
  const year=document.querySelector('[data-year]');
  if(year) year.textContent=String(new Date().getFullYear());

  // Contextual links preselect the enquiry category and request type.
  const params=new URLSearchParams(window.location.search);
  const form=document.querySelector('#contact-form');
  if(form){
    const interest=form.querySelector('#interest');
    const requestType=form.querySelector('#request-type');
    const messageField=form.querySelector('#message');
    const status=document.querySelector('#form-status');
    const interestParam=params.get('interest');
    const intent=params.get('intent')||'';
    const intentLabels={
      registration:'Programme registration enquiry',
      consultation:'Consultation request',
      training:'Training programme enquiry',
      research:'Research discussion',
      story:'Share a learner or client story',
      article:'Suggest an article topic'
    };
    if(interest&&interestParam){
      const match=Array.from(interest.options).find(function(option){
        return option.text.trim().toLowerCase()===interestParam.trim().toLowerCase();
      });
      if(match) interest.value=match.value;
    }
    if(requestType&&intentLabels[intent]) requestType.value=intentLabels[intent];
    if(messageField&&intent==='consultation') messageField.placeholder='Briefly describe the decision or challenge you would like to discuss and the best way to contact you.';
    if(messageField&&intent==='registration') messageField.placeholder='Tell us the programme you are interested in, your previous qualification and preferred study format.';
    if(status&&intent==='consultation') status.textContent='This is a consultation request, not a confirmed appointment. The team can reply to arrange a suitable time.';

    form.addEventListener('submit',function(event){
      event.preventDefault();
      if(!form.reportValidity()) return;
      const data=new FormData(form);
      if(String(data.get('website')||'').trim()){
        if(status){status.classList.add('error');status.textContent='Unable to prepare this enquiry. Please reload the page and try again.';}
        return;
      }
      const name=String(data.get('name')||'').trim();
      const email=String(data.get('email')||'').trim();
      const phone=String(data.get('phone')||'').trim();
      const interestValue=String(data.get('interest')||'General enquiry').trim();
      const request=String(data.get('request_type')||'General information').trim();
      const message=String(data.get('message')||'').trim();
      const subject=encodeURIComponent('SUNKING GROUP enquiry: '+request+' — '+interestValue);
      const body=encodeURIComponent(
        'Hello SUNKING GROUP,\n\n'+
        'Name: '+name+'\n'+
        'Email: '+email+'\n'+
        'Phone: '+(phone||'Not provided')+'\n'+
        'Area of interest: '+interestValue+'\n'+
        'Request type: '+request+'\n\n'+
        'Message:\n'+message+'\n\n'+
        'Sent from https://sunkinggroup.org/contact/.'
      );
      if(status){
        status.classList.remove('error');
        status.textContent='Opening your email application. Review the draft and press Send to deliver it. If it does not open, email contact@sunkinggroup.org directly.';
      }
      window.location.href='mailto:contact@sunkinggroup.org?subject='+subject+'&body='+body;
    });
  }
})();
