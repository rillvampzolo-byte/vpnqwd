document.addEventListener('DOMContentLoaded', function() {
    
    var server = {
        id: 'paris',
        name: 'Франция',
        city: 'Париж',
        flag: '🇫🇷',
        ping: 38,
        load: 8
    };

    // Показать сервер
    var grid = document.getElementById('serversGrid');
    if (grid) {
        grid.innerHTML = `
            <div class="server-card" id="serverCard">
                <span class="server-flag">${server.flag}</span>
                <div class="server-name">${server.name}</div>
                <div class="server-city">${server.city}</div>
                <div class="server-tags">
                    <span class="server-tag green">⚡ ${server.ping}ms</span>
                    <span class="server-tag green">🟢 ${server.load}%</span>
                </div>
            </div>
        `;
        
        document.getElementById('serverCard').addEventListener('click', openModal);
    }

    function openModal() {
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0;
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        
        var key = 'vless://' + uuid + '@62.60.148.122:443?type=xhttp&security=reality&pbk=i1hQQ1DCQGQ6wswYO1X9eOhGncX2i5IRZ1h-dW23cFE&fp=random&sni=www.amazon.com&sid=19804ea488ef93&path=/&mode=auto#%F0%9F%87%AB%F0%9F%87%B7-SecureVPN-Paris';
        
        // Заполняем данные сервера (с проверкой)
        var el = document.getElementById('msFlag');
        if (el) el.textContent = server.flag;
        el = document.getElementById('msName');
        if (el) el.textContent = server.name;
        el = document.getElementById('msCity');
        if (el) el.textContent = server.city;
        el = document.getElementById('msPing');
        if (el) el.textContent = server.ping + 'ms';
        el = document.getElementById('msLoad');
        if (el) el.textContent = server.load + '%';
        
        // Показываем ключ (с проверкой)
        el = document.getElementById('keyText');
        if (el) el.textContent = key;
        el = document.getElementById('keyDisplay');
        if (el) el.style.display = 'block';
        el = document.getElementById('copyBtn');
        if (el) el.style.display = 'flex';
        
        // Открываем модалку
        el = document.getElementById('modal');
        if (el) {
            el.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    // Закрыть
    window.closeModal = function() {
        var el = document.getElementById('modal');
        if (el) {
            el.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    // Закрытие по фону
    var modal = document.getElementById('modal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) closeModal();
        });
    }

    // Копирование
    window.copyKey = function() {
        var keyText = document.getElementById('keyText');
        if (!keyText) return;
        var text = keyText.textContent;
        
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(copySuccess).catch(function() {
                fallbackCopy(text);
            });
        } else {
            fallbackCopy(text);
        }
    };

    function fallbackCopy(text) {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); copySuccess(); } catch(e) {}
        document.body.removeChild(ta);
    }

    function copySuccess() {
        var btn = document.getElementById('copyBtn');
        if (btn) {
            btn.innerHTML = '<span>✅ Скопировано!</span>';
            btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            setTimeout(function() {
                btn.innerHTML = '<span>📋 Скопировать ключ</span>';
                btn.style.background = 'linear-gradient(135deg, #8b5cf6, #6366f1)';
            }, 2000);
        }
        showToast('✅ Ключ скопирован!');
    }

    function showToast(msg) {
        var t = document.getElementById('toast');
        var tm = document.getElementById('toastMsg');
        if (tm) tm.textContent = msg;
        if (t) {
            t.classList.add('show');
            setTimeout(function() { t.classList.remove('show'); }, 2000);
        }
    }

});
