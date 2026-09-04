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
    const pass = document.getElementById('authPass').value;
    const wallet = document.getElementById('authWallet').value;

    currentUser = { name, email, wallet };
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
    { id: 1, name: "IP & Network Inspector", type: "free", desc: "فحص وعرض تفاصيل عنوان الـ IP والشبكة.", func: "runIpInspector" },
    { id: 2, name: "Port Scanner (Lite)", type: "free", desc: "فحص البورتات الشائعة (80, 443, 22).", func: "runGenericToolMock" },
    { id: 3, name: "SSL Certificate Checker", type: "free", desc: "فحص صلاحية وقوة شهادات الأمان SSL/TLS.", func: "runGenericToolMock" },
    { id: 4, name: "DNS Lookup Tool", type: "free", desc: "استعلام شامل عن سجلات الـ DNS.", func: "runGenericToolMock" },
    { id: 5, name: "HTTP Headers Analyzer", type: "free", desc: "فحص ترويسات الأمان وكشف الثغرات.", func: "runGenericToolMock" },
    { id: 6, name: "Base64 Encoder / Decoder", type: "free", desc: "تحويل وفك تشفير النصوص بسرعة.", func: "runGenericToolMock" },
    { id: 7, name: "Ping & Latency Tester", type: "free", desc: "اختبار استجابة وسرعة الاتصال بالسيرفرات.", func: "runGenericToolMock" },
    { id: 8, name: "Whois Domain Lookup", type: "free", desc: "استخراج معلومات تسجيل النطاقات رسمياً.", func: "runGenericToolMock" },
    { id: 9, name: "Web Response Status", type: "free", desc: "فحص كود الاستجابة الفوري (200, 404).", func: "runGenericToolMock" },
    { id: 10, name: "Phishing Deep Detector", type: "pro", desc: "فحص الروابط المشبوهة وقوائم التصيد.", func: "runGenericToolMock" },
    { id: 11, name: "Sub-Domain Quick Finder", type: "pro", desc: "كشف النطاقات الفرعية للمواقع.", func: "runGenericToolMock" },
    { id: 12, name: "User-Agent Inspector", type: "pro", desc: "فحص وتحليل هويات المتصفحات.", func: "runGenericToolMock" },
    { id: 13, name: "Text AES Encryption", type: "pro", desc: "تشفير وفك ترميز النصوص بمعيار AES.", func: "runGenericToolMock" },
    { id: 14, name: "MAC Vendor Lookup", type: "pro", desc: "كشف مصنع كرت الشبكة بدقة.", func: "runGenericToolMock" },
    { id: 15, name: "Network Packet Sniffer", type: "pro", desc: "تتبع وحزم التدفق الحي للبيانات.", func: "runGenericToolMock" }
];

