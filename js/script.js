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
