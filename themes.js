// ============================================
// THEMES.JS v3 - Auto-construction du sélecteur
// ============================================

const THEMES = {
    'orange': {
        name: 'Orange',
        colors: {
            bg: '#F7F7FA', card: '#FFFFFF', text: '#1A1A2E', textSecondary: '#6B7280', textMuted: '#9CA3AF',
            primary: '#FF6B35', primaryLight: '#FFF0E8', primaryHover: '#E85D2C', primaryRGB: '255,107,53',
            gradient: 'linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%)',
            accent: '#FF8C42', border: '#E8E8EE', borderHover: '#FFD5C0',
            success: '#10B981', warning: '#F59E0B', danger: '#EF4444',
        }
    },
    'blue': {
        name: 'Blue',
        colors: {
            bg: '#F5F7FB', card: '#FFFFFF', text: '#1A1A2E', textSecondary: '#6B7280', textMuted: '#9CA3AF',
            primary: '#2563EB', primaryLight: '#E8F0FF', primaryHover: '#1D4ED8', primaryRGB: '37,99,235',
            gradient: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)',
            accent: '#60A5FA', border: '#E0E7F0', borderHover: '#BFDBFE',
            success: '#10B981', warning: '#F59E0B', danger: '#EF4444',
        }
    },
    'purple': {
        name: 'Violet',
        colors: {
            bg: '#F8F7FB', card: '#FFFFFF', text: '#1A1A2E', textSecondary: '#6B7280', textMuted: '#9CA3AF',
            primary: '#7C3AED', primaryLight: '#F3EEFF', primaryHover: '#6D28D9', primaryRGB: '124,58,237',
            gradient: 'linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%)',
            accent: '#A78BFA', border: '#E8E4F0', borderHover: '#DDD6FE',
            success: '#10B981', warning: '#F59E0B', danger: '#EF4444',
        }
    },
    'green': {
        name: 'Vert',
        colors: {
            bg: '#F5F9F7', card: '#FFFFFF', text: '#1A1A2E', textSecondary: '#6B7280', textMuted: '#9CA3AF',
            primary: '#059669', primaryLight: '#E8FFF4', primaryHover: '#047857', primaryRGB: '5,150,105',
            gradient: 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
            accent: '#34D399', border: '#E0EDE6', borderHover: '#A7F3D0',
            success: '#10B981', warning: '#F59E0B', danger: '#EF4444',
        }
    },
    'red': {
        name: 'Rouge',
        colors: {
            bg: '#FDF5F5', card: '#FFFFFF', text: '#1A1A2E', textSecondary: '#6B7280', textMuted: '#9CA3AF',
            primary: '#DC2626', primaryLight: '#FEE2E2', primaryHover: '#B91C1C', primaryRGB: '220,38,38',
            gradient: 'linear-gradient(135deg, #DC2626 0%, #EF4444 100%)',
            accent: '#F87171', border: '#F0E0E0', borderHover: '#FECACA',
            success: '#10B981', warning: '#F59E0B', danger: '#EF4444',
        }
    },
    'cyber': {
        name: 'Cyber',
        colors: {
            bg: '#F5FAF8', card: '#FFFFFF', text: '#1A1A2E', textSecondary: '#6B7280', textMuted: '#9CA3AF',
            primary: '#00E676', primaryLight: '#E8FFF0', primaryHover: '#00C853', primaryRGB: '0,230,118',
            gradient: 'linear-gradient(135deg, #00E676 0%, #00D4FF 100%)',
            accent: '#00D4FF', border: '#E0F0EA', borderHover: '#69F0AE',
            success: '#10B981', warning: '#F59E0B', danger: '#EF4444',
        }
    },
    'dark-charcoal': {
        name: 'Charcoal',
        colors: {
            bg: '#1A1A1A', card: '#242424', text: '#E0E0E0', textSecondary: '#B0B0B0', textMuted: '#888888',
            primary: '#FF8C42', primaryLight: '#3A2A1A', primaryHover: '#FF9F5C', primaryRGB: '255,140,66',
            gradient: 'linear-gradient(135deg, #FF8C42 0%, #FF6B35 100%)',
            accent: '#FF6B35', border: '#3A3A3A', borderHover: '#555555',
            success: '#34D399', warning: '#FBBF24', danger: '#F87171',
        }
    },
    'dark-navy': {
        name: 'Navy',
        colors: {
            bg: '#0A0E1A', card: '#151A2D', text: '#D0D8E8', textSecondary: '#9AABBF', textMuted: '#6A7A90',
            primary: '#6AB4FF', primaryLight: '#1A2A40', primaryHover: '#89C4FF', primaryRGB: '106,180,255',
            gradient: 'linear-gradient(135deg, #6AB4FF 0%, #4A9EFF 100%)',
            accent: '#4A9EFF', border: '#1E2A40', borderHover: '#2E3A50',
            success: '#34D399', warning: '#FBBF24', danger: '#F87171',
        }
    },
    'dark-olive': {
        name: 'Olive',
        colors: {
            bg: '#1A1E1A', card: '#242824', text: '#D8E0D0', textSecondary: '#A0B090', textMuted: '#707A60',
            primary: '#A0B880', primaryLight: '#2A3020', primaryHover: '#B0C890', primaryRGB: '160,184,128',
            gradient: 'linear-gradient(135deg, #A0B880 0%, #8B9E6B 100%)',
            accent: '#8B9E6B', border: '#2A302A', borderHover: '#3A403A',
            success: '#34D399', warning: '#FBBF24', danger: '#F87171',
        }
    },
    'dark-plum': {
        name: 'Plum',
        colors: {
            bg: '#1A141E', card: '#241C28', text: '#E0D8E8', textSecondary: '#B0A0C0', textMuted: '#807090',
            primary: '#B890D8', primaryLight: '#2A1A30', primaryHover: '#C8A0E8', primaryRGB: '184,144,216',
            gradient: 'linear-gradient(135deg, #B890D8 0%, #A078C8 100%)',
            accent: '#A078C8', border: '#2A1E30', borderHover: '#3A2E40',
            success: '#34D399', warning: '#FBBF24', danger: '#F87171',
        }
    },
    'dark-midnight': {
        name: 'Midnight',
        colors: {
            bg: '#0D1117', card: '#161B22', text: '#C9D1D9', textSecondary: '#9AA8B9', textMuted: '#6A7689',
            primary: '#79C0FF', primaryLight: '#1A2835', primaryHover: '#99D0FF', primaryRGB: '121,192,255',
            gradient: 'linear-gradient(135deg, #79C0FF 0%, #58A6FF 100%)',
            accent: '#58A6FF', border: '#30363D', borderHover: '#484F58',
            success: '#34D399', warning: '#FBBF24', danger: '#F87171',
        }
    },
    'dark-coffee': {
        name: 'Coffee',
        colors: {
            bg: '#1E1A18', card: '#282420', text: '#E8DCC8', textSecondary: '#C0B090', textMuted: '#907860',
            primary: '#D8A880', primaryLight: '#302820', primaryHover: '#E8B890', primaryRGB: '216,168,128',
            gradient: 'linear-gradient(135deg, #D8A880 0%, #C8956C 100%)',
            accent: '#C8956C', border: '#302820', borderHover: '#403830',
            success: '#34D399', warning: '#FBBF24', danger: '#F87171',
        }
    },
};

