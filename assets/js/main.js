(function () {
  'use strict';
  var BASE = 'https://mueen.onelink.me/5Kgh/8ng8j5ao';
  var body = document.body;
  var page = body.getAttribute('data-page') || 'home';
  var service = body.getAttribute('data-service') || 'all';
  var qs = new URLSearchParams(location.search);
  var gclid = qs.get('gclid'), term = qs.get('utm_term');
  var paid = !!(gclid || qs.get('gbraid') || qs.get('wbraid') || qs.get('utm_source') || qs.get('utm_campaign'));
  var c = page + (paid ? '' : '_organic');

  // device detection: iOS -> App Store badge, Android -> Google Play badge, desktop -> both + QR
  var ua = navigator.userAgent;
  var ios = /iPhone|iPad|iPod/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  var android = /Android/i.test(ua);
  document.documentElement.classList.add(ios ? 'is-ios' : android ? 'is-android' : 'is-desktop');

  // OneLink attribution: c=<page>[_organic], af_sub1=gclid, af_sub2=utm_term, af_sub3=button position
  var links = document.querySelectorAll('a[data-cta]');
  for (var i = 0; i < links.length; i++) {
    (function (a) {
      var p = new URLSearchParams();
      p.set('c', c);
      if (gclid) p.set('af_sub1', gclid);
      if (term) p.set('af_sub2', term);
      p.set('af_sub3', a.getAttribute('data-cta'));
      a.href = BASE + '?' + p.toString();
      a.addEventListener('click', function () {
        var store = a.getAttribute('data-store') || (ios ? 'ios' : android ? 'android' : '');
        var ev = store === 'ios' ? 'app_store_click' : store === 'android' ? 'play_store_click' : 'app_download_click';
        if (typeof window.gtag === 'function') {
          window.gtag('event', ev, { service: service, page: page, position: a.getAttribute('data-cta') });
        }
      });
    })(links[i]);
  }

  // hero slider
  var slider = document.querySelector('[data-slider]');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (slider && !reduce) {
    var slides = slider.querySelectorAll('.hs');
    var names = [];
    try { names = JSON.parse(slider.getAttribute('data-names') || '[]'); } catch (e) {}
    var idx = document.querySelector('.slide-idx'), nm = document.querySelector('.slide-name');
    var cur = 0;
    if (slides.length > 1) {
      setInterval(function () {
        slides[cur].classList.remove('on');
        cur = (cur + 1) % slides.length;
        var img = slides[cur].querySelector('img');
        if (img && img.loading === 'lazy') img.loading = 'eager';
        slides[cur].classList.add('on');
        if (idx) idx.textContent = '0' + (cur + 1);
        if (nm && names[cur]) nm.textContent = names[cur];
      }, 6000);
    }
  }

  // option tabs
  var groups = document.querySelectorAll('[data-tabs]');
  for (var g = 0; g < groups.length; g++) {
    (function (group) {
      var tabs = group.querySelectorAll('[role=tab]');
      for (var t = 0; t < tabs.length; t++) {
        tabs[t].addEventListener('click', function () {
          for (var k = 0; k < tabs.length; k++) {
            var on = tabs[k] === this;
            tabs[k].classList.toggle('on', on);
            tabs[k].setAttribute('aria-selected', on ? 'true' : 'false');
            var panel = document.getElementById(tabs[k].getAttribute('aria-controls'));
            if (panel) panel.hidden = !on;
          }
        });
      }
    })(groups[g]);
  }
})();
