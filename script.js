let tg = null;
try { 
    if (window.Telegram && window.Telegram.WebApp) {
        tg = window.Telegram.WebApp;
        tg.ready();
        tg.expand();
    }
} catch(e) {}

const servers = [
    { id: 'paris', name: 'Франция', city: 'Париж', flag: '🇫🇷', ping: 38, load: 8 }
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
        card.addEventListener('click', function() { openModal(server); });
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
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
    document.body.style.overflow = '';
    selectedServer = null;
}

document.getElementById('modal').addEventListener('click', function(e) {
    if (e.target === document.getElementById('modal')) closeModal();
});

function connect() {
    if (!selectedServer) return;
    
    // Показываем успех
    document.getElementById('success').classList.add('active');
    
    // Отправляем данные
    if (tg && tg.sendData) {
        try {
            tg.sendData(JSON.stringify({
                action: 'get_config',
                server: selectedServer.id,
                serverName: selectedServer.name
            }));
        } catch(e) {
            alert('Ошибка: ' + e.message);
        }
    }
    
    // Закрываем
    setTimeout(function() {
        document.getElementById('success').classList.remove('active');
        closeModal();
        showToast('Ключ отправлен в Telegram!');
        if (tg) { 
            try { tg.close(); } catch(e) {}
        }
    }, 1500);
}

function showToast(msg) {
    var t = document.getElementById('toast');
    document.getElementById('toastMsg').textContent = msg;
    t.classList.add('show');
    setTimeout(function() { t.classList.remove('show'); }, 2500);
}

// Запуск
renderServers();
