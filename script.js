let tg = null;
try { if (window.Telegram?.WebApp) { tg = window.Telegram.WebApp; tg.ready(); tg.expand(); } } catch(e) {}

const servers = [
    { id: 'paris', name: 'Франция', city: 'Париж', flag: '🇫🇷', ping: 38, load: 8, features: ['Netflix', '10Gbps', 'P2P'] }
];

let selectedServer = null;

function renderServers() {
    const grid = document.getElementById('serversGrid');
    if (!grid) return;
    grid.innerHTML = '';
    servers.forEach(server => {
        const card = document.createElement('div');
        card.className = 'server-card';
        card.innerHTML = `
            <span class="server-flag">${server.flag}</span>
            <div class="server-name">${server.name}</div>
            <div class="server-city">${server.city}</div>
            <div class="server-tags">
                <span class="server-tag green">⚡ ${server.ping}ms</span>
                <span class="server-tag green">🟢 ${server.load}%</span>
            </div>
        `;
        card.addEventListener('click', () => openModal(server));
        grid.appendChild(card);
    });
}

function openModal(server) {
    selectedServer = server;
    document.getElementById('msFlag').textContent = server.flag;
    document.getElementById('msName').textContent = server.name;
    document.getElementById('msCity').textContent = server.city;
    document.getElementById('msPing').textContent = server.ping + 'ms';
    document.getElementById('msLoad').textContent = server.load + '%';
    document.getElementById('modal').classList.add('active');
    document.body.style.overflow = 'hidden';
    if (tg?.HapticFeedback) tg.HapticFeedback.impactOccurred('medium');
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
    document.body.style.overflow = '';
    selectedServer = null;
}

document.getElementById('modal').addEventListener('click', e => { if (e.target === e.currentTarget) closeModal(); });

function connect() {
    if (!selectedServer) return;
    document.getElementById('success').classList.add('active');
    if (tg?.sendData) {
        try { tg.sendData(JSON.stringify({ action: 'get_config', server: selectedServer.id, serverName: selectedServer.name })); } catch(e) {}
    }
    setTimeout(() => {
        document.getElementById('success').classList.remove('active');
        closeModal();
        showToast('Ключ отправлен в Telegram!');
        if (tg) setTimeout(() => tg.close(), 600);
    }, 1500);
}

function showToast(msg) {
    const t = document.getElementById('toast');
    document.getElementById('toastMsg').textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2500);
}

document.addEventListener('DOMContentLoaded', renderServers);
if (document.readyState !== 'loading') renderServers();
