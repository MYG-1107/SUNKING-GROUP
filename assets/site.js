(function(){
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function(){
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
      toggle.innerHTML = open ? '<span aria-hidden="true">✕</span> Close' : '<span aria-hidden="true">☰</span> Menu';
    });
    nav.querySelectorAll('a').forEach(function(link){ link.addEventListener('click', function(){ nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded','false'); toggle.setAttribute('aria-label','Open navigation menu'); toggle.innerHTML='<span aria-hidden="true">☰</span> Menu'; }); });
    document.addEventListener('keydown', function(e){ if(e.key==='Escape'){ nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded','false'); toggle.setAttribute('aria-label','Open navigation menu'); toggle.innerHTML='<span aria-hidden="true">☰</span> Menu'; } });
  }
  document.querySelectorAll('[data-year]').forEach(function(el){ el.textContent = String(new Date().getFullYear()); });
  const form = document.querySelector('#contact-form');
  if(form){
    const interestSelect = form.querySelector('select[name="interest"]');
    if (interestSelect) {
      const requestedInterest = new URLSearchParams(window.location.search).get('interest');
      if (requestedInterest && Array.from(interestSelect.options).some(function(option){ return option.value === requestedInterest || option.textContent === requestedInterest; })) {
        interestSelect.value = requestedInterest;
      }
    }
    form.addEventListener('submit', function(e){
      e.preventDefault();
      if(!form.reportValidity()) return;
      const data = new FormData(form);
      const name = String(data.get('name')||'').trim();
      const email = String(data.get('email')||'').trim();
      const phone = String(data.get('phone')||'').trim();
      const interest = String(data.get('interest')||'General enquiry').trim();
      const message = String(data.get('message')||'').trim();
      const subject = encodeURIComponent('Website enquiry: ' + interest);
      const body = encodeURIComponent('Hello SUNKING GROUP,\n\nName: '+name+'\nEmail: '+email+'\nPhone: '+phone+'\nInterest: '+interest+'\n\nMessage:\n'+message+'\n\nSent from sunkinggroup.org.');
      const status = document.querySelector('#form-status');
      if(status) status.textContent = 'Opening your email application with the enquiry drafted. Please review and send the email to complete the enquiry.';
      window.location.href = 'mailto:sunking.group@sunking-institute.com?subject='+subject+'&body='+body;
    });
  }
})();
