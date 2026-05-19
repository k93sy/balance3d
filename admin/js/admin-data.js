/* ================================================================
   Balance 3D Admin — admin-data.js  (v4)

   Self-contained data layer.
   • Reads / writes localStorage for all entities.
   • Seeds realistic demo data on first load (SEED_VERSION bump to re-seed).
   • Works 100 % offline — no Supabase required for demo.
   • All methods are synchronous or return Promises for drop-in
     compatibility with the async callers in admin-sections.js.
   ================================================================ */
'use strict';

const _SEED_VER  = 'b3d_admin_seed_v4';
const CAT_AR_MAP = {
  'Figurines':'مجسمات','Tools':'أدوات','Architecture':'هندسة معمارية',
  'Jewelry':'مجوهرات','Home Decor':'ديكور منزلي','Engineering':'هندسة',
  'Gaming':'ألعاب','Automotive':'سيارات','Other':'أخرى',
};

/* ── Tiny helpers ─────────────────────────────────────────────── */
function _ls(key)        { try{return JSON.parse(localStorage.getItem(key)||'null');}catch(_){return null;} }
function _lsSet(key,val) { try{localStorage.setItem(key,JSON.stringify(val));}catch(_){} }
function _lsPush(key,arr){ try{localStorage.setItem(key,JSON.stringify(arr));}catch(_){} }

/* ── Seed data ────────────────────────────────────────────────── */
const SEED_PRODUCTS = [
  { id:'p001', title:{en:'Falcon Dragon Statue',ar:'تمثال تنين الصقر'}, desc:{en:'Highly detailed articulated dragon figurine with moveable wings.',ar:'تمثال تنين مفصّل بتفاصيل دقيقة مع أجنحة متحركة.'}, category:{en:'Figurines',ar:'مجسمات'}, material:'PLA Pro', price:249, stock:15, inStock:true, badge:'bestseller', status:'active', colors:['#8B5CF6','#C0C8E0'], rating:4.8, reviews:24 },
  { id:'p002', title:{en:'Modern City Architectural Model',ar:'نموذج المدينة المعمارية الحديثة'}, desc:{en:'Accurate 1:200 scale model of a modern city district.',ar:'نموذج بمقياس 1:200 دقيق لحي مدني حديث.'}, category:{en:'Architecture',ar:'هندسة معمارية'}, material:'Resin', price:459, stock:2, inStock:true, badge:'trending', status:'active', colors:['#94A3B8','#C0C8E0'], rating:4.9, reviews:11 },
  { id:'p003', title:{en:'Geometric Jewelry Ring',ar:'خاتم مجوهرات هندسي'}, desc:{en:'Precision-printed geometric ring, available in multiple sizes.',ar:'خاتم هندسي مطبوع بدقة، متاح بمقاسات متعددة.'}, category:{en:'Jewelry',ar:'مجوهرات'}, material:'Resin', price:89, stock:25, inStock:true, badge:'new', status:'active', colors:['#F59E0B','#C0C8E0'], rating:4.6, reviews:38 },
  { id:'p004', title:{en:'Modular Tool Organizer',ar:'منظّم أدوات معياري'}, desc:{en:'Wall-mounted modular system for organizing workshop tools.',ar:'نظام معياري للتركيب على الحائط لتنظيم أدوات الورشة.'}, category:{en:'Tools',ar:'أدوات'}, material:'PETG', price:149, stock:12, inStock:true, badge:'popular', status:'active', colors:['#0EA5E9','#C0C8E0'], rating:4.7, reviews:52 },
  { id:'p005', title:{en:'Minimalist Table Lamp',ar:'مصباح طاولة مينيمالي'}, desc:{en:'Elegant geometric lamp shade with soft diffused lighting.',ar:'أباجورة هندسية أنيقة مع إضاءة ناعمة ومنتشرة.'}, category:{en:'Home Decor',ar:'ديكور منزلي'}, material:'PLA Pro', price:199, stock:6, inStock:true, badge:'sale', status:'active', colors:['#F8FAFC','#C0C8E0'], rating:4.5, reviews:17 },
  { id:'p006', title:{en:'Gaming Controller Wall Mount',ar:'حامل جداري لذراع التحكم'}, desc:{en:'Clean display mount for gaming controllers, cable management included.',ar:'حامل عرض أنيق لأذرع التحكم مع إدارة الكابلات.'}, category:{en:'Gaming',ar:'ألعاب'}, material:'PETG', price:129, stock:20, inStock:true, badge:null, status:'active', colors:['#1E293B','#C0C8E0'], rating:4.4, reviews:29 },
  { id:'p007', title:{en:'Precision Gear Assembly Set',ar:'مجموعة تجميع التروس الدقيقة'}, desc:{en:'Interlocking gear set for engineering demonstrations.',ar:'مجموعة تروس متشابكة للعروض الهندسية.'}, category:{en:'Engineering',ar:'هندسة'}, material:'ABS', price:299, stock:3, inStock:true, badge:null, status:'active', colors:['#6B7280','#C0C8E0'], rating:4.3, reviews:8 },
  { id:'p008', title:{en:'Custom Automotive Trim Panel',ar:'لوحة تشطيب سيارة مخصصة'}, desc:{en:'OEM-spec replacement trim panel for vintage cars.',ar:'لوحة تشطيب استبدالية بمواصفات OEM للسيارات الكلاسيكية.'}, category:{en:'Automotive',ar:'سيارات'}, material:'Nylon', price:349, stock:5, inStock:true, badge:null, status:'active', colors:['#1F2937','#C0C8E0'], rating:4.6, reviews:6 },
  { id:'p009', title:{en:'Mini T-Rex Skeleton',ar:'هيكل عظمي لتيرانوسور صغير'}, desc:{en:'Articulated 15cm T-Rex skeleton with display stand.',ar:'هيكل عظمي متحرك بحجم 15 سم مع حامل عرض.'}, category:{en:'Figurines',ar:'مجسمات'}, material:'PLA Pro', price:79, stock:30, inStock:true, badge:'new', status:'active', colors:['#D4A96A','#C0C8E0'], rating:4.7, reviews:61 },
  { id:'p010', title:{en:'Crystal Decorative Vase',ar:'مزهرية زخرفية بلورية'}, desc:{en:'Intricate crystal-pattern vase with geometric facets.',ar:'مزهرية بنقش بلوري معقد ذات حواف هندسية.'}, category:{en:'Home Decor',ar:'ديكور منزلي'}, material:'Resin', price:259, stock:9, inStock:true, badge:null, status:'active', colors:['#E0F2FE','#C0C8E0'], rating:4.8, reviews:33 },
  { id:'p011', title:{en:'RC Car Custom Chassis',ar:'هيكل سيارة RC مخصص'}, desc:{en:'Lightweight reinforced chassis for 1:10 scale RC cars.',ar:'هيكل خفيف الوزن مقوّى لسيارات RC بمقياس 1:10.'}, category:{en:'Automotive',ar:'سيارات'}, material:'ABS', price:399, stock:4, inStock:true, badge:null, status:'active', colors:['#EF4444','#C0C8E0'], rating:4.5, reviews:14 },
  { id:'p012', title:{en:'Floral Earring Set',ar:'طقم أقراط زهرية'}, desc:{en:'Delicate floral earrings in resin, 6-piece set.',ar:'أقراط زهرية رقيقة من الراتنج، طقم من 6 قطع.'}, category:{en:'Jewelry',ar:'مجوهرات'}, material:'Resin', price:59, stock:0, inStock:false, badge:'sale', status:'out_of_stock', colors:['#F9A8D4','#C0C8E0'], rating:4.2, reviews:19 },
];

