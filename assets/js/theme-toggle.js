(function () {
  var STORAGE_KEY = 'site-theme';

  function syncBackToTop() {
    var el = document.querySelector('.back-to-top');
    if (!el) return;
    var dark = document.documentElement.getAttribute('data-theme') === 'dark';
    el.style.backgroundColor = dark ? '#4a3d38' : '#5c4a42';
    el.style.color = dark ? '#EFEBCE' : '#fffef7';
  }

  function syncMetaTheme() {
    var m = document.querySelector('meta[name="theme-color"]');
    if (!m) return;
    var dark = document.documentElement.getAttribute('data-theme') === 'dark';
    m.setAttribute('content', dark ? '#2A2622' : '#fffef7');
  }

  function applyTheme(theme) {
    if (theme !== 'light' && theme !== 'dark') theme = 'light';
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {}
    syncMetaTheme();
    syncBackToTop();
  }

  function init() {
    var btn = document.getElementById('themeToggle');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      btn.setAttribute('aria-pressed', next === 'dark' ? 'true' : 'false');
    });
    var current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    btn.setAttribute('aria-pressed', current === 'dark' ? 'true' : 'false');
    syncMetaTheme();
    syncBackToTop();
    window.addEventListener('load', function () {
      syncBackToTop();
      var n = 0;
      var id = window.setInterval(function () {
        syncBackToTop();
        n += 1;
        if (n > 20) window.clearInterval(id);
      }, 250);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
