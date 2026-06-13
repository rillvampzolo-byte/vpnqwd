document.addEventListener('DOMContentLoaded', function() {
    
    var tg = null;
    try {
        if (window.Telegram && window.Telegram.WebApp) {
            tg = window.Telegram.WebApp;
            tg.ready();
            tg.expand();
        }
    } catch(e) {}

    var server = {
        id: 'paris',
        name: 'Франция',
        city: 'Париж',
        flag: '🇫🇷',
        ping: 38,
        load: 8
    };

    var grid = document.getElementById('serversGrid');
    if (grid) {
        grid.innerHTML = '<div class="server-card" id="serverCard"><span class="server-flag">' + server.flag + '</span><div class="server-name">' + server.name + '</div><div class="server-city">' + server.city + '</div><div class="server-tags"><span class="server-tag green">⚡ ' + server.ping + 'ms</span><span class="server-tag green">🟢 ' + server.load + '%</span></div></div>';
        document.getElementById('serverCard').addEventListener('click', openModal);
    }

    function openModal() {
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0;
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        
        var key = 'vless://' + uuid + '@62.60.148.122:443?type=xhttp&security=reality&pbk=i1hQQ1DCQGQ6wswYO1X9eOhGncX2i5IRZ1h-dW23cFE&fp=random&sni=www.amazon.com&sid=19804ea488ef93&path=/&mode=auto#SecureVPN-Paris';
        
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
        
        // Отправляем боту что ключ запрошен
        if (tg && tg.sendData) {
            try {
                tg.sendData(JSON.stringify({ action: 'key_requested' }));
            } catch(e) {}
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
