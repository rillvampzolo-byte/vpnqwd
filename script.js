document.addEventListener('DOMContentLoaded', function() {
    
    // Получаем токен из URL
    var urlParams = new URLSearchParams(window.location.search);
    var token = urlParams.get('token');
    
    var hasAccess = false;
    var vpnKey = '';
    
    var server = {
        id: 'paris',
        name: 'Франция',
        city: 'Париж',
        flag: '🇫🇷',
        ping: 38,
        load: 8
    };
    
    // Если есть токен — проверяем
    if (token) {
        checkToken(token);
    }
    
    var grid = document.getElementById('serversGrid');
    if (grid) {
        grid.innerHTML = '<div class="server-card" id="serverCard"><span class="server-flag">' + server.flag + '</span><div class="server-name">' + server.name + '</div><div class="server-city">' + server.city + '</div><div class="server-tags"><span class="server-tag green">⚡ ' + server.ping + 'ms</span><span class="server-tag green">🟢 ' + server.load + '%</span></div></div>';
        
        document.getElementById('serverCard').addEventListener('click', function() {
            if (hasAccess && vpnKey) {
                showKeyModal(vpnKey);
            } else if (token) {
                // Пробуем ещё раз проверить
                checkToken(token);
            } else {
                showNoAccess();
            }
        });
    }
    
    function checkToken(tok) {
        // В реальности — запрос к API бота
        // Сейчас эмулируем (замени на fetch когда настроишь сервер)
        
        // Для демо: если токен есть — даём доступ
        // В продакшене: fetch('https://твой-сервер/api/check', {method:'POST', body:JSON.stringify({token:tok})})
        
        hasAccess = true;
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0;
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        vpnKey = 'vless://' + uuid + '@62.60.148.122:443?type=xhttp&security=reality&pbk=i1hQQ1DCQGQ6wswYO1X9eOhGncX2i5IRZ1h-dW23cFE&fp=random&sni=www.amazon.com&sid=19804ea488ef93&path=/&mode=auto#SecureVPN-Paris';
        
        toast('✅ Доступ подтверждён');
    }
    
    function showKeyModal(key) {
        setText('msFlag', server.flag);
        setText('msName', server.name);
        setText('msCity', server.city);
        setText('msPing', server.ping + 'ms');
        setText('msLoad', server.load + '%');
        setText('keyText', key);
        show('keyDisplay');
        show('copyBtn');
        
        var modal = document.getElementById('modal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    function showNoAccess() {
        setText('msFlag', '🔒');
        setText('msName', 'Нет доступа');
        setText('msCity', 'Оплатите доступ в боте');
        setText('msPing', '—');
        setText('msLoad', '—');
        hide('keyDisplay');
        hide('copyBtn');
        show('noAccessMsg');
        
        var modal = document.getElementById('modal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    function setText(id, text) {
        var el = document.getElementById(id);
        if (el) el.textContent = text;
    }
    
    function show(id) {
        var el = document.getElementById(id);
        if (el) el.style.display = 'block';
    }
    
    function hide(id) {
        var el = document.getElementById(id);
        if (el) el.style.display = 'none';
    }
    
    window.closeModal = function() {
        var modal = document.getElementById('modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    };
    
    var modal = document.getElementById('modal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) closeModal();
        });
    }
    
    window.copyKey = function() {
        var el = document.getElementById('keyText');
        if (!el) return;
        var text = el.textContent;
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(done).catch(function() {
                fallback(text);
            });
        } else {
            fallback(text);
        }
    };
    
    function fallback(text) {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
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
                btn.style.background = 'linear-gradient(135deg, #8b5cf6, #6366f1)';
            }, 2000);
        }
        toast('✅ Ключ скопирован!');
    }
    
    function toast(msg) {
        var t = document.getElementById('toast');
        var tm = document.getElementById('toastMsg');
        if (tm) tm.textContent = msg;
        if (t) {
            t.classList.add('show');
            setTimeout(function() { t.classList.remove('show'); }, 2000);
        }
    }
    
});
