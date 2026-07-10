/* Rivora Labz — shared page logic (no dependencies) */
(function () {
  'use strict';

  document.documentElement.classList.remove('no-js');

  /* Mobile menu */
  var toggle = document.querySelector('.menu-toggle');
  var menu = document.getElementById('mobileMenu');
  function setMenu(open) {
    if (!toggle || !menu) return;
    menu.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  }
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      setMenu(!menu.classList.contains('is-open'));
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setMenu(false);
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
  }

  /* Scroll reveal (skipped for reduced motion) */
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revealEls = document.querySelectorAll('.reveal');
  if (!reduceMotion && 'IntersectionObserver' in window && revealEls.length) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          ro.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
    revealEls.forEach(function (el) { ro.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* Product Engine: run animation only while visible */
  var engine = document.querySelector('.engine-wrap');
  if (engine && 'IntersectionObserver' in window) {
    var eo = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        engine.classList.toggle('is-visible', entry.isIntersecting);
      });
    }, { threshold: 0.2 });
    eo.observe(engine);
  }

  /* Generic tabs (screen sequence, player/operator modes) */
  document.querySelectorAll('[role="tablist"]').forEach(function (root) {
    var tabs = Array.prototype.slice.call(root.querySelectorAll('[role="tab"]'));
    function activate(tab, focus) {
      tabs.forEach(function (t) {
        var selected = t === tab;
        t.setAttribute('aria-selected', String(selected));
        t.tabIndex = selected ? 0 : -1;
        var panel = document.getElementById(t.getAttribute('aria-controls'));
        if (panel) panel.hidden = !selected;
      });
      if (focus) tab.focus();
    }
    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { activate(tab, false); });
      tab.addEventListener('keydown', function (e) {
        var dir = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 :
                  e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
        if (dir) {
          e.preventDefault();
          activate(tabs[(i + dir + tabs.length) % tabs.length], true);
        }
      });
    });
  });

  /* Contact form: validates, then composes an email (static hosting, no backend) */
  var form = document.getElementById('contactForm');
  if (form) {
    var statusEl = document.getElementById('formStatus');
    function fieldWrap(input) { return input.closest('.form-field'); }
    function setError(input, msg) {
      var wrap = fieldWrap(input);
      if (!wrap) return;
      wrap.classList.toggle('has-error', !!msg);
      input.setAttribute('aria-invalid', msg ? 'true' : 'false');
      var err = wrap.querySelector('.field-error');
      if (err && msg) err.textContent = msg;
    }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.elements.name;
      var email = form.elements.email;
      var desc = form.elements.description;
      var consent = form.elements.consent;
      var ok = true;

      if (!name.value.trim()) { setError(name, 'Please add your name.'); ok = false; } else setError(name, '');
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value.trim())) {
        setError(email, 'Please use a valid email address so we can reply.'); ok = false;
      } else setError(email, '');
      if (desc.value.trim().length < 20) {
        setError(desc, 'Tell us a little more, a couple of sentences is enough.'); ok = false;
      } else setError(desc, '');

      if (!consent.checked) {
        statusEl.textContent = 'Please confirm you are happy for us to reply by email.';
        statusEl.className = 'form-status err';
        ok = false;
      }
      if (!ok) {
        var firstBad = form.querySelector('[aria-invalid="true"]');
        if (firstBad) firstBad.focus();
        return;
      }

      var lines = [
        'Name: ' + name.value.trim(),
        'Email: ' + email.value.trim(),
        'Company: ' + (form.elements.company.value.trim() || 'n/a'),
        'Product stage: ' + form.elements.stage.value,
        'Engagement: ' + form.elements.engagement.value,
        'Timeline: ' + (form.elements.timeline.value || 'n/a'),
        'Budget range: ' + (form.elements.budget.value || 'n/a'),
        '',
        desc.value.trim()
      ];
      var subject = 'Product conversation: ' + name.value.trim();
      var href = 'mailto:hi@rivoralabz.com?subject=' + encodeURIComponent(subject) +
                 '&body=' + encodeURIComponent(lines.join('\n'));

      statusEl.textContent = 'Opening your email app with everything pre-filled. If nothing opens, write to hi@rivoralabz.com directly.';
      statusEl.className = 'form-status ok';
      window.location.href = href;
    });
  }

  /* Footer year */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
