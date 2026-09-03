// إعدادات السيرفر السحابي الخاصة بك (Firebase Config)
const firebaseConfig = {
  apiKey: "AIzaSyDlOtktbcJgSKFqNN-vWtwTGvH9WvEtvpo",
  authDomain: "cyber-deebka.firebaseapp.com",
  projectId: "cyber-deebka",
  storageBucket: "cyber-deebka.firebasestorage.app",
  messagingSenderId: "41564445623",
  appId: "1:41564445623:web:367a09c5b3ae0f6033a632",
  measurementId: "G-6D82VZ8H4M"
};

// تهيئة فايربيس
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// إيميلات الأدمن المصرح لها بأمان تام (يمكنك وضع إيميلك هنا)
const ADMIN_EMAILS = ["mina@cyberdeebka.sec", "admin@cyberdeebka.sec"]; 

// ترسانة الأدوات
const mobileTools = ["Nmap", "Netcat", "Nikto", "SQLmap", "Gobuster", "FFUF", "Hydra", "John the Ripper", "Hashcat", "Metasploit", "Scapy", "OpenSSL", "DNSRecon", "WhatWeb", "WPScan"];
const pcTools = ["Nmap", "Wireshark", "Burp Suite", "Metasploit", "SQLmap", "Nuclei", "FFUF", "Gobuster", "Hashcat", "John the Ripper", "Aircrack-ng", "Kismet", "Responder", "Amass", "BloodHound"];

let currentUserData = { balance: 0.00, isPro: false };

// مراقبة حالة تسجيل الدخول على السيرفر لحظياً
auth.onAuthStateChanged(async (user) => {
    if (user) {
        document.getElementById('auth-screen').classList.add('hidden');
        document.getElementById('app-screen').classList.remove('hidden');
        document.getElementById('prof-email').value = user.email;

        // جلب بيانات المستخدم من قاعدة البيانات السحابية (Firestore)
        let userDocRef = db.collection('users').doc(user.uid);
        let doc = await userDocRef.get();

        if (!doc.exists) {
            let initialData = { email: user.email, balance: 0.00, isPro: false };
            await userDocRef.set(initialData);
            currentUserData = initialData;
        } else {
            currentUserData = doc.data();
        }

        loadUserData(currentUserData);

        // فحص صلاحية الأدمن
        if (ADMIN_EMAILS.includes(user.email)) {
            document.getElementById('admin-nav-btn').classList.remove('hidden');
        } else {
            document.getElementById('admin-nav-btn').classList.add('hidden');
        }

        renderTools(mobileTools, pcTools);
    } else {
        document.getElementById('auth-screen').classList.remove('hidden');
        document.getElementById('app-screen').classList.add('hidden');
    }
});

// تسجيل حساب جديد حقيقي
async function handleSignup() {
    let email = document.getElementById('auth-user').value.trim();
    let pass = document.getElementById('auth-pass').value.trim();
    if (!email || !pass) {
        alert('⚠️ يرجى كتابة البريد الإلكتروني وكلمة المرور.');
        return;
    }
    try {
        await auth.createUserWithEmailAndPassword(email, pass);
        alert('🎉 تم إنشاء الحساب بنجاح سحابياً!');
    } catch (error) {
        alert('❌ خطأ في التسجيل: ' + error.message);
    }
}

// تسجيل الدخول الحقيقي
async function handleLogin() {
    let email = document.getElementById('auth-user').value.trim();
    let pass = document.getElementById('auth-pass').value.trim();
    if (!email || !pass) {
        alert('⚠️ يرجى كتابة البريد الإلكتروني وكلمة المرور.');
        return;
    }
    try {
        await auth.signInWithEmailAndPassword(email, pass);
    } catch (error) {
        alert('❌ خطأ في الدخول: تأكد من صحة البريد أو كلمة المرور.');
    }
}

// تسجيل الخروج
async function handleLogout() {
    await auth.signOut();
}