const _NOW = new Date();
function _daysAgo(n){ const d=new Date(_NOW); d.setDate(d.getDate()-n); return d.toISOString().slice(0,10); }

const _CUSTOMERS_SEED = [
  { id:'c01', nameEn:'Ahmed Al-Rashid', nameAr:'أحمد الرشيد', email:'ahmed@example.com', phone:'+966501234567', city:{en:'Riyadh',ar:'الرياض'}, orders:7, totalSpent:1847, joinDate:_daysAgo(180), status:'active' },
  { id:'c02', nameEn:'Sara Al-Qahtani', nameAr:'سارة القحطاني', email:'sara@example.com', phone:'+966512345678', city:{en:'Jeddah',ar:'جدة'}, orders:3, totalSpent:527, joinDate:_daysAgo(90), status:'active' },
  { id:'c03', nameEn:'Mohammed Alotaibi', nameAr:'محمد العتيبي', email:'moh@example.com', phone:'+966523456789', city:{en:'Dammam',ar:'الدمام'}, orders:12, totalSpent:3240, joinDate:_daysAgo(365), status:'active' },
  { id:'c04', nameEn:'Fatima Al-Zahrani', nameAr:'فاطمة الزهراني', email:'fatima@example.com', phone:'+966534567890', city:{en:'Mecca',ar:'مكة المكرمة'}, orders:2, totalSpent:338, joinDate:_daysAgo(45), status:'active' },
  { id:'c05', nameEn:'Khalid Al-Ghamdi', nameAr:'خالد الغامدي', email:'khalid@example.com', phone:'+966545678901', city:{en:'Medina',ar:'المدينة المنورة'}, orders:5, totalSpent:1175, joinDate:_daysAgo(200), status:'active' },
  { id:'c06', nameEn:'Nora Al-Harbi', nameAr:'نورة الحربي', email:'nora@example.com', phone:'+966556789012', city:{en:'Riyadh',ar:'الرياض'}, orders:1, totalSpent:249, joinDate:_daysAgo(20), status:'active' },
  { id:'c07', nameEn:'Omar Al-Shehri', nameAr:'عمر الشهري', email:'omar@example.com', phone:'+966567890123', city:{en:'Abha',ar:'أبها'}, orders:4, totalSpent:736, joinDate:_daysAgo(120), status:'blocked' },
  { id:'c08', nameEn:'Reem Al-Mutairi', nameAr:'ريم المطيري', email:'reem@example.com', phone:'+966578901234', city:{en:'Jeddah',ar:'جدة'}, orders:8, totalSpent:2116, joinDate:_daysAgo(270), status:'active' },
  { id:'c09', nameEn:'Turki Al-Anazi', nameAr:'تركي العنزي', email:'turki@example.com', phone:'+966589012345', city:{en:'Tabuk',ar:'تبوك'}, orders:2, totalSpent:428, joinDate:_daysAgo(60), status:'active' },
  { id:'c10', nameEn:'Hessa Al-Dosari', nameAr:'حصة الدوسري', email:'hessa@example.com', phone:'+966590123456', city:{en:'Dammam',ar:'الدمام'}, orders:6, totalSpent:1554, joinDate:_daysAgo(150), status:'active' },
];

