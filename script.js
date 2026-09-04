let currentUser = JSON.parse(localStorage.getItem('cyber_auth_user') || 'null');

window.onload = function() {
    if (!currentUser) {
        document.getElementById('authModal').classList.remove('hidden');
    } else {
        initAppData();
    }
};

function handleAuthSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('authName').value;
    const email = document.getElementById('authEmail').value;
    const country = document.getElementById('authCountry').value;
    currentUser = { name, email, country, wallet: '' };
    localStorage.setItem('cyber_auth_user', JSON.stringify(currentUser));
    document.getElementById('authModal').classList.add('hidden');
    initAppData();
}

function logoutApp() {
    if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
        localStorage.removeItem('cyber_auth_user');
        location.reload();
    }
}

function initAppData() {
    if (currentUser) {
        document.getElementById('sidebarName').innerText = currentUser.name;
        document.getElementById('headerUserName').innerText = currentUser.name;
    }
    switchTab('home');
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    sidebar.classList.toggle('translate-x-full');
    overlay.classList.toggle('hidden');
}

const mobileTools = [
    { id: 1, name: "IP & Network Inspector", type: "free", desc: "فحص وعرض تفاصيل عنوان الـ IP والشبكة الحقيقي.", func: "runIpInspector" },
    { id: 2, name: "Base64 Encoder / Decoder", type: "free", desc: "ترميز وفك تشفير النصوص بترميز Base64 الحقيقي.", func: "runBase64Tool" },
    { id: 3, name: "SHA-256 Hash Generator", type: "free", desc: "توليد التشفير الرياضي الهاش للنصوص الفعلي.", func: "runHashTool" },
    { id: 4, name: "HTTP Latency Tester", type: "free", desc: "قياس زمن الاستجابة الفعلي لطلبات الشبكة.", func: "runLatencyTest" }
];

const pcTools = [
    { id: 101, name: "JSON Formatter & Validator", type: "free", desc: "تدقيق وتنسيق كود JSON حقيقي.", func: "runJsonFormatter" },
    { id: 102, name: "URL Parser & Inspector", type: "free", desc: "تحليل وتفكيك أجزاء الروابط والـ URLs بدقة.", func: "runUrlParser" }
];

function switchTab(tabId) {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('text-corpAccent');
        btn.classList.add('text-corpMuted');
    });
    const activeNav = document.getElementById(`nav-${tabId}`);
    if(activeNav) {
        activeNav.classList.remove('text-corpMuted');
        activeNav.classList.add('text-corpAccent');
    }

    const container = document.getElementById('mainContent');

    if (tabId === 'home') {
        container.innerHTML = `
            <div class="bg-corpCard border border-corpBorder rounded-xl p-5 mb-5">
                <span class="text-[10px] bg-corpBg border border-corpBorder text-corpMuted px-2.5 py-1 rounded font-mono">ENTERPRISE DASHBOARD</span>
                <h2 class="text-base font-bold text-white mt-2">منظومة CyberDeebka للأمان السيبراني</h2>
                <p class="text-xs text-corpMuted mt-1">لوحة التحكم لإدارة الأدوات الحقيقية وفحص الأصول الرقمية.</p>
            </div>
        `;
    } else if (tabId === 'mobile') {
        renderToolList('أدوات الهاتف والشبكات الحقيقية', mobileTools);
    } else if (tabId === 'pc') {
        renderToolList('أدوات تحليل البيانات الفنية', pcTools);
    } else if (tabId === 'wallet') {
        container.innerHTML = `
            <div class="bg-corpCard border border-corpBorder rounded-xl p-5 text-xs space-y-4">
                <h3 class="text-sm font-bold text-white">المحفظة والبيانات المالية</h3>
                <div class="bg-corpBg p-4 rounded-lg border border-corpBorder flex justify-between items-center">
                    <div>
                        <span class="text-corpMuted block mb-1">الرصيد المتاح:</span>
                        <span class="text-base font-bold text-white font-mono">0.00 EGP</span>
                    </div>
                </div>
                <div>
                    <label class="block text-corpMuted mb-1">رقم محفظة التحويل:</label>
                    <input type="text" id="walletNum" value="${currentUser.wallet || ''}" placeholder="010xxxxxxxx" class="w-full bg-corpBg border border-corpBorder rounded-lg p-2.5 text-white">
                </div>
                <button onclick="saveWallet()" class="w-full bg-corpAccent text-white py-2.5 rounded-lg font-medium">حفظ رقم المحفظة</button>
            </div>
        `;
    } else if (tabId === 'profile') {
        container.innerHTML = `
            <div class="bg-corpCard border border-corpBorder rounded-xl p-5 text-xs space-y-3">
                <h3 class="text-sm font-bold text-white mb-2">الملف الشخصي</h3>
                <div>
                    <label class="text-corpMuted block mb-1">الاسم الكامل:</label>
                    <input type="text" id="profName" value="${currentUser.name || ''}" class="w-full bg-corpBg border border-corpBorder rounded-lg p-2.5 text-white">
                </div>
                <div>
                    <label class="text-corpMuted block mb-1">البريد الإلكتروني:</label>
                    <input type="email" id="profEmail" value="${currentUser.email || ''}" class="w-full bg-corpBg border border-corpBorder rounded-lg p-2.5 text-white">
                </div>
                <div>
                    <label class="text-corpMuted block mb-1">البلد:</label>
                    <input type="text" id="profCountry" value="${currentUser.country || ''}" class="w-full bg-corpBg border border-corpBorder rounded-lg p-2.5 text-white">
                </div>
                <button onclick="updateProfileData()" class="w-full bg-corpAccent text-white py-2.5 rounded-lg font-medium">حفظ التعديلات</button>
            </div>
        `;
    } else if (tabId === 'about') {
        container.innerHTML = `
            <div class="bg-corpCard border border-corpBorder rounded-xl p-5 text-xs space-y-2">
                <h3 class="text-sm font-bold text-white mb-2">نبذة عن المنظومة</h3>
                <p class="text-corpMuted leading-relaxed">منظومة هندسية احترافية خالية من الرموز الوهمية والرسوم العبثية.</p>
                <p class="text-corpMuted">إشراف وتطوير: مينا رزق الله.</p>
            </div>
        `;
    }
}

