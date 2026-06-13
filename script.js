// Безопасная инициализация Telegram Web App
let tg = null;
try {
    if (window.Telegram && window.Telegram.WebApp) {
        tg = window.Telegram.WebApp;
        tg.ready();
        tg.expand();
    }
} catch(e) {
    console.log('Не в Telegram, работаем как обычный сайт');
}

// ===== ДАННЫЕ =====
const servers = [
    { 
        id: 'paris', 
        name: 'Франция', 
        city: 'Париж', 
        flag: '🇫🇷', 
        ping: 38, 
        load: 8,
        description: 'Премиум локация • Низкий пинг • 10 Gbps',
        features: ['Netflix', 'Streaming', 'P2P', 'Gaming']
    }
];

// Приложения с платформами
const apps = [
    { 
        id: 'happ', 
        name: 'HAPP', 
        icon: '📦', 
        iconClass: 'happ',
        platforms: ['ios'],
        scheme: 'happ://import/',
        store: {
            ios: 'https://apps.apple.com/app/happ-proxy-utility/idXXXXXXXXX',
            android: null
        }
    },
    { 
        id: 'v2box', 
        name: 'V2Box', 
        icon: '📁', 
        iconClass: 'v2box',
        platforms: ['ios'],
        scheme: 'v2box://install-config?url=',
        store: {
            ios: 'https://apps.apple.com/app/v2box/idXXXXXXXXX',
            android: null
        }
    },
    { 
        id: 'streisand', 
        name: 'Streisand', 
        icon: '🎵', 
        iconClass: 'streisand',
        platforms: ['ios', 'android'],
        scheme: 'streisand://import/',
        store: {
            ios: 'https://apps.apple.com/app/streisand/idXXXXXXXXX',
            android: 'https://play.google.com/store/apps/details?id=com.example.streisand'
        }
    },
    { 
        id: 'shadowrocket', 
        name: 'Shadowrocket', 
        icon: '🚀', 
        iconClass: 'shadowrocket',
        platforms: ['ios'],
        scheme: 'shadowrocket://add/',
        store: {
            ios: 'https://apps.apple.com/app/shadowrocket/idXXXXXXXXX',
            android: null
        }
    },
    { 
        id: 'v2rayng', 
        name: 'v2rayNG', 
        icon: '🟣', 
        iconClass: 'v2rayng',
        platforms: ['android'],
        scheme: 'v2rayng://install-config?url=',
        store: {
            ios: null,
            android: 'https://play.google.com/store/apps/details?id=com.v2ray.ang'
        }
    },
    { 
        id: 'npv', 
        name: 'NapsternetV', 
        icon: '🟢', 
        iconClass: 'npv',
        platforms: ['android'],
        scheme: 'npv://import/',
        store: {
            ios: null,
            android: 'https://play.google.com/store/apps/details?id=com.napsternetlabs.napsternetv'
        }
    }
];

let selectedServer = null;
let selectedApp = null;

// ===== ОПРЕДЕЛЕНИЕ ПЛАТФОРМЫ =====
function getPlatform() {
    const ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) return 'ios';
    if (/android/.test(ua)) return 'android';
    // Определяем по Telegram WebApp
    if (tg && tg.platform) {
        if (tg.platform === 'ios' || tg.platform === 'macos') return 'ios';
        if (tg.platform === 'android') return 'android';
    }
    return 'other';
}

const userPlatform = getPlatform();

// Фильтруем приложения под платформу (показываем все, но отмечаем доступные)
function isAppAvailableOnPlatform(app) {
    return app.platforms.includes(userPlatform) || userPlatform === 'other';
}

// ===== РЕНДЕР СЕРВЕРОВ =====
function renderServers() {
    const grid = document.getElementById('serversGrid');
    grid.innerHTML = '';
    
    servers.forEach((server, i) => {
        const card = document.createElement('div');
        card.className = 'server-card';
        card.style.animationDelay = (i * 0.03) + 's';
        
        const low = server.ping < 50;
        const lowLoad = server.load < 15;
        
        card.innerHTML = `
            <span class="server-flag">${server.flag}</span>
            <div class="server-name">${server.name}</div>
            <div class="server-city">${server.city}</div>
            <div class="server-tags">
                <span class="server-tag ${low ? 'green' : ''}">⚡ ${server.ping}ms</span>
                <span class="server-tag ${lowLoad ? 'green' : ''}">${lowLoad ? '🟢' : '🟡'} ${server.load}%</span>
            </div>
        `;
        
        card.addEventListener('click', () => openModal(server));
        grid.appendChild(card);
    });
}

// ===== МОДАЛКА =====
function openModal(server) {
    selectedServer = server;
    selectedApp = null;
    
    document.getElementById('msFlag').textContent = server.flag;
    document.getElementById('msName').textContent = server.name;
    document.getElementById('msCity').textContent = server.city;
    document.getElementById('msPing').textContent = server.ping + 'ms';
    document.getElementById('msLoad').textContent = server.load + '%';
    
    renderAppList();
    
    document.getElementById('btnConnect').disabled = true;
    document.getElementById('btnConnect').querySelector('span').textContent = 'Выберите приложение';
    
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
    selectedApp = null;
}

// Закрытие по фону
document.getElementById('modal').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
});

