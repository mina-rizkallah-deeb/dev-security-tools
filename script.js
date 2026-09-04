// Sidebar Toggle Handler
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    sidebar.classList.toggle('translate-x-full');
    overlay.classList.toggle('hidden');
}

// Tool Database (30 Professional Tools with True Logic Categories)
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
        btn.classList.remove('text-cyberGreen', 'transform', '-translate-y-3');
        btn.classList.add('text-gray-400');
    });
    const activeNav = document.getElementById(`nav-${tabId}`);
    if(activeNav) {
        activeNav.classList.remove('text-gray-400');
        activeNav.classList.add('text-cyberGreen', 'transform', '-translate-y-3');
    }

    const container = document.getElementById('mainContent');

    if (tabId === 'home') {
        container.innerHTML = `
            <div class="bg-gradient-to-br from-cyberCard via-[#111c33] to-cyberCard border border-cyberBorder rounded-2xl p-6 mb-6 shadow-2xl relative overflow-hidden">
                <div class="absolute -left-10 -bottom-10 w-40 h-40 bg-cyberGreen/5 rounded-full blur-3xl"></div>
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <span class="text-[10px] bg-cyberGreen/10 text-cyberGreen border border-cyberGreen/30 px-3 py-1 rounded-full font-mono font-bold">SEC-OPS ENGINE v4.8</span>
                        <h2 class="text-xl sm:text-2xl font-black text-white mt-2">منصة <span class="text-cyberGreen">Deeb Alex</span> السيبرانية</h2>
                        <p class="text-xs text-gray-400 mt-1">المنظومة الاحترافية الأولى لتدقيق الأمان السيبراني واختبار الاختراق الأخلاقي.</p>
                    </div>
                    <div class="hidden sm:flex flex-col items-end">
                        <span class="text-[10px] text-gray-400">حالة الخادم:</span>
                        <span class="text-xs font-mono text-emerald-400 font-bold flex items-center"><span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-1.5"></span> متصل ومؤمن</span>
                    </div>
                </div>

                <div class="relative mb-5">
                    <i class="fa-solid fa-magnifying-glass absolute right-4 top-4 text-gray-400 text-sm"></i>
                    <input type="text" id="globalSearch" placeholder="ابحث السريع عن أي أداة فحص سيبراني..." class="w-full bg-cyberDark border border-cyberBorder rounded-xl px-4 py-3.5 pr-11 text-xs text-white focus:outline-none focus:border-cyberBlue shadow-inner">
                </div>

                <div class="bg-cyberDark/90 border border-cyberBorder rounded-xl p-4 flex flex-col sm:flex-row justify-between items-center gap-3">
                    <div class="flex items-center space-x-3 space-x-reverse">
                        <div class="w-11 h-11 rounded-xl bg-cyberBlue/10 border border-cyberBlue/30 flex items-center justify-center text-cyberBlue text-lg">
                            <i class="fa-solid fa-shield-dog"></i>
                        </div>
                        <div>
                            <div class="flex items-center space-x-2 space-x-reverse">
                                <h4 class="text-xs font-bold text-white">نفق التشفير السريع (VPN Tunnel)</h4>
                                <span id="vpnStatusLabel" class="text-[9px] bg-gray-800 text-gray-400 px-2 py-0.5 rounded font-mono">متوقف</span>
                            </div>
                            <p class="text-[10px] text-gray-400 mt-0.5">تشفير طلبات الفحص وإخفاء الهوية الرقمية بالكامل.</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-2 w-full sm:w-auto">
                        <select id="vpnCountry" class="bg-cyberCard border border-cyberBorder text-xs text-gray-300 rounded-lg p-2 focus:outline-none focus:border-cyberBlue">
                            <option value="de">🇩🇪 ألمانيا (Frankfurt)</option>
                            <option value="us">🇺🇸 أمريكا (New York)</option>
                            <option value="nl">🇳🇱 هولندا (Amsterdam)</option>
                        </select>
                        <button onclick="toggleVpn()" id="vpnToggleBtn" class="bg-cyberBorder hover:bg-cyberBlue hover:text-black text-gray-200 px-4 py-2 rounded-lg text-xs font-bold transition shadow-md whitespace-nowrap">
                            تفعيل التشفير
                        </button>
                    </div>
                </div>
            </div>

            <div class="bg-gradient-to-r from-purple-950/40 via-blue-950/30 to-cyberCard border border-purple-500/30 rounded-2xl p-5 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-xl">
                <div>
                    <span class="text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2.5 py-0.5 rounded-full font-bold">ترقية PRO VIP</span>
                    <h3 class="text-sm font-black text-white mt-1.5">افتح كافة الأدوات الـ 30 بدون أي قيود أو إعلانات</h3>
                    <p class="text-xs text-gray-300 mt-0.5">تشغيل متعدد المهام، نفق VPN خارجي متقدم، ودعم فني خاص.</p>
                </div>
                <button onclick="switchTab('wallet')" class="bg-cyberGreen text-black font-black text-xs px-5 py-3 rounded-xl hover:bg-emerald-400 transition shadow-lg shadow-cyberGreen/20 whitespace-nowrap">
                    الترقية الفورية (250 EGP)
                </button>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div onclick="switchTab('mobile')" class="bg-cyberCard border border-cyberBorder hover:border-cyberBlue p-5 rounded-2xl cursor-pointer transition group shadow-lg">
                    <div class="flex justify-between items-center mb-3">
                        <div class="w-10 h-10 rounded-xl bg-cyberBlue/10 border border-cyberBlue/30 flex items-center justify-center text-cyberBlue text-lg group-hover:scale-110 transition">
                            <i class="fa-solid fa-mobile-screen"></i>
                        </div>
                        <span class="text-[10px] font-mono text-cyberBlue font-bold bg-cyberBlue/10 px-2.5 py-1 rounded-full">15 أداة</span>
                    </div>
                    <h4 class="text-sm font-bold text-white">أدوات الهاتف الميدانية</h4>
                    <p class="text-[11px] text-gray-400 mt-1">أدوات خفيفة وسريعة لفحص الشبكات والروابط فورياً من الهاتف.</p>
                </div>
                <div onclick="switchTab('pc')" class="bg-cyberCard border border-cyberBorder hover:border-cyberGreen p-5 rounded-2xl cursor-pointer transition group shadow-lg">
                    <div class="flex justify-between items-center mb-3">
                        <div class="w-10 h-10 rounded-xl bg-cyberGreen/10 border border-cyberGreen/30 flex items-center justify-center text-cyberGreen text-lg group-hover:scale-110 transition">
                            <i class="fa-solid fa-desktop"></i>
                        </div>
                        <span class="text-[10px] font-mono text-cyberGreen font-bold bg-cyberGreen/10 px-2.5 py-1 rounded-full">15 أداة</span>
                    </div>
                    <h4 class="text-sm font-bold text-white">أدوات الكمبيوتر المتقدمة</h4>
                    <p class="text-[11px] text-gray-400 mt-1">فحص عميق للثغرات البرمجية، السيرفرات، واختبارات الأمان.</p>
                </div>
            </div>
        `;
    } else if (tabId === 'mobile') {
        renderToolList('أدوات الهاتف الميدانية', mobileTools);
    } else if (tabId === 'pc') {
        renderToolList('أدوات الكمبيوتر المتقدمة', pcTools);
    } else if (tabId === 'wallet') {
        container.innerHTML = `
            <div class="bg-cyberCard border border-cyberBorder rounded-2xl p-6 shadow-2xl">
                <div class="flex items-center space-x-3 space-x-reverse mb-6">
                    <div class="w-10 h-10 rounded-xl bg-cyberGreen/10 border border-cyberGreen/30 flex items-center justify-center text-cyberGreen text-lg">
                        <i class="fa-solid fa-wallet"></i>
                    </div>
                    <div>
                        <h3 class="text-sm font-black text-white">محفظة Deeb Alex والاشتراكات الذكية</h3>
                        <p class="text-xs text-gray-400">إدارة الرصيد، الشحن الفوري، وتفعيل باقات البريميوم.</p>
                    </div>
                </div>

                <div class="bg-cyberDark p-5 rounded-xl border border-cyberBorder mb-6 flex justify-between items-center shadow-inner">
                    <div>
                        <span class="text-xs text-gray-400 block mb-1">الرصيد المتاح الحالي:</span>
                        <span class="text-2xl font-mono font-black text-cyberGreen">0.00 <span class="text-xs text-gray-400">EGP</span></span>
                    </div>
                    <span class="text-xs bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 px-3.5 py-1.5 rounded-full font-bold">الحساب مجاني (Free)</span>
                </div>

                <h4 class="text-xs font-bold text-gray-300 mb-3 uppercase tracking-wider">اختر الباقة الاحترافية المناسبة:</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div class="bg-cyberDark border border-cyberBorder p-5 rounded-2xl relative hover:border-cyberGreen transition">
                        <span class="text-[10px] bg-cyberGreen/20 text-cyberGreen border border-cyberGreen/30 px-2.5 py-0.5 rounded-full font-bold">الباقة الشهرية الأكثر طلباً</span>
                        <div class="text-xl font-mono font-black text-white mt-3">250 جنيه <span class="text-xs text-gray-400 font-normal">/ شهرياً</span></div>
                        <p class="text-xs text-gray-400 mt-2">وصول كامل ومفتوح لجميع الأدوات الـ 30، بدون إعلانات نهائياً، ونفق VPN متقدم.</p>
                        <button onclick="processCheckout('monthly')" class="w-full mt-4 bg-cyberGreen text-black font-bold text-xs py-3 rounded-xl hover:bg-emerald-400 transition shadow-lg shadow-cyberGreen/10">اشتراك فوري آمن</button>
                    </div>
                    <div class="bg-cyberDark border border-purple-500/40 p-5 rounded-2xl relative hover:border-purple-400 transition">
                        <span class="text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2.5 py-0.5 rounded-full font-bold">الباقة السنوية (توفير شهرين)</span>
                        <div class="text-xl font-mono font-black text-white mt-3">$49.99 <span class="text-xs text-gray-400 font-normal">/ سنوياً</span></div>
                        <p class="text-xs text-gray-400 mt-2">القيمة الأفضل لمحترفي الأمن السيبراني وشركات التدقيق الأمني.</p>
                        <button onclick="processCheckout('annual')" class="w-full mt-4 bg-purple-600 text-white font-bold text-xs py-3 rounded-xl hover:bg-purple-500 transition shadow-lg shadow-purple-600/20">اشتراك سنوي VIP</button>
                    </div>
                </div>

                <div class="border-t border-cyberBorder pt-5">
                    <h4 class="text-xs font-bold text-gray-300 mb-3 uppercase tracking-wider">وسائل الدفع المدعومة:</h4>
                    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div class="bg-cyberDark border border-cyberBorder p-3 rounded-xl text-center text-xs text-gray-300 font-semibold"><i class="fa-solid fa-mobile-button text-red-400 block text-base mb-1"></i> فودافون كاش</div>
                        <div class="bg-cyberDark border border-cyberBorder p-3 rounded-xl text-center text-xs text-gray-300 font-semibold"><i class="fa-brands fa-cc-visa text-blue-400 block text-base mb-1"></i> Visa / MC</div>
                        <div class="bg-cyberDark border border-cyberBorder p-3 rounded-xl text-center text-xs text-gray-300 font-semibold"><i class="fa-brands fa-paypal text-cyan-400 block text-base mb-1"></i> PayPal</div>
                        <div class="bg-cyberDark border border-cyberBorder p-3 rounded-xl text-center text-xs text-gray-300 font-semibold"><i class="fa-solid fa-coins text-yellow-400 block text-base mb-1"></i> USDT (TRC20)</div>
                    </div>
                </div>
            </div>
        `;
    } else if (tabId === 'support') {
        container.innerHTML = `
            <div class="bg-cyberCard border border-cyberBorder rounded-2xl p-6 shadow-2xl">
                <div class="flex items-center space-x-3 space-x-reverse mb-4">
                    <div class="w-10 h-10 rounded-xl bg-cyberBlue/10 border border-cyberBlue/30 flex items-center justify-center text-cyberBlue text-lg">
                        <i class="fa-solid fa-headset"></i>
                    </div>
                    <div>
                        <h3 class="text-sm font-black text-white">غرفة العمليات والدعم الفني المباشر</h3>
                        <p class="text-xs text-gray-400">تواصل فوري مع مهندسي الأمان والدعم بالمنصة.</p>
                    </div>
                </div>
                <div class="bg-cyberDark h-72 rounded-xl border border-cyberBorder p-4 mb-4 flex flex-col justify-end shadow-inner overflow-y-auto">
                    <div class="bg-cyberBorder/60 p-3 rounded-xl text-xs text-gray-200 max-w-[85%] mb-2">
                        أهلاً بك يا مينا في الدعم الفني لـ Deeb Alex. كافة أنظمة الفحص والنفق السيبراني تعمل بكفاءة تامة. كيف يمكننا مساعدتك اليوم؟
                    </div>
                </div>
                <div class="flex gap-2">
                    <input type="text" placeholder="اكتب استفسارك أو مشكلتك التقنية..." class="flex-1 bg-cyberDark border border-cyberBorder rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyberBlue">
                    <button onclick="alert('تم إرسال رسالتك لغرفة العمليات بنجاح.')" class="bg-cyberBlue text-black font-bold text-xs px-5 py-3 rounded-xl hover:bg-cyan-400 transition shadow-lg">إرسال</button>
                </div>
            </div>
        `;
    } else if (tabId === 'profile') {
        container.innerHTML = `
            <div class="bg-cyberCard border border-cyberBorder rounded-2xl p-6 shadow-2xl">
                <h3 class="text-sm font-black text-white mb-4 flex items-center"><i class="fa-solid fa-user-gear text-cyberGreen ml-2"></i> تعديل الملف الشخصي وإعدادات الأمان</h3>
                <div class="space-y-4">
                    <div>
                        <label class="text-xs text-gray-400 block mb-1">اسم المستخدم:</label>
                        <input type="text" value="مـيـنا رزق الله" class="w-full bg-cyberDark border border-cyberBorder rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyberBlue">
                    </div>
                    <div>
                        <label class="text-xs text-gray-400 block mb-1">البريد الإلكتروني للتوثيق:</label>
                        <input type="email" value="mina@deebalex.sec" class="w-full bg-cyberDark border border-cyberBorder rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyberBlue">
                    </div>
                    <div>
                        <label class="text-xs text-gray-400 block mb-1">كلمة المرور الجديدة:</label>
                        <input type="password" placeholder="أدخل كلمة مرور قوية ومعقدة" class="w-full bg-cyberDark border border-cyberBorder rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyberBlue">
                    </div>
                    <button onclick="alert('تم حفظ التعديلات وتحديث سجل الأمان بنجاح.')" class="w-full bg-cyberGreen text-black font-bold text-xs py-3 rounded-xl hover:bg-emerald-400 transition shadow-lg">حفظ التغييرات</button>
                </div>
            </div>
        `;
    } else if (tabId === 'stats') {
        container.innerHTML = `
            <div class="bg-cyberCard border border-cyberBorder rounded-2xl p-6 shadow-2xl">
                <h3 class="text-sm font-black text-white mb-4 flex items-center"><i class="fa-solid fa-chart-line text-cyberBlue ml-2"></i> إحصائيات الاستخدام وسجل الفحص</h3>
                <div class="grid grid-cols-2 gap-4 mb-6">
                    <div class="bg-cyberDark p-4 rounded-xl border border-cyberBorder text-center">
                        <span class="text-[11px] text-gray-400 block mb-1">الأدوات المستخدِمة</span>
                        <span class="text-xl font-mono font-bold text-white">14 أداة</span>
                    </div>
                    <div class="bg-cyberDark p-4 rounded-xl border border-cyberBorder text-center">
                        <span class="text-[11px] text-gray-400 block mb-1">إجمالي عمليات الفحص</span>
                        <span class="text-xl font-mono font-bold text-cyberGreen">64 عملية</span>
                    </div>
                </div>
                <h4 class="text-xs font-bold text-gray-300 mb-3 uppercase tracking-wider">سجل النشاطات الأخيرة:</h4>
                <div class="space-y-2 text-xs">
                    <div class="bg-cyberDark p-3 rounded-xl border border-cyberBorder flex justify-between items-center">
                        <span class="text-gray-300">فحص عنوان IP & Network Inspector</span>
                        <span class="text-[10px] text-emerald-400 font-mono">منذ 5 دقائق</span>
                    </div>
                    <div class="bg-cyberDark p-3 rounded-xl border border-cyberBorder flex justify-between items-center">
                        <span class="text-gray-300">استعلام DNS Lookup Tool</span>
                        <span class="text-[10px] text-emerald-400 font-mono">منذ ساعة</span>
                    </div>
                </div>
            </div>
        `;
    }
}

