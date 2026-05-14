// =====================================================
// XP SYSTEM - Version unifiée pour CalculEtudiant
// =====================================================

(function() {
    // ---------- CONFIGURATION ----------
    const LEVELS = [
        { min: 0, name: '🌟 Débutant' },
        { min: 100, name: '📚 Apprenti' },
        { min: 300, name: '🎓 Étudiant' },
        { min: 600, name: '💪 Acharné' },
        { min: 1000, name: '🧠 Expert' },
        { min: 1500, name: '🏆 Master' },
        { min: 2000, name: '👑 Légende' }
    ];

    const ACTION_XP = {
        'create-fiche': 5,
        'complete-quiz': 20,
        'complete-objectif': 30,
        'pomodoro-session': 10,
        'add-candidature': 15,
        'submit-exam': 20,
        'use-calculator': 5,
        'daily-streak': 5,
        'badge-unlocked': 50
    };

    const BADGES = [
        { id: 'badge-fiches',  label: '📝 50 fiches',   condition: () => (getCounter('fiches-count') || 0) >= 50 },
        { id: 'badge-quiz',    label: '🧠 20 quiz',     condition: () => (getCounter('quiz-count') || 0) >= 20 },
        { id: 'badge-pomodoro',label: '🍅 50 sessions', condition: () => (getCounter('pomodoro-count') || 0) >= 50 },
        { id: 'badge-objectifs',label: '🎯 30 objectifs',condition: () => (getCounter('objectifs-count') || 0) >= 30 },
        { id: 'badge-streak',  label: '🔥 7 jours',     condition: () => (getStreak() >= 7) }
    ];

    // ---------- STOCKAGE ----------
    function getXP() {
        return parseInt(localStorage.getItem('xp-global') || '0');
    }

    function setXP(xp) {
        localStorage.setItem('xp-global', xp.toString());
    }

    function getLevel(xp = null) {
        const currentXP = (xp !== null) ? xp : getXP();
        for (let i = LEVELS.length - 1; i >= 0; i--) {
            if (currentXP >= LEVELS[i].min) return LEVELS[i];
        }
        return LEVELS[0];
    }

    function getNextLevel(xp = null) {
        const currentXP = (xp !== null) ? xp : getXP();
        for (let i = 0; i < LEVELS.length; i++) {
            if (currentXP < LEVELS[i].min) return LEVELS[i];
        }
        return null;
    }

    function getProgressPercent() {
        const xp = getXP();
        const currentLevel = getLevel(xp);
        const nextLevel = getNextLevel(xp);
        if (!nextLevel) return 100;
        const xpInLevel = xp - currentLevel.min;
        const needed = nextLevel.min - currentLevel.min;
        return Math.min(100, Math.floor((xpInLevel / needed) * 100));
    }

    // ---------- XP ACTIONS ----------
    function addXP(points, action = null) {
        if (!points || points <= 0) return;
        const oldXP = getXP();
        let newXP = oldXP + points;
        setXP(newXP);
        console.log(`✨ +${points} XP (${action || 'action'}) → Total: ${newXP}`);

        // Vérifier niveau
        const oldLevel = getLevel(oldXP);
        const newLevel = getLevel(newXP);
        if (newLevel.min > oldLevel.min) {
            showLevelUpNotification(newLevel.name);
        }

        // Déclencher événement
        window.dispatchEvent(new CustomEvent('xpUpdated', { detail: { xp: newXP, points: points, level: newLevel.name } }));
        updateUI();
    }

    // ---------- COMPTEURS (pour badges) ----------
    function incrementCounter(counterName) {
        let val = parseInt(localStorage.getItem(counterName) || '0');
        val++;
        localStorage.setItem(counterName, val.toString());
        checkBadges();
        return val;
    }

    function getCounter(counterName) {
        return parseInt(localStorage.getItem(counterName) || '0');
    }

    // ---------- STREAK ----------
    function updateStreak() {
        const today = new Date().toDateString();
        const last = localStorage.getItem('xp-last-visit');
        let streak = parseInt(localStorage.getItem('xp-streak') || '0');

        if (last !== today) {
            const yesterday = new Date(Date.now() - 86400000).toDateString();
            if (last === yesterday) {
                streak++;
                addXP(ACTION_XP['daily-streak'], 'daily-streak');
            } else {
                streak = 1;
            }
            localStorage.setItem('xp-streak', streak.toString());
            localStorage.setItem('xp-last-visit', today);
            window.dispatchEvent(new CustomEvent('streakUpdated', { detail: { streak } }));
            checkBadges();
        }
        return streak;
    }

    function getStreak() {
        return parseInt(localStorage.getItem('xp-streak') || '0');
    }

    // ---------- BADGES ----------
    function checkBadges() {
        const unlocked = JSON.parse(localStorage.getItem('xp-badges') || '[]');
        let changed = false;
        BADGES.forEach(badge => {
            if (!unlocked.includes(badge.id) && badge.condition()) {
                unlocked.push(badge.id);
                changed = true;
                addXP(ACTION_XP['badge-unlocked'], `badge-${badge.id}`);
                showBadgeNotification(badge.label);
            }
        });
        if (changed) {
            localStorage.setItem('xp-badges', JSON.stringify(unlocked));
            updateUI();
        }
    }

    function hasBadge(badgeId) {
        const unlocked = JSON.parse(localStorage.getItem('xp-badges') || '[]');
        return unlocked.includes(badgeId);
    }

    // ---------- NOTIFICATIONS ----------
    function showLevelUpNotification(levelName) {
        const notif = document.createElement('div');
        notif.className = 'xp-notification level-up';
        notif.innerHTML = `
            <div style="position:fixed; top:80px; right:20px; background:var(--gradient); color:#FFF; padding:1rem 2rem; border-radius:50px; font-weight:bold; z-index:1000; animation: fadeInOut 3s forwards;">
                🎉 Niveau ${levelName} atteint !
            </div>
            <style>
                @keyframes fadeInOut {
                    0% { opacity:0; transform:translateX(100px); }
                    10% { opacity:1; transform:translateX(0); }
                    90% { opacity:1; transform:translateX(0); }
                    100% { opacity:0; transform:translateX(100px); display:none; }
                }
            </style>
        `;
        document.body.appendChild(notif);
        setTimeout(() => notif.remove(), 3000);
    }

    function showBadgeNotification(badgeLabel) {
        const notif = document.createElement('div');
        notif.className = 'xp-notification badge-unlock';
        notif.innerHTML = `
            <div style="position:fixed; top:80px; right:20px; background:linear-gradient(135deg,#FFD23F,#FF9F1C); color:#000; padding:0.8rem 1.5rem; border-radius:50px; font-weight:bold; z-index:1000; animation: fadeInOut 3s forwards;">
                🏆 Badge débloqué : ${badgeLabel} (+50 XP)
            </div>
            <style>@keyframes fadeInOut { 0% { opacity:0; transform:translateX(100px); } 10% { opacity:1; transform:translateX(0); } 90% { opacity:1; transform:translateX(0); } 100% { opacity:0; transform:translateX(100px); display:none; } }</style>
        `;
        document.body.appendChild(notif);
        setTimeout(() => notif.remove(), 3000);
    }

    // ---------- MISE À JOUR DE L'INTERFACE ----------
    function updateUI() {
        const xp = getXP();
        const level = getLevel(xp);
        const progress = getProgressPercent();
        const streak = getStreak();

        const levelEl = document.getElementById('xp-level');
        const fillEl = document.getElementById('xp-fill');
        const textEl = document.getElementById('xp-text');
        const streakEl = document.getElementById('xp-streak');
        const xpTotalStat = document.getElementById('stat-xp-total');

        if (levelEl) levelEl.textContent = level.name;
        if (fillEl) fillEl.style.width = progress + '%';
        if (textEl) {
            const next = getNextLevel(xp);
            if (next) textEl.textContent = `${xp} / ${next.min} XP`;
            else textEl.textContent = `${xp} XP (Max)`;
        }
        if (streakEl) streakEl.textContent = `🔥 ${streak}`;
        if (xpTotalStat) xpTotalStat.textContent = `⭐ ${xp}`;

        // Mettre à jour les icônes de badges
        BADGES.forEach(badge => {
            const el = document.getElementById(badge.id);
            if (el) {
                el.classList.toggle('unlocked', hasBadge(badge.id));
            }
        });
    }

    // ---------- INITIALISATION ----------
    function init() {
        updateStreak();
        updateUI();
        setInterval(() => updateStreak(), 3600000);
        window.addEventListener('xpUpdated', () => updateUI());
        window.addEventListener('streakUpdated', () => updateUI());
        checkBadges();
    }

    // ---------- EXPOSER LES FONCTIONS ----------
    window.XPSystem = {
        getXP, addXP, getLevel, getNextLevel, getProgressPercent,
        incrementCounter, getCounter, updateStreak, getStreak,
        checkBadges, hasBadge
    };
    window.addXP = addXP;
    window.getXP = getXP;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();