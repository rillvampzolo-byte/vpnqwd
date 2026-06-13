// ========== СЕРВЕРЫ (просто вставляешь готовый ключ) ==========
var SERVERS = [
    {
        id: "paris",
        name: "Франция",
        city: "Париж",
        flag: "🇫🇷",
        ping: 38,
        load: 8,
        key: "vless://ec121e16-c593-459a-9eed-d5b832259f59@62.60.148.122:43342?encryption=none&extra=%7B%22scMaxEachPostBytes%22%3A%221000000%22%2C%22xPaddingBytes%22%3A%22100-1000%22%7D&fp=random&host=&mode=auto&path=%2F&pbk=i1hQQ1DCQGQ6wswYO1X9eOhGncX2i5IRZ1h-dW23cFE&security=reality&sid=19804ea488ef93&sni=www.amazon.com&spx=%2FpsXrBIZTR7d9wp8&type=xhttp&x_padding_bytes=100-1000#SecureVPN-Paris"
    }
];

// ========== ЧАСТИЦЫ ==========
(function createParticles() {
    var container = document.getElementById('particles');
    if (!container) return;
    for (var i = 0; i < 30; i++) {
        var p = document.createElement('div');
        p.className = 'particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.animationDuration = (Math.random() * 10 + 8) + 's';
        p.style.animationDelay = Math.random() * 10 + 's';
        p.style.width = (Math.random() * 3 + 1) + 'px';
        p.style.height = p.style.width;
        container.appendChild(p);
    }
})();

// ========== РЕНДЕР СЕРВЕРОВ ==========
function renderServers() {
    var grid = document.getElementById('serversGrid');
    if (!grid) return;
    grid.innerHTML = '';
    
    SERVERS.forEach(function(server) {
        var card = document.createElement('div');
        card.className = 'server-card';
        card.innerHTML = 
            '<span class="server-flag">' + server.flag + '</span>' +
            '<div class="server-name">' + server.name + '</div>' +
            '<div class="server-city">' + server.city + '</div>' +
            '<div class="server-tags">' +
                '<span class="server-tag green">⚡ ' + server.ping + 'ms</span>' +
                '<span class="server-tag green">🟢 ' + server.load + '%</span>' +
            '</div>';
        
        card.addEventListener('click', function() { openModal(server); });
        grid.appendChild(card);
    });
}

// ========== МОДАЛКА ==========
function openModal(server) {
    setText('msFlag', server.flag);
    setText('msName', server.name);
    setText('msCity', server.city);
    setText('msPing', server.ping + 'ms');
    setText('msLoad', server.load + '%');
    
    var urlParams = new URLSearchParams(window.location.search);
    var token = urlParams.get('token');
    
    if (token) {
        setText('keyText', server.key);
        show('keyDisplay');
        show('copyBtn');
        hide('noAccessMsg');
    } else {
        hide('keyDisplay');
        hide('copyBtn');
        show('noAccessMsg');
    }
    
    var modal = document.getElementById('modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function setText(id, text) { var el = document.getElementById(id); if (el) el.textContent = text; }
function show(id) { var el = document.getElementById(id); if (el) el.style.display = 'block'; }
function hide(id) { var el = document.getElementById(id); if (el) el.style.display = 'none'; }

window.closeModal = function() {
    var modal = document.getElementById('modal');
    if (modal) { modal.classList.remove('active'); document.body.style.overflow = ''; }
};

document.getElementById('modal').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
});

// ========== КОПИРОВАНИЕ ==========
window.copyKey = function() {
    var el = document.getElementById('keyText');
    if (!el) return;
    var text = el.textContent;
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(function() { fallback(text); });
    } else { fallback(text); }
};

function fallback(text) {
    var ta = document.createElement('textarea');
    ta.value = text; ta.style.position = 'fixed'; ta.style.left = '-9999px';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); done(); } catch(e) {}
    document.body.removeChild(ta);
}

function done() {
    var btn = document.getElementById('copyBtn');
    if (btn) {
        btn.innerHTML = '<span>✅ Скопировано!</span>';
        btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        setTimeout(function() {
            btn.innerHTML = '<span>📋 Скопировать ключ</span>';
            btn.style.background = 'linear-gradient(135deg, #8b6914, #c9a84c)';
        }, 2000);
    }
    toast('✅ Ключ скопирован!');
}

function toast(msg) {
    var t = document.getElementById('toast');
    var tm = document.getElementById('toastMsg');
    if (tm) tm.textContent = msg;
    if (t) { t.classList.add('show'); setTimeout(function() { t.classList.remove('show'); }, 2000); }
}

renderServers();