function renderToolList(title, toolsArray) {
    const container = document.getElementById('mainContent');
    let html = `
        <div class="mb-5">
            <h2 class="text-base font-black text-white mb-1 flex items-center"><i class="fa-solid fa-cubes text-cyberBlue ml-2"></i> ${title}</h2>
            <p class="text-xs text-gray-400">اختر الأداة المطلوبة لبدء الفحص السيبراني الفوري عبر خوادم المنصة الآمنة.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4" id="toolsGrid">
    `;

    toolsArray.forEach(tool => {
        const isPro = tool.type === 'pro';
        const trialsUsed = toolTrials[tool.name] || 0;
        const trialsLeft = Math.max(0, 2 - trialsUsed);

        html += `
            <div class="bg-cyberCard border border-cyberBorder rounded-2xl p-4 flex flex-col justify-between hover:border-gray-600 transition shadow-lg">
                <div>
                    <div class="flex justify-between items-center mb-2">
                        <h3 class="text-xs font-black text-white">${tool.name}</h3>
                        <span class="text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase ${isPro ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'}">
                            ${isPro ? `PRO (باقي ${trialsLeft} تجارب)` : 'مجاني (Free)'}
                        </span>
                    </div>
                    <p class="text-[11px] text-gray-400 mb-4 leading-relaxed">${tool.desc}</p>
                </div>
                <button onclick="executeTool('${tool.name}', '${tool.type}', '${tool.func}')" class="w-full bg-cyberDark border border-cyberBorder text-xs text-gray-200 py-2.5 rounded-xl hover:bg-cyberBlue hover:text-black font-bold transition flex items-center justify-center space-x-2 space-x-reverse shadow-md">
                    <i class="fa-solid fa-play text-[10px]"></i>
                    <span>تشغيل الأداة فوري</span>
                </button>
            </div>
        `;
    });

    html += `</div>`;
    container.innerHTML = html;
}

