import { useState, useEffect, useCallback } from "react";

const C = { bg: "#f4f6f9", card: "#fff", primary: "#1e56a0", red: "#e53935", text: "#1a1a2e", sub: "#7b8794", muted: "#b0b8c1", border: "#e8ecf1", green: "#27ae60", gold: "#f39c12", lightBlue: "#eaf1fb" };

/* ═══ SVG CAR IMAGES ═══ */
function CarSVG({ type, color, size = "md", photo }) {
  const h = size === "lg" ? 190 : size === "sm" ? 55 : 110;
  const bg = `linear-gradient(135deg, ${color}ee, ${color}99)`;
  const [imgOk, setImgOk] = useState(false);
  const [imgErr, setImgErr] = useState(false);

  const sedanPath = "M25,32 L30,22 L45,18 L70,18 L80,22 L90,32 L92,32 L92,38 L88,38 L86,36 C84,34 80,34 78,36 L76,38 L40,38 L38,36 C36,34 32,34 30,36 L28,38 L22,38 L22,32 Z";
  const suvPath = "M22,34 L28,20 L38,16 L72,16 L82,20 L88,28 L92,28 L92,38 L86,38 L84,36 C82,34 78,34 76,36 L74,38 L38,38 L36,36 C34,34 30,34 28,36 L26,38 L20,38 L20,34 Z";
  const hatchPath = "M25,33 L32,22 L48,18 L70,18 L78,20 L85,28 L90,30 L92,32 L92,38 L86,38 L84,36 C82,34 78,34 76,36 L74,38 L38,38 L36,36 C34,34 30,34 28,36 L26,38 L22,38 L22,33 Z";
  const pickupPath = "M20,34 L26,22 L38,18 L52,18 L58,22 L60,28 L90,28 L92,30 L92,38 L86,38 L84,36 C82,34 78,34 76,36 L74,38 L38,38 L36,36 C34,34 30,34 28,36 L26,38 L18,38 L18,34 Z";
  const paths = { sedan: sedanPath, suv: suvPath, hatch: hatchPath, pickup: pickupPath };
  const p = paths[type] || sedanPath;
  const wheels = `<circle cx="32" cy="38" r="4.5" fill="#222" stroke="#555" stroke-width="1"/><circle cx="32" cy="38" r="2" fill="#777"/><circle cx="80" cy="38" r="4.5" fill="#222" stroke="#555" stroke-width="1"/><circle cx="80" cy="38" r="2" fill="#777"/>`;
  const windows = type === "suv"
    ? `<path d="M30,21 L38,17 L55,17 L55,26 L30,26 Z" fill="rgba(135,206,250,0.5)" rx="1"/><path d="M57,17 L72,17 L80,21 L85,26 L57,26 Z" fill="rgba(135,206,250,0.5)" rx="1"/>`
    : type === "hatch"
    ? `<path d="M34,23 L48,19 L55,19 L55,27 L34,27 Z" fill="rgba(135,206,250,0.5)" rx="1"/><path d="M57,19 L70,19 L76,21 L82,27 L57,27 Z" fill="rgba(135,206,250,0.5)" rx="1"/>`
    : type === "pickup"
    ? `<path d="M28,23 L38,19 L52,19 L56,23 L56,27 L28,27 Z" fill="rgba(135,206,250,0.5)" rx="1"/>`
    : `<path d="M32,23 L45,19 L55,19 L55,27 L32,27 Z" fill="rgba(135,206,250,0.5)" rx="1"/><path d="M57,19 L70,19 L78,23 L86,30 L57,27 Z" fill="rgba(135,206,250,0.5)" rx="1"/>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="10 10 95 35" width="200" height="80"><path d="${p}" fill="white" opacity="0.95" stroke="rgba(255,255,255,0.3)" stroke-width="0.5"/>${windows}<line x1="55" y1="${type==='pickup'?'19':'18'}" x2="55" y2="27" stroke="rgba(255,255,255,0.3)" stroke-width="0.3"/>${wheels}</svg>`;
  const encoded = btoa(unescape(encodeURIComponent(svg)));

  return (
    <div style={{ height: h, background: bg, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
      {/* Real photo layer */}
      {photo && !imgErr && (
        <img src={photo} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: imgOk ? 1 : 0, transition: "opacity 0.4s", zIndex: 2 }}
          onLoad={() => setImgOk(true)} onError={() => setImgErr(true)} />
      )}
      {photo && imgOk && <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.4) 100%)", zIndex: 3 }} />}
      {/* SVG fallback layer */}
      {(!photo || !imgOk) && (
        <>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 90%, rgba(255,255,255,0.1), transparent 60%)" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "40%", background: "linear-gradient(to top, rgba(0,0,0,0.15), transparent)" }} />
          <img src={`data:image/svg+xml;base64,${encoded}`} alt="" style={{ width: h > 150 ? "65%" : h > 80 ? "60%" : "55%", zIndex: 1, filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.25))" }} />
        </>
      )}
    </div>
  );
}

