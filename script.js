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

// ===== Генерация ключа =====
function generateKey() {
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    
    const serverIP = '62.60.148.122';
    const publicKey = 'i1hQQ1DCQGQ6wswYO1X9eOhGncX2i5IRZ1h-dW23cFE';
    const shortId = '19804ea488ef93';
    const serverName = 'www.amazon.com';
    
    return `vless://${uuid}@${serverIP}:443?type=xhttp&security=reality&pbk=${publicKey}&fp=random&sni=${serverName}&sid=${shortId}&path=/&mode=auto#🇫🇷-SecureVPN-Paris`;
}

// ===== Рендер серверов =====
function renderServers() {
    const grid = document.getElementById('serversGrid');
    if (!grid) return;
    grid.innerHTML = '';
    servers.forEach(function(server) {
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

// ===== Модальное окно =====
function openModal(server) {
    selectedServer = server;
    
    // Генерируем ключ
    const key = generateKey();
    
    // Заполняем модалку
    document.getElementById('msFlag').textContent = server.flag;
    document.getElementById('msName').textContent = server.name;
    document.getElementById('msCity').textContent = server.city;
    document.getElementById('msPing').textContent = server.ping + 'ms';
    document.getElementById('msLoad').textContent = server.load + '%';
    
    // Показываем ключ
    document.getElementById('keyDisplay').textContent = key;
    document.getElementById('keyDisplay').style.display = 'block';
    document.getElementById('copyBtn').style.display = 'flex';
    document.getElementById('btnConnect').style.display = 'none';
    
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
    if (e.target === document.getElementById('modal')) closeModal();
});

// ===== Копирование =====
function copyKey() {
    const keyText = document.getElementById('keyDisplay').textContent;
    
    // Современный способ
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(keyText).then(function() {
            showToast('✅ Ключ скопирован!');
            copyBtnSuccess();
        }).catch(function() {
            fallbackCopy(keyText);
        });
    } else {
        fallbackCopy(keyText);
    }
    
    if (tg && tg.HapticFeedback) {
        tg.HapticFeedback.notificationOccurred('success');
    }
}

// Запасной способ копирования
function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    textarea.style.top = '-9999px';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    try {
        document.execCommand('copy');
        showToast('✅ Ключ скопирован!');
        copyBtnSuccess();
    } catch(e) {
        showToast('❌ Не удалось скопировать');
    }
    document.body.removeChild(textarea);
}

function copyBtnSuccess() {
    const btn = document.getElementById('copyBtn');
    const original = btn.innerHTML;
    btn.innerHTML = '<span>✅ Скопировано!</span>';
    btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    setTimeout(function() {
        btn.innerHTML = original;
        btn.style.background = 'linear-gradient(135deg, #8b5cf6, #6366f1)';
    }, 2000);
}

// ===== Toast =====
function showToast(msg) {
    const t = document.getElementById('toast');
    document.getElementById('toastMsg').textContent = msg;
    t.classList.add('show');
    setTimeout(function() { t.classList.remove('show'); }, 2000);
}

// ===== Старт =====
renderServers();