const _ORDERS_SEED = [
  { id:'ORD-1001', customer:{en:'Ahmed Al-Rashid',ar:'أحمد الرشيد'}, email:'ahmed@example.com', product:'Falcon Dragon Statue', amount:249, status:'delivered', paymentStatus:'paid', paymentMethod:'credit_card', city:{en:'Riyadh',ar:'الرياض'}, date:_daysAgo(2), tracking:'SA1234567890' },
  { id:'ORD-1002', customer:{en:'Sara Al-Qahtani',ar:'سارة القحطاني'}, email:'sara@example.com', product:'Geometric Jewelry Ring', amount:89, status:'shipped', paymentStatus:'paid', paymentMethod:'mada', city:{en:'Jeddah',ar:'جدة'}, date:_daysAgo(1), tracking:'SA1234567891' },
  { id:'ORD-1003', customer:{en:'Mohammed Alotaibi',ar:'محمد العتيبي'}, email:'moh@example.com', product:'Precision Gear Assembly Set', amount:299, status:'processing', paymentStatus:'paid', paymentMethod:'stc_pay', city:{en:'Dammam',ar:'الدمام'}, date:_daysAgo(0), tracking:'' },
  { id:'ORD-1004', customer:{en:'Fatima Al-Zahrani',ar:'فاطمة الزهراني'}, email:'fatima@example.com', product:'Minimalist Table Lamp', amount:199, status:'pending', paymentStatus:'pending', paymentMethod:'credit_card', city:{en:'Mecca',ar:'مكة المكرمة'}, date:_daysAgo(0), tracking:'' },
  { id:'ORD-1005', customer:{en:'Khalid Al-Ghamdi',ar:'خالد الغامدي'}, email:'khalid@example.com', product:'Modern City Architectural Model', amount:459, status:'delivered', paymentStatus:'paid', paymentMethod:'mada', city:{en:'Medina',ar:'المدينة المنورة'}, date:_daysAgo(5), tracking:'SA1234567892' },
  { id:'ORD-1006', customer:{en:'Reem Al-Mutairi',ar:'ريم المطيري'}, email:'reem@example.com', product:'Crystal Decorative Vase', amount:259, status:'delivered', paymentStatus:'paid', paymentMethod:'credit_card', city:{en:'Jeddah',ar:'جدة'}, date:_daysAgo(7), tracking:'SA1234567893' },
  { id:'ORD-1007', customer:{en:'Hessa Al-Dosari',ar:'حصة الدوسري'}, email:'hessa@example.com', product:'Modular Tool Organizer', amount:149, status:'shipped', paymentStatus:'paid', paymentMethod:'stc_pay', city:{en:'Dammam',ar:'الدمام'}, date:_daysAgo(3), tracking:'SA1234567894' },
  { id:'ORD-1008', customer:{en:'Ahmed Al-Rashid',ar:'أحمد الرشيد'}, email:'ahmed@example.com', product:'Mini T-Rex Skeleton', amount:79, status:'delivered', paymentStatus:'paid', paymentMethod:'mada', city:{en:'Riyadh',ar:'الرياض'}, date:_daysAgo(10), tracking:'SA1234567895' },
  { id:'ORD-1009', customer:{en:'Turki Al-Anazi',ar:'تركي العنزي'}, email:'turki@example.com', product:'Custom Automotive Trim Panel', amount:349, status:'processing', paymentStatus:'paid', paymentMethod:'credit_card', city:{en:'Tabuk',ar:'تبوك'}, date:_daysAgo(1), tracking:'' },
  { id:'ORD-1010', customer:{en:'Nora Al-Harbi',ar:'نورة الحربي'}, email:'nora@example.com', product:'Falcon Dragon Statue', amount:249, status:'pending', paymentStatus:'pending', paymentMethod:'stc_pay', city:{en:'Riyadh',ar:'الرياض'}, date:_daysAgo(0), tracking:'' },
  { id:'ORD-1011', customer:{en:'Mohammed Alotaibi',ar:'محمد العتيبي'}, email:'moh@example.com', product:'Gaming Controller Wall Mount', amount:129, status:'delivered', paymentStatus:'paid', paymentMethod:'mada', city:{en:'Dammam',ar:'الدمام'}, date:_daysAgo(14), tracking:'SA1234567896' },
  { id:'ORD-1012', customer:{en:'Sara Al-Qahtani',ar:'سارة القحطاني'}, email:'sara@example.com', product:'Minimalist Table Lamp', amount:199, status:'cancelled', paymentStatus:'refunded', paymentMethod:'credit_card', city:{en:'Jeddah',ar:'جدة'}, date:_daysAgo(8), tracking:'' },
  { id:'ORD-1013', customer:{en:'Khalid Al-Ghamdi',ar:'خالد الغامدي'}, email:'khalid@example.com', product:'RC Car Custom Chassis', amount:399, status:'delivered', paymentStatus:'paid', paymentMethod:'stc_pay', city:{en:'Medina',ar:'المدينة المنورة'}, date:_daysAgo(20), tracking:'SA1234567897' },
  { id:'ORD-1014', customer:{en:'Reem Al-Mutairi',ar:'ريم المطيري'}, email:'reem@example.com', product:'Mini T-Rex Skeleton', amount:79, status:'delivered', paymentStatus:'paid', paymentMethod:'mada', city:{en:'Jeddah',ar:'جدة'}, date:_daysAgo(15), tracking:'SA1234567898' },
  { id:'ORD-1015', customer:{en:'Hessa Al-Dosari',ar:'حصة الدوسري'}, email:'hessa@example.com', product:'Geometric Jewelry Ring', amount:89, status:'shipped', paymentStatus:'paid', paymentMethod:'credit_card', city:{en:'Dammam',ar:'الدمام'}, date:_daysAgo(4), tracking:'SA1234567899' },
  { id:'ORD-1016', customer:{en:'Ahmed Al-Rashid',ar:'أحمد الرشيد'}, email:'ahmed@example.com', product:'Modular Tool Organizer', amount:149, status:'delivered', paymentStatus:'paid', paymentMethod:'mada', city:{en:'Riyadh',ar:'الرياض'}, date:_daysAgo(22), tracking:'SA1234567900' },
  { id:'ORD-1017', customer:{en:'Mohammed Alotaibi',ar:'محمد العتيبي'}, email:'moh@example.com', product:'Modern City Architectural Model', amount:459, status:'delivered', paymentStatus:'paid', paymentMethod:'stc_pay', city:{en:'Dammam',ar:'الدمام'}, date:_daysAgo(28), tracking:'SA1234567901' },
  { id:'ORD-1018', customer:{en:'Turki Al-Anazi',ar:'تركي العنزي'}, email:'turki@example.com', product:'Floral Earring Set', amount:59, status:'cancelled', paymentStatus:'refunded', paymentMethod:'mada', city:{en:'Tabuk',ar:'تبوك'}, date:_daysAgo(12), tracking:'' },
  { id:'ORD-1019', customer:{en:'Fatima Al-Zahrani',ar:'فاطمة الزهراني'}, email:'fatima@example.com', product:'Crystal Decorative Vase', amount:259, status:'processing', paymentStatus:'paid', paymentMethod:'credit_card', city:{en:'Mecca',ar:'مكة المكرمة'}, date:_daysAgo(2), tracking:'' },
  { id:'ORD-1020', customer:{en:'Khalid Al-Ghamdi',ar:'خالد الغامدي'}, email:'khalid@example.com', product:'Precision Gear Assembly Set', amount:299, status:'pending', paymentStatus:'pending', paymentMethod:'stc_pay', city:{en:'Medina',ar:'المدينة المنورة'}, date:_daysAgo(0), tracking:'' },
];

