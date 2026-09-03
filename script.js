// ترسانة أدوات الهاتف (15 أداة)
const mobileTools = [
    "Nmap", "Netcat", "Nikto", "SQLmap", "Gobuster", 
    "FFUF", "Hydra", "John the Ripper", "Hashcat", "Metasploit", 
    "Scapy", "OpenSSL", "DNSRecon", "WhatWeb", "WPScan"
];

// ترسانة أدوات الكمبيوتر (15 أداة)
const pcTools = [
    "Nmap", "Wireshark", "Burp Suite", "Metasploit", "SQLmap", 
    "Nuclei", "FFUF", "Gobuster", "Hashcat", "John the Ripper", 
    "Aircrack-ng", "Kismet", "Responder", "Amass", "BloodHound"
];

// التحقق من حالة تسجيل الدخول
function checkAuth() {
    let user = localStorage.getItem('cyber_user');
    if (!user) {
        document.getElementById('auth-screen').classList.remove('hidden');
        document.getElementById('app-screen').classList.add('hidden');
    } else {
        document.getElementById('auth-screen').classList.add('hidden');
        document.getElementById('app-screen').classList.remove('hidden');
        loadUserData(JSON.parse(user));
        renderTools(mobileTools, pcTools);
    }
}

// معالجة تسجيل الدخول بشكل سليم وبدون أخطاء
function handleLogin() {
    let email = document.getElementById('auth-user').value.trim();
    let pass = document.getElementById('auth-pass').value.trim();
    
    if(!email || !pass) {
        alert('⚠️ الرجاء إدخال البريد الإلكتروني وكلمة المرور للمتابعة.');
        return;
    }
    
    if(!email.includes('@') || !email.includes('.')) {
        alert('⚠️ صيغة البريد الإلكتروني غير صحيحة!');
        return;
    }

    let userData = { email, balance: 0.00, isPro: false };
    localStorage.setItem('cyber_user', JSON.stringify(userData));
    checkAuth();
}

// تحميل بيانات المستخدم في الواجهة
function loadUserData(user) {
    document.getElementById('prof-email').value = user.email;
    document.getElementById('wallet-balance').innerText = user.balance.toFixed(2) + ' $';
    if(user.isPro) {
        document.getElementById('sub-badge').innerText = "عضوية PRO مميزة ⭐";
        document.getElementById('sub-badge').className = "px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30";
        document.getElementById('wallet-status').innerText = "PRO Active";
        let banner = document.getElementById('ad-banner');
        if(banner) banner.style.display = "none";
    }
}

// عرض الأدوات في الأقسام الخاصة بها
function renderTools(mList, pList) {
    let mGrid = document.getElementById('mobile-tools-grid');
    let pGrid = document.getElementById('pc-tools-grid');
    
    mGrid.innerHTML = mList.map((t) => `
        <div class="bg-slate-900 border border-slate-800 p-4 rounded-xl flex justify-between items-center hover:border-emerald-500/50 transition-all">
            <span class="text-xs font-mono text-emerald-400">📱 ${t}</span>
            <button onclick="runToolAction('Mobile', '${t}')" class="bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600 hover:text-white px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all">تشغيل</button>
        </div>
    `).join('');

    pGrid.innerHTML = pList.map((t) => `
        <div class="bg-slate-900 border border-slate-800 p-4 rounded-xl flex justify-between items-center hover:border-cyan-500/50 transition-all">
            <span class="text-xs font-mono text-cyan-400">💻 ${t}</span>
            <button onclick="runToolAction('PC', '${t}')" class="bg-cyan-600/20 text-cyan-400 hover:bg-cyan-600 hover:text-white px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all">تحليل</button>
        </div>
    `).join('');
}

// محرك البحث الشامل والذكي
function globalSearch(query) {
    let q = query.toLowerCase().trim();
    let filteredMobile = mobileTools.filter(t => t.toLowerCase().includes(q));
    let filteredPc = pcTools.filter(t => t.toLowerCase().includes(q));
    renderTools(filteredMobile, filteredPc);
}

// تشغيل الأداة
function runToolAction(platform, toolName) {
    alert(`⚡ جاري إعداد بيئة التشغيل لأداة [${toolName}] على منصة (${platform})..`);
}

// شحن المحفظة
function topUpWallet(amount) {
    let user = JSON.parse(localStorage.getItem('cyber_user'));
    user.balance += amount;
    localStorage.setItem('cyber_user', JSON.stringify(user));
    loadUserData(user);
    alert(`✅ تم شحن مبلغ $${amount} بنجاح إلى محفظتك!`);
}

// الترقية إلى Pro
function upgradeToPro() {
    let user = JSON.parse(localStorage.getItem('cyber_user'));
    if(user.balance < 9.99) {
        alert('❌ رصيد المحفظة غير كافي! يرجى شحن المحفظة أولاً بقيمة 9.99$ على الأقل.');
        return;
    }
    user.balance -= 9.99;
    user.isPro = true;
    localStorage.setItem('cyber_user', JSON.stringify(user));
    loadUserData(user);
    alert('🎉 مبروك! تم ترقية حسابك إلى PRO بنجاح وتم إزالة الإعلانات.');
}

// تبديل لغة المنصة
function changeLanguage(lang) {
    if(lang === 'en') {
        alert('🌐 English language pack selected. (Defaulting UI components to English framework)');
    } else {
        alert('🌐 تم تفعيل اللغة العربية بنجاح.');
    }
}

// التنقل السلس بين التبويبات
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    let target = document.getElementById('tab-' + tabId);
    if(target) target.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// إدارة الإشعارات
function toggleNotifications() {
    let box = document.getElementById('notif-box');
    box.classList.toggle('hidden');
    let badge = document.getElementById('notif-badge');
    if(badge) badge.style.display = 'none';
}

// تسجيل الخروج
function logout() {
    if(confirm('هل أنت متأكد من تسجيل الخروج؟')) {
        localStorage.removeItem('cyber_user');
        checkAuth();
    }
}

window.onload = checkAuth;
      