function saveWallet() {
    currentUser.wallet = document.getElementById('walletNum').value;
    localStorage.setItem('cyber_auth_user', JSON.stringify(currentUser));
    alert('تم حفظ رقم محفظة التحويل بنجاح.');
}

function updateProfileData() {
    currentUser.name = document.getElementById('profName').value;
    currentUser.email = document.getElementById('profEmail').value;
    currentUser.country = document.getElementById('profCountry').value;
    localStorage.setItem('cyber_auth_user', JSON.stringify(currentUser));
    document.getElementById('sidebarName').innerText = currentUser.name;
    document.getElementById('headerUserName').innerText = currentUser.name;
    alert('تم التحديث بنجاح.');
}

function renderToolList(title, toolsArray) {
    const container = document.getElementById('mainContent');
    let html = `<div class="mb-4"><h2 class="text-xs font-bold text-white mb-1">${title}</h2><p class="text-[11px] text-corpMuted">أدوات برمجية تشغيلية فعلية.</p></div><div class="grid grid-cols-1 md:grid-cols-2 gap-3">`;
    toolsArray.forEach(tool => {
        html += `
            <div class="bg-corpCard border border-corpBorder rounded-xl p-3.5 flex flex-col justify-between">
                <div>
                    <div class="flex justify-between items-center mb-1.5">
                        <h3 class="text-xs font-bold text-white">${tool.name}</h3>
                        <span class="text-[9px] px-2 py-0.5 rounded font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20">ACTIVE</span>
                    </div>
                    <p class="text-[11px] text-corpMuted mb-3">${tool.desc}</p>
                </div>
                <button onclick="executeTool('${tool.name}', '${tool.func}')" class="w-full bg-corpBg border border-corpBorder text-xs text-corpText py-2 rounded-lg hover:bg-corpAccent hover:text-white transition font-medium">
                    تشغيل الأداة
                </button>
            </div>
        `;
    });
    html += `</div>`;
    container.innerHTML = html;
}

function executeTool(toolName, funcName) {
    openToolModal(toolName);
    if (typeof window[funcName] === 'function') {
        window[funcName]();
    }
}

function openToolModal(title) {
    document.getElementById('modalToolTitle').innerText = `تشغيل: ${title}`;
    document.getElementById('toolModal').classList.remove('hidden');
}

function closeToolModal() {
    document.getElementById('toolModal').classList.add('hidden');
}

async function runIpInspector() {
    const body = document.getElementById('modalToolBody');
    body.innerHTML = `<p class="text-xs text-corpMuted">جاري جلب تفاصيل الـ IP الفعلي...</p>`;
    try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        body.innerHTML = `
            <div class="bg-corpBg p-3 rounded-lg border border-corpBorder font-mono text-xs space-y-1.5 text-white">
                <p>IP: ${data.ip}</p>
                <p>Country: ${data.country_name}</p>
                <p>City: ${data.city}</p>
                <p>ISP: ${data.org}</p>
            </div>
            <button onclick="closeToolModal()" class="w-full bg-corpAccent text-white py-2 rounded-lg text-xs font-medium mt-2">إغلاق</button>
        `;
    } catch (error) {
        body.innerHTML = `<p class="text-xs text-red-400">فشل الاتصال بخدمة جلب الـ IP.</p>`;
    }
}