const _CATEGORIES_SEED = [
  { id:'cat01', nameEn:'Figurines',     nameAr:'مجسمات',          icon:'🦁', color:'#8B5CF6', products:2 },
  { id:'cat02', nameEn:'Architecture',  nameAr:'هندسة معمارية',   icon:'🏛️', color:'#0EA5E9', products:2 },
  { id:'cat03', nameEn:'Jewelry',       nameAr:'مجوهرات',          icon:'💍', color:'#F59E0B', products:2 },
  { id:'cat04', nameEn:'Tools',         nameAr:'أدوات',            icon:'🔧', color:'#10B981', products:1 },
  { id:'cat05', nameEn:'Home Decor',    nameAr:'ديكور منزلي',     icon:'🏮', color:'#EC4899', products:2 },
  { id:'cat06', nameEn:'Engineering',   nameAr:'هندسة',            icon:'⚙️', color:'#6B7280', products:1 },
  { id:'cat07', nameEn:'Gaming',        nameAr:'ألعاب',            icon:'🎮', color:'#1E293B', products:1 },
  { id:'cat08', nameEn:'Automotive',    nameAr:'سيارات',           icon:'🚗', color:'#EF4444', products:2 },
];

const _REVIEWS_SEED = [
  { id:'rev01', productId:'p001', productEn:'Falcon Dragon Statue', productAr:'تمثال تنين الصقر', customerEn:'Ahmed Al-Rashid', customerAr:'أحمد الرشيد', email:'ahmed@example.com', rating:5, text:'Amazing quality! The details are incredible. Worth every riyal.', textAr:'جودة مذهلة! التفاصيل رائعة. تستحق كل ريال.', date:_daysAgo(5), reply:null, status:'approved' },
  { id:'rev02', productId:'p001', productEn:'Falcon Dragon Statue', productAr:'تمثال تنين الصقر', customerEn:'Reem Al-Mutairi', customerAr:'ريم المطيري', email:'reem@example.com', rating:5, text:'Beautiful figurine, fast delivery, perfectly packaged.', textAr:'مجسم جميل، توصيل سريع، تغليف مثالي.', date:_daysAgo(12), reply:'Thank you so much! We are glad you loved it! 🙏', status:'approved' },
  { id:'rev03', productId:'p002', productEn:'Modern City Architectural Model', productAr:'نموذج المدينة المعمارية الحديثة', customerEn:'Khalid Al-Ghamdi', customerAr:'خالد الغامدي', email:'khalid@example.com', rating:5, text:'Exceptional craftsmanship. Used it for a university presentation — everyone was amazed.', textAr:'حرفية استثنائية. استخدمته في عرض جامعي - الجميع أُعجب به.', date:_daysAgo(20), reply:'We love hearing this! Glad it made your presentation shine! ⭐', status:'approved' },
  { id:'rev04', productId:'p003', productEn:'Geometric Jewelry Ring', productAr:'خاتم مجوهرات هندسي', customerEn:'Fatima Al-Zahrani', customerAr:'فاطمة الزهراني', email:'fatima@example.com', rating:4, text:'Lovely ring, very precise printing. Slightly sharp edge on the inside.', textAr:'خاتم جميل، طباعة دقيقة جداً. حافة داخلية حادة قليلاً.', date:_daysAgo(8), reply:'Thank you for the honest feedback! We\'ve updated the design to smooth the inner edge. 😊', status:'approved' },
  { id:'rev05', productId:'p003', productEn:'Geometric Jewelry Ring', productAr:'خاتم مجوهرات هندسي', customerEn:'Nora Al-Harbi', customerAr:'نورة الحربي', email:'nora@example.com', rating:5, text:'Perfect gift! My friend loved it. The finish is flawless.', textAr:'هدية مثالية! صديقتي أحبتها. الإنهاء رائع.', date:_daysAgo(3), reply:null, status:'approved' },
  { id:'rev06', productId:'p004', productEn:'Modular Tool Organizer', productAr:'منظّم أدوات معياري', customerEn:'Mohammed Alotaibi', customerAr:'محمد العتيبي', email:'moh@example.com', rating:5, text:'Transformed my workshop! Extremely sturdy and the modular design is genius.', textAr:'غيّر ورشتي! متين للغاية والتصميم المعياري عبقري.', date:_daysAgo(15), reply:null, status:'approved' },
  { id:'rev07', productId:'p005', productEn:'Minimalist Table Lamp', productAr:'مصباح طاولة مينيمالي', customerEn:'Hessa Al-Dosari', customerAr:'حصة الدوسري', email:'hessa@example.com', rating:4, text:'Beautiful lamp! Wish it came with a built-in cord organizer.', textAr:'مصباح جميل! أتمنى أن يأتي مع منظم سلك مدمج.', date:_daysAgo(9), reply:'Great suggestion! We\'ve added it to our next version. 💡', status:'approved' },
  { id:'rev08', productId:'p006', productEn:'Gaming Controller Wall Mount', productAr:'حامل جداري لذراع التحكم', customerEn:'Turki Al-Anazi', customerAr:'تركي العنزي', email:'turki@example.com', rating:3, text:'Good product but the screw holes were slightly misaligned. Had to drill new ones.', textAr:'منتج جيد لكن ثقوب البراغي كانت غير متوافقة قليلاً. اضطررت لحفر ثقوب جديدة.', date:_daysAgo(6), reply:'We sincerely apologize for this! We\'ve identified the issue and fixed it in the latest batch. Please contact us for a replacement.', status:'approved' },
  { id:'rev09', productId:'p009', productEn:'Mini T-Rex Skeleton', productAr:'هيكل عظمي لتيرانوسور صغير', customerEn:'Sara Al-Qahtani', customerAr:'سارة القحطاني', email:'sara@example.com', rating:5, text:'My kids absolutely love this! Educational and fun. Great gift for any age.', textAr:'أطفالي يحبونه! تعليمي وممتع. هدية رائعة لأي عمر.', date:_daysAgo(4), reply:null, status:'approved' },
  { id:'rev10', productId:'p010', productEn:'Crystal Decorative Vase', productAr:'مزهرية زخرفية بلورية', customerEn:'Reem Al-Mutairi', customerAr:'ريم المطيري', email:'reem@example.com', rating:5, text:'Absolutely stunning! The light plays off the facets beautifully. Centre piece of my living room.', textAr:'رائع للغاية! الضوء ينعكس على الأوجه بشكل جميل. قطعة مركزية في غرفة معيشتي.', date:_daysAgo(16), reply:'Thank you so much! Your photos would look amazing — tag us! ✨', status:'approved' },
  { id:'rev11', productId:'p007', productEn:'Precision Gear Assembly Set', productAr:'مجموعة تجميع التروس الدقيقة', customerEn:'Mohammed Alotaibi', customerAr:'محمد العتيبي', email:'moh@example.com', rating:4, text:'Well-made gears, very precise tolerances. Good for demonstrations.', textAr:'تروس مصنوعة جيداً، تفاوتات دقيقة جداً. جيدة للعروض.', date:_daysAgo(29), reply:null, status:'approved' },
  { id:'rev12', productId:'p011', productEn:'RC Car Custom Chassis', productAr:'هيكل سيارة RC مخصص', customerEn:'Khalid Al-Ghamdi', customerAr:'خالد الغامدي', email:'khalid@example.com', rating:5, text:'Perfect fit for my Traxxas. Light yet incredibly rigid. Will order more!', textAr:'يناسب سيارتي Traxxas تماماً. خفيف لكنه صلب بشكل لا يصدق. سأطلب المزيد!', date:_daysAgo(21), reply:null, status:'approved' },
  { id:'rev13', productId:'p012', productEn:'Floral Earring Set', productAr:'طقم أقراط زهرية', customerEn:'Fatima Al-Zahrani', customerAr:'فاطمة الزهراني', email:'fatima@example.com', rating:4, text:'Delicate and beautiful. One earring had a small imperfection but overall lovely set.', textAr:'رقيقة وجميلة. قرط واحد كان به نقص صغير لكن مجموعة جميلة بشكل عام.', date:_daysAgo(11), reply:'Thank you for telling us! We\'d love to send you a replacement — please reach out to support. 💎', status:'approved' },
  { id:'rev14', productId:'p009', productEn:'Mini T-Rex Skeleton', productAr:'هيكل عظمي لتيرانوسور صغير', customerEn:'Ahmed Al-Rashid', customerAr:'أحمد الرشيد', email:'ahmed@example.com', rating:5, text:'Bought this as a desk decoration. Fantastic conversation starter!', textAr:'اشتريته كزينة مكتب. محفز رائع للمحادثة!', date:_daysAgo(10), reply:null, status:'approved' },
  { id:'rev15', productId:'p005', productEn:'Minimalist Table Lamp', productAr:'مصباح طاولة مينيمالي', customerEn:'Khalid Al-Ghamdi', customerAr:'خالد الغامدي', email:'khalid@example.com', rating:3, text:'Nice design but assembly instructions could be clearer.', textAr:'تصميم جميل لكن تعليمات التجميع يمكن أن تكون أوضح.', date:_daysAgo(7), reply:null, status:'approved' },
];

