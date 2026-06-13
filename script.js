// Ждём загрузки страницы
document.addEventListener('DOMContentLoaded', function() {
    
    // Telegram
    var tg = null;
    try {
        if (window.Telegram && window.Telegram.WebApp) {
            tg = window.Telegram.WebApp;
            tg.ready();
            tg.expand();
        }
    } catch(e) {}

    // Сервер
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
        
        // Клик по карточке
        document.getElementById('serverCard').addEventListener('click', openModal);
    }

    // Открыть модальное окно
    function openModal() {
        // Генерируем ключ
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0;
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        
        var key = 'vless://' + uuid + '@62.60.148.122:443?type=xhttp&security=reality&pbk=i1hQQ1DCQGQ6wswYO1X9eOhGncX2i5IRZ1h-dW23cFE&fp=random&sni=www.amazon.com&sid=19804ea488ef93&path=/&mode=auto#%F0%9F%87%AB%F0%9F%87%B7-SecureVPN-Paris';
        
        // Заполняем модалку
        document.getElementById('msFlag').textContent = server.flag;
        document.getElementById('msName').textContent = server.name;
        document.getElementById('msCity').textContent = server.city;
        document.getElementById('msPing').textContent = server.ping + 'ms';
        document.getElementById('msLoad').textContent = server.load + '%';
        
        // Показываем ключ
        document.getElementById('keyText').textContent = key;
        document.getElementById('keyDisplay').style.display = 'block';
        document.getElementById('copyBtn').style.display = 'flex';
        
        // Открываем окно
        document.getElementById('modal').classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Закрыть окно
    window.closeModal = function() {
        document.getElementById('modal').classList.remove('active');
        document.body.style.overflow = '';
    };

    // Закрытие по фону
    document.getElementById('modal').addEventListener('click', function(e) {
        if (e.target === this) closeModal();
    });

    // Копирование
    window.copyKey = function() {
        var keyText = document.getElementById('keyText').textContent;
        
        // Копируем
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(keyText).then(function() {
                copySuccess();
            }).catch(function() {
                fallbackCopy(keyText);
            });
        } else {
            fallbackCopy(keyText);
        }
    };

    function fallbackCopy(text) {
        var textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            copySuccess();
        } catch(e) {
            showToast('Ошибка копирования');
        }
        document.body.removeChild(textarea);
    }

    function copySuccess() {
        var btn = document.getElementById('copyBtn');
        btn.innerHTML = '<span>✅ Скопировано!</span>';
        btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        showToast('✅ Ключ скопирован!');
        setTimeout(function() {
            btn.innerHTML = '<span>📋 Скопировать ключ</span>';
            btn.style.background = 'linear-gradient(135deg, #8b5cf6, #6366f1)';
        }, 2000);
    }

    // Toast
    function showToast(msg) {
        var t = document.getElementById('toast');
        document.getElementById('toastMsg').textContent = msg;
        t.classList.add('show');
        setTimeout(function() { t.classList.remove('show'); }, 2000);
    }

});