/* ═══ DATA ═══ */
const CARS = {
  1: { id:1, brand:"Toyota", brandAr:"تويوتا", model:"Corolla XLI", year:2021, km:45000, city:"بيروت", type:"خصوصي", carType:"sedan", color:"#1565c0", photo:"https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=500&h=300&fit=crop", currentBid:12500, startPrice:10000, bids:8, views:234, minInc:100, endsAt:Date.now()+72e6,
    bidHistory:[{u:"علي م.",a:12500,t:"منذ 3 د"},{u:"حسين خ.",a:12400,t:"منذ 8 د"},{u:"أحمد ن.",a:12200,t:"منذ 15 د"}],
    specs:{ engine:"1.6L 4-Cylinder", hp:"121 حصان", trans:"CVT أوتوماتيك", fuel:"بنزين", drive:"أمامي", color:"أبيض لؤلؤي" },
    inspection:{ engine:90, body:85, interior:88, tires:75, brakes:92, electrical:95, ac:100, overall:89 },
    condition:"ممتازة", plate:"ب ٤٥٢٣١", desc:"سيارة بحالة ممتازة، صيانة وكالة كاملة، مالك واحد فقط." },

  2: { id:2, brand:"Hyundai", brandAr:"هيونداي", model:"Tucson GLS", year:2020, km:62000, city:"طرابلس", type:"خصوصي", carType:"suv", color:"#00695c", photo:"https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?w=500&h=300&fit=crop", currentBid:14800, startPrice:11000, bids:12, views:310, minInc:100, endsAt:Date.now()+54e6,
    bidHistory:[{u:"محمد ر.",a:14800,t:"منذ 1 د"},{u:"كريم ب.",a:14700,t:"منذ 5 د"},{u:"رامي ع.",a:14500,t:"منذ 12 د"}],
    specs:{ engine:"2.0L 4-Cylinder", hp:"155 حصان", trans:"أوتوماتيك 6 سرعات", fuel:"بنزين", drive:"أمامي", color:"رمادي غامق" },
    inspection:{ engine:85, body:80, interior:82, tires:70, brakes:88, electrical:90, ac:95, overall:84 },
    condition:"جيدة جداً", plate:"ط ١٢٣٤٥", desc:"SUV عائلي مريح، فحص كامل، جاهزة للاستخدام." },

  3: { id:3, brand:"Kia", brandAr:"كيا", model:"Sportage LX", year:2022, km:28000, city:"صيدا", type:"خصوصي", carType:"suv", color:"#b71c1c", photo:"https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=500&h=300&fit=crop", currentBid:16200, startPrice:13000, bids:6, views:189, minInc:100, endsAt:Date.now()+86e6,
    bidHistory:[{u:"وسام ح.",a:16200,t:"منذ 10 د"},{u:"طارق م.",a:16100,t:"منذ 20 د"}],
    specs:{ engine:"2.0L 4-Cylinder", hp:"150 حصان", trans:"أوتوماتيك 6 سرعات", fuel:"بنزين", drive:"أمامي AWD", color:"أحمر كريستال" },
    inspection:{ engine:92, body:90, interior:93, tires:85, brakes:90, electrical:95, ac:98, overall:92 },
    condition:"ممتازة", plate:"ص ٧٨٩٠١", desc:"موديل حديث بكيلومتراج قليل، لون مميز، فل أوبشن." },

  4: { id:4, brand:"Honda", brandAr:"هوندا", model:"Civic RS Turbo", year:2019, km:78000, city:"جونيه", type:"خصوصي", carType:"sedan", color:"#283593", photo:"https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=500&h=300&fit=crop", currentBid:13500, startPrice:10500, bids:15, views:420, minInc:100, endsAt:Date.now()+36e6,
    bidHistory:[{u:"جاد س.",a:13500,t:"منذ 2 د"},{u:"ربيع ف.",a:13400,t:"منذ 4 د"},{u:"سامر ل.",a:13200,t:"منذ 9 د"},{u:"فادي ك.",a:13000,t:"منذ 15 د"}],
    specs:{ engine:"1.5L Turbo 4-Cylinder", hp:"174 حصان", trans:"CVT أوتوماتيك", fuel:"بنزين", drive:"أمامي", color:"أزرق ليلي" },
    inspection:{ engine:82, body:78, interior:80, tires:65, brakes:85, electrical:88, ac:90, overall:81 },
    condition:"جيدة", plate:"ج ٥٦٧٨٩", desc:"سيارة رياضية بمحرك تيربو، أداء قوي على الطريق." },

  5: { id:5, brand:"Nissan", brandAr:"نيسان", model:"Kicks SR", year:2023, km:12000, city:"بيروت", type:"خصوصي", carType:"suv", color:"#e65100", photo:"https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=500&h=300&fit=crop", currentBid:15800, startPrice:13500, bids:9, views:275, minInc:100, endsAt:Date.now()+96e6,
    bidHistory:[{u:"نبيل ع.",a:15800,t:"منذ 7 د"},{u:"زياد م.",a:15700,t:"منذ 14 د"}],
    specs:{ engine:"1.6L 4-Cylinder", hp:"118 حصان", trans:"CVT أوتوماتيك", fuel:"بنزين", drive:"أمامي", color:"برتقالي" },
    inspection:{ engine:96, body:95, interior:97, tires:92, brakes:95, electrical:98, ac:100, overall:96 },
    condition:"شبه جديدة", plate:"ب ١١٢٢٣", desc:"شبه جديدة، كيلومتراج قليل جداً، ضمان وكالة ساري." },

  6: { id:6, brand:"Toyota", brandAr:"تويوتا", model:"Hilux 4x4 DC", year:2021, km:55000, city:"البقاع", type:"نقل خاص", carType:"pickup", color:"#33691e", photo:"https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=500&h=300&fit=crop", currentBid:22000, startPrice:18000, bids:18, views:380, minInc:200, endsAt:Date.now()+48e6,
    bidHistory:[{u:"حسن ج.",a:22000,t:"منذ 1 د"},{u:"عباس ق.",a:21800,t:"منذ 3 د"},{u:"مصطفى ي.",a:21500,t:"منذ 8 د"}],
    specs:{ engine:"2.4L Diesel Turbo", hp:"150 حصان", trans:"أوتوماتيك 6 سرعات", fuel:"ديزل", drive:"دفع رباعي 4WD", color:"أبيض" },
    inspection:{ engine:88, body:82, interior:78, tires:72, brakes:85, electrical:90, ac:88, overall:83 },
    condition:"جيدة", plate:"بق ٣٣٤٤٥", desc:"بيك أب قوي ومتين، مثالي للطرق الوعرة والعمل." },

  7: { id:7, brand:"Suzuki", brandAr:"سوزوكي", model:"Swift GL", year:2022, km:22000, city:"طرابلس", type:"خصوصي", carType:"hatch", color:"#6a1b9a", photo:"https://images.unsplash.com/photo-1609073575092-51ae1c8f3933?w=500&h=300&fit=crop", currentBid:8500, startPrice:7000, bids:4, views:145, minInc:100, endsAt:Date.now()+110e6,
    bidHistory:[{u:"خالد د.",a:8500,t:"منذ 20 د"}],
    specs:{ engine:"1.2L 4-Cylinder", hp:"82 حصان", trans:"أوتوماتيك CVT", fuel:"بنزين", drive:"أمامي", color:"بنفسجي" },
    inspection:{ engine:93, body:91, interior:90, tires:88, brakes:92, electrical:94, ac:96, overall:92 },
    condition:"ممتازة", plate:"ط ٩٨٧٦٥", desc:"اقتصادية جداً بالوقود، مثالية للمدينة." },

  8: { id:8, brand:"Mercedes", brandAr:"مرسيدس", model:"C200 AMG Line", year:2019, km:68000, city:"بيروت", type:"خصوصي", carType:"sedan", color:"#212121", photo:"https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=500&h=300&fit=crop", currentBid:28500, startPrice:22000, bids:22, views:650, minInc:250, endsAt:Date.now()+24e6,
    bidHistory:[{u:"إيلي م.",a:28500,t:"منذ 30 ث"},{u:"شربل ب.",a:28250,t:"منذ 2 د"},{u:"ميشال ع.",a:28000,t:"منذ 5 د"},{u:"طوني ر.",a:27500,t:"منذ 10 د"}],
    specs:{ engine:"2.0L Turbo 4-Cylinder", hp:"184 حصان", trans:"أوتوماتيك 9G-TRONIC", fuel:"بنزين", drive:"خلفي", color:"أسود أوبسيديان" },
    inspection:{ engine:80, body:82, interior:85, tires:70, brakes:82, electrical:88, ac:90, overall:82 },
    condition:"جيدة جداً", plate:"ب ٧٧٨٨٩", desc:"فخامة ألمانية مع باكيج AMG، داخلية جلد كاملة." },
};

const AUCTIONS = [
  { id:1, title:"مزاد تنافسي 5", date:"23/05/2026", type:"competitive", status:"live", carIds:[1,4,5,8] },
  { id:2, title:"مزاد تنافسي 4", date:"22/05/2026", type:"competitive", status:"live", carIds:[2,3,6,7] },
];
const UPCOMING = [
  { id:10, title:"مزاد تنافسي 6", date:"30/05/2026", type:"competitive", status:"upcoming", carIds:[] },
  { id:11, title:"مزاد مغلق 2", date:"02/06/2026", type:"sealed", status:"upcoming", carIds:[] },
];

