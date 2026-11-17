(() => {
  'use strict';
  const menu = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#navigation');
  function closeMenu() { navigation.classList.remove('is-open'); menu.setAttribute('aria-expanded', 'false'); }
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    navigation.classList.toggle('is-open', open);
  });
  navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); } });
  document.querySelector('#year').textContent = new Date().getFullYear();
  const service = document.querySelector('#service');
  document.querySelectorAll('[data-service]').forEach(button => button.addEventListener('click', () => {
    service.value = button.dataset.service;
    document.querySelector('#contact').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    document.querySelector('[name="name"]').focus({ preventScroll: true });
  }));
  const dialog = document.querySelector('#privacy-dialog');
  document.querySelector('#privacy-open').addEventListener('click', () => dialog.showModal());
  document.querySelector('#privacy-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) { const box = dialog.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close(); } });
  const email = window.AVE_CONFIG?.contactEmail?.trim() || '';
  const emailEnabled = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (emailEnabled) {
    const direct = document.querySelector('#direct-email');
    direct.hidden = false; direct.textContent = email; direct.href = `mailto:${email}`;
    document.querySelector('#contact-description').textContent = 'Tell us what you have in mind. Prepare your enquiry below, or get in touch by email.';
    document.querySelector('#enquiry-submit').innerHTML = 'Prepare email enquiry <span aria-hidden="true">↗</span>';
    document.querySelector('#form-note').textContent = 'This form opens your email app with a prepared draft. Review it there and choose whether to send.';
  }
  document.querySelector('#enquiry-form').addEventListener('submit', event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const values = new FormData(form);
    const body = `Enquiry for Ave Consultancy Ltd\n\nName: ${String(values.get('name')).trim()}\nEmail: ${String(values.get('email')).trim()}\nOrganisation: ${String(values.get('organisation')).trim() || 'Not specified'}\nFocus area: ${values.get('service') || 'General enquiry'}\n\n${String(values.get('message')).trim()}\n`;
    const status = document.querySelector('#form-status');
    if (emailEnabled) {
      window.location.href = `mailto:${email}?subject=${encodeURIComponent('Ave Consultancy enquiry — ' + (values.get('service') || 'Let’s talk'))}&body=${encodeURIComponent(body)}`;
      status.textContent = 'Your email app has been requested. Review the draft there and send it when ready. If no app opens, use the email address shown above.';
    } else {
      const url = URL.createObjectURL(new Blob([body], { type: 'text/plain;charset=utf-8' }));
      const download = document.createElement('a'); download.href = url; download.download = 'ave-consultancy-enquiry.txt';
      document.body.appendChild(download); download.click(); download.remove();
      setTimeout(() => URL.revokeObjectURL(url), 10000);
      status.textContent = 'Your enquiry draft has been downloaded. No message has been sent. Keep the file ready for your first conversation.';
    }
  });
})();
