(function () {
  var tabs = document.querySelectorAll('.filter-tab');
  var cards = document.querySelectorAll('.product-card');
  if (!tabs.length || !cards.length) return;

  function applyFilter(filter) {
    tabs.forEach(function (t) {
      t.classList.toggle('is-active', t.getAttribute('data-filter') === filter);
    });
    cards.forEach(function (card) {
      var match = filter === 'tutti' || card.getAttribute('data-category') === filter;
      card.classList.toggle('is-hidden', !match);
    });
  }

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      applyFilter(tab.getAttribute('data-filter'));
    });
  });

  var validFilters = Array.prototype.map.call(tabs, function (t) {
    return t.getAttribute('data-filter');
  });
  var requested = new URLSearchParams(window.location.search).get('cat');
  if (requested && validFilters.indexOf(requested) !== -1) {
    applyFilter(requested);
  }
})();