const TX = {
  ar: {
    dir: "rtl",
    currentAuctions: "المزادات الحالية", upcomingAuctions: "المزادات القادمة",
    auctions: "⊞ المزادات", cars: "🚗 السيارات", filter: "⚙ فلترة",
    endedAuctions: "المزادات المنتهية", liveAuction: "مزاد حالي",
    home: "الرئيسية", myAuctions: "مزاداتي", actions: "إجراءاتي", more: "المزيد",
    back: "→ رجوع", backHome: "→ الرئيسية",
    all: "الكل", cities: ["الكل","بيروت","طرابلس","صيدا","جونيه","البقاع"],
    cars_count: (n) => `🚗 ${n} سيارات`, views: (n) => `👁 ${n} مشاهدة`,
    highestPrice: "أعلى سعر", openingPrice: "سعر الافتتاح",
    bids: "المزايدات", noBids: "لا يوجد", bid_count: (n) => `${n} مزايدة`,
    timeLeft: "⏱ ينتهي بعد", condition: "الحالة", inspection: "الفحص",
    specs: "المواصفات", inspectionReport: "تقرير الفحص", bidHistory: "المزايدات",
    km: "كم", private: "خصوصي", commercial: "نقل خاص",
    bidNow: "زاوِد الآن", submitBid: "قدّم عرض",
    inspItems: { engine:"⚙️ المحرك والميكانيك", body:"🚗 الهيكل الخارجي", interior:"💺 المقصورة الداخلية", tires:"🛞 الإطارات", brakes:"🛑 الفرامل", electrical:"⚡ النظام الكهربائي", ac:"❄️ التكييف" },
    overallRating: "التقييم العام", inspectedBy: "فحص شامل بواسطة فريق متخصص",
    addPhotos: "📷 أضف صور من المعرض",
    currentBid: "أعلى عرض", minBid: "الحد الأدنى",
    bidAmount: "مبلغ المزايدة", confirmBid: "تأكيد المزايدة",
    bidSuccess: "تم تسجيل مزايدتك!", noAuctions: "لم تشارك في أي مزاد بعد",
    browseAuctions: "تصفح المزادات", noActions: "لا توجد إجراءات",
    hello: "مرحباً", profile: "الملف الشخصي", notifications: "الإشعارات",
    help: "مركز المساعدة", about: "من نحن", terms: "الشروط والأحكام",
    logout: "تسجيل الخروج", copyright: "© MAZAD Lebanon 2026 🇱🇧",
    liveNow: "مباشر", competitive: "تنافسي", slogan: "منصة المزادات الرقمية الأولى في لبنان",
  },
  en: {
    dir: "ltr",
    currentAuctions: "Current Auctions", upcomingAuctions: "Upcoming Auctions",
    auctions: "⊞ Auctions", cars: "🚗 Cars", filter: "⚙ Filter",
    endedAuctions: "Ended Auctions", liveAuction: "Live Auction",
    home: "Home", myAuctions: "My Bids", actions: "Actions", more: "More",
    back: "← Back", backHome: "← Home",
    all: "All", cities: ["All","Beirut","Tripoli","Sidon","Jounieh","Bekaa"],
    cars_count: (n) => `🚗 ${n} Cars`, views: (n) => `👁 ${n} Views`,
    highestPrice: "Highest Bid", openingPrice: "Opening Price",
    bids: "Bids", noBids: "No bids", bid_count: (n) => `${n} bids`,
    timeLeft: "⏱ Ends in", condition: "Condition", inspection: "Inspection",
    specs: "Specifications", inspectionReport: "Inspection Report", bidHistory: "Bid History",
    km: "km", private: "Private", commercial: "Commercial",
    bidNow: "Bid Now", submitBid: "Submit Bid",
    inspItems: { engine:"⚙️ Engine & Mechanics", body:"🚗 Body & Exterior", interior:"💺 Interior", tires:"🛞 Tires", brakes:"🛑 Brakes", electrical:"⚡ Electrical System", ac:"❄️ Air Conditioning" },
    overallRating: "Overall Rating", inspectedBy: "Comprehensive inspection by certified team",
    addPhotos: "📷 Add Photos from Gallery",
    currentBid: "Current Bid", minBid: "Minimum",
    bidAmount: "Bid Amount", confirmBid: "Confirm Bid",
    bidSuccess: "Your bid was placed!", noAuctions: "You haven't joined any auction yet",
    browseAuctions: "Browse Auctions", noActions: "No actions yet",
    hello: "Hello", profile: "Profile", notifications: "Notifications",
    help: "Help Center", about: "About Us", terms: "Terms & Conditions",
    logout: "Logout", copyright: "© MAZAD Lebanon 2026 🇱🇧",
    liveNow: "Live", competitive: "Competitive", slogan: "Lebanon's #1 Digital Car Auction Platform",
  }
};
/* ═══ HOOKS ═══ */
function useCountdown(endsAt) {
  const [n, setN] = useState(Date.now());
  useEffect(() => { const iv = setInterval(() => setN(Date.now()), 1000); return () => clearInterval(iv); }, []);
  const left = Math.max(0, endsAt - n);
  const d = Math.floor(left / 864e5), h = Math.floor((left % 864e5) / 36e5), m = Math.floor((left % 36e5) / 6e4), s = Math.floor((left % 6e4) / 1e3);
  return { done: left === 0, txt: `${String(d).padStart(2,"0")}:${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}` };
}

function Timer({ endsAt }) {
  const { txt, done } = useCountdown(endsAt);
  if (done) return <span style={{ color: C.red, fontWeight: 700, fontSize: 11 }}>انتهى</span>;
  return <span style={{ fontFamily: "monospace", fontSize: 12, fontWeight: 700, color: C.primary, direction: "ltr", display: "inline-block" }}>{txt}</span>;
}

