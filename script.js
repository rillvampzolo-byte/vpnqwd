let tg = null;
try {
    if (window.Telegram && window.Telegram.WebApp) {
        tg = window.Telegram.WebApp;
        tg.ready();
        tg.expand();
    }
} catch(e) {}

const servers = [
    { 
        id: 'paris', 
        name: 'Франция', 
        city: 'Париж', 
        flag: '🇫🇷', 
        ping: 38, 
        load: 8 
    }
];

let selectedServer = null;

function getPlatform() {
    const ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) return 'ios';
    if (/android/.test(ua)) return 'android';
    if (tg && tg.platform === 'ios') return 'ios';
    if (tg && tg.platform === 'android') return 'android';
    return 'other';
}

const userPlatform = getPlatform();

function renderServers() {
    const grid = document.getElementById('serversGrid');
    if (!grid) return;
    grid.innerHTML = '';
    servers.forEach((server) => {
        const card = document.createElement('div');
        card.className = 'server-card';
        const low = server.ping < 50;
        card.innerHTML = `
            <span class="server-flag">${server.flag}</span>
            <div class="server-name">${server.name}</div>
            <div class="server-city">${server.city}</div>
            <div class="server-tags">
                <span class="server-tag ${low ? 'green' : ''}">⚡ ${server.ping}ms</span>
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
    
    // Меняем текст кнопки
    const btn = document.getElementById('btnConnect');
    btn.disabled = false;
    btn.querySelector('span').textContent = 'Получить ключ';
    
    // Скрываем выбор приложений и установку
    document.getElementById('appPicker').style.display = 'none';
    document.getElementById('installLinks').classList.remove('visible');
    
    document.getElementById('modal').classList.add('active');
    document.body.style.overflow = 'hidden';
    
    if (tg && tg.HapticFeedback) {
        tg.HapticFeedback.impactOccurred('medium');
    }
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
    document.body.style.overflow = '';
    selectedServer = null;
}

document.getElementById('modal').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
});

function connect() {
    if (!selectedServer) return;
    
    const server = selectedServer;
    document.getElementById('successApp').textContent = 'Telegram';
    document.getElementById('success').classList.add('active');
    
    if (tg && tg.sendData) {
        try {
            tg.sendData(JSON.stringify({
                action: 'get_config',
                server: server.id,
                serverName: server.name,
                platform: userPlatform
            }));
        } catch(e) {
            console.log('Ошибка:', e);
        }
    }
    
    setTimeout(() => {
        document.getElementById('success').classList.remove('active');
        closeModal();
        showToast('Ключ отправлен в чат!');
        if (tg) setTimeout(() => tg.close(), 500);
    }, 1500);
}

document.getElementById('btnConnect').addEventListener('click', connect);

function showToast(msg) {
    const toast = document.getElementById('toast');
    document.getElementById('toastMsg').textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}

document.addEventListener('DOMContentLoaded', () => {
    renderServers();
    document.body.style.visibility = 'visible';
    document.body.style.opacity = '1';
});

if (document.readyState !== 'loading') {
    renderServers();
    document.body.style.visibility = 'visible';
    document.body.style.opacity = '1';
}
