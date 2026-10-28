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

  /* GitHub Pages is static, so the form creates an email draft instead of pretending to submit to a server. */
  const FORM_RECIPIENT = 'contact@sunkinggroup.org';
  const form = document.querySelector('#contact-form');
  if(form){
    const status = document.querySelector('#form-status');
    form.addEventListener('submit',function(event){
      event.preventDefault();
      if(!form.reportValidity()) return;
      const data = new FormData(form);
      // Honeypot: silently stop bot-filled submissions.
      if(String(data.get('website') || '').trim()){
        if(status){status.classList.add('error');status.textContent='Unable to prepare this enquiry. Please reload the page and try again.';}
        return;
      }
      const name = String(data.get('name') || '').trim();
      const email = String(data.get('email') || '').trim();
      const phone = String(data.get('phone') || '').trim();
      const interest = String(data.get('interest') || 'General enquiry').trim();
      const message = String(data.get('message') || '').trim();
      const subject = encodeURIComponent('SUNKING GROUP enquiry: ' + interest);
      const body = encodeURIComponent(
        'Hello SUNKING GROUP,\n\n' +
        'Name: ' + name + '\n' +
        'Email: ' + email + '\n' +
        'Phone: ' + (phone || 'Not provided') + '\n' +
        'Area of interest: ' + interest + '\n\n' +
        'Message:\n' + message + '\n\n' +
        'Sent from https://sunkinggroup.org/contact/.'
      );
      if(status){
        status.classList.remove('error');
        status.textContent='Opening your email application. Review the draft and press Send to deliver it. If it does not open, email contact@sunkinggroup.org directly.';
      }
      window.location.href = 'mailto:' + FORM_RECIPIENT + '?subject=' + subject + '&body=' + body;
    });
  }
})();