function Logo({ size = 1, center = false }) {
  const w = 140 * size;
  const h = 48 * size;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 96">
    <defs>
      <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1e56a0"/>
        <stop offset="100%" stop-color="#2874c4"/>
      </linearGradient>
      <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#e53935"/>
        <stop offset="100%" stop-color="#ff5252"/>
      </linearGradient>
    </defs>
    <!-- Shield shape -->
    <path d="M8,12 L44,4 L44,52 C44,68 26,80 26,80 C26,80 8,68 8,52 Z" fill="url(#g1)" rx="4"/>
    <!-- Car icon in shield -->
    <path d="M16,42 L19,34 L25,32 L33,32 L37,34 L40,42 L40,46 L16,46 Z" fill="white" opacity="0.9"/>
    <circle cx="21" cy="46" r="3" fill="#1e56a0"/>
    <circle cx="35" cy="46" r="3" fill="#1e56a0"/>
    <path d="M21,34 L25,33 L30,33 L30,38 L21,38 Z" fill="rgba(135,206,250,0.6)"/>
    <path d="M31,33 L35,34 L38,38 L31,38 Z" fill="rgba(135,206,250,0.6)"/>
    <!-- Gavel icon -->
    <path d="M30,16 L38,8 L42,12 L34,20 Z" fill="white" opacity="0.8"/>
    <path d="M26,20 L34,20 L34,24 L26,24 Z" fill="white" opacity="0.6" rx="1"/>
    <!-- Arabic text مزاد -->
    <text x="56" y="46" font-family="Arial,sans-serif" font-weight="900" font-size="40" fill="#1e56a0">مزاد</text>
    <!-- English MAZAD -->
    <text x="56" y="72" font-family="Arial,sans-serif" font-weight="800" font-size="22" fill="url(#g2)" letter-spacing="3">MAZAD</text>
    <!-- Lebanon badge -->
    <rect x="152" y="56" width="62" height="20" rx="10" fill="#f4f6f9" stroke="#e8ecf1" stroke-width="1"/>
    <text x="170" y="70" font-family="Arial,sans-serif" font-weight="700" font-size="11" fill="#7b8794">Lebanon</text>
    <text x="155" y="71" font-size="12">🇱🇧</text>
  </svg>`;
  const encoded = btoa(unescape(encodeURIComponent(svg)));
  return (
    <div style={{ display: "flex", justifyContent: center ? "center" : "flex-start" }}>
      <img src={`data:image/svg+xml;base64,${encoded}`} alt="MAZAD Lebanon" style={{ width: w, height: h }} />
    </div>
  );
}

/* ═══ INSPECTION BAR ═══ */
function InspBar({ label, value }) {
  const clr = value >= 90 ? C.green : value >= 75 ? C.gold : C.red;
  return (
    <div style={{ marginBottom: 6 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 3 }}>
        <span style={{ color: C.sub }}>{label}</span>
        <span style={{ fontWeight: 700, color: clr }}>{value}%</span>
      </div>
      <div style={{ height: 6, background: "#eee", borderRadius: 3, overflow: "hidden" }}>
        <div style={{ width: value + "%", height: "100%", background: clr, borderRadius: 3, transition: "width 0.5s" }} />
      </div>
    </div>
  );
}

/* ═══ LANGUAGE SELECTION SCREEN ═══ */
function LangSelect({ onSelect }) {
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #0c1b2e 0%, #1a3a5c 50%, #0c1b2e 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "Tajawal, sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&display=swap');`}</style>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "40%", background: "radial-gradient(ellipse at top, rgba(30,86,160,0.25) 0%, transparent 70%)" }} />

      <div style={{ zIndex: 1, marginBottom: 20 }}>
        <Logo size={1.5} center={true} />
      </div>

      <div style={{ background: "#fff", borderRadius: 24, padding: "36px 28px", width: "100%", maxWidth: 400, boxShadow: "0 24px 80px rgba(0,0,0,0.35)", zIndex: 1, textAlign: "center" }}>
        <div style={{ fontSize: 20, fontWeight: 800, color: C.text, marginBottom: 4 }}>اختر اللغة</div>
        <div style={{ fontSize: 14, color: C.sub, marginBottom: 28 }}>Choose your language</div>

        <button onClick={() => onSelect("ar")} style={{
          width: "100%", padding: "18px 0", background: C.lightBlue, border: "2px solid " + C.primary,
          borderRadius: 16, cursor: "pointer", marginBottom: 12, display: "flex", alignItems: "center",
          justifyContent: "center", gap: 12, transition: "all 0.2s",
        }}>
          <span style={{ fontSize: 28 }}>🇱🇧</span>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 20, fontWeight: 900, color: C.primary }}>العربية</div>
            <div style={{ fontSize: 12, color: C.sub }}>Arabic</div>
          </div>
        </button>

        <button onClick={() => onSelect("en")} style={{
          width: "100%", padding: "18px 0", background: "#f8f9fb", border: "2px solid " + C.border,
          borderRadius: 16, cursor: "pointer", display: "flex", alignItems: "center",
          justifyContent: "center", gap: 12, transition: "all 0.2s",
        }}>
          <span style={{ fontSize: 28 }}>🇬🇧</span>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: 20, fontWeight: 900, color: C.text }}>English</div>
            <div style={{ fontSize: 12, color: C.sub }}>الإنجليزية</div>
          </div>
        </button>
      </div>
    </div>
  );
}

/* ═══ LOGIN SCREEN ═══ */
function LoginScreen({ onLogin }) {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState("ar");

  const lt = {
    ar: { welcome: "مرحباً بك", subtitle: "أدخل رقم جوالك للمتابعة", next: "متابعة", sending: "جاري الإرسال...", otp: "رمز التحقق", otpDesc: "أدخل الرمز المرسل إلى", confirm: "تأكيد الدخول", verifying: "جاري التحقق...", resend: "لم يصلك؟", resendBtn: "إعادة الإرسال", change: "← تغيير الرقم", terms: "بالمتابعة أنت توافق على الشروط والأحكام", slogan: "مزاد السيارات الرقمي الأول في لبنان", ph: "03 أو 70 أو 71 أو 76..." },
    en: { welcome: "Welcome", subtitle: "Enter your mobile number to continue", next: "Continue", sending: "Sending...", otp: "Verification Code", otpDesc: "Enter the code sent to", confirm: "Confirm Login", verifying: "Verifying...", resend: "Didn't receive it?", resendBtn: "Resend", change: "← Change number", terms: "By continuing you agree to Terms & Conditions", slogan: "Lebanon's First Digital Car Auction", ph: "03, 70, 71, 76..." },
  };
  const tx = lt[lang];

  function goOtp() { if (phone.length >= 1) { setLoading(true); setTimeout(() => { setLoading(false); setStep(2); }, 800); } }
  function doLogin() { setLoading(true); setTimeout(() => onLogin(phone), 600); }

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #0c1b2e 0%, #1a3a5c 50%, #0c1b2e 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, direction: lang === "ar" ? "rtl" : "ltr", fontFamily: "Tajawal, sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&display=swap');`}</style>

      {/* Lang toggle */}
      <div style={{ position: "absolute", top: 16, right: 16, display: "flex", gap: 4 }}>
        {[["ar","عربي"],["en","EN"]].map(([k,l]) => (
          <button key={k} onClick={() => setLang(k)} style={{ padding: "6px 14px", border: "1px solid " + (lang === k ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.1)"), borderRadius: 8, background: lang === k ? "rgba(255,255,255,0.15)" : "transparent", color: lang === k ? "#fff" : "rgba(255,255,255,0.4)", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>{l}</button>
        ))}
      </div>

      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "40%", background: "radial-gradient(ellipse at top, rgba(30,86,160,0.25) 0%, transparent 70%)" }} />

      {/* Logo */}
      <div style={{ zIndex: 1, marginBottom: 8 }}>
        <Logo size={1.4} center={true} />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 32, zIndex: 1 }}>
        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>{tx.slogan}</span>
      </div>

      {/* Card */}
      <div style={{ background: "#fff", borderRadius: 24, padding: "30px 26px", width: "100%", maxWidth: 400, boxShadow: "0 24px 80px rgba(0,0,0,0.35)", zIndex: 1 }}>
        {step === 1 ? (
          <>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: C.text, margin: "0 0 6px" }}>{tx.welcome}</h2>
            <p style={{ fontSize: 13, color: C.sub, margin: "0 0 22px" }}>{tx.subtitle}</p>
            <div style={{ position: "relative", marginBottom: 18 }}>
              <div style={{ position: "absolute", [lang === "ar" ? "right" : "left"]: 14, top: "50%", transform: "translateY(-50%)", display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 16 }}>🇱🇧</span>
                <span style={{ fontSize: 13, color: C.sub, fontWeight: 700, borderRight: lang === "ar" ? "none" : "1px solid " + C.border, borderLeft: lang === "ar" ? "1px solid " + C.border : "none", paddingRight: lang === "ar" ? 0 : 8, paddingLeft: lang === "ar" ? 8 : 0 }}>+961</span>
              </div>
              <input value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g, "").slice(0, 8))}
                placeholder={lang === "ar" ? "03 أو 70 أو 71 أو 76..." : "03, 70, 71, 76..."}
                style={{ width: "100%", padding: "15px 16px", [lang === "ar" ? "paddingRight" : "paddingLeft"]: 90, border: "2px solid " + C.border, borderRadius: 14, fontSize: 18, fontWeight: 600, outline: "none", direction: "ltr", textAlign: "left", boxSizing: "border-box", letterSpacing: 2, transition: "border 0.2s" }}
                onFocus={e => e.target.style.borderColor = C.primary} onBlur={e => e.target.style.borderColor = C.border} />
            </div>
            <button onClick={goOtp} style={{ width: "100%", padding: "14px 0", background: phone.length >= 1 ? C.primary : C.border, color: phone.length >= 1 ? "#fff" : C.muted, border: "none", borderRadius: 14, fontWeight: 800, fontSize: 16, cursor: phone.length >= 1 ? "pointer" : "default", boxShadow: phone.length >= 1 ? "0 4px 20px rgba(30,86,160,0.35)" : "none", transition: "all 0.3s" }}>
              {loading ? tx.sending : tx.next}
            </button>
            <p style={{ fontSize: 11, color: C.muted, textAlign: "center", marginTop: 14, lineHeight: 1.6 }}>{tx.terms}</p>
          </>
        ) : (
          <>
            <button onClick={() => setStep(1)} style={{ background: "none", border: "none", color: C.primary, fontWeight: 700, fontSize: 13, cursor: "pointer", marginBottom: 14 }}>{tx.change}</button>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: C.text, margin: "0 0 6px" }}>{tx.otp}</h2>
            <p style={{ fontSize: 13, color: C.sub, margin: "0 0 22px" }}>{tx.otpDesc} <span style={{ direction: "ltr", display: "inline-block", fontWeight: 700, color: C.text }}>+961 {phone}</span></p>
            <input value={code} onChange={e => setCode(e.target.value.replace(/\D/g, "").slice(0, 4))}
              placeholder="1 2 3 4" maxLength={4}
              style={{ width: "100%", padding: "16px", border: "2px solid " + C.primary, borderRadius: 14, fontSize: 28, fontWeight: 800, textAlign: "center", outline: "none", letterSpacing: 16, direction: "ltr", boxSizing: "border-box", background: "rgba(30,86,160,0.04)" }} />
            <button onClick={doLogin} style={{ width: "100%", padding: "14px 0", marginTop: 14, background: C.primary, color: "#fff", border: "none", borderRadius: 14, fontWeight: 800, fontSize: 16, cursor: "pointer", boxShadow: "0 4px 20px rgba(30,86,160,0.35)" }}>
              {loading ? tx.verifying : tx.confirm}
            </button>
            <p style={{ fontSize: 12, color: C.muted, textAlign: "center", marginTop: 14 }}>{tx.resend} <span style={{ color: C.primary, fontWeight: 700, cursor: "pointer" }}>{tx.resendBtn}</span></p>
          </>
        )}
      </div>
    </div>
  );
}