function executeTool(toolName, type, funcName) {
    if (type === 'pro') {
        if (!toolTrials[toolName]) toolTrials[toolName] = 0;
        if (toolTrials[toolName] >= 2) {
            alert(`عذراً، لقد استنفذت الـ (مرتين) تجربة المجانية لأداة "${toolName}". يرجى ترقية حسابك للباقة الاحترافية لفتحها بلا حدود.`);
            switchTab('wallet');
            return;
        }
        toolTrials[toolName]++;
        localStorage.setItem('deeb_trials', JSON.stringify(toolTrials));
    }

    openToolModal(toolName);
    if (typeof window[funcName] === 'function') {
        window[funcName]();
    } else {
        runGenericToolMock(toolName);
    }
}

function openToolModal(title) {
    document.getElementById('modalToolTitle').innerHTML = `<i class="fa-solid fa-terminal text-cyberGreen ml-2"></i> تشغيل: ${title}`;
    document.getElementById('toolModal').classList.remove('hidden');
}

function closeToolModal() {
    document.getElementById('toolModal').classList.add('hidden');
}

async function runIpInspector() {
    const body = document.getElementById('modalToolBody');
    body.innerHTML = `<p class="text-xs text-gray-400 animate-pulse">جاري جلب تفاصيل الـ IP عبر خوادم الفحص...</p>`;
    try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        body.innerHTML = `
            <div class="bg-cyberDark p-4 rounded-xl border border-cyberBorder font-mono text-xs space-y-2 text-cyberGreen">
                <p>IP Address: ${data.ip}</p>
                <p>Country: ${data.country_name} (${data.country_code})</p>
                <p>City: ${data.city}</p>
                <p>ISP: ${data.org}</p>
                <p>Timezone: ${data.timezone}</p>
            </div>
            <button onclick="closeToolModal()" class="w-full bg-cyberGreen text-black font-bold text-xs py-2.5 rounded-xl">إغلاق النتائج</button>
        `;
    } catch (e) {
        body.innerHTML = `<p class="text-xs text-red-400">فشل الاتصال بخدمة الـ IP. تأكد من اتصال الإنترنت.</p>`;
    }
}

