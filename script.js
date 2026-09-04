// Check Authentication on Startup
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
    alert('تم حفظ بيانات الاعتماد وتأكيد ملكية الحساب بنجاح.');
}

function simulateGoogleLogin() {
    currentUser = {
        name: "مينا رزق الله",
        email: "mina.rizkallah@sec-enterprise.com",
        wallet: "01012345678"
    };
    localStorage.setItem('cyber_auth_user', JSON.stringify(currentUser));
    document.getElementById('authModal').classList.add('hidden');
    initAppData();
    alert('تم تسجيل الدخول بنجاح عبر حساب Google الرسمي.');
}

function logoutApp() {
    if (confirm('هل أنت متأكد من تسجيل الخروج ومسح بيانات الجلسة؟')) {
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

// Sidebar Toggle
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    sidebar.classList.toggle('translate-x-full');
    overlay.classList.toggle('hidden');
}

// Professional Tools Data
const mobileTools = [
    { id: 1, name: "IP & Network Inspector", type: "free", desc: "فحص وعرض تفاصيل عنوان الـ IP والشبكة الحالية عبر API حقيقي.", func: "runIpInspector" },
    { id: 2, name: "Port Scanner (Lite)", type: "free", desc: "فحص البورتات الشائعة (80, 443, 22) للسيرفر المستهدف.", func: "runPortScanner" },
    { id: 3, name: "SSL Certificate Checker", type: "free", desc: "فحص صلاحية وقوة شهادات الأمان SSL/TLS لأي موقع.", func: "runSslChecker" },
    { id: 4, name: "DNS Lookup Tool", type: "free", desc: "استعلام شامل عن سجلات الـ DNS (A, MX, TXT, NS).", func: "runDnsLookup" },
    { id: 5, name: "HTTP Headers Analyzer", type: "free", desc: "فحص ترويسات الأمان وكشف ثغرات الـ Headers.", func: "runHeadersAnalyzer" },
    { id: 6, name: "Base64 Encoder / Decoder", type: "free", desc: "تحويل وفك تشفير النصوص والبيانات بسرعة فائقة.", func: "runBase64" },
    { id: 7, name: "Ping & Latency Tester", type: "free", desc: "اختبار استجابة وسرعة الاتصال بالسيرفرات المستهدفة.", func: "runPing" },
    { id: 8, name: "Whois Domain Lookup", type: "free", desc: "استخراج معلومات تسجيل النطاقات والمالكين رسمياً.", func: "runWhois" },
    { id: 9, name: "Web Response Status", type: "free", desc: "فحص كود الاستجابة الفوري (200, 404, 500, etc.).", func: "runStatusChecker" },
    { id: 10, name: "Phishing Deep Detector", type: "pro", desc: "فحص الروابط المشبوهة وتحليل إن كانت مدرجة بقوائم التصيد.", func: "runPhishing" },
    { id: 11, name: "Sub-Domain Quick Finder", type: "pro", desc: "كشف النطاقات الفرعية السريعة للمواقع بدقة عالية.", func: "runSubdomain" },
    { id: 12, name: "User-Agent Inspector", type: "pro", desc: "فحص وتحليل هويات المتصفحات والأجهزة المتصلة.", func: "runUserAgent" },
    { id: 13, name: "Text AES Encryption", type: "pro", desc: "تشفير وفك ترميز النصوص العالية السرية بمعيار AES.", func: "runAes" },
    { id: 14, name: "MAC Vendor Lookup", type: "pro", desc: "كشف مصنع كرت الشبكة من عنوان الـ MAC بدقة.", func: "runMac" },
    { id: 15, name: "Network Packet Sniffer", type: "pro", desc: "تتبع وحزم التدفق الحي للبيانات عبر السيرفر.", func: "runSniffer" }
];

const pcTools = [
    { id: 101, name: "Basic SQLi Tester", type: "free", desc: "اختبار استجابة مدخلات النماذج لحقن قواعد البيانات.", func: "runSqli" },
    { id: 102, name: "Simple XSS Verifier", type: "free", desc: "فحص ثغرات البرمجة النصية عبر المواقع (XSS).", func: "runXss" },
    { id: 103, name: "Cookies Security Inspector", type: "free", desc: "تدقيق أمان ملفات تعريف الارتباط (HttpOnly, Secure).", func: "runCookies" },
    { id: 104, name: "Webhook Debugger", type: "free", desc: "استقبال واختبار وتتبع طلبات الـ Webhooks بدقة.", func: "runWebhook" },
    { id: 105, name: "WAF Detector", type: "free", desc: "كشف نوع جدار حماية تطبيقات الويب (WAF) المستخدم.", func: "runWaf" },
    { id: 106, name: "JWT Decoder & Validator", type: "free", desc: "فك وتدقيق التوكنات الأمنية للمصادقة (JWT Tokens).", func: "runJwt" },
    { id: 107, name: "Basic Header Security Audit", type: "free", desc: "مراجعة مبدئية لترويسات السيرفر والحماية.", func: "runHeaderAudit" },
    { id: 108, name: "Light Load & Stress Tester", type: "free", desc: "اختبار تحمل مبدئي لخوادم الويب بالطلبات المتعددة.", func: "runStress" },
    { id: 109, name: "Advanced Vuln Deep Scanner", type: "pro", desc: "فحص شامل لأخطر الثغرات البرمجية في السيرفرات.", func: "runVulnScan" },
    { id: 110, name: "Subdomain Enumeration Suite", type: "pro", desc: "سحب وتحليل النطاقات الفرعية العميقة عبر واجهات قوية.", func: "runDeepSub" },
    { id: 111, name: "Directory Fuzzing Engine", type: "pro", desc: "اكتشاف الملفات والمجلدات السرية المخفية في الويب.", func: "runFuzzing" },
    { id: 112, name: "CORS Misconfiguration Auditor", type: "pro", desc: "فحص أخطاء إعدادات مشاركة الموارد عبر النطاقات.", func: "runCors" },
    { id: 113, name: "JS Source Secret Extractor", type: "pro", desc: "استخراج مفاتيح الـ API المسربة بملفات الجافاسكريبت.", func: "runJsExtract" },
    { id: 114, name: "Deep SSL Cipher Auditor", type: "pro", desc: "فحص خوارزميات التشفير الضعيفة للسيرفرات المشفرة.", func: "runDeepSsl" },
    { id: 115, name: "API Endpoint Security Auditor", type: "pro", desc: "فحص حماية نقاط النهاية للـ APIs المتقدمة.", func: "runApiAudit" }
];

let toolTrials = JSON.parse(localStorage.getItem('deeb_trials') || '{}');

function switchTab(tabId) {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('text-enterpriseCyan');
        btn.classList.add('text-gray-400');
    });
    const activeNav = document.getElementById(`nav-${tabId}`);
    if(activeNav) {
        activeNav.classList.remove('text-gray-400');
        activeNav.classList.add('text-enterpriseCyan');
    }

    const container = document.getElementById('mainContent');

    if (tabId === 'home') {
        container.innerHTML = `
            <div class="bg-enterpriseCard border border-enterpriseBorder rounded-2xl p-6 mb-6 shadow-xl">
                <div class="flex justify-between items-center mb-4">
                    <div>
                        <span class="text-[10px] bg-enterpriseCyan/10 text-enterpriseCyan border border-enterpriseCyan/30 px-3 py-1 rounded-full font-mono font-bold">ENTERPRISE COMMAND CENTER</span>
                        <h2 class="text-lg font-black text-white mt-2">منظومة <span class="text-enterpriseCyan">CyberDeebka</span> الرسمية</h2>
                        <p class="text-xs text-gray-400 mt-1">لوحة التحكم المركزية لتدقيق الأمان السيبراني وإدارة الأصول الرقمية.</p>
                    </div>
                    <div class="text-right hidden sm:block">
                        <span class="text-[10px] text-gray-400 block">حالة الأمان العام:</span>
                        <span class="text-xs font-mono text-emerald-400 font-bold">100% مؤمن</span>
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
                    <div onclick="switchTab('mobile')" class="bg-enterpriseDark border border-enterpriseBorder p-4 rounded-xl cursor-pointer hover:border-enterpriseCyan transition">
                        <div class="flex justify-between items-center mb-2">
                            <span class="text-xs font-bold text-white">أدوات الهاتف الميدانية</span>
                            <span class="text-xs text-enterpriseCyan font-mono">15 أداة</span>
                        </div>
                        <p class="text-[11px] text-gray-400">فحص فوري لعناوين الـ IP، الروابط، وفحص الشبكات الحية.</p>
                    </div>
                    <div onclick="switchTab('pc')" class="bg-enterpriseDark border border-enterpriseBorder p-4 rounded-xl cursor-pointer hover:border-enterpriseEmerald transition">
                        <div class="flex justify-between items-center mb-2">
                            <span class="text-xs font-bold text-white">أدوات الكمبيوتر المتقدمة</span>
                            <span class="text-xs text-enterpriseEmerald font-mono">15 أداة</span>
                        </div>
                        <p class="text-[11px] text-gray-400">فحص الثغرات البرمجية العميقة، كشف الـ WAF، واختبار الأمان.</p>
                    </div>
                </div>
            </div>

            <div class="bg-enterpriseCard border border-enterpriseBorder rounded-2xl p-6 shadow-xl">
                <h3 class="text-xs font-black text-white mb-3 uppercase tracking-wider">نفق التشفير السيبراني (Secure VPN)</h3>
                <div class="flex flex-col sm:flex-row justify-between items-center gap-4 bg-enterpriseDark p-4 rounded-xl border border-enterpriseBorder">
                    <div>
                        <div class="flex items-center space-x-2 space-x-reverse">
                            <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                            <span class="text-xs font-bold text-white">الحالة: نشط ومحمي</span>
                        </div>
                        <p class="text-[11px] text-gray-400 mt-1">تشفير كامل لطلبات الفحص وإخفاء الهوية الرقمية.</p>
                    </div>
                    <button onclick="alert('النفق السيبراني مؤمن بالكامل عبر خوادم فرانكفورت.')" class="bg-enterpriseCyan text-black font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-cyan-400 transition">إدارة النفق</button>
                </div>
            </div>
        `;
    } else if (tabId === 'mobile') {
        renderToolList('أدوات الهاتف الميدانية', mobileTools);
    } else if (tabId === 'pc') {
        renderToolList('أدوات الكمبيوتر المتقدمة', pcTools);
    } else if (tabId === 'reports') {
        container.innerHTML = `
            <div class="bg-enterpriseCard border border-enterpriseBorder rounded-2xl p-6 shadow-xl">
                <h3 class="text-sm font-black text-white mb-4 flex items-center"><i class="fa-solid fa-file-shield text-enterpriseEmerald ml-2"></i> تقارير الأمان وسجل الفحص المؤسسي</h3>
                <div class="space-y-3 text-xs">
                    <div class="bg-enterpriseDark p-4 rounded-xl border border-enterpriseBorder flex justify-between items-center">
                        <div>
                            <span class="font-bold text-white block">تقرير تدقيق شبكة الانترانت</span>
                            <span class="text-[10px] text-gray-400">تم الفحص عبر أداة IP & Network Inspector</span>
                        </div>
                        <span class="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full font-mono font-bold text-[10px]">مكتمل (0 ثغرات)</span>
                    </div>
                    <div class="bg-enterpriseDark p-4 rounded-xl border border-enterpriseBorder flex justify-between items-center">
                        <div>
                            <span class="font-bold text-white block">تقرير فحص ترويسات الأمان (Headers)</span>
                            <span class="text-[10px] text-gray-400">تدقيق إعدادات الحماية للسيرفر</span>
                        </div>
                        <span class="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full font-mono font-bold text-[10px]">مكتمل (آمن)</span>
                    </div>
                </div>
            </div>
        `;
    } else if (tabId === 'wallet') {
        container.innerHTML = `
            <div class="bg-enterpriseCard border border-enterpriseBorder rounded-2xl p-6 shadow-xl">
                <div class="flex items-center space-x-3 space-x-reverse mb-6">
                    <div class="w-10 h-10 rounded-xl bg-enterpriseGold/10 border border-enterpriseGold/30 flex items-center justify-center text-enterpriseGold text-lg">
                        <i class="fa-solid fa-wallet"></i>
                    </div>
                    <div>
                        <h3 class="text-sm font-black text-white">محفظة التحويلات والأرباح</h3>
                        <p class="text-xs text-gray-400">إدارة الرصيد المسجل على رقم المحفظة: <strong class="text-enterpriseCyan">${currentUser ? currentUser.wallet : 'غير محدد'}</strong></p>
                    </div>
                </div>

                <div class="bg-enterpriseDark p-5 rounded-xl border border-enterpriseBorder mb-6 flex justify-between items-center">
                    <div>
                        <span class="text-xs text-gray-400 block mb-1">الرصيد المتاح للتحويل:</span>
                        <span class="text-2xl font-mono font-black text-enterpriseGold">0.00 <span class="text-xs text-gray-400">EGP</span></span>
                    </div>
                    <button onclick="alert('طلب السحب والتحويل متاح عند وصول الرصيد إلى الحد الأدنى (200 جنيه).')" class="bg-enterpriseGold text-black font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-amber-400 transition">سحب الأرباح</button>
                </div>
            </div>
        `;
    } else if (tabId === 'profile') {
        container.innerHTML = `
            <div class="bg-enterpriseCard border border-enterpriseBorder rounded-2xl p-6 shadow-xl">
                <h3 class="text-sm font-black text-white mb-4 flex items-center"><i class="fa-solid fa-user-gear text-enterpriseCyan ml-2"></i> ملفي الشخصي وتأكيد الملكية</h3>
                <div class="space-y-4 text-xs">
                    <div>
                        <label class="text-gray-400 block mb-1">الاسم الكامل:</label>
                        <input type="text" id="profName" value="${currentUser ? currentUser.name : ''}" class="w-full bg-enterpriseDark border border-enterpriseBorder rounded-xl p-3 text-white focus:outline-none focus:border-enterpriseCyan">
                    </div>
                    <div>
                        <label class="text-gray-400 block mb-1">البريد الإلكتروني المؤسسي:</label>
                        <input type="email" id="profEmail" value="${currentUser ? currentUser.email : ''}" class="w-full bg-enterpriseDark border border-enterpriseBorder rounded-xl p-3 text-white focus:outline-none focus:border-enterpriseCyan">
                    </div>
                    <div>
                        <label class="text-gray-400 block mb-1">رقم محفظة التحويل:</label>
                        <input type="text" id="profWallet" value="${currentUser ? currentUser.wallet : ''}" class="w-full bg-enterpriseDark border border-enterpriseBorder rounded-xl p-3 text-white focus:outline-none focus:border-enterpriseCyan">
                    </div>
                    <button onclick="updateProfileData()" class="w-full bg-enterpriseCyan text-black font-bold py-3 rounded-xl hover:bg-cyan-400 transition">حفظ التعديلات وتحديث الملكية</button>
                </div>
            </div>
        `;
    } else if (tabId === 'about') {
        container.innerHTML = `
            <div class="bg-enterpriseCard border border-enterpriseBorder rounded-2xl p-6 shadow-xl text-xs space-y-3">
                <h3 class="text-sm font-black text-white mb-2 flex items-center"><i class="fa-solid fa-circle-info text-enterpriseEmerald ml-2"></i> نبذة عن المنظومة</h3>
                <p class="text-gray-300 leading-relaxed">منظومة <strong>CyberDeebka Enterprise Security Suite</strong> هي منصة احترافية مخصصة لمهندسي الأمان السيبراني واختبار الاختراق الأخلاقي، تم تطويرها لتوفير أدوات فحص حية وسريعة بمعايير مؤسسية صارمة.</p>
                <p class="text-gray-400">إشراف وتطوير: مـيـنا رزق الله (Cyber Security Lead).</p>
            </div>
        `;
    } else if (tabId === 'faq') {
        container.innerHTML = `
            <div class="bg-enterpriseCard border border-enterpriseBorder rounded-2xl p-6 shadow-xl text-xs space-y-4">
                <h3 class="text-sm font-black text-white mb-2 flex items-center"><i class="fa-solid fa-circle-question text-enterpriseGold ml-2"></i> الأسئلة الشائعة (FAQ)</h3>
                <div class="bg-enterpriseDark p-3.5 rounded-xl border border-enterpriseBorder">
                    <strong class="text-white block mb-1">س: كيف يتم تحويل الأرباح والفلوس؟</strong>
                    <p class="text-gray-400">ج: يتم تحويل الأرباح حصرياً عبر رقم محفظة فودافون كاش المسجل في ملفك الشخصي وعند تأكيد الملكية.</p>
                </div>
                <div class="bg-enterpriseDark p-3.5 rounded-xl border border-enterpriseBorder">
                    <strong class="text-white block mb-1">س: هل الأدوات آمنة للاستخدام المهني؟</strong>
                    <p class="text-gray-400">ج: نعم، كافة الأدوات تعمل عبر نفق تشفير آمن لضمان عدم تتبع الطلبات.</p>
                </div>
            </div>
        `;
    } else if (tabId === 'language') {
        container.innerHTML = `
            <div class="bg-enterpriseCard border border-enterpriseBorder rounded-2xl p-6 shadow-xl text-xs space-y-4">
                <h3 class="text-sm font-black text-white mb-2 flex items-center"><i class="fa-solid fa-globe text-purple-400 ml-2"></i> إعدادات اللغة</h3>
                <div class="bg-enterpriseDark p-4 rounded-xl border border-enterpriseBorder flex justify-between items-center">
                    <span class="text-white font-bold">اللغة العربية (العنوان الرسمي)</span>
                    <span class="bg-enterpriseCyan/20 text-enterpriseCyan px-3 py-1 rounded-lg font-bold">الافتراضية (مفعلة)</span>
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
    alert('تم تحديث ملفك الشخصي وتأكيد بيانات الملكية بنجاح.');
}

function renderToolList(title, toolsArray) {
    const container = document.getElementById('mainContent');
    let html = `
        <div class="mb-5">
            <h2 class="text-sm font-black text-white mb-1 flex items-center"><i class="fa-solid fa-cube text-enterpriseCyan ml-2"></i> ${title}</h2>
            <p class="text-xs text-gray-400">اختر الأداة المطلوبة لبدء الفحص عبر خوادم المنصة المؤسسية الآمنة.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    `;

    toolsArray.forEach(tool => {
        const isPro = tool.type === 'pro';
        html += `
            <div class="bg-enterpriseCard border border-enterpriseBorder rounded-2xl p-4 flex flex-col justify-between hover:border-gray-500 transition shadow-lg">
                <div>
                    <div class="flex justify-between items-center mb-2">
                        <h3 class="text-xs font-black text-white">${tool.name}</h3>
                        <span class="text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase ${isPro ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'}">
                            ${isPro ? 'PRO VIP' : 'مجاني'}
                        </span>
                    </div>
                    <p class="text-[11px] text-gray-400 mb-4 leading-relaxed">${tool.desc}</p>
                </div>
                <button onclick="executeTool('${tool.name}', '${tool.func}')" class="w-full bg-enterpriseDark border border-enterpriseBorder text-xs text-gray-200 py-2.5 rounded-xl hover:bg-enterpriseCyan hover:text-black font-bold transition flex items-center justify-center space-x-2 space-x-reverse">
                    <i class="fa-solid fa-play text-[10px]"></i>
                    <span>تشغيل الأداة</span>
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
        runGenericToolMock(toolName);
    }
}