const _SETTINGS_SEED = {
  shipping: {
    freeThreshold: 500,
    expressRate: 65,
    defaultRate: 35,
    cities: [
      { id:'ruh', nameEn:'Riyadh',           nameAr:'الرياض',          rate:25, days:'2–3' },
      { id:'jed', nameEn:'Jeddah',           nameAr:'جدة',             rate:30, days:'2–3' },
      { id:'dmm', nameEn:'Dammam',           nameAr:'الدمام',          rate:35, days:'3–4' },
      { id:'mec', nameEn:'Mecca',            nameAr:'مكة المكرمة',     rate:30, days:'2–3' },
      { id:'med', nameEn:'Medina',           nameAr:'المدينة المنورة', rate:30, days:'3–4' },
      { id:'abh', nameEn:'Abha',             nameAr:'أبها',            rate:45, days:'4–5' },
      { id:'tab', nameEn:'Tabuk',            nameAr:'تبوك',            rate:45, days:'4–5' },
      { id:'bur', nameEn:'Buraidah',         nameAr:'بريدة',           rate:40, days:'3–4' },
      { id:'hai', nameEn:'Hail',             nameAr:'حائل',            rate:45, days:'4–5' },
      { id:'kha', nameEn:'Khamis Mushait',  nameAr:'خميس مشيط',       rate:45, days:'4–5' },
    ],
  },
  payment: {
    methods: [
      { id:'credit_card', nameEn:'Credit Card (Visa / Mastercard)', nameAr:'بطاقة ائتمان (فيزا / ماستركارد)', enabled:true,  fees:0   },
      { id:'mada',        nameEn:'Mada Debit',                      nameAr:'بطاقة مدى',                        enabled:true,  fees:0   },
      { id:'stc_pay',     nameEn:'STC Pay',                         nameAr:'STC Pay',                          enabled:true,  fees:0   },
      { id:'apple_pay',   nameEn:'Apple Pay',                       nameAr:'Apple Pay',                        enabled:true,  fees:0   },
      { id:'cash',        nameEn:'Cash on Delivery',                nameAr:'الدفع عند الاستلام',               enabled:false, fees:15  },
    ],
  },
  store: {
    nameEn:    'Balance 3D',
    nameAr:    'بالانس ثري دي',
    phone:     '+966 50 000 0000',
    email:     'support@balance3d.com',
    vatNumber: '300000000000003',
    address:   'Riyadh, Kingdom of Saudi Arabia',
  },
};