/* ═══ CAR CARD ═══ */
function CarItem({ car, t = TX.ar, onClick }) {
  const has = car.bids > 0;
  return (
    <div onClick={onClick} style={{ background: C.card, borderRadius: 12, overflow: "hidden", border: "1px solid " + C.border, marginBottom: 10, cursor: "pointer", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
      <CarSVG type={car.carType} color={car.color} photo={car.photo} />
      <div style={{ padding: "10px 12px 12px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <div style={{ display: "flex", gap: 6 }}>
            <span style={{ background: C.lightBlue, color: C.primary, fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 4 }}>{car.city}</span>
            <span style={{ fontSize: 11, color: C.sub }}>{car.km.toLocaleString()} {t.km}</span>
          </div>
          <span style={{ fontSize: 10, color: C.muted, background: "#f0f0f0", padding: "2px 6px", borderRadius: 4 }}>{car.type}</span>
        </div>
        <div style={{ fontSize: 14, fontWeight: 800, color: C.text, marginBottom: 3 }}>{car.brandAr} {car.model} {car.year}</div>
        <div style={{ fontSize: 11, color: C.muted, marginBottom: 8 }}>{t.condition}: <span style={{ color: car.inspection.overall >= 90 ? C.green : C.gold, fontWeight: 700 }}>{car.condition}</span> · {t.inspection}: {car.inspection.overall}%</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}><span style={{ fontSize: 11, color: C.sub }}>⏱</span><Timer endsAt={car.endsAt} /></div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderTop: "1px solid " + C.border, paddingTop: 8 }}>
          <div>
            <div style={{ fontSize: 10, color: C.sub }}>{has ? t.highestPrice : t.openingPrice}</div>
            <div style={{ fontSize: 18, fontWeight: 900, color: C.primary, direction: "ltr", textAlign: "left" }}>${(has ? car.currentBid : car.startPrice).toLocaleString()}</div>
          </div>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: 10, color: C.sub }}>{t.bids}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: has ? C.text : C.muted }}>{has ? t.bid_count(car.bids) : t.noBids}</div>
          </div>
          <div style={{ fontSize: 11, color: C.sub }}>{car.views} 👁</div>
        </div>
      </div>
    </div>
  );
}