function runBase64Tool() {
    const body = document.getElementById('modalToolBody');
    body.innerHTML = `
        <div class="space-y-2 text-xs">
            <textarea id="b64Input" placeholder="أدخل النص هنا..." class="w-full h-20 bg-corpBg border border-corpBorder rounded p-2 text-white"></textarea>
            <div class="flex space-x-2 space-x-reverse">
                <button onclick="processB64('encode')" class="flex-1 bg-corpAccent text-white py-2 rounded">تشفير (Encode)</button>
                <button onclick="processB64('decode')" class="flex-1 bg-corpBorder text-white py-2 rounded">فك (Decode)</button>
            </div>
            <div id="b64Result" class="bg-corpBg p-2 rounded border border-corpBorder font-mono text-[11px] text-white min-h-[40px]"></div>
        </div>
    `;
}

function processB64(action) {
    const val = document.getElementById('b64Input').value;
    const resDiv = document.getElementById('b64Result');
    try {
        if (action === 'encode') {
            resDiv.innerText = btoa(unescape(encodeURIComponent(val)));
        } else {
            resDiv.innerText = decodeURIComponent(escape(atob(val)));
        }
    } catch (err) {
        resDiv.innerText = "خطأ: المدخلات غير صالحة لهذه العملية.";
    }
}

async function runHashTool() {
    const body = document.getElementById('modalToolBody');
    body.innerHTML = `
        <div class="space-y-2 text-xs">
            <input type="text" id="hashInput" placeholder="أدخل النص لتوليد SHA-256..." class="w-full bg-corpBg border border-corpBorder rounded p-2 text-white">
            <button onclick="generateSha256()" class="w-full bg-corpAccent text-white py-2 rounded">توليد الهاش</button>
            <div id="hashResult" class="bg-corpBg p-2 rounded border border-corpBorder font-mono text-[11px] text-white break-all"></div>
        </div>
    `;
}

async function generateSha256() {
    const text = document.getElementById('hashInput').value;
    const msgBuffer = new TextEncoder().encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    document.getElementById('hashResult').innerText = hashHex;
}

async function runLatencyTest() {
    const body = document.getElementById('modalToolBody');
    body.innerHTML = `<p class="text-xs text-corpMuted">جاري قياس سرعة الاستجابة الحية...</p>`;
    const start = performance.now();
    try {
        await fetch('https://ipapi.co/json/', { mode: 'no-cors' });
        const end = performance.now();
        const latency = Math.round(end - start);
        body.innerHTML = `
            <div class="bg-corpBg p-3 rounded border border-corpBorder text-xs text-white">
                <p>زمن الاستجابة (Latency): <span class="font-mono text-emerald-400">${latency} ms</span></p>
            </div>
            <button onclick="closeToolModal()" class="w-full bg-corpAccent text-white py-2 rounded text-xs mt-2">إغلاق</button>
        `;
    } catch (err) {
        body.innerHTML = `<p class="text-xs text-red-400">فشل قياس الزمن.</p>`;
    }
}

function runJsonFormatter() {
    const body = document.getElementById('modalToolBody');
    body.innerHTML = `
        <div class="space-y-2 text-xs">
            <textarea id="jsonInput" placeholder='{"key": "value"}' class="w-full h-20 bg-corpBg border border-corpBorder rounded p-2 text-white font-mono"></textarea>
            <button onclick="formatJson()" class="w-full bg-corpAccent text-white py-2 rounded">تدقيق وتنسيق JSON</button>
            <pre id="jsonResult" class="bg-corpBg p-2 rounded border border-corpBorder font-mono text-[10px] text-emerald-400 max-h-32 overflow-auto"></pre>
        </div>
    `;
}

function formatJson() {
    const raw = document.getElementById('jsonInput').value;
    const res = document.getElementById('jsonResult');
    try {
        const parsed = JSON.parse(raw);
        res.innerText = JSON.stringify(parsed, null, 2);
    } catch (e) {
        res.innerText = "خطأ: كود JSON غير صالح (Invalid JSON)";
    }
}

function runUrlParser() {
    const body = document.getElementById('modalToolBody');
    body.innerHTML = `
        <div class="space-y-2 text-xs">
            <input type="text" id="urlInput" placeholder="https://example.com/path?query=1" class="w-full bg-corpBg border border-corpBorder rounded p-2 text-white">
            <button onclick="parseUrl()" class="w-full bg-corpAccent text-white py-2 rounded">تحليل الرابط</button>
            <div id="urlResult" class="bg-corpBg p-2 rounded border border-corpBorder font-mono text-[11px] text-white space-y-1"></div>
        </div>
    `;
}

function parseUrl() {
    const val = document.getElementById('urlInput').value;
    const res = document.getElementById('urlResult');
    try {
        const u = new URL(val);
        res.innerHTML = `
            <p>Protocol: ${u.protocol}</p>
            <p>Host: ${u.host}</p>
            <p>Pathname: ${u.pathname}</p>
            <p>Search Params: ${u.search || 'None'}</p>
        `;
    } catch (e) {
        res.innerText = "خطأ: الرابط المدخل غير صالح.";
    }
                        }