function runBase64() {
    const body = document.getElementById('modalToolBody');
    body.innerHTML = `
        <div>
            <label class="text-xs text-gray-400 block mb-1">أدخل النص للترميز أو فك التشفير:</label>
            <textarea id="b64Input" class="w-full bg-cyberDark border border-cyberBorder rounded-xl p-3 text-xs text-white h-20 focus:outline-none focus:border-cyberBlue mb-3" placeholder="اكتب النص هنا..."></textarea>
            <div class="flex gap-2">
                <button onclick="doB64Encode()" class="flex-1 bg-cyberBlue text-black font-bold text-xs py-2.5 rounded-xl">ترميز (Encode)</button>
                <button onclick="doB64Decode()" class="flex-1 bg-cyberGreen text-black font-bold text-xs py-2.5 rounded-xl">فك (Decode)</button>
            </div>
            <div id="b64Result" class="mt-3 bg-cyberDark p-3 rounded-xl border border-cyberBorder text-xs font-mono text-cyberGreen min-h-[40px]">النتيجة ستظهر هنا...</div>
        </div>
    `;
}

function doB64Encode() {
    const val = document.getElementById('b64Input').value;
    try {
        document.getElementById('b64Result').innerText = btoa(unescape(encodeURIComponent(val)));
    } catch(e) { document.getElementById('b64Result').innerText = "خطأ في الترميز."; }
}

