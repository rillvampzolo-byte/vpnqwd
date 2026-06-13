// ========== СЕРВЕРЫ (просто вставляешь готовый ключ) ==========
var SERVERS = [
    {
        id: "paris",
        name: "Франция",
        city: "Париж",
        flag: "🇫🇷",
        ping: 38,
        load: 8,
        key: "vless://22e00b7f-a50f-4f0e-b5a5-6d2fe94060bf@62.60.148.122:43342?encryption=mlkem768x25519plus.native.0rtt.XFqFmRwdymlhB1JPYmDCULfnWa62Z61dm47IgW-cVjk&extra=%7B%22scMaxEachPostBytes%22%3A%221000000%22%2C%22xPaddingBytes%22%3A%22100-1000%22%7D&fp=random&host=&mode=auto&path=%2F&pbk=i1hQQ1DCQGQ6wswYO1X9eOhGncX2i5IRZ1h-dW23cFE&pqv=Z_lRehWBWY5luyurM-pbOJJhSBoUdh7Quc5H04_hbEGJ5kkT8-zAH6zzHolv6zzS7ckL_9tNhzHoFNleWl-vJkkpQpMiUsKU52aV4zfkb177MsWf1WGP8fVEdqMctDvPkhJmP3WGWXJhGKoVuWCJ3YaGUSaPRkAHD1rqF6nVQ6eSMwZOWbXLKfkWrVLmmaqvd0wIpdnJZf3sexZGzyC9kptNO4seGVpo7TamSJXQSUBxH4uFgO3B0BvLFnnFuN7sLW61HDH30XiNzyKvdXfzLNkfUgk2FaCz0JRxdVWdPD-rwT9xCf8jMMHWQx_fyCtZENb3GBjFcvBNaTDR_k6b_JUEMfxrCL3VCPGO2lNujvagbExVNtCZ94pwohQC19-qK-vZJ6CSQqWUIrIctcWcH-woOW3VgJk1z29LUV2LedE08x6P0loYbvQSuv2hPAPuOWPrk9qK07eM_FJ9kckZH0emopQLDnffdnuxgZw2rMH_5s_pBpMhBt9hUyA83f_FuYdnjZdP07myaqvf3mD13HxB1OoHr_Ke-qK3lJRmMlwa0lgO2l-nO3odDacjOAJRfn3f4E680s1jibIa8u21X216yDJNkCKYuxWWq-AeyVDxNmjfhVlpI2NdB6mS7vADcVpRR4TLcampd0fc4sn_q9k0TFucCoyXjxFmSOL5te-t4ziUVM5CROie5DFJSjAi5R0RabHjx_phTCMjf0Y805703NbVyBb-8AjAjj5j1eFR9OfkbY2Jqvd-ptm2PkQCVlEDQcmGN1b-ivnFaZoambQcfx6N-I7K5gACpERnSmIs1lq--B2VPgpl3kvAIMMwQW0wrcXkbMQ0XEaIU9AQYGfTTjIayEhYhIsEcAn9S5Uq6rukaZlmoTx56lzlu9Faa2sbQo_qOm5jdUrS0nSVrm2ZscZC8XdJpdX-xnVnyIBIzISkgD2bbI6w3E0zkQeaq7uvSjoid3hYYCslbqPoghmMKD59lioL7Eo3UbxDZWBk5j4V56ws0wj7Q1vh0SV0eN76Fkn4YamG9rQqp4UtIEtWmaUkG4RxnKfS5FfJ4Q3lTgUOTZtbJf2Sf3Sm0aXDSJmWTXiFEtWYLAjiIRpp5F6AHcukHh6gzNGQwyq2TH8doVN2X93REjYdFOlmdNsMRDRR161gJ7xrLllJSjokZSoXKJkQmdG1ECMHT8ybtFpsAUxeuA7Ga8nF3jRvZQQ_VnSIbgXqeDTfCPsyz35o0XrvxI19IgzG07mvw9V0-wM9TdXdYPyJF0LYGIeiOH-ncs0ejyP04s_KJhCcgve7a5WIUEZN7uc3hOIDP2V1Rh7h9tkx4G4E_yWdWccvCZoRPai4SKkvQh3C8yvoz5I1Sr-HBgJsqvfCqvjeMh6UwP_alLnLQqV9ZSfAG1tjguGC_o2xqV90qH45IcZIoH_AujwdF9OHl-wpotzJrTpaoT7KwMoIoPHdjK-LM7I3C32IVc9aFCEz6PlUK6k7LtMbRbbdGpyHG0NSDfuXrLk523YzJvUZh9jqttN1x8ckh_675_TpCIBkh0ayJZUJ9z54rnDot3SzEV9-gF3fWkYp79vpTlitQPA-Z0ULXQ3MLaNmtYKQGaXuu6i1NjdBp1_OuVCcKqfcseH6dADdxtbmM2nuZdUBvA-rHFT7YK1M0n7AAJVjT4HyAQbPcLaDpxV0cGWUg2pwhCKki_KPZVASo7wzQS9DSK8SX5IrJV8cASQJBPyWLQiJrTwE8SkiDdiSPiCmlWRSxOQVhXimbg0xr1MKhCpjflmQXOqKkdxgrth00ce5Sx6iCNErCNN7s1ea0OVuT4K8kKBBj4eS-Yl-ICAncWK-x6HDRv5bf2fmpUNDR7GTs6JtdXje5fV7ru0oRkiaVS5uAIfAUK_bVXHb5QpydZXJumOz8N1bSJGjb_rviTVtEJi9mOvVFOlvOuw9opm4PurzLGMyOxTDxIQXCwKMCDYo7HWiAr7WnV973i3V1UoSHMit33HE8e_7bNVWbx5WtkzqJxjeeqXmcFj1jGh7DS8cfM6IU-DKGrljZ-wnhLpUcW4RjJ2hHHBK6iAJ7jEEDHoYKc81O2_8x9JvLznSaLgRD3ay3P0MzzEkHDD26PFPKHfJG_qiljHDtp0C6IOOxvJe-keON7pqoVzUT0TqWsArC7X8mJv4VqH__ni6Jp1iKhAKf1jx0LPG-EpZPi4oR0FFcCqD38K_8NGnwkkWlPijLnOtZb9lKZuCxcK120nNEcKoVj3MP4uiYIc6MtKP9ICRXbvrc2EOrG5T8g1Enbd6feJsp-eDJvj2BgvfdIieaAIArVVAcfVslGjMlbr-NwMaFFOJpDzpttJQF-6Ph2GC-FzGYz_hGmAPZKmW_tdMCyWfkrzg1PTDfb7IPRFe_FRqJbL2t4UTJXCWnYtZEwH1tsVgx2pYGPeArmDQvDpzD8fR3y4imH-eIjf21KIrH_KMzuFnspgxtVhlMLUJMhp3addgrDJSDTD_i2L3LoF8S8E5jPKN2SOU9oltd1MoguSkYQtlbVBZK1a5O9bTndF-WrN0akLswzd34EYwsddVMJKWcLVFpJNtoo8iYWDxukysJDMAT0t7IZrruqc&security=reality&sid=19804ea488ef93&sni=www.amazon.com&spx=%2FelWITgBKMBTckg8&type=xhttp&x_padding_bytes=100-1000#vpn%20%28clone%29-nnenu7b8ia-5.00GB%F0%9F%93%8A-1D%E2%8F%B3"
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