const _DISCOUNTS_SEED = [
  { id:'dis01', code:'WELCOME20', type:'percent', value:20, minOrder:100, maxDiscount:200, usageLimit:100, usageCount:47, expiry:'2026-12-31', enabled:true, descEn:'Welcome offer — 20% off your first order', descAr:'عرض الترحيب — خصم ٢٠٪ على طلبك الأول' },
  { id:'dis02', code:'SUMMER50',  type:'fixed',   value:50, minOrder:300, maxDiscount:50,  usageLimit:50,  usageCount:12, expiry:'2026-08-31', enabled:true, descEn:'Summer sale — SAR 50 off orders over SAR 300', descAr:'تخفيضات الصيف — خصم ٥٠ ر.س على الطلبات فوق ٣٠٠ ر.س' },
  { id:'dis03', code:'VIP100',    type:'fixed',   value:100,minOrder:500, maxDiscount:100, usageLimit:20,  usageCount:8,  expiry:'2027-03-31', enabled:true, descEn:'VIP customer reward — SAR 100 off',         descAr:'مكافأة العميل المميز — خصم ١٠٠ ر.س' },
  { id:'dis04', code:'FLASH15',   type:'percent', value:15, minOrder:0,   maxDiscount:150, usageLimit:200, usageCount:200,expiry:'2025-06-30', enabled:false,descEn:'Flash sale — expired',                       descAr:'بيع سريع — منتهي الصلاحية' },
  { id:'dis05', code:'FREESHIP',  type:'shipping',value:0,  minOrder:0,   maxDiscount:65,  usageLimit:500, usageCount:134,expiry:'2026-06-30', enabled:true, descEn:'Free shipping on any order',                 descAr:'شحن مجاني على أي طلب' },
];