// ===== РЕНДЕР СПИСКА ПРИЛОЖЕНИЙ =====
function renderAppList() {
    const list = document.getElementById('appList');
    list.innerHTML = '';
    
    apps.forEach(app => {
        const available = isAppAvailableOnPlatform(app);
        const btn = document.createElement('button');
        btn.className = 'app-option';
        btn.setAttribute('data-app', app.id);
        
        const platformLabel = app.platforms.includes('ios') && app.platforms.includes('android') 
            ? 'iOS · Android' 
            : app.platforms.includes('ios') 
                ? 'iOS' 
                : 'Android';
        
        btn.innerHTML = `
            <div class="app-option-icon ${app.iconClass}">${app.icon}</div>
            <div class="app-option-info">
                <div class="app-option-name">${app.name}</div>
                <div class="app-option-platform">${platformLabel}${!available ? ' · Не ваша платформа' : ''}</div>
            </div>
            <div class="app-option-check">✓</div>
        `;
        
        btn.addEventListener('click', () => selectApp(app, btn));
        list.appendChild(btn);
    });
}

// ===== ВЫБОР ПРИЛОЖЕНИЯ =====
function selectApp(app, btnElement) {
    // Убираем выделение со всех
    document.querySelectorAll('.app-option').forEach(b => b.classList.remove('selected'));
    
    // Выделяем выбранное
    btnElement.classList.add('selected');
    selectedApp = app;
    
    // Активируем кнопку
    const btn = document.getElementById('btnConnect');
    btn.disabled = false;
    btn.querySelector('span').textContent = 'Подключить через ' + app.name;
    
    // Показываем ссылки на установку
    showInstallLinks(app);
    
    if (tg && tg.HapticFeedback) {
        tg.HapticFeedback.selectionChanged();
    }
}

// ===== ССЫЛКИ НА УСТАНОВКУ =====
function showInstallLinks(app) {
    const container = document.getElementById('installLinks');
    container.innerHTML = '';
    container.classList.remove('visible');
    
    const links = [];
    
    if (app.store.ios) {
        links.push({ platform: 'ios', label: 'App Store', icon: '🍎', url: app.store.ios });
    }
    if (app.store.android) {
        links.push({ platform: 'android', label: 'Google Play', icon: '🤖', url: app.store.android });
    }
    
    if (links.length > 0) {
        links.forEach(link => {
            const a = document.createElement('a');
            a.className = 'install-link';
            a.href = link.url;
            a.target = '_blank';
            a.rel = 'noopener';
            a.innerHTML = `
                <span class="install-link-icon">${link.icon}</span>
                <span>Скачать ${app.name} в ${link.label}</span>
                <span style="margin-left:auto">↗</span>
            `;
            container.appendChild(a);
        });
        container.classList.add('visible');
    }
}

// ===== ПОДКЛЮЧЕНИЕ =====
function connect() {
    if (!selectedServer || !selectedApp) return;
    
    const app = selectedApp;
    const server = selectedServer;
    
    // Показываем экран успеха
    document.getElementById('successApp').textContent = app.name;
    document.getElementById('success').classList.add('active');
    
    if (tg && tg.HapticFeedback) {
        tg.HapticFeedback.notificationOccurred('success');
    }
    
    // Генерируем тестовый конфиг (в реальности бот даст свой)
    const testUUID = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = Math.random() * 16 | 0;
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    
    // Данные сервера (ЗАМЕНИ НА СВОИ)
    const serverIP = 'YOUR_SERVER_IP';
    const vless = `vless://${testUUID}@${serverIP}:443?type=xhttp&security=reality&pbk=i1hQQ1DCQGQ6wswYO1X9eOhGncX2i5IRZ1h-dW23cFE&fp=random&sni=www.amazon.com&sid=19804ea488ef93&path=/&mode=auto#SecureVPN-${server.name}`;
    
    const encoded = encodeURIComponent(vless);
    let deepLink = '';
    
    switch(app.id) {
        case 'happ': deepLink = `happ://import/${encoded}`; break;
        case 'v2box': deepLink = `v2box://install-config?url=${encoded}`; break;
        case 'streisand': deepLink = `streisand://import/${encoded}`; break;
        case 'shadowrocket': deepLink = `shadowrocket://add/${encoded}`; break;
        case 'v2rayng': deepLink = `v2rayng://install-config?url=${encoded}`; break;
        case 'npv': deepLink = `npv://import/${encoded}`; break;
        default: deepLink = vless;
    }
    
    // Отправляем данные в Telegram если есть
    if (tg && tg.sendData) {
        tg.sendData(JSON.stringify({
            action: 'get_config',
            server: server.id,
            serverName: server.name,
            app: app.id,
            platform: userPlatform
        }));
    }
    
    // Пробуем открыть приложение
    setTimeout(() => {
        window.location.href = deepLink;
        
        // Fallback: если приложение не открылось
        setTimeout(() => {
            if (!document.hidden) {
                // Определяем магазин
                if (userPlatform === 'android' && app.store.android) {
                    window.location.href = app.store.android;
                } else if (app.store.ios) {
                    window.location.href = app.store.ios;
                }
            }
        }, 2000);
    }, 1200);
    
    // Закрываем всё
    setTimeout(() => {
        document.getElementById('success').classList.remove('active');
        closeModal();
        showToast('Ключ передан в ' + app.name);
        if (tg) setTimeout(() => tg.close(), 500);
    }, 3000);
}

// Привязываем кнопку
document.getElementById('btnConnect').addEventListener('click', connect);

// ===== TOAST =====
function showToast(msg) {
    const toast = document.getElementById('toast');
    document.getElementById('toastMsg').textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}

// ===== ИНИЦИАЛИЗАЦИЯ =====
document.addEventListener('DOMContentLoaded', () => {
    renderServers();
    
    // Убираем класс loading если был
    document.body.style.visibility = 'visible';
    document.body.style.opacity = '1';
});

// На случай если DOM уже загружен
if (document.readyState !== 'loading') {
    renderServers();
    document.body.style.visibility = 'visible';
    document.body.style.opacity = '1';
}
