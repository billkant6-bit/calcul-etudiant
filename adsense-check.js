// Détection de bloqueur de pub + message de soutien
(function() {
    // Vérifier si on a déjà affiché le message récemment
    const lastMessage = localStorage.getItem('adsense-message-closed');
    if (lastMessage && Date.now() - parseInt(lastMessage) < 7 * 24 * 60 * 60 * 1000) {
        return; // Pas de message pendant 7 jours
    }

    // Test de détection de bloqueur
    let adBlocked = false;
    
    // Méthode 1 : Tester si un faux script de pub est bloqué
    const testAd = document.createElement('script');
    testAd.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
    testAd.onerror = function() {
        adBlocked = true;
        showSupportMessage();
    };
    testAd.onload = function() {
        // Si le script se charge, vérifie quand même si adsbygoogle est bloqué
        setTimeout(function() {
            if (typeof window.adsbygoogle === 'undefined' || window.adsbygoogle.loaded === false) {
                adBlocked = true;
                showSupportMessage();
            }
        }, 2000);
    };
    document.head.appendChild(testAd);
    
    // Méthode 2 : Vérifier via une requête fetch
    fetch('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js', {
        method: 'HEAD',
        mode: 'no-cors',
    }).catch(function() {
        if (!adBlocked) {
            adBlocked = true;
            showSupportMessage();
        }
    });

    function showSupportMessage() {
        const banner = document.createElement('div');
        banner.id = 'support-banner';
        banner.innerHTML = `
            <div style="
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                background: #1A1A2E;
                border-top: 2px solid var(--primary, #FF6B35);
                padding: 1rem 2rem;
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 1.5rem;
                flex-wrap: wrap;
                font-family: 'DM Sans', sans-serif;
                font-size: 0.95rem;
                color: #FFF;
                text-align: center;
                animation: slideUp 0.5s ease-out;
            ">
                <span>👋 <strong>CalculEtudiant</strong> vit grâce à la publicité. Tu peux nous aider ?</span>
                <button onclick="closeSupportBanner()" style="
                    background: var(--gradient-1, linear-gradient(135deg, #FF6B35, #F7931E));
                    color: #FFF;
                    border: none;
                    padding: 0.7rem 1.5rem;
                    border-radius: 50px;
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 0.9rem;
                    white-space: nowrap;
                    transition: transform 0.3s;
                " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                    ✅ Désactiver le bloqueur
                </button>
                <button onclick="closeSupportBanner(true)" style="
                    background: transparent;
                    color: #999;
                    border: 1px solid #555;
                    padding: 0.7rem 1.2rem;
                    border-radius: 50px;
                    cursor: pointer;
                    font-size: 0.85rem;
                    white-space: nowrap;
                    transition: all 0.3s;
                " onmouseover="this.style.borderColor='#FFF';this.style.color='#FFF'" onmouseout="this.style.borderColor='#555';this.style.color='#999'">
                    ✕ Plus tard
                </button>
            </div>
            <style>
                @keyframes slideUp {
                    from { transform: translateY(100%); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                #support-banner a {
                    color: var(--primary, #FF6B35);
                    text-decoration: underline;
                }
            </style>
        `;
        document.body.appendChild(banner);
    }
})();

function closeSupportBanner(dismissed) {
    const banner = document.getElementById('support-banner');
    if (banner) {
        banner.style.animation = 'slideDown 0.4s ease-in forwards';
        setTimeout(function() {
            banner.remove();
        }, 400);
    }
    
    // Sauvegarder la date de fermeture (ne plus afficher pendant 7 jours)
    if (dismissed) {
        localStorage.setItem('adsense-message-closed', Date.now().toString());
    }
}

// Animation de sortie
const slideDownStyle = document.createElement('style');
slideDownStyle.textContent = `
    @keyframes slideDown {
        from { transform: translateY(0); opacity: 1; }
        to { transform: translateY(100%); opacity: 0; }
    }
`;
document.head.appendChild(slideDownStyle);