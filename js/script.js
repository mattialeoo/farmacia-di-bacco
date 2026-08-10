(function () {
  var burger = document.getElementById('burger');
  var navPanel = document.getElementById('navPanel');

  if (burger && navPanel) {
    burger.addEventListener('click', function () {
      var isOpen = navPanel.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    navPanel.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navPanel.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  var dropdowns = document.querySelectorAll('.has-dropdown');
  if (dropdowns.length) {
    dropdowns.forEach(function (item) {
      var toggle = item.querySelector('.dropdown-toggle');
      if (!toggle) return;
      toggle.addEventListener('click', function (e) {
        e.stopPropagation();
        var willOpen = !item.classList.contains('is-open');
        dropdowns.forEach(function (other) {
          other.classList.remove('is-open');
          var otherToggle = other.querySelector('.dropdown-toggle');
          if (otherToggle) otherToggle.setAttribute('aria-expanded', 'false');
        });
        if (willOpen) {
          item.classList.add('is-open');
          toggle.setAttribute('aria-expanded', 'true');
        }
      });
    });
    document.addEventListener('click', function () {
      dropdowns.forEach(function (item) {
        item.classList.remove('is-open');
        var toggle = item.querySelector('.dropdown-toggle');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
      });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        dropdowns.forEach(function (item) { item.classList.remove('is-open'); });
      }
    });
  }

  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    reveals.forEach(function (el) { observer.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