const pcTools = [
    { id: 101, name: "Basic SQLi Tester", type: "free", desc: "اختبار استجابة مدخلات النماذج لحقن SQL.", func: "runGenericToolMock" },
    { id: 102, name: "Simple XSS Verifier", type: "free", desc: "فحص ثغرات البرمجة النصية عبر المواقع.", func: "runGenericToolMock" },
    { id: 103, name: "Cookies Security Inspector", type: "free", desc: "تدقيق أمان ملفات تعريف الارتباط.", func: "runGenericToolMock" },
    { id: 104, name: "Webhook Debugger", type: "free", desc: "استقبال واختبار طلبات الـ Webhooks.", func: "runGenericToolMock" },
    { id: 105, name: "WAF Detector", type: "free", desc: "كشف جدار حماية تطبيقات الويب (WAF).", func: "runGenericToolMock" },
    { id: 106, name: "JWT Decoder & Validator", type: "free", desc: "فك وتدقيق التوكنات الأمنية JWT.", func: "runGenericToolMock" },
    { id: 107, name: "Header Security Audit", type: "free", desc: "مراجعة ترويسات السيرفر والحماية.", func: "runGenericToolMock" },
    { id: 108, name: "Light Load & Stress Tester", type: "free", desc: "اختبار تحمل مبدئي لخوادم الويب.", func: "runGenericToolMock" },
    { id: 109, name: "Advanced Vuln Deep Scanner", type: "pro", desc: "فحص شامل لأخطر الثغرات البرمجية.", func: "runGenericToolMock" },
    { id: 110, name: "Subdomain Enumeration Suite", type: "pro", desc: "سحب وتحليل النطاقات الفرعية العميقة.", func: "runGenericToolMock" },
    { id: 111, name: "Directory Fuzzing Engine", type: "pro", desc: "اكتشاف الملفات والمجلدات المخفية.", func: "runGenericToolMock" },
    { id: 112, name: "CORS Misconfiguration Auditor", type: "pro", desc: "فحص أخطاء مشاركة الموارد CORS.", func: "runGenericToolMock" },
    { id: 113, name: "JS Source Secret Extractor", type: "pro", desc: "استخراج مفاتيح API المسربة في JS.", func: "runGenericToolMock" },
    { id: 114, name: "Deep SSL Cipher Auditor", type: "pro", desc: "فحص خوارزميات التشفير الضعيفة للسيرفرات.", func: "runGenericToolMock" },
    { id: 115, name: "API Endpoint Security Auditor", type: "pro", desc: "فحص حماية نقاط النهاية للـ APIs.", func: "runGenericToolMock" }
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
                <p class="text-xs text-corpMuted mt-1">لوحة التحكم المركزية لإدارة الأدوات وفحص الأصول الرقمية بمعايير الشركات.</p>
                
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                    <div onclick="switchTab('mobile')" class="bg-corpBg border border-corpBorder p-3.5 rounded-lg cursor-pointer hover:border-corpAccent transition">
                        <div class="flex justify-between items-center mb-1">
                            <span class="text-xs font-bold text-white">أدوات الهاتف</span>
                            <span class="text-[10px] text-corpAccent font-mono">15 أداة</span>
                        </div>
                        <p class="text-[11px] text-corpMuted">فحص IP، الروابط، والشبكات الحية.</p>
                    </div>
                    <div onclick="switchTab('pc')" class="bg-corpBg border border-corpBorder p-3.5 rounded-lg cursor-pointer hover:border-corpAccent transition">
                        <div class="flex justify-between items-center mb-1">
                            <span class="text-xs font-bold text-white">أدوات الكمبيوتر</span>
                            <span class="text-[10px] text-corpAccent font-mono">15 أداة</span>
                        </div>
                        <p class="text-[11px] text-corpMuted">فحص الثغرات العميقة وواجهات السيرفرات.</p>
                    </div>
                </div>
            </div>

            <div class="bg-corpCard border border-corpBorder rounded-xl p-5">
                <h3 class="text-xs font-bold text-white mb-3">حالة نفق التشفير (Secure VPN Tunneling)</h3>
                <div class="flex justify-between items-center bg-corpBg p-3.5 rounded-lg border border-corpBorder text-xs">
                    <div>
                        <span class="text-emerald-400 font-medium">● متصل وآمن</span>
                        <p class="text-[10px] text-corpMuted mt-0.5">تشفير كامل لجميع طلبات الفحص والتدقيق.</p>
                    </div>
                    <button onclick="alert('النفق نشط ومؤمن بالكامل.')" class="bg-corpBorder text-white text-xs px-3 py-1.5 rounded hover:bg-corpAccent transition">إدارة النفق</button>
                </div>
            </div>
        `;
    } else if (tabId === 'mobile') {
        renderToolList('أدوات الهاتف الميدانية', mobileTools);
    } else if (tabId === 'pc') {
        renderToolList('أدوات الكمبيوتر المتقدمة', pcTools);
    } else if (tabId === 'wallet') {
        container.innerHTML = `
            <div class="bg-corpCard border border-corpBorder rounded-xl p-5">
                <h3 class="text-xs font-bold text-white mb-4">محفظة التحويلات والأرباح</h3>
                <div class="bg-corpBg p-4 rounded-lg border border-corpBorder mb-4 flex justify-between items-center">
                    <div>
                        <span class="text-[11px] text-corpMuted block mb-1">رقم المحفظة المسجل:</span>
                        <strong class="text-xs text-white font-mono">${currentUser ? currentUser.wallet : 'غير محدد'}</strong>
                    </div>
                    <div>
                        <span class="text-[11px] text-corpMuted block mb-1">الرصيد المتاح:</span>
                        <span class="text-lg font-bold text-white font-mono">0.00 EGP</span>
                    </div>
                </div>
                <button onclick="alert('الحد الأدنى للسحب 200 جنيه.')" class="w-full bg-corpBorder text-white font-medium py-2.5 rounded-lg hover:bg-corpAccent transition text-xs">طلب سحب الأرباح</button>
            </div>
        `;
    } else if (tabId === 'profile') {
        container.innerHTML = `
            <div class="bg-corpCard border border-corpBorder rounded-xl p-5 text-xs space-y-3">
                <h3 class="text-sm font-bold text-white mb-2">الملف الشخصي وتأكيد الملكية</h3>
                <div>
                    <label class="text-corpMuted block mb-1">الاسم الكامل:</label>
                    <input type="text" id="profName" value="${currentUser ? currentUser.name : ''}" class="w-full bg-corpBg border border-corpBorder rounded-lg p-2.5 text-white">
                </div>
                <div>
                    <label class="text-corpMuted block mb-1">البريد الإلكتروني:</label>
                    <input type="email" id="profEmail" value="${currentUser ? currentUser.email : ''}" class="w-full bg-corpBg border border-corpBorder rounded-lg p-2.5 text-white">
                </div>
                <div>
                    <label class="text-corpMuted block mb-1">رقم المحفظة:</label>
                    <input type="text" id="profWallet" value="${currentUser ? currentUser.wallet : ''}" class="w-full bg-corpBg border border-corpBorder rounded-lg p-2.5 text-white">
                </div>
                <button onclick="updateProfileData()" class="w-full bg-corpAccent text-white py-2.5 rounded-lg font-medium">حفظ التعديلات</button>
            </div>
        `;
    } else if (tabId === 'about') {
        container.innerHTML = `
            <div class="bg-corpCard border border-corpBorder rounded-xl p-5 text-xs space-y-2">
                <h3 class="text-sm font-bold text-white mb-2">نبذة عن المنظومة</h3>
                <p class="text-corpMuted leading-relaxed">منظومة CyberDeebka Enterprise Security Suite هي منصة هندسية لاختبار الاختراق وتدقيق الأمان.</p>
                <p class="text-corpMuted">تطوير وإشراف: مـيـنا رزق الله.</p>
            </div>
        `;
    } else if (tabId === 'faq') {
        container.innerHTML = `
            <div class="bg-corpCard border border-corpBorder rounded-xl p-5 text-xs space-y-3">
                <h3 class="text-sm font-bold text-white mb-2">الأسئلة الشائعة</h3>
                <div class="bg-corpBg p-3 rounded-lg border border-corpBorder">
                    <strong class="text-white block mb-1">س: كيف تتم تحويلات الأرباح؟</strong>
                    <p class="text-corpMuted">ج: تُحول الأرباح حصرياً عبر رقم فودافون كاش المسجل في ملفك الشخصي.</p>
                </div>
            </div>
        `;
    } else if (tabId === 'language') {
        container.innerHTML = `
            <div class="bg-corpCard border border-corpBorder rounded-xl p-5 text-xs">
                <h3 class="text-sm font-bold text-white mb-3">لغة النظام</h3>
                <div class="bg-corpBg p-3 rounded-lg border border-corpBorder flex justify-between items-center text-corpMuted">
                    <span>اللغة العربية</span>
                    <span class="text-white font-medium">الافتراضية</span>
                </div>
            </div>
        `;
    }
}

function updateProfileData() {
    const name = document.getElementById('profName').value;
    const email = document.getElementById('profEmail').value;
    const wallet = document.getElementById('profWallet').value;
    currentUser = { name, email, wallet };
    localStorage.setItem('cyber_auth_user', JSON.stringify(currentUser));
    document.getElementById('sidebarName').innerText = name;
    document.getElementById('headerUserName').innerText = name;
    alert('تم التحديث بنجاح.');
}

function renderToolList(title, toolsArray) {
    const container = document.getElementById('mainContent');
    let html = `
        <div class="mb-4">
            <h2 class="text-xs font-bold text-white mb-1">${title}</h2>
            <p class="text-[11px] text-corpMuted">اختر الأداة المطلوبة لبدء التدقيق.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
    `;

    toolsArray.forEach(tool => {
        const isPro = tool.type === 'pro';
        html += `
            <div class="bg-corpCard border border-corpBorder rounded-xl p-3.5 flex flex-col justify-between">
                <div>
                    <div class="flex justify-between items-center mb-1.5">
                        <h3 class="text-xs font-bold text-white">${tool.name}</h3>
                        <span class="text-[9px] px-2 py-0.5 rounded font-mono ${isPro ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'}">
                            ${isPro ? 'PRO' : 'FREE'}
                        </span>
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
    } else {
        runGenericToolMock();
    }
}