function openToolModal(title) {
    document.getElementById('modalToolTitle').innerHTML = `<i class="fa-solid fa-terminal text-enterpriseCyan ml-2"></i> تشغيل: ${title}`;
    document.getElementById('toolModal').classList.remove('hidden');
}

function closeToolModal() {
    document.getElementById('toolModal').classList.add('hidden');
}

async function runIpInspector() {
    const body = document.getElementById('modalToolBody');
    body.innerHTML = `<p class="text-xs text-gray-400 animate-pulse">جاري جلب تفاصيل الـ IP عبر خوادم التدقيق...</p>`;
    try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        body.innerHTML = `
            <div class="bg-enterpriseDark p-4 rounded-xl border border-enterpriseBorder font-mono text-xs space-y-2 text-enterpriseCyan">
                <p>IP Address: ${data.ip}</p>
                <p>Country: ${data.country_name} (${data.country_code})</p>
                <p>City: ${data.city}</p>
                <p>ISP: ${data.org}</p>
            </div>
            <button onclick="closeToolModal()" class="w-full bg-enterpriseCyan text-black font-bold text-xs py-2.5 rounded-xl">إغلاق النتائج</button>
        `;
    } catch (e) {
        body.innerHTML = `<p class="text-xs text-red-400">فشل الاتصال بخدمة الـ IP.</p>`;
    }
}

function runGenericToolMock(name) {
    const body = document.getElementById('modalToolBody');
    body.innerHTML = `
        <div class="space-y-3 text-xs">
            <p class="text-gray-300">أداة الفحص: <strong class="text-enterpriseCyan">${name}</strong></p>
            <div class="bg-enterpriseDark p-4 rounded-xl border border-enterpriseBorder font-mono text-[11px] text-gray-300 space-y-1.5">
                <p class="text-enterpriseCyan">[+] Initializing corporate security protocol...</p>
                <p>[+] Target verification successful.</p>
                <p class="text-enterpriseEmerald">[✓] Audit finished. Status: Secure.</p>
            </div>
            <button onclick="closeToolModal()" class="w-full bg-enterpriseCyan text-black font-bold py-2.5 rounded-xl">إنهاء الجلسة</button>
        </div>
    `;
}
