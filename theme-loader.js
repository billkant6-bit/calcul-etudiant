// theme-loader.js – Version renforcée avec correction du body
(function() {
  function initThemeMenu() {
    // Ajouter les boutons de thème
    document.querySelectorAll('.theme-grid').forEach(grid => {
      if (!grid.id) grid.id = 'themeGrid';
      if (grid.children.length === 0 && typeof THEMES !== 'undefined') {
        Object.keys(THEMES).forEach(key => {
          const theme = THEMES[key];
          const btn = document.createElement('button');
          btn.className = 'theme-option';
          btn.dataset.theme = key;
          btn.innerHTML = `
            <div class="theme-colors">
              <div class="theme-color-swatch" style="background:${theme.colors.primary}"></div>
              <div class="theme-color-swatch" style="background:${theme.colors.accent || theme.colors.primaryLight}"></div>
            </div>
            <span>${theme.name}</span>
          `;
          btn.addEventListener('click', () => {
            if (typeof applyTheme === 'function') applyTheme(key);
            fixBodyBackground(key);
            const menu = document.getElementById('themeMenu');
            if (menu) menu.classList.remove('active');
          });
          grid.appendChild(btn);
        });
      }
    });

    // Appliquer le thème sauvegardé au chargement
    if (typeof applyTheme === 'function') {
      const saved = localStorage.getItem('selectedTheme') || 'orange';
      applyTheme(saved);
      fixBodyBackground(saved);
    }
  }

  function fixBodyBackground(themeName) {
    // Si le body a un background-image (gradient), on le remplace par la couleur du thème
    // pour éviter que le dégradé fixe ne bloque le changement de fond.
    const bodyStyle = window.getComputedStyle(document.body);
    if (bodyStyle.backgroundImage && bodyStyle.backgroundImage !== 'none') {
      const theme = THEMES[themeName] || THEMES['orange'];
      document.body.style.background = theme.colors.bg;
      document.body.style.backgroundImage = 'none';
      // Petit délai pour être sûr que le style est appliqué
      setTimeout(() => {
        document.body.style.background = theme.colors.bg;
        document.body.style.backgroundImage = 'none';
      }, 100);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemeMenu);
  } else {
    initThemeMenu();
  }
})();