/* ── Seed trigger ─────────────────────────────────────────────── */
(function _seed() {
  if (localStorage.getItem(_SEED_VER)) return;
  // Products (storefront format)
  if (!localStorage.getItem('b3d_products')) {
    _lsSet('b3d_products', SEED_PRODUCTS);
  }
  // Admin orders
  if (!localStorage.getItem('b3d_admin_orders')) {
    _lsSet('b3d_admin_orders', _ORDERS_SEED);
  }
  // Admin customers
  if (!localStorage.getItem('b3d_admin_customers')) {
    _lsSet('b3d_admin_customers', _CUSTOMERS_SEED);
  }
  // Categories
  if (!localStorage.getItem('b3d_categories')) {
    _lsSet('b3d_categories', _CATEGORIES_SEED);
  }
  // Reviews
  if (!localStorage.getItem('b3d_reviews')) {
    _lsSet('b3d_reviews', _REVIEWS_SEED);
  }
  // Settings
  if (!localStorage.getItem('b3d_admin_settings')) {
    _lsSet('b3d_admin_settings', _SETTINGS_SEED);
  }
  localStorage.setItem(_SEED_VER, '1');
})();

/* ── AdminDB ──────────────────────────────────────────────────── */
window.AdminDB = {

  /* ─── Products ─────────────────────────────────────────────── */
  getProducts() {
    const raw = _ls('b3d_products') || [];
    return raw.map(p => ({
      id:       p.id,
      titleEn:  p.title?.en  || p.titleEn  || '',
      titleAr:  p.title?.ar  || p.titleAr  || '',
      descEn:   p.desc?.en   || p.descEn   || '',
      descAr:   p.desc?.ar   || p.descAr   || '',
      category: p.category?.en || p.category || '',
      categoryAr: p.category?.ar || CAT_AR_MAP[p.category?.en||p.category] || '',
      material: p.material   || '',
      price:    Number(p.price)  || 0,
      stock:    Number(p.stock)  || 0,
      badge:    p.badge || null,
      status:   p.status || 'active',
      colors:   p.colors || ['#C0C8E0'],
      rating:   Number(p.rating) || 0,
      reviews:  Number(p.reviews)|| 0,
    }));
  },

  _toStorefrontFmt(p) {
    return {
      id:       p.id,
      title:    { en: p.titleEn || '', ar: p.titleAr || '' },
      desc:     { en: p.descEn  || '', ar: p.descAr  || '' },
      category: { en: p.category || '', ar: CAT_AR_MAP[p.category] || p.category || '' },
      material: p.material || '',
      price:    Number(p.price)  || 0,
      stock:    Number(p.stock)  || 0,
      inStock:  Number(p.stock)  >  0,
      badge:    p.badge || null,
      status:   p.status || 'active',
      colors:   p.colors || ['#C0C8E0'],
      rating:   Number(p.rating) || 0,
      reviews:  Number(p.reviews)|| 0,
    };
  },

  addProduct(p) {
    const all = _ls('b3d_products') || [];
    all.unshift(this._toStorefrontFmt(p));
    _lsSet('b3d_products', all);
    this._updateCategoryCount(p.category, 1);
  },

  updateProduct(p) {
    let all = _ls('b3d_products') || [];
    const idx = all.findIndex(x => x.id === p.id);
    const sf  = this._toStorefrontFmt(p);
    if (idx >= 0) all[idx] = sf; else all.unshift(sf);
    _lsSet('b3d_products', all);
  },

  deleteProduct(id) {
    const all = (_ls('b3d_products') || []).filter(p => p.id !== id);
    _lsSet('b3d_products', all);
  },

  /* ─── Images ───────────────────────────────────────────────── */
  getImage(id)         { try{return localStorage.getItem('b3d_img_'+id)||null;}catch(_){return null;} },
  saveImage(id, b64)   { try{localStorage.setItem('b3d_img_'+id,b64);return true;}catch(_){return false;} },
  deleteImage(id)      { try{localStorage.removeItem('b3d_img_'+id);}catch(_){} },

  /* ─── Orders ───────────────────────────────────────────────── */
  getOrders()          { return _ls('b3d_admin_orders') || []; },

  updateOrderStatus(id, status) {
    const arr = this.getOrders().map(o => o.id===id ? {...o, status} : o);
    _lsSet('b3d_admin_orders', arr);
  },

  updateTracking(id, tracking) {
    const arr = this.getOrders().map(o => o.id===id ? {...o, tracking, status: tracking ? 'shipped' : o.status} : o);
    _lsSet('b3d_admin_orders', arr);
  },

  /* ─── Customers ────────────────────────────────────────────── */
  getCustomers()       { return _ls('b3d_admin_customers') || []; },

  toggleCustomer(id) {
    const arr = this.getCustomers().map(c => c.id===id ? {...c, status: c.status==='active'?'blocked':'active'} : c);
    _lsSet('b3d_admin_customers', arr);
  },

  /* ─── Categories ───────────────────────────────────────────── */
  getCategories()      { return _ls('b3d_categories') || []; },

  addCategory(cat) {
    const all = this.getCategories();
    all.push({ id: 'cat'+Date.now(), ...cat, products: 0 });
    _lsSet('b3d_categories', all);
  },

  updateCategory(cat) {
    const all = this.getCategories().map(c => c.id===cat.id ? {...c,...cat} : c);
    _lsSet('b3d_categories', all);
  },

  deleteCategory(id) {
    const all = this.getCategories().filter(c => c.id !== id);
    _lsSet('b3d_categories', all);
  },

  _updateCategoryCount(nameEn, delta) {
    const all = this.getCategories().map(c => c.nameEn===nameEn ? {...c, products: Math.max(0,(c.products||0)+delta)} : c);
    _lsSet('b3d_categories', all);
  },

  _syncCategoryCounts() {
    const prods = this.getProducts();
    const all   = this.getCategories().map(c => ({
      ...c,
      products: prods.filter(p => p.category === c.nameEn && p.status !== 'draft').length,
    }));
    _lsSet('b3d_categories', all);
  },

  /* ─── Reviews ──────────────────────────────────────────────── */
  getReviews()         { return _ls('b3d_reviews') || []; },

  replyToReview(id, replyText) {
    const arr = this.getReviews().map(r => r.id===id ? {...r, reply: replyText, repliedAt: new Date().toISOString()} : r);
    _lsSet('b3d_reviews', arr);
  },

  deleteReview(id) {
    const arr = this.getReviews().filter(r => r.id !== id);
    _lsSet('b3d_reviews', arr);
  },

  approveReview(id) {
    const arr = this.getReviews().map(r => r.id===id ? {...r, status:'approved'} : r);
    _lsSet('b3d_reviews', arr);
  },

  /* ─── Settings ─────────────────────────────────────────────── */
  getSettings()        { return _ls('b3d_admin_settings') || _SETTINGS_SEED; },

  saveSettings(settings) { _lsSet('b3d_admin_settings', settings); },

  /* ─── Discounts ────────────────────────────────────────────── */
  getDiscounts() {
    let d = _ls('b3d_discounts');
    if (!d) { _lsSet('b3d_discounts', _DISCOUNTS_SEED); d = _DISCOUNTS_SEED; }
    return d;
  },
  addDiscount(d) {
    const all = this.getDiscounts();
    all.push({ id:'dis'+Date.now(), ...d, usageCount:0 });
    _lsSet('b3d_discounts', all);
  },
  updateDiscount(d) {
    const all = this.getDiscounts().map(x => x.id===d.id ? {...x,...d} : x);
    _lsSet('b3d_discounts', all);
  },
  deleteDiscount(id) {
    _lsSet('b3d_discounts', this.getDiscounts().filter(x=>x.id!==id));
  },
  toggleDiscount(id) {
    const all = this.getDiscounts().map(x => x.id===id ? {...x,enabled:!x.enabled} : x);
    _lsSet('b3d_discounts', all);
  },

  /* ─── Stats ────────────────────────────────────────────────── */
  async getStats() {
    const orders    = this.getOrders();
    const products  = this.getProducts();
    const customers = this.getCustomers();

    const now   = new Date();
    const month = now.getMonth();
    const year  = now.getFullYear();

    const monthOrders = orders.filter(o => {
      const d = new Date(o.date);
      return d.getMonth()===month && d.getFullYear()===year;
    });

    const totalRevenue  = orders.filter(o=>o.paymentStatus==='paid').reduce((s,o)=>s+o.amount,0);
    const monthRevenue  = monthOrders.filter(o=>o.paymentStatus==='paid').reduce((s,o)=>s+o.amount,0);
    const pendingOrders = orders.filter(o=>o.status==='pending').length;
    const outOfStock    = products.filter(p=>p.stock===0).length;
    const activeCustomers = customers.filter(c=>c.status==='active').length;

    // Last 7 days chart
    const days   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const arDays = ['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
    const weekChart = [];
    for (let i=6; i>=0; i--) {
      const d = new Date(); d.setDate(d.getDate()-i);
      const ds = d.toISOString().slice(0,10);
      const val = orders.filter(o=>o.date===ds && o.paymentStatus==='paid').reduce((s,o)=>s+o.amount,0);
      weekChart.push({ day: Admin.lang==='ar' ? arDays[d.getDay()] : days[d.getDay()], val });
    }

    // Order status distribution
    const statusMap = {};
    orders.forEach(o => { statusMap[o.status] = (statusMap[o.status]||0)+1; });
    const orderStatusDist = Object.entries(statusMap).map(([status,count])=>({status,count}));

    return {
      totalRevenue, monthRevenue,
      totalOrders:    orders.length,
      pendingOrders,
      totalProducts:  products.length,
      outOfStock,
      totalCustomers: customers.length,
      activeCustomers,
      weekChart,
      orderStatusDist,
    };
  },
};

/* ── ProductStore compatibility (used by storefront pages) ─── */
if (typeof ProductStore === 'undefined') {
  window.ProductStore = {
    KEY: 'b3d_products',
    getAll(includeAll) {
      const raw = _ls('b3d_products') || [];
      return includeAll ? raw : raw.filter(p => p.status !== 'draft');
    },
    getById(id)     { return this.getAll(true).find(p=>p.id===id)||null; },
    resolveImage(p) {
      if (p?.imageUrl) return p.imageUrl;
      const stored = AdminDB.getImage(p?.id);
      if (stored) return stored;
      const c = encodeURIComponent((p?.colors?.[0])||'#C0C8E0');
      return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='${c}22' width='400' height='300'/%3E%3C/svg%3E`;
    },
    seed()          {},
    _ensureSeeded() {},
  };
}