// ========== FONCTIONS PRINCIPALES ==========
function applyTheme(name) {
    const theme = THEMES[name] || THEMES['orange'];
    const root = document.documentElement;

    Object.entries(theme.colors).forEach(([key, value]) => {
        root.style.setProperty('--' + key, value);
    });

    document.body.style.backgroundColor = theme.colors.bg;
    document.body.style.color = theme.colors.text;

    document.querySelectorAll('.card, .folder-card, .stat-card, .widget, .quiz-card, .config-card, .result-card, .modal, .sidebar, .kanban-column, .add-form, .exam-container').forEach(el => {
        if (el) { el.style.backgroundColor = theme.colors.card; el.style.borderColor = theme.colors.border; el.style.color = theme.colors.text; }
    });

    document.querySelectorAll('input, select, textarea, .search-input, .note-input, .budget-input-mini, .sleep-input').forEach(el => {
        if (el) { el.style.backgroundColor = theme.colors.bg; el.style.borderColor = theme.colors.border; el.style.color = theme.colors.text; }
    });

    localStorage.setItem('selectedTheme', name);
    updateThemeSelector(name);
    window.dispatchEvent(new CustomEvent('themeChanged', { detail: theme.colors }));
}

function loadTheme() {
    const saved = localStorage.getItem('selectedTheme') || 'orange';
    applyTheme(saved);
}

function updateThemeSelector(name) {
    document.querySelectorAll('.theme-option').forEach(btn => {
        if (btn.dataset.theme === name) btn.classList.add('active');
        else btn.classList.remove('active');
    });
}

// ========== AUTO-CONSTRUCTION DU SÉLECTEUR ==========
function buildThemeSelector() {
    const themeGrid = document.getElementById('themeGrid');
    if (!themeGrid) return;

    themeGrid.innerHTML = '';
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
            applyTheme(key);
            const menu = document.getElementById('themeMenu');
            if (menu) menu.classList.remove('active');
        });
        themeGrid.appendChild(btn);
    });
}

// ========== GESTION DU MENU ==========
function setupThemeMenu() {
    const toggleBtn = document.getElementById('themeToggle');
    const menu = document.getElementById('themeMenu');
    if (!toggleBtn || !menu) return;

    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        menu.classList.toggle('active');
    });

    document.addEventListener('click', () => {
        menu.classList.remove('active');
    });
}

// ========== INITIALISATION ==========
function initThemes() {
    buildThemeSelector();
    setupThemeMenu();
    loadTheme();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemes);
} else {
    initThemes();
}

window.applyTheme = applyTheme;
window.THEMES = THEMES;