// تحديث المحفظة سحابياً (شحن الرصيد)
async function topUpWallet(amount) {
    let user = auth.currentUser;
    if (!user) return;
    
    currentUserData.balance += amount;
    await db.collection('users').doc(user.uid).update({ balance: currentUserData.balance });
    loadUserData(currentUserData);
    alert(`✅ تم شحن مبلغ $${amount} بنجاح إلى محفظتك السحابية!`);
}

// الترقية إلى Pro سحابياً
async function upgradeToPro() {
    let user = auth.currentUser;
    if (!user) return;

    if (currentUserData.balance < 9.99) {
        alert('❌ رصيد المحفظة غير كافي! يرجى شحن المحفظة أولاً بقيمة 9.99$ على الأقل.');
        return;
    }

    currentUserData.balance -= 9.99;
    currentUserData.isPro = true;

    await db.collection('users').doc(user.uid).update({
        balance: currentUserData.balance,
        isPro: true
    });

    loadUserData(currentUserData);
    alert('🎉 مبروك! تم ترقية حسابك إلى PRO بنجاح وتم إزالة الإعلانات.');
}

// تحميل البيانات في الواجهة
function loadUserData(data) {
    document.getElementById('wallet-balance').innerText = (data.balance || 0).toFixed(2) + ' $';
    let badge = document.getElementById('sub-badge');
    let status = document.getElementById('wallet-status');
    let banner = document.getElementById('ad-banner');

    if (data.isPro) {
        badge.innerText = "عضوية PRO مميزة ⭐";
        badge.className = "px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30";
        status.innerText = "PRO Active";
        if (banner) banner.style.display = "none";
    } else {
        badge.innerText = "حساب مجاني (Free)";
        status.innerText = "مجاني (Free)";
        if (banner) banner.style.display = "flex";
    }
}

// عرض الأدوات
function renderTools(mList, pList) {
    document.getElementById('mobile-tools-grid').innerHTML = mList.map(t => `
        <div class="bg-slate-900 border border-slate-800 p-4 rounded-xl flex justify-between items-center hover:border-emerald-500/50 transition-all">
            <span class="text-xs font-mono text-emerald-400">📱 ${t}</span>
            <button onclick="alert('⚡ جاري تنفيذ أمر [${t}] على بيئة الهاتف..')" class="bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600 hover:text-white px-2.5 py-1 rounded-lg text-[10px] font-bold">تشغيل</button>
        </div>
    `).join('');

    document.getElementById('pc-tools-grid').innerHTML = pList.map(t => `
        <div class="bg-slate-900 border border-slate-800 p-4 rounded-xl flex justify-between items-center hover:border-cyan-500/50 transition-all">
            <span class="text-xs font-mono text-cyan-400">💻 ${t}</span>
            <button onclick="alert('⚡ جاري تشخيص الحزمة لـ [${t}] على بيئة الحاسوب..')" class="bg-cyan-600/20 text-cyan-400 hover:bg-cyan-600 hover:text-white px-2.5 py-1 rounded-lg text-[10px] font-bold">تحليل</button>
        </div>
    `).join('');
}

// البحث الشامل
function globalSearch(q) {
    let query = q.toLowerCase().trim();
    renderTools(
        mobileTools.filter(t => t.toLowerCase().includes(query)),
        pcTools.filter(t => t.toLowerCase().includes(query))
    );
}

// لغات المنصة
function changeLanguage(lang) {
    if (lang === 'en') {
        alert('🌐 English language pack selected.');
    } else {
        alert('🌐 تم تفعيل اللغة العربية بنجاح.');
    }
}

// الإشعارات
function toggleNotifications() {
    let box = document.getElementById('notif-box');
    box.classList.toggle('hidden');
    let badge = document.getElementById('notif-badge');
    if (badge) badge.style.display = 'none';
}

// التنقل بين التبويبات
function switchTab(id) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    let target = document.getElementById('tab-' + id);
    if (target) target.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