/* ═══ CAR DETAIL ═══ */
function CarDetail({ car, setCars, t = TX.ar, onBack }) {
  const [showBid, setShowBid] = useState(false);
  const [detailTab, setDetailTab] = useState("specs");
  const [gallery, setGallery] = useState(car.photo ? [car.photo] : []);
  const [activeImg, setActiveImg] = useState(0);
  const has = car.bids > 0;

  function handleUpload(e) {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = ev => {
        setGallery(prev => [...prev, ev.target.result]);
      };
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  }

  function handleBid(amt) {
    setCars(p => ({ ...p, [car.id]: { ...p[car.id], currentBid: amt, bids: p[car.id].bids + 1, bidHistory: [{ u: "أنت", a: amt, t: "الآن" }, ...p[car.id].bidHistory] } }));
  }

  return (
    <div>
      <button onClick={onBack} style={{ background: C.lightBlue, border: "none", borderRadius: 8, padding: "8px 14px", cursor: "pointer", fontWeight: 700, fontSize: 13, color: C.primary, marginBottom: 10 }}>{t.back}</button>
      
      {/* Photo Gallery */}
      <div style={{ borderRadius: 14, overflow: "hidden", position: "relative" }}>
        {gallery.length > 0 ? (
          <div style={{ position: "relative" }}>
            <img src={gallery[activeImg]} alt="" style={{ width: "100%", height: 200, objectFit: "cover", display: "block" }}
              onError={e => { e.target.style.display = "none"; }} />
            {gallery.length > 1 && (
              <>
                <button onClick={() => setActiveImg(i => (i - 1 + gallery.length) % gallery.length)} style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.4)", border: "none", borderRadius: "50%", width: 32, height: 32, color: "#fff", fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>›</button>
                <button onClick={() => setActiveImg(i => (i + 1) % gallery.length)} style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.4)", border: "none", borderRadius: "50%", width: 32, height: 32, color: "#fff", fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>‹</button>
                <div style={{ position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 5 }}>
                  {gallery.map((_, i) => <div key={i} onClick={() => setActiveImg(i)} style={{ width: i === activeImg ? 18 : 7, height: 7, borderRadius: 4, background: i === activeImg ? "#fff" : "rgba(255,255,255,0.5)", cursor: "pointer", transition: "all 0.3s" }} />)}
                </div>
              </>
            )}
            <div style={{ position: "absolute", top: 8, left: 8, background: "rgba(0,0,0,0.5)", borderRadius: 6, padding: "3px 8px", fontSize: 11, color: "#fff" }}>📷 {activeImg + 1}/{gallery.length}</div>
          </div>
        ) : (
          <CarSVG type={car.carType} color={car.color} size="lg" photo={car.photo} />
        )}
      </div>

      {/* Thumbnail strip + Upload */}
      <div style={{ display: "flex", gap: 6, marginTop: 8, marginBottom: 4, alignItems: "center", overflowX: "auto" }}>
        {gallery.map((img, i) => (
          <div key={i} onClick={() => setActiveImg(i)} style={{ width: 52, height: 40, borderRadius: 8, overflow: "hidden", border: i === activeImg ? "2px solid " + C.primary : "2px solid " + C.border, cursor: "pointer", flexShrink: 0 }}>
            <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => { e.target.parentElement.style.background = "#eee"; e.target.style.display = "none"; }} />
          </div>
        ))}
        <label style={{ width: 52, height: 40, borderRadius: 8, border: "2px dashed " + C.primary, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, background: C.lightBlue, fontSize: 18 }}>
          ➕
          <input type="file" accept="image/*" multiple onChange={handleUpload} style={{ display: "none" }} />
        </label>
      </div>
      <label style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "10px 0", background: C.lightBlue, border: "1px dashed " + C.primary, borderRadius: 10, cursor: "pointer", marginBottom: 4, fontSize: 13, fontWeight: 700, color: C.primary }}>
        📷 أضف صور من المعرض
        <input type="file" accept="image/*" multiple onChange={handleUpload} style={{ display: "none" }} />
      </label>

      {/* Main Info */}
      <div style={{ background: C.card, borderRadius: 14, padding: "16px 14px", marginTop: -12, position: "relative", zIndex: 2, border: "1px solid " + C.border }}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>
          <span style={{ background: C.lightBlue, color: C.primary, fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 6 }}>📍 {car.city}</span>
          <span style={{ background: "#f0f0f0", fontSize: 10, fontWeight: 600, padding: "3px 8px", borderRadius: 6, color: C.sub }}>{car.type}</span>
          <span style={{ background: "#f0f0f0", fontSize: 10, fontWeight: 600, padding: "3px 8px", borderRadius: 6, color: C.sub }}>{car.km.toLocaleString()} {t.km}</span>
          <span style={{ background: car.inspection.overall >= 90 ? "rgba(39,174,96,0.1)" : "rgba(243,156,18,0.1)", fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 6, color: car.inspection.overall >= 90 ? C.green : C.gold }}>✓ {car.condition}</span>
        </div>
        <div style={{ fontSize: 11, color: C.muted, marginBottom: 2 }}>{car.brand} {car.model}</div>
        <h2 style={{ fontSize: 20, fontWeight: 900, color: C.text, margin: "0 0 4px" }}>{car.brandAr} {car.model} {car.year}</h2>
        <p style={{ fontSize: 12, color: C.sub, margin: "0 0 12px", lineHeight: 1.5 }}>{car.desc}</p>

        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}><span style={{ fontSize: 12, color: C.sub }}>{t.timeLeft}</span><Timer endsAt={car.endsAt} /></div>

        <div style={{ background: C.lightBlue, borderRadius: 12, padding: 14, display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 11, color: C.sub }}>{has ? t.highestPrice : t.openingPrice}</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: C.primary, direction: "ltr", textAlign: "left" }}>${(has ? car.currentBid : car.startPrice).toLocaleString()}</div>
          </div>
          <div style={{ display: "flex", gap: 14 }}>
            <div style={{ textAlign: "center" }}><div style={{ fontSize: 20, fontWeight: 900, color: C.primary }}>{car.bids}</div><div style={{ fontSize: 9, color: C.sub }}>مزايدة</div></div>
            <div style={{ textAlign: "center" }}><div style={{ fontSize: 20, fontWeight: 900, color: C.primary }}>{car.views}</div><div style={{ fontSize: 9, color: C.sub }}>مشاهدة</div></div>
          </div>
        </div>
        <button onClick={() => setShowBid(true)} style={{ width: "100%", padding: "14px 0", background: C.red, color: "#fff", border: "none", borderRadius: 10, fontWeight: 800, fontSize: 16, cursor: "pointer" }}>{t.bidNow}</button>
      </div>

      {/* Detail Tabs */}
      <div style={{ display: "flex", gap: 0, marginTop: 10, background: C.card, borderRadius: "12px 12px 0 0", border: "1px solid " + C.border, borderBottom: "none", overflow: "hidden" }}>
        {[["specs","المواصفات"],["inspection","تقرير الفحص"],["bids","المزايدات"]].map(([k,l]) => (
          <button key={k} onClick={() => setDetailTab(k)} style={{ flex: 1, padding: "11px 0", border: "none", background: detailTab === k ? C.primary : "transparent", color: detailTab === k ? "#fff" : C.sub, fontWeight: 700, fontSize: 12, cursor: "pointer" }}>{l}</button>
        ))}
      </div>
      <div style={{ background: C.card, borderRadius: "0 0 12px 12px", padding: "14px 14px", border: "1px solid " + C.border, borderTop: "none" }}>
        {detailTab === "specs" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {Object.entries(car.specs).map(([k, v]) => (
              <div key={k} style={{ background: "#f8f9fb", borderRadius: 8, padding: "10px 10px" }}>
                <div style={{ fontSize: 10, color: C.muted, marginBottom: 2 }}>{k}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.text }}>{v}</div>
              </div>
            ))}
          </div>
        )}
        {detailTab === "inspection" && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, background: car.inspection.overall >= 90 ? "rgba(39,174,96,0.08)" : "rgba(243,156,18,0.08)", borderRadius: 10, padding: 12 }}>
              <div style={{ width: 52, height: 52, borderRadius: 26, border: `3px solid ${car.inspection.overall >= 90 ? C.green : C.gold}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 900, color: car.inspection.overall >= 90 ? C.green : C.gold }}>{car.inspection.overall}%</div>
              <div><div style={{ fontSize: 14, fontWeight: 800, color: C.text }}>{`${t.overallRating}:`} {car.condition}</div><div style={{ fontSize: 11, color: C.sub }}>{t.inspectedBy}</div></div>
            </div>
            <InspBar label={t.inspItems.engine} value={car.inspection.engine} />
            <InspBar label={t.inspItems.body} value={car.inspection.body} />
            <InspBar label={t.inspItems.interior} value={car.inspection.interior} />
            <InspBar label={t.inspItems.tires} value={car.inspection.tires} />
            <InspBar label={t.inspItems.brakes} value={car.inspection.brakes} />
            <InspBar label={t.inspItems.electrical} value={car.inspection.electrical} />
            <InspBar label={t.inspItems.ac} value={car.inspection.ac} />
          </div>
        )}
        {detailTab === "bids" && (
          car.bidHistory.length > 0 ? car.bidHistory.map((b, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i < car.bidHistory.length - 1 ? "1px solid " + C.border : "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 30, height: 30, borderRadius: 15, background: i === 0 ? C.lightBlue : "#f5f5f5", color: i === 0 ? C.primary : C.sub, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }}>{i === 0 ? "👑" : i + 1}</div>
                <div><div style={{ fontSize: 12, fontWeight: i === 0 ? 700 : 500 }}>{b.u}</div><div style={{ fontSize: 10, color: C.muted }}>{b.t}</div></div>
              </div>
              <div style={{ fontSize: 14, fontWeight: 800, color: i === 0 ? C.primary : C.text, direction: "ltr" }}>${b.a.toLocaleString()}</div>
            </div>
          )) : <div style={{ textAlign: "center", padding: 20, color: C.muted }}>لا توجد مزايدات بعد</div>
        )}
      </div>

      {showBid && <BidSheet car={car} t={t} onClose={() => setShowBid(false)} onBid={amt => { handleBid(amt); setShowBid(false); }} />}
    </div>
  );
}

/* ═══ BID SHEET ═══ */
function BidSheet({ car, t = TX.ar, onClose, onBid }) {
  const min = (car.currentBid || car.startPrice) + car.minInc;
  const [amount, setAmount] = useState(min);
  const [done, setDone] = useState(false);
  function submit() { if (amount < min) return; onBid(amount); setDone(true); setTimeout(() => { setDone(false); onClose(); }, 1200); }
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 999, display: "flex", alignItems: "flex-end" }} onClick={onClose}>
      <div style={{ background: C.card, borderRadius: "20px 20px 0 0", width: "100%", maxWidth: 500, margin: "0 auto", padding: "0 20px 28px", animation: "su .3s ease" }} onClick={e => e.stopPropagation()}>
        <div style={{ padding: "10px 0 16px", display: "flex", justifyContent: "center" }}><div style={{ width: 36, height: 4, borderRadius: 2, background: "#ddd" }} /></div>
        {done ? (
          <div style={{ textAlign: "center", padding: 20 }}><div style={{ fontSize: 48 }}>✅</div><div style={{ fontSize: 18, fontWeight: 800, color: C.green, marginTop: 10 }}>{t.bidSuccess}</div><div style={{ color: C.sub, marginTop: 4, direction: "ltr" }}>${amount.toLocaleString()}</div></div>
        ) : (
          <>
            <div style={{ fontSize: 16, fontWeight: 800, color: C.text, marginBottom: 4 }}>{car.brandAr} {car.model} {car.year}</div>
            <div style={{ fontSize: 12, color: C.sub, marginBottom: 14 }}>{car.city} · {car.km.toLocaleString()} كم</div>
            <div style={{ background: C.lightBlue, borderRadius: 10, padding: 12, marginBottom: 14, display: "flex", justifyContent: "space-between" }}>
              <div><div style={{ fontSize: 10, color: C.sub }}>{t.highestPrice}</div><div style={{ fontSize: 20, fontWeight: 900, color: C.primary, direction: "ltr" }}>${(car.currentBid || car.startPrice).toLocaleString()}</div></div>
              <Timer endsAt={car.endsAt} />
            </div>
            <div style={{ fontSize: 11, color: C.sub, marginBottom: 6 }}>مبلغ المزايدة ({t.minBid}: ${min.toLocaleString()})</div>
            <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
              <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} style={{ flex: 1, padding: "12px", border: "2px solid " + C.border, borderRadius: 10, fontSize: 18, fontWeight: 800, outline: "none", textAlign: "center", direction: "ltr", boxSizing: "border-box", fontFamily: "monospace" }} />
              <button onClick={() => setAmount(a => a + car.minInc)} style={{ background: C.lightBlue, border: "1px solid " + C.border, borderRadius: 10, width: 48, cursor: "pointer", fontSize: 20, fontWeight: 700, color: C.primary }}>+</button>
            </div>
            <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
              {[1, 3, 5].map(x => {
                const v = (car.currentBid || car.startPrice) + car.minInc * x;
                return <button key={x} onClick={() => setAmount(v)} style={{ flex: 1, background: amount === v ? C.lightBlue : "#f5f5f5", border: "1px solid " + (amount === v ? C.primary : C.border), borderRadius: 8, padding: "8px 0", cursor: "pointer", fontSize: 11, fontWeight: 700, color: amount === v ? C.primary : C.sub, direction: "ltr" }}>${v.toLocaleString()}</button>;
              })}
            </div>
            <button onClick={submit} style={{ width: "100%", padding: "14px 0", background: C.red, color: "#fff", border: "none", borderRadius: 10, fontWeight: 800, fontSize: 16, cursor: "pointer" }}>{t.bidNow} — ${amount.toLocaleString()}</button>
          </>
        )}
      </div>
    </div>
  );
}

/* ═══ AUCTION CARD ═══ */
function AuctionCard({ auction, t, onClick }) {
  return (
    <div onClick={onClick} style={{ background: C.card, border: "1px solid " + C.border, borderRadius: 12, padding: "20px 16px", cursor: "pointer", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Logo size={0.85} center={true} />
      <div style={{ fontSize: 15, fontWeight: 800, color: C.text, marginTop: 10 }}>{auction.title}</div>
      <div style={{ fontSize: 12, color: C.sub, marginTop: 4 }}>{auction.date}</div>
      {auction.status === "live" && <span style={{ marginTop: 6, background: "rgba(39,174,96,0.1)", color: C.green, borderRadius: 20, padding: "3px 10px", fontSize: 10, fontWeight: 700 }}>● {t.liveNow}</span>}
    </div>
  );
}

/* ═══ MAIN ═══ */
export default function App() {
  const [user, setUser] = useState(null);
  const [lang, setLang] = useState(null);
  const [tab, setTab] = useState("home");
  const [subTab, setSubTab] = useState("current");
  const [viewMode, setViewMode] = useState("auctions");
  const [selAuction, setSelAuction] = useState(null);
  const [selCar, setSelCar] = useState(null);
  const [cars, setCars] = useState(CARS);
  const [cityFilter, setCityFilter] = useState(null);

  const t = TX[lang || "ar"];
  const isAr = lang === "ar";

  if (!lang) return <LangSelect onSelect={l => setLang(l)} />;
  if (!user) return <LoginScreen onLogin={phone => setUser(phone)} />;

  const cityList = t.cities;
  const activeCityFilter = cityFilter || cityList[0];

  function getFiltered(ids) {
    let list = ids.map(id => cars[id]).filter(Boolean);
    if (activeCityFilter !== cityList[0]) {
      const arCities = TX.ar.cities;
      const enCities = TX.en.cities;
      const cityIdx = cityList.indexOf(activeCityFilter);
      const arCity = arCities[cityIdx];
      list = list.filter(c => c.city === arCity);
    }
    return list;
  }

  const navItems = [
    { k: "home", i: "🏠", l: t.home },
    { k: "my", i: "📋", l: t.myAuctions },
    { k: "actions", i: "📄", l: t.actions },
    { k: "more", i: "☰", l: t.more },
  ];

  return (
    <div style={{ minHeight: "100vh", background: C.bg, direction: t.dir, fontFamily: "Tajawal, 'Segoe UI', sans-serif", paddingBottom: 70 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&display=swap');
        @keyframes su{from{transform:translateY(100%)}to{transform:translateY(0)}}
        *{box-sizing:border-box} body{margin:0}
        input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none}
      `}</style>

      {/* HEADER */}
      <div style={{ background: C.card, borderBottom: "1px solid " + C.border, padding: "0 16px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 600, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 54 }}>
          <Logo />
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            {/* Lang Toggle */}
            <button onClick={() => { setLang(l => l === "ar" ? "en" : "ar"); setCityFilter(null); }} style={{ display: "flex", alignItems: "center", gap: 4, padding: "5px 10px", border: "1px solid " + C.border, borderRadius: 20, background: C.lightBlue, cursor: "pointer", fontSize: 11, fontWeight: 700, color: C.primary }}>
              🌐 {isAr ? "EN" : "عربي"}
            </button>
            <button style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: C.sub }}>♡</button>
            <button style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: C.sub, position: "relative" }}>
              🔔<div style={{ position: "absolute", top: 0, right: 0, width: 7, height: 7, borderRadius: 4, background: C.red }} />
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 600, margin: "0 auto", padding: "12px 16px 0" }}>
        {/* ═══ HOME ═══ */}
        {tab === "home" && !selAuction && !selCar && (
          <>
            <div style={{ display: "flex", borderBottom: "2px solid " + C.border, marginBottom: 12 }}>
              {[["current", t.currentAuctions], ["upcoming", t.upcomingAuctions]].map(([k, l]) => (
                <button key={k} onClick={() => setSubTab(k)} style={{ flex: 1, padding: "11px 0", border: "none", background: "none", cursor: "pointer", fontWeight: 800, fontSize: 14, color: subTab === k ? C.primary : C.muted, borderBottom: subTab === k ? "3px solid " + C.primary : "3px solid transparent", marginBottom: -2 }}>{l}</button>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
              {[["auctions", t.auctions], ["cars", t.cars]].map(([k, l]) => (
                <button key={k} onClick={() => setViewMode(k)} style={{ flex: 1, padding: "9px 0", border: "1px solid " + (viewMode === k ? C.primary : C.border), borderRadius: 8, background: viewMode === k ? C.lightBlue : C.card, cursor: "pointer", fontWeight: 700, fontSize: 13, color: viewMode === k ? C.primary : C.sub }}>{l}</button>
              ))}
              <button style={{ padding: "9px 12px", border: "1px solid " + C.border, borderRadius: 8, background: C.card, cursor: "pointer", fontSize: 12, color: C.sub }}>{t.filter}</button>
            </div>
            {subTab === "current" && viewMode === "auctions" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {AUCTIONS.map(a => <AuctionCard key={a.id} auction={a} t={t} onClick={() => setSelAuction(a)} />)}
              </div>
            )}
            {subTab === "current" && viewMode === "cars" && (
              <div>{Object.values(cars).map(c => <CarItem key={c.id} car={c} t={t} onClick={() => setSelCar(c.id)} />)}</div>
            )}
            {subTab === "upcoming" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {UPCOMING.map(a => <AuctionCard key={a.id} auction={a} t={t} onClick={() => {}} />)}
              </div>
            )}
            <button style={{ width: "100%", marginTop: 16, padding: "13px 0", background: C.card, border: "1px solid " + C.border, borderRadius: 10, fontWeight: 700, fontSize: 14, color: C.primary, cursor: "pointer" }}>{t.endedAuctions}</button>
          </>
        )}

        {/* ═══ AUCTION DETAIL ═══ */}
        {tab === "home" && selAuction && !selCar && (
          <div>
            <button onClick={() => { setSelAuction(null); setCityFilter(null); }} style={{ background: C.lightBlue, border: "none", borderRadius: 8, padding: "8px 14px", cursor: "pointer", fontWeight: 700, fontSize: 13, color: C.primary, marginBottom: 10 }}>{t.backHome}</button>
            <div style={{ background: C.card, borderRadius: 12, padding: 14, border: "1px solid " + C.border, marginBottom: 12 }}>
              <span style={{ background: C.lightBlue, color: C.primary, borderRadius: 6, padding: "3px 10px", fontSize: 10, fontWeight: 700 }}>{t.liveAuction}</span>
              <h2 style={{ fontSize: 20, fontWeight: 900, color: C.text, margin: "8px 0 8px" }}>{selAuction.title}</h2>
              <div style={{ display: "flex", gap: 16, fontSize: 13, color: C.sub }}>
                <span>{t.cars_count(selAuction.carIds.length)}</span>
                <span>{t.views(selAuction.carIds.reduce((a, id) => a + (cars[id]?.views || 0), 0).toLocaleString())}</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 6, marginBottom: 12, overflowX: "auto" }}>
              {cityList.map(c => (
                <button key={c} onClick={() => setCityFilter(c)} style={{ padding: "7px 14px", border: "1px solid " + (activeCityFilter === c ? C.primary : C.border), borderRadius: 20, background: activeCityFilter === c ? C.primary : C.card, color: activeCityFilter === c ? "#fff" : C.sub, fontWeight: 700, fontSize: 12, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }}>{c}</button>
              ))}
            </div>
            {getFiltered(selAuction.carIds).map(car => <CarItem key={car.id} car={car} t={t} onClick={() => setSelCar(car.id)} />)}
            {getFiltered(selAuction.carIds).length === 0 && <div style={{ textAlign: "center", padding: 30, color: C.muted }}>—</div>}
          </div>
        )}

        {/* ═══ CAR DETAIL ═══ */}
        {tab === "home" && selCar && (
          <CarDetail car={cars[selCar]} setCars={setCars} t={t} onBack={() => setSelCar(null)} />
        )}

        {/* ═══ MY AUCTIONS ═══ */}
        {tab === "my" && (
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 900, color: C.text, margin: "0 0 14px" }}>{t.myAuctions}</h2>
            <div style={{ background: C.card, borderRadius: 12, border: "1px solid " + C.border, padding: 24, textAlign: "center" }}>
              <div style={{ fontSize: 36, marginBottom: 8 }}>📋</div>
              <div style={{ fontSize: 14, color: C.sub }}>{t.noAuctions}</div>
              <button onClick={() => setTab("home")} style={{ marginTop: 12, padding: "10px 24px", background: C.red, color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>{t.browseAuctions}</button>
            </div>
          </div>
        )}

        {/* ═══ ACTIONS ═══ */}
        {tab === "actions" && (
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 900, color: C.text, margin: "0 0 14px" }}>{t.actions}</h2>
            <div style={{ background: C.card, borderRadius: 12, border: "1px solid " + C.border, padding: 24, textAlign: "center" }}>
              <div style={{ fontSize: 36 }}>📄</div>
              <div style={{ fontSize: 14, color: C.muted, marginTop: 8 }}>{t.noActions}</div>
            </div>
          </div>
        )}

        {/* ═══ MORE ═══ */}
        {tab === "more" && (
          <div>
            <div style={{ textAlign: "center", padding: "16px 0 20px" }}>
              <div style={{ width: 60, height: 60, background: C.lightBlue, borderRadius: 30, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, margin: "0 auto 10px" }}>👤</div>
              <div style={{ fontWeight: 800, fontSize: 17, color: C.text }}>{t.hello}</div>
              <div style={{ fontSize: 12, color: C.muted, direction: "ltr", marginTop: 4 }}>+961 {user}</div>
            </div>

            {/* Lang toggle in more */}
            <div style={{ background: C.card, border: "1px solid " + C.border, borderRadius: 12, padding: "12px 14px", marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 14, color: C.text }}>🌐 {isAr ? "Language / اللغة" : "اللغة / Language"}</span>
              <div style={{ display: "flex", gap: 4 }}>
                {[["ar","عربي"],["en","English"]].map(([k,l]) => (
                  <button key={k} onClick={() => { setLang(k); setCityFilter(null); }} style={{ padding: "5px 12px", border: "1px solid " + (lang === k ? C.primary : C.border), borderRadius: 20, background: lang === k ? C.primary : C.card, color: lang === k ? "#fff" : C.sub, fontWeight: 700, fontSize: 12, cursor: "pointer" }}>{l}</button>
                ))}
              </div>
            </div>

            {[t.profile, t.notifications, t.help, t.about, t.terms].map((item, i) => (
              <div key={i} style={{ background: C.card, border: "1px solid " + C.border, borderRadius: 10, padding: "13px 14px", marginBottom: 6, fontSize: 13, color: C.text, cursor: "pointer", display: "flex", justifyContent: "space-between" }}>
                <span>{item}</span><span style={{ color: C.muted }}>{isAr ? "‹" : "›"}</span>
              </div>
            ))}
            <button onClick={() => setUser(null)} style={{ width: "100%", marginTop: 10, padding: "12px 0", background: "rgba(229,57,53,0.06)", color: C.red, border: "1px solid rgba(229,57,53,0.15)", borderRadius: 10, fontWeight: 800, fontSize: 14, cursor: "pointer" }}>{t.logout}</button>
            <div style={{ textAlign: "center", marginTop: 16, fontSize: 11, color: C.muted }}>{t.copyright}</div>
          </div>
        )}
      </div>

      {/* BOTTOM NAV */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: C.card, borderTop: "1px solid " + C.border, display: "flex", zIndex: 100 }}>
        {navItems.map(n => (
          <button key={n.k} onClick={() => { setTab(n.k); setSelAuction(null); setSelCar(null); setCityFilter(null); }} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "8px 0 6px", border: "none", background: "none", cursor: "pointer", color: tab === n.k ? C.primary : C.muted }}>
            <span style={{ fontSize: 18 }}>{n.i}</span>
            <span style={{ fontSize: 10, fontWeight: tab === n.k ? 800 : 500 }}>{n.l}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
