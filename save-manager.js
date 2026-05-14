// save-manager.js – Bouton de sauvegarde manuelle avec nom
(function() {
    // Ne pas afficher sur la page des sauvegardes
    if (window.location.pathname.includes('mes-sauvegardes.html')) return;

    const btn = document.createElement('button');
    btn.id = 'manual-save-btn';
    btn.innerHTML = '💾';
    btn.title = 'Sauvegarder (donner un nom)';
    btn.style.cssText = `
        position: fixed; bottom: 85px; right: 20px; z-index: 999;
        width: 56px; height: 56px; border-radius: 50%;
        background: var(--primary, #FF6B35); color: #fff; border: none;
        font-size: 1.5rem; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        display: flex; align-items: center; justify-content: center;
        transition: transform 0.2s;
    `;
    btn.onmouseover = () => btn.style.transform = 'scale(1.1)';
    btn.onmouseout = () => btn.style.transform = 'scale(1)';
    document.body.appendChild(btn);

    // Création du modal
    const modal = document.createElement('div');
    modal.id = 'save-modal';
    modal.style.cssText = `
        display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.5); z-index: 2000; align-items: center; justify-content: center;
    `;
    modal.innerHTML = `
        <div style="background: var(--card, #fff); border-radius: 16px; padding: 1.5rem; max-width: 400px; width: 90%; box-shadow: 0 8px 30px rgba(0,0,0,0.3); color: var(--text);">
            <h3 style="margin: 0 0 1rem; font-family: 'Syne', sans-serif;">💾 Nommer la sauvegarde</h3>
            <input type="text" id="save-name-input" placeholder="Ex: Budget mars 2026" style="width: 100%; padding: 0.8rem; border: 2px solid var(--border); border-radius: 8px; margin-bottom: 1rem; background: var(--bg); color: var(--text);">
            <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
                <button id="save-cancel" style="background: transparent; border: 1px solid var(--border); padding: 0.5rem 1rem; border-radius: 8px; cursor: pointer; color: var(--text);">Annuler</button>
                <button id="save-confirm" style="background: var(--primary); color: #fff; border: none; padding: 0.5rem 1.5rem; border-radius: 8px; cursor: pointer;">💾 Sauvegarder</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    btn.addEventListener('click', () => {
        document.getElementById('save-name-input').value = '';
        modal.style.display = 'flex';
        document.getElementById('save-name-input').focus();
    });

    document.getElementById('save-cancel').addEventListener('click', () => modal.style.display = 'none');
    document.getElementById('save-confirm').addEventListener('click', () => {
        const name = document.getElementById('save-name-input').value.trim();
        if (!name) return alert('Donne un nom à ta sauvegarde');
        performSave(name);
        modal.style.display = 'none';
        alert('✅ Sauvegarde "' + name + '" effectuée !');
    });

    modal.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });

    function getPageState() {
        const state = {};
        if (document.getElementById('rev-bourse')) {
            state.type = 'Budget solo';
            state.data = {
                revenus: {
                    bourse: parseFloat(document.getElementById('rev-bourse')?.value) || 0,
                    salaire: parseFloat(document.getElementById('rev-salaire')?.value) || 0,
                    famille: parseFloat(document.getElementById('rev-famille')?.value) || 0,
                    apl: parseFloat(document.getElementById('rev-apl')?.value) || 0,
                },
                depenses: {
                    loyer: parseFloat(document.getElementById('dep-loyer')?.value) || 0,
                    internet: parseFloat(document.getElementById('dep-internet')?.value) || 0,
                    assurance: parseFloat(document.getElementById('dep-assurance')?.value) || 0,
                    transport: parseFloat(document.getElementById('dep-transport')?.value) || 0,
                    alimentation: parseFloat(document.getElementById('dep-alimentation')?.value) || 0,
                    loisirs: parseFloat(document.getElementById('dep-loisirs')?.value) || 0,
                    vetements: parseFloat(document.getElementById('dep-vetements')?.value) || 0,
                    cours: parseFloat(document.getElementById('dep-cours')?.value) || 0,
                }
            };
        } else if (document.getElementById('matiere-nom')) {
            state.type = 'Moyenne';
            state.data = JSON.parse(localStorage.getItem('moyenne-matieres') || '[]');
        } else if (document.getElementById('new-objectif')) {
            state.type = 'Objectifs';
            state.data = JSON.parse(localStorage.getItem('tracker-objectifs') || '[]');
        } else if (document.getElementById('quiz-area')) {
            state.type = 'Quiz';
            state.data = JSON.parse(localStorage.getItem('quiz-leaderboard') || '[]');
        } else if (document.getElementById('cv-preview')) {
            state.type = 'CV';
            state.data = {
                nom: document.getElementById('cv-nom')?.value || '',
                titre: document.getElementById('cv-titre')?.value || '',
                profil: document.getElementById('cv-profil')?.value || '',
                formations: Array.from(document.querySelectorAll('#formations-container .section-item')).map(el => ({
                    diplome: el.querySelector('input')?.value || '',
                    etablissement: el.querySelectorAll('input')[1]?.value || '',
                    debut: el.querySelectorAll('input')[2]?.value || '',
                    fin: el.querySelectorAll('input')[3]?.value || ''
                })),
                experiences: Array.from(document.querySelectorAll('#experiences-container .section-item')).map(el => ({
                    poste: el.querySelector('input')?.value || '',
                    entreprise: el.querySelectorAll('input')[1]?.value || '',
                    debut: el.querySelectorAll('input')[2]?.value || '',
                    fin: el.querySelectorAll('input')[3]?.value || '',
                    description: el.querySelector('textarea')?.value || ''
                })),
                competences: document.getElementById('cv-competences')?.value || '',
                langues: document.getElementById('cv-langues')?.value || ''
            };
        } else {
            state.type = 'Instantané';
            state.data = { url: window.location.href, title: document.title };
        }
        return state;
    }

    function performSave(name) {
        const snapshot = {
            name: name,
            date: new Date().toISOString(),
            state: getPageState()
        };
        const manualSaves = JSON.parse(localStorage.getItem('manual-saves') || '[]');
        manualSaves.push(snapshot);
        localStorage.setItem('manual-saves', JSON.stringify(manualSaves));
    }
})();