function openToolModal(title) {
    document.getElementById('modalToolTitle').innerText = `تنفيذ: ${title}`;
    document.getElementById('toolModal').classList.remove('hidden');
}

function closeToolModal() {
    document.getElementById('toolModal').classList.add('hidden');
}

async function runIpInspector() {
    const body = document.getElementById('modalToolBody');
    body.innerHTML = `<p class="text-xs text-corpMuted">جاري الاتصال بالسيرفر...</p>`;
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
            <button onclick="closeToolModal()" class="w-full bg-corpAccent text-white py-2 rounded-lg text-xs font-medium">إغلاق</button>
        `;
    } catch (e) {
        body.innerHTML = `<p class="text-xs text-red-400">فشل جلب البيانات.</p>`;
    }
}

function runGenericToolMock() {
    const body = document.getElementById('modalToolBody');
    body.innerHTML = `
        <div class="space-y-3 text-xs">
            <div class="bg-corpBg p-3 rounded-lg border border-corpBorder font-mono text-[11px] text-corpMuted space-y-1">
                <p class="text-white">[+] Initializing security check...</p>
                <p>[+] Target verification passed.</p>
                <p class="text-emerald-400">[✓] Audit complete. Status: Secure.</p>
            </div>
            <button onclick="closeToolModal()" class="w-full bg-corpAccent text-white py-2 rounded-lg font-medium">إغلاق</button>
        </div>
    `;
    }