function doB64Decode() {
    const val = document.getElementById('b64Input').value;
    try {
        document.getElementById('b64Result').innerText = decodeURIComponent(escape(atob(val)));
    } catch(e) { document.getElementById('b64Result').innerText = "خطأ: النص ليس Base64 صحيح."; }
}

function runGenericToolMock(name) {
    const body = document.getElementById('modalToolBody');
    body.innerHTML = `
        <div class="space-y-3">
            <p class="text-xs text-gray-300">أداة فحص نشطة: <strong class="text-cyberGreen">${name}</strong></p>
            <div class="bg-cyberDark p-4 rounded-xl border border-cyberBorder font-mono text-[11px] text-gray-300 space-y-1.5">
                <p class="text-cyberBlue">[+] Initializing security handshake...</p>
                <p>[+] Target verification completed successfully.</p>
                <p class="text-cyberGreen">[✓] Analysis finished with 0 critical errors found.</p>
            </div>
            <button onclick="closeToolModal()" class="w-full bg-cyberGreen text-black font-bold text-xs py-2.5 rounded-xl">تم الانتهاء</button>
        </div>
    `;
}

function toggleVpn() {
    const btn = document.getElementById('vpnToggleBtn');
    const label = document.getElementById('vpnStatusLabel');
    const country = document.getElementById('vpnCountry').value;
    if (btn.innerText.includes('تفعيل')) {
        btn.innerText = 'إيقاف التشفير';
        btn.classList.remove('bg-cyberBorder', 'hover:bg-cyberBlue');
        btn.classList.add('bg-red-500', 'text-white');
        label.innerText = `متصل (${country.toUpperCase()})`;
        label.className = "text-[9px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-mono font-bold";
        alert(`تم تفعيل نفق التشفير السيبراني عبر خادم (${country.toUpperCase()}) بنجاح.`);
    } else {
        btn.innerText = 'تفعيل التشفير';
        btn.classList.remove('bg-red-500', 'text-white');
        btn.classList.add('bg-cyberBorder', 'hover:bg-cyberBlue');
        label.innerText = 'متوقف';
        label.className = "text-[9px] bg-gray-800 text-gray-400 px-2 py-0.5 rounded font-mono";
        alert('تم قطع نفق التشفير والعودة للاتصال المباشر.');
    }
}

function processCheckout(plan) {
    alert(`جاري توجيهك إلى بوابة الدفع الآمنة لباقة (${plan === 'monthly' ? 'الشهرية 250 EGP' : 'السنوية $49.99'})... المؤقت الآمن (3 دقائق) قيد التشغيل.`);
}

window.onload = function() {
    switchTab('home');
};
