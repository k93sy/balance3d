/* ============================================================
   Balance 3D — Core App
   ============================================================ */

'use strict';

// ============================================================
// TRANSLATIONS
// ============================================================
const TRANSLATIONS = {
  en: {
    // Nav
    'nav.home':       'Home',
    'nav.products':   'Products',
    'nav.custom':     'Custom 3D',
    'nav.contact':    'Contact',
    'nav.login':      'Login',
    'nav.register':   'Register',
    'nav.admin':      'Admin',
    'nav.tagline':    'Premium 3D Printing',
    'nav.cart':       'Cart',

    // Hero
    'hero.badge':       'Saudi Arabia\u0027s #1 3D Printing Store',
    'hero.title.1':     'Print the',
    'hero.title.accent':'Future',
    'hero.title.2':     'Today',
    'hero.desc':        'From precision prototypes to stunning custom models — we deliver professional 3D printing with unmatched quality and speed.',
    'hero.cta.primary': 'Shop Now',
    'hero.cta.secondary':'Custom Order',
    'hero.stat.products':'500+',
    'hero.stat.products.label':'Products',
    'hero.stat.orders': '12K+',
    'hero.stat.orders.label': 'Orders Delivered',
    'hero.stat.rating': '4.9★',
    'hero.stat.rating.label': 'Customer Rating',
    'hero.float.material': 'Material',
    'hero.float.material.val': 'PLA Pro • PETG • Resin',
    'hero.float.lead':    'Lead Time',
    'hero.float.lead.val':'24 – 48 hrs',

    // Sections
    'section.features':   'Why Balance 3D',
    'section.features.title': 'Precision. Speed. Quality.',
    'section.features.desc':  'We combine cutting-edge 3D printing technology with expert craftsmanship to bring your ideas to life.',
    'section.products':   'Featured Products',
    'section.products.title': 'Our Best Sellers',
    'section.products.desc':  'Explore our most popular 3D printed products — ready to ship.',
    'section.cta':        'Custom 3D Printing',
    'section.cta.title':  'Have a Unique Idea?',
    'section.cta.desc':   'Upload your design file or describe your project. Our experts will handle the rest — from material selection to final delivery.',
    'section.cta.btn':    'Start Custom Order',
    'section.testimonials': 'Customer Reviews',
    'section.testimonials.title': 'Loved by Makers',

    // Features
    'feat.speed.title':  'Fast Turnaround',
    'feat.speed.desc':   'Most orders ready within 24–48 hours. Express options available.',
    'feat.quality.title':'Premium Quality',
    'feat.quality.desc': 'Layer precision as fine as 0.05mm. Professional-grade materials.',
    'feat.custom.title': 'Fully Custom',
    'feat.custom.desc':  'Any shape, any size, any material. Upload your file or let us design it.',

    // Products
    'product.add':       'Add to Cart',
    'product.view':      'View',
    'product.sar':       'SAR',
    'product.new':       'New',
    'product.popular':   'Popular',
    'product.sale':      'Sale',
    'product.viewall':   'View All Products',

    // Auth
    'login.title':   'Welcome Back',
    'login.subtitle':'Don\'t have an account?',
    'login.subtitle.link':'Register',
    'login.email':   'Email Address',
    'login.password':'Password',
    'login.forgot':  'Forgot Password?',
    'login.btn':     'Sign In',
    'login.or':      'or continue with',
    'login.google':  'Continue with Google',

    'register.title':    'Create Account',
    'register.subtitle': 'Already have an account?',
    'register.subtitle.link':'Sign In',
    'register.fname':    'First Name',
    'register.lname':    'Last Name',
    'register.email':    'Email Address',
    'register.password': 'Password',
    'register.confirm':  'Confirm Password',
    'register.btn':      'Create Account',
    'register.terms':    'By registering you agree to our',
    'register.terms.link':'Terms & Conditions',

    'admin.title':    'Admin Login',
    'admin.subtitle': 'Restricted access — staff only',

    // Visual panel
    'auth.visual.heading.login':   'Your 3D Printing Journey Starts Here',
    'auth.visual.heading.register':'Join Saudi Arabia\u0027s Top 3D Community',
    'auth.visual.heading.admin':   'Balance 3D Admin Portal',

    // Contact
    'contact.title':   'Get in Touch',
    'contact.subtitle':'We\'re here to help with your 3D printing needs',
    'contact.name':    'Full Name',
    'contact.email':   'Email',
    'contact.subject': 'Subject',
    'contact.message': 'Message',
    'contact.btn':     'Send Message',
    'contact.phone':   'Phone',
    'contact.address': 'Address',
    'contact.hours':   'Working Hours',

    // Footer
    'footer.desc':      'Saudi Arabia\'s leading 3D printing store — delivering precision and creativity since 2020.',
    'footer.quick':     'Quick Links',
    'footer.services':  'Services',
    'footer.contact':   'Contact',
    'footer.rights':    '© 2025 Balance 3D. All rights reserved.',
    'footer.privacy':   'Privacy Policy',
    'footer.terms':     'Terms of Use',

    // Custom page
    'custom.title':    'Custom 3D Printing',
    'custom.subtitle': 'Turn your idea into a physical reality',
    'custom.step1':    'Upload File',
    'custom.step2':    'Choose Material',
    'custom.step3':    'Get Quote',
    'custom.step4':    'Delivery',

    // Products page
    'products.title':  'Our Products',
    'products.filter': 'Filter',
    'products.sort':   'Sort By',
    'products.search': 'Search products...',
    'products.count':  'products found',

    // Custom page (EN)
    'custom.hero.badge':    'Custom Service',
    'custom.hero.title':    'Print Your Design with Professional Precision',
    'custom.hero.desc':     'Upload your 3D model, choose material and colors, and get an instant quote.',
    'custom.process.label': 'How It Works',
    'custom.process.title': 'Four Simple Steps',
    'custom.process.desc':  'From design file to finished product — fast and easy.',
    'custom.step1.title':   'Upload File',
    'custom.step1.desc':    'Upload your design file in STL, OBJ, STEP, or other formats.',
    'custom.step2.title':   'Choose Specs',
    'custom.step2.desc':    'Select material, color, quantity, and print quality.',
    'custom.step3.title':   'Review Quote',
    'custom.step3.desc':    'We calculate an instant estimate and our team confirms with you.',
    'custom.step4.title':   'Receive Your Part',
    'custom.step4.desc':    'We print with high precision and ship as fast as possible.',
    'custom.drop.title':    'Drop Your File Here',
    'custom.drop.desc':     'or click to browse from your device',
    'custom.form.title':    'Print Specifications',
    'custom.form.material': 'Material',
    'custom.form.color':    'Color',
    'custom.form.qty':      'Quantity',
    'custom.form.quality':  'Print Quality',
    'custom.form.notes':    'Additional Notes',
    'custom.form.name':     'Name',
    'custom.form.email':    'Email Address',
    'custom.form.submit':   'Send Quote Request',
    'custom.price.label':   'Estimated Price',
    'custom.price.note':    '* Changes based on material & quantity',
    'custom.success':       'Request sent! We\'ll get back to you soon.',
    'custom.quote.label':   'Get a Quote',
    'custom.quote.title':   'Upload Your File & Request a Quote',
    'custom.materials.title':'Available Print Materials',
    'mat.pla.desc':   'Versatile & affordable',
    'mat.abs.desc':   'Durable & machinable',
    'mat.petg.desc':  'High heat resistance',
    'mat.resin.desc': 'Ultra fine details',
    'mat.nylon.desc': 'Flexible & strong',
    'mat.tpu.desc':   'Rubber-like flex',
    'faq.label':  'FAQ',
    'faq.title':  'Got Questions?',
    'faq.q1': 'What file formats do you accept?',
    'faq.a1': 'We accept STL, OBJ, STEP/STP, 3MF, IGES/IGS and more.',
    'faq.q2': 'How long does an order take?',
    'faq.a2': 'Typically 2–5 business days. Rush orders available at extra cost.',
    'faq.q3': 'Is there a minimum order?',
    'faq.a3': 'No minimum — you can order just one piece.',
    'faq.q4': 'Do you offer finishing & painting?',
    'faq.a4': 'Yes, we offer sanding, polishing, and painting services.',

    // Contact page (EN)
    'contact.label':       'Contact Us',
    'contact.title':       'We\'re Here to Help',
    'contact.desc':        'Whether you have a question about products, a custom order, or need technical support — our team is ready.',
    'contact.phone.label': 'Phone',
    'contact.phone.note':  'Sat – Thu, 9 AM – 6 PM',
    'contact.email.label': 'Email',
    'contact.email.note':  'We reply within 24 hours',
    'contact.location.label': 'Location',
    'contact.location.value': 'Riyadh, Saudi Arabia',
    'contact.location.note':  'Tech District, King Fahd Rd',
    'contact.social.title': 'Follow Us',
    'contact.hours.title':  'Business Hours',
    'hours.sat.tue':  'Saturday – Tuesday',
    'hours.wed.thu':  'Wednesday – Thursday',
    'hours.fri':      'Friday',
    'hours.closed':   'Closed',
    'contact.form.title':    'Send a Message',
    'contact.form.subtitle': 'We\'ll get back to you as soon as possible.',
    'contact.form.subject':  'Subject',
    'contact.form.name':     'Full Name',
    'contact.form.email':    'Email Address',
    'contact.form.phone':    'Phone Number',
    'contact.form.message':  'Message',
    'contact.form.btn':      'Send Message',
    'contact.success.title': 'Message Sent!',
    'contact.success.desc':  'Thanks for reaching out. Our team will reply within 24 hours.',
    'subject.general':    'General Inquiry',
    'subject.custom':     'Custom Printing',
    'subject.order':      'Order Tracking',
    'subject.support':    'Technical Support',
    'subject.partnership':'Partnership',
    'map.placeholder':    'Riyadh, Saudi Arabia — Tech District',

    // Admin page (EN)
    'admin.badge':        'Control Panel',
    'admin.visual.title': 'Welcome to the Admin Center',
    'admin.visual.desc':  'Manage orders, products, users, and reports from one place.',
    'admin.stat.orders':       'Orders This Month',
    'admin.stat.satisfaction': 'Customer Satisfaction',
    'admin.stat.products':     'Active Products',
    'admin.warning':      'This page is for system administrators only. All access attempts are logged.',
    'admin.back':         'Back to Site',
    'admin.title':        'Admin Login',
    'admin.subtitle':     'Access credentials for the administrative dashboard.',
    'admin.id':           'Admin ID',
    'admin.password':     'Password',
    'admin.btn':          'Enter Dashboard',
    'admin.tfa.desc':     'Enter the verification code sent to your email',
    'admin.tfa.resend':   'Didn\'t receive the code?',
    'admin.tfa.resend.link': 'Resend',
    'admin.tfa.sent':     'Verification code sent to your email',
    'admin.tfa.resent':   'Code resent',
    'admin.login.success':'Logged in successfully!',
    'form.fillrequired':  'Please fill in all required fields',
    'form.required':      'Required',
    'form.email.invalid': 'Invalid email address',
  },

  ar: {
    // Nav
    'nav.home':       'الرئيسية',
    'nav.products':   'المنتجات',
    'nav.custom':     'طباعة مخصصة',
    'nav.contact':    'تواصل معنا',
    'nav.login':      'تسجيل الدخول',
    'nav.register':   'إنشاء حساب',
    'nav.admin':      'المدير',
    'nav.tagline':    'طباعة ثلاثية الأبعاد',
    'nav.cart':       'السلة',

    // Hero
    'hero.badge':       'متجر الطباعة ثلاثية الأبعاد الأول في السعودية',
    'hero.title.1':     'اطبع',
    'hero.title.accent':'المستقبل',
    'hero.title.2':     'اليوم',
    'hero.desc':        'من النماذج الدقيقة إلى التصاميم المخصصة — نقدم طباعة ثلاثية الأبعاد احترافية بجودة وسرعة لا مثيل لهما.',
    'hero.cta.primary': 'تسوق الآن',
    'hero.cta.secondary':'طلب مخصص',
    'hero.stat.products':'٥٠٠+',
    'hero.stat.products.label':'منتج',
    'hero.stat.orders': '١٢ألف+',
    'hero.stat.orders.label': 'طلب تم تسليمه',
    'hero.stat.rating': '٤.٩★',
    'hero.stat.rating.label': 'تقييم العملاء',
    'hero.float.material': 'المواد',
    'hero.float.material.val': 'PLA Pro • PETG • راتنج',
    'hero.float.lead':    'وقت التسليم',
    'hero.float.lead.val':'٢٤ – ٤٨ ساعة',

    // Sections
    'section.features':   'لماذا Balance 3D',
    'section.features.title': 'دقة. سرعة. جودة.',
    'section.features.desc':  'نجمع بين أحدث تقنيات الطباعة ثلاثية الأبعاد والحرفية المتخصصة لتحويل أفكارك إلى واقع.',
    'section.products':   'منتجات مميزة',
    'section.products.title': 'الأكثر مبيعاً',
    'section.products.desc':  'استكشف أكثر منتجاتنا المطبوعة طلباً — جاهزة للشحن.',
    'section.cta':        'الطباعة المخصصة',
    'section.cta.title':  'هل لديك فكرة مميزة؟',
    'section.cta.desc':   'ارفع ملف التصميم أو صف مشروعك. خبراؤنا سيتولون الباقي — من اختيار المادة إلى التسليم.',
    'section.cta.btn':    'ابدأ طلبك المخصص',
    'section.testimonials': 'آراء العملاء',
    'section.testimonials.title': 'يحبنا صانعو الأفكار',

    // Features
    'feat.speed.title':  'تسليم سريع',
    'feat.speed.desc':   'معظم الطلبات جاهزة خلال ٢٤-٤٨ ساعة. خيارات إكسبرس متاحة.',
    'feat.quality.title':'جودة عالية',
    'feat.quality.desc': 'دقة طبقات تصل إلى ٠.٠٥ ملم. مواد احترافية.',
    'feat.custom.title': 'مخصص بالكامل',
    'feat.custom.desc':  'أي شكل، أي حجم، أي مادة. ارفع ملفك أو دعنا نصمم.',

    // Products
    'product.add':       'أضف للسلة',
    'product.view':      'عرض',
    'product.sar':       'ر.س',
    'product.new':       'جديد',
    'product.popular':   'شائع',
    'product.sale':      'تخفيض',
    'product.viewall':   'عرض جميع المنتجات',

    // Auth
    'login.title':   'مرحباً بعودتك',
    'login.subtitle':'ليس لديك حساب؟',
    'login.subtitle.link':'سجّل الآن',
    'login.email':   'البريد الإلكتروني',
    'login.password':'كلمة المرور',
    'login.forgot':  'نسيت كلمة المرور؟',
    'login.btn':     'تسجيل الدخول',
    'login.or':      'أو تابع عبر',
    'login.google':  'متابعة بحساب جوجل',

    'register.title':    'إنشاء حساب',
    'register.subtitle': 'هل لديك حساب بالفعل؟',
    'register.subtitle.link':'تسجيل الدخول',
    'register.fname':    'الاسم الأول',
    'register.lname':    'اسم العائلة',
    'register.email':    'البريد الإلكتروني',
    'register.password': 'كلمة المرور',
    'register.confirm':  'تأكيد كلمة المرور',
    'register.btn':      'إنشاء الحساب',
    'register.terms':    'بالتسجيل توافق على',
    'register.terms.link':'الشروط والأحكام',

    'admin.title':    'دخول المدير',
    'admin.subtitle': 'وصول مقيّد — للموظفين فقط',

    'auth.visual.heading.login':   'رحلتك في الطباعة ثلاثية الأبعاد تبدأ هنا',
    'auth.visual.heading.register':'انضم لأكبر مجتمع طباعة ثلاثية الأبعاد في السعودية',
    'auth.visual.heading.admin':   'بوابة إدارة Balance 3D',

    // Contact
    'contact.title':   'تواصل معنا',
    'contact.subtitle':'نحن هنا لمساعدتك في احتياجات الطباعة ثلاثية الأبعاد',
    'contact.name':    'الاسم الكامل',
    'contact.email':   'البريد الإلكتروني',
    'contact.subject': 'الموضوع',
    'contact.message': 'الرسالة',
    'contact.btn':     'إرسال الرسالة',
    'contact.phone':   'الهاتف',
    'contact.address': 'العنوان',
    'contact.hours':   'ساعات العمل',

    // Footer
    'footer.desc':      'المتجر الرائد للطباعة ثلاثية الأبعاد في المملكة العربية السعودية — نقدم الدقة والإبداع منذ ٢٠٢٠.',
    'footer.quick':     'روابط سريعة',
    'footer.services':  'الخدمات',
    'footer.contact':   'التواصل',
    'footer.rights':    '© ٢٠٢٥ Balance 3D. جميع الحقوق محفوظة.',
    'footer.privacy':   'سياسة الخصوصية',
    'footer.terms':     'شروط الاستخدام',

    // Custom page
    'custom.title':    'الطباعة ثلاثية الأبعاد المخصصة',
    'custom.subtitle': 'حوّل فكرتك إلى حقيقة ملموسة',
    'custom.step1':    'رفع الملف',
    'custom.step2':    'اختيار المادة',
    'custom.step3':    'الحصول على عرض سعر',
    'custom.step4':    'التسليم',

    // Products page
    'products.title':  'منتجاتنا',
    'products.filter': 'تصفية',
    'products.sort':   'ترتيب حسب',
    'products.search': 'ابحث عن منتجات...',
    'products.count':  'منتج',

    // Custom page
    'custom.hero.badge':    'خدمة مخصصة',
    'custom.hero.title':    'اطبع تصميمك بدقة احترافية',
    'custom.hero.desc':     'أرسل ملف النموذج ثلاثي الأبعاد، اختر المادة والألوان، واحصل على عرض سعر فوري.',
    'custom.process.label': 'كيف يعمل؟',
    'custom.process.title': 'أربع خطوات بسيطة',
    'custom.process.desc':  'من ملف التصميم إلى منتج جاهز في يدك.',
    'custom.step1.title':   'ارفع الملف',
    'custom.step1.desc':    'ارفع ملف التصميم بصيغ STL أو OBJ أو STEP أو غيرها.',
    'custom.step2.title':   'اختر المواصفات',
    'custom.step2.desc':    'حدد المادة، اللون، الكمية، وجودة الطباعة المطلوبة.',
    'custom.step3.title':   'راجع العرض',
    'custom.step3.desc':    'نحسب السعر التقديري فوراً وفريقنا يتواصل معك.',
    'custom.step4.title':   'استلم منتجك',
    'custom.step4.desc':    'نطبع قطعتك بدقة عالية ونشحنها إليك في أسرع وقت.',
    'custom.drop.title':    'اسحب ملفك هنا',
    'custom.drop.desc':     'أو انقر لاختيار الملف من جهازك',
    'custom.form.title':    'مواصفات الطباعة',
    'custom.form.material': 'المادة',
    'custom.form.color':    'اللون',
    'custom.form.qty':      'الكمية',
    'custom.form.quality':  'جودة الطباعة',
    'custom.form.notes':    'ملاحظات إضافية',
    'custom.form.name':     'الاسم',
    'custom.form.email':    'البريد الإلكتروني',
    'custom.form.submit':   'إرسال طلب العرض',
    'custom.price.label':   'السعر التقديري',
    'custom.price.note':    '* يتغير حسب المادة والكمية',
    'custom.success':       'تم إرسال طلبك! سنتواصل معك قريباً.',
    'custom.quote.label':   'احصل على عرض',
    'custom.quote.title':   'ارفع ملفك وأرسل طلبك',
    'custom.materials.title': 'مواد الطباعة المتاحة',
    'mat.pla.desc':  'متعدد الاستخدام، اقتصادي',
    'mat.abs.desc':  'متين وقابل للتشغيل',
    'mat.petg.desc': 'مقاومة عالية للحرارة',
    'mat.resin.desc':'تفاصيل دقيقة جداً',
    'mat.nylon.desc':'مرونة ومتانة عالية',
    'mat.tpu.desc':  'مطاطي ومرن',
    'faq.label':  'الأسئلة الشائعة',
    'faq.title':  'لديك أسئلة؟',
    'faq.q1': 'ما هي صيغ الملفات المقبولة؟',
    'faq.a1': 'نقبل STL, OBJ, STEP/STP, 3MF, IGES/IGS وغيرها.',
    'faq.q2': 'كم يستغرق تنفيذ الطلب؟',
    'faq.a2': 'عادةً 2–5 أيام عمل. الطلبات المستعجلة متاحة بسعر إضافي.',
    'faq.q3': 'هل يوجد حد أدنى للطلب؟',
    'faq.a3': 'لا يوجد حد أدنى، يمكنك طلب قطعة واحدة.',
    'faq.q4': 'هل تقدمون خدمة التشطيب والطلاء؟',
    'faq.a4': 'نعم، نقدم خدمات التشطيب والتلميع والطلاء.',

    // Contact page
    'contact.label':       'تواصل معنا',
    'contact.title':       'نحن هنا لمساعدتك',
    'contact.desc':        'سواء كان لديك سؤال أو طلب مخصص — فريقنا جاهز للرد.',
    'contact.phone.label': 'الهاتف',
    'contact.phone.note':  'السبت – الخميس، 9 ص – 6 م',
    'contact.email.label': 'البريد الإلكتروني',
    'contact.email.note':  'نرد خلال 24 ساعة',
    'contact.location.label': 'الموقع',
    'contact.location.value': 'الرياض، المملكة العربية السعودية',
    'contact.location.note':  'حي التقنية، طريق الملك فهد',
    'contact.social.title': 'تابعنا',
    'contact.hours.title':  'ساعات العمل',
    'hours.sat.tue':  'السبت – الثلاثاء',
    'hours.wed.thu':  'الأربعاء – الخميس',
    'hours.fri':      'الجمعة',
    'hours.closed':   'مغلق',
    'contact.form.title':    'أرسل رسالة',
    'contact.form.subtitle': 'سيتم الرد عليك في أقرب وقت ممكن.',
    'contact.form.subject':  'الموضوع',
    'contact.form.name':     'الاسم الكامل',
    'contact.form.email':    'البريد الإلكتروني',
    'contact.form.phone':    'رقم الجوال',
    'contact.form.message':  'الرسالة',
    'contact.form.btn':      'إرسال الرسالة',
    'contact.success.title': 'تم إرسال رسالتك!',
    'contact.success.desc':  'شكراً لتواصلك معنا. سيرد عليك فريقنا خلال 24 ساعة.',
    'subject.general':    'استفسار عام',
    'subject.custom':     'طباعة مخصصة',
    'subject.order':      'متابعة طلب',
    'subject.support':    'دعم فني',
    'subject.partnership':'شراكة',
    'map.placeholder':    'الرياض، المملكة العربية السعودية — حي التقنية',

    // Admin page
    'admin.badge':        'لوحة التحكم',
    'admin.visual.title': 'مرحباً بك في مركز الإدارة',
    'admin.visual.desc':  'قم بإدارة الطلبات، المنتجات، المستخدمين، والتقارير من مكان واحد.',
    'admin.stat.orders':      'طلب هذا الشهر',
    'admin.stat.satisfaction':'رضا العملاء',
    'admin.stat.products':    'منتج نشط',
    'admin.warning':      'هذه الصفحة مخصصة لمسؤولي النظام فقط. يتم تتبع جميع محاولات الدخول.',
    'admin.back':         'العودة للموقع',
    'admin.title':        'دخول المسؤولين',
    'admin.subtitle':     'بيانات الوصول للوحة التحكم الإدارية.',
    'admin.id':           'معرّف المسؤول',
    'admin.password':     'كلمة المرور',
    'admin.btn':          'دخول لوحة التحكم',
    'admin.tfa.desc':     'أدخل رمز التحقق المرسل إلى بريدك الإلكتروني',
    'admin.tfa.resend':   'لم تستلم الرمز؟',
    'admin.tfa.resend.link': 'إعادة الإرسال',
    'admin.tfa.sent':     'تم إرسال رمز التحقق إلى بريدك',
    'admin.tfa.resent':   'تم إعادة إرسال الرمز',
    'admin.login.success':'تم تسجيل الدخول بنجاح!',
    'form.fillrequired':  'يرجى ملء الحقول المطلوبة',
  }
};

// ============================================================
// APP STATE (v2)
// ============================================================
const App = {
  lang: localStorage.getItem('b3d_lang') || 'ar',
  cart: (() => {
    try {
      const raw = JSON.parse(localStorage.getItem('b3d_cart') || '[]');
      // Strip any item that lacks a valid non-empty string id (ghost from old Promise-spread bug)
      return Array.isArray(raw) ? raw.filter(i => i && typeof i.id === 'string' && i.id.trim() !== '') : [];
    } catch (_) { return []; }
  })(),
  _layoutBase: '',

  init() {
    this.applyLang(this.lang, false);
    this.updateCartBadge();
    /* Execute any pending cart action saved before the guest was sent to login */
    GuestAuth.resumePendingAction();
  },

  t(key) {
    const val = TRANSLATIONS[this.lang]?.[key] ?? TRANSLATIONS['en']?.[key];
    return val !== undefined ? val : key;
  },

  applyLang(lang, reload = true) {
    this.lang = lang;
    localStorage.setItem('b3d_lang', lang);

    // Update document direction & lang
    document.documentElement.lang = lang === 'ar' ? 'ar' : 'en';
    document.documentElement.dir  = lang === 'ar' ? 'rtl' : 'ltr';
    document.body.setAttribute('data-lang', lang);

    // Re-render static i18n elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key  = el.getAttribute('data-i18n');
      const attr = el.getAttribute('data-i18n-attr');
      const val  = this.t(key);
      if (attr) el.setAttribute(attr, val);
      else if (el.childNodes.length === 1 && el.childNodes[0].nodeType === 3)
        el.textContent = val;                   // only if text-only node
      else if (!el.children.length)
        el.textContent = val;
    });

    // Refresh lang toggles text
    document.querySelectorAll('.lang-current').forEach(el => {
      el.textContent = lang === 'ar' ? 'EN' : 'ع';
    });

    // Trigger page-level re-render (home products, custom checklist, etc.)
    if (reload) {
      // ── Close drawer AND cart panel BEFORE rebuilding nav HTML ──
      Nav.closeDrawer();
      CartPanel.close();

      if (typeof injectLayout === 'function') {
        injectLayout(this._layoutBase);

        // Suppress drawer transition for one frame so direction flip doesn't
        // animate translateX(±100%) through zero (the visible-in-center flash).
        const drawer = document.getElementById('navDrawer');
        if (drawer) {
          drawer.classList.add('nav__drawer--instant');
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              drawer.classList.remove('nav__drawer--instant');
            });
          });
        }

        // Same suppression for cart panel
        CartPanel.onLangChange();

        // Rebuild account menu button in new language
        if (typeof AccountMenu !== 'undefined') AccountMenu.onLangChange();

        Nav.init();
        this.updateCartBadge();
      }
      if (window.currentPage?.render) window.currentPage.render();
      Reveal.refresh();
    }
  },

  toggleLang() {
    this.applyLang(this.lang === 'ar' ? 'en' : 'ar', true);
  },

  addToCart(productOrPromise) {
    // ProductStore.getById() is async — wrap both Promise and direct object uniformly
    Promise.resolve(productOrPromise).then(product => {
      if (!product || !product.id) {
        console.warn('[Cart] addToCart: received null/invalid product', productOrPromise);
        return;
      }

      /* ── Auth gate: guests see a login prompt instead of adding to cart ── */
      if (!GuestAuth.isLoggedIn()) {
        GuestAuth.showLoginPrompt(product);
        return;
      }

      const existing = this.cart.find(i => i.id === product.id);
      if (existing) {
        existing.qty++;
      } else {
        this.cart.push({ ...product, qty: 1 });
      }
      this.saveCart();
      this.updateCartBadge();
      Toast.show(this.lang === 'ar' ? 'تمت الإضافة إلى السلة ✓' : 'Added to cart ✓', 'success');
    }).catch(err => {
      console.error('[Cart] addToCart failed:', err);
    });
  },

  /* Direct cart insertion (bypasses auth check — used by GuestAuth.resumePendingAction
     when the user is already confirmed logged-in after redirect from login page) */
  _addToCartDirect(product) {
    if (!product || !product.id) return;
    const existing = this.cart.find(i => i.id === product.id);
    if (existing) { existing.qty++; } else { this.cart.push({ ...product, qty: 1 }); }
    this.saveCart();
    this.updateCartBadge();
  },

  saveCart() {
    localStorage.setItem('b3d_cart', JSON.stringify(this.cart));
  },

  updateCartBadge() {
    const count = this.cart.reduce((s, i) => s + i.qty, 0);
    document.querySelectorAll('.nav__cart-count').forEach(b => {
      b.textContent = count;
      b.style.display = count > 0 ? 'flex' : 'none';
    });
  },

  // Expose toast shorthand
  toast(msg, type) { Toast.show(msg, type); }
};

// ============================================================
// GUEST AUTH  — browse freely, login gate only on purchase
// ============================================================
const GuestAuth = {
  _LS_SESSION: 'b3d_session',
  _LS_PENDING: 'b3d_pending_action',

  /* ── Synchronous session check (reads localStorage directly) ── */
  isLoggedIn() {
    try {
      const raw = localStorage.getItem(this._LS_SESSION);
      if (!raw || raw === 'null') return false;
      const s = JSON.parse(raw);
      /* Local mode: { user: {...} }  |  Supabase mode: { access_token, user, ... } */
      return !!(s && (s.user || s.access_token));
    } catch { return false; }
  },

  /* ── Pending action (add-to-cart intent saved before login redirect) ── */
  savePendingAction(action) {
    try { localStorage.setItem(this._LS_PENDING, JSON.stringify(action)); } catch (_) {}
  },
  clearPendingAction() {
    try { localStorage.removeItem(this._LS_PENDING); } catch (_) {}
  },
  getPendingAction() {
    try { const r = localStorage.getItem(this._LS_PENDING); return r ? JSON.parse(r) : null; }
    catch { return null; }
  },

  /* ── Called on every page init — executes the saved action after login ── */
  resumePendingAction() {
    if (!this.isLoggedIn()) return;          // still a guest, do nothing
    const action = this.getPendingAction();
    if (!action) return;
    this.clearPendingAction();               // consume it — run once only

    if (action.type === 'add_to_cart' && action.product) {
      /* Give the page a moment to fully initialize before adding */
      setTimeout(() => {
        App._addToCartDirect(action.product);
        Toast.show(
          App.lang === 'ar' ? 'تمت الإضافة إلى السلة ✓' : 'Added to cart ✓',
          'success'
        );
      }, 600);
    }
  },

  /* ── Inject modal styles once ── */
  _injectStyles() {
    if (document.getElementById('guestAuthStyles')) return;
    const s = document.createElement('style');
    s.id = 'guestAuthStyles';
    s.textContent = `
      .guest-auth-wrap {
        position: fixed; inset: 0; z-index: 10000;
        display: flex; align-items: center; justify-content: center; padding: 1rem;
        opacity: 0; transition: opacity .2s ease;
      }
      .guest-auth-wrap--open { opacity: 1; }
      .guest-auth-backdrop {
        position: absolute; inset: 0;
        background: rgba(0,0,0,.52); backdrop-filter: blur(5px); -webkit-backdrop-filter: blur(5px);
      }
      .guest-auth-modal {
        position: relative; background: var(--clr-surface, #fff);
        border-radius: 20px; padding: 2rem 1.75rem 1.75rem;
        max-width: 380px; width: 100%;
        box-shadow: 0 24px 64px rgba(0,0,0,.22);
        text-align: center;
        transform: translateY(20px); transition: transform .28s cubic-bezier(.4,0,.2,1);
      }
      .guest-auth-wrap--open .guest-auth-modal { transform: translateY(0); }
      .guest-auth-modal__icon { font-size: 2.4rem; margin-bottom: .65rem; line-height: 1; }
      .guest-auth-modal__title {
        font-size: 1.1rem; font-weight: 800; margin: 0 0 .6rem;
        color: var(--clr-text-primary, #1a1a2e); line-height: 1.35;
      }
      .guest-auth-modal__product {
        display: flex; align-items: center; gap: .6rem;
        background: var(--clr-surface-2, #f4f6fb); border-radius: 12px;
        padding: .6rem .8rem; margin: .7rem 0; text-align: start;
      }
      .guest-auth-modal__product-img {
        width: 44px; height: 44px; border-radius: 8px;
        object-fit: cover; flex-shrink: 0; border: 1px solid var(--clr-border, #e5e7eb);
      }
      .guest-auth-modal__product-name {
        font-size: .82rem; font-weight: 600;
        color: var(--clr-text-primary, #1a1a2e); line-height: 1.35;
      }
      .guest-auth-modal__desc {
        font-size: .87rem; color: var(--clr-text-muted, #6b7280);
        margin: 0 0 1.2rem; line-height: 1.55;
      }
      .guest-auth-modal__actions { display: flex; flex-direction: column; gap: .55rem; margin-bottom: .9rem; }
      .guest-auth-modal__btn {
        display: flex; align-items: center; justify-content: center; gap: .45rem;
        padding: .78rem 1.25rem; border-radius: 100px;
        font-size: .92rem; font-weight: 700; text-decoration: none;
        transition: opacity .15s, transform .15s; border: none; cursor: pointer;
      }
      .guest-auth-modal__btn:hover { opacity: .88; transform: translateY(-1px); }
      .guest-auth-modal__btn--primary { background: var(--clr-primary, #0f766e); color: #fff; }
      .guest-auth-modal__btn--secondary {
        background: var(--clr-surface-2, #f4f6fb); color: var(--clr-text-primary, #1a1a2e);
        border: 1.5px solid var(--clr-border, #e5e7eb);
      }
      .guest-auth-modal__dismiss {
        background: none; border: none; color: var(--clr-text-muted, #6b7280);
        font-size: .82rem; cursor: pointer; padding: .25rem .5rem; border-radius: 6px;
        font-family: inherit; transition: color .15s;
      }
      .guest-auth-modal__dismiss:hover { color: var(--clr-text-primary, #1a1a2e); }
    `;
    document.head.appendChild(s);
  },

  /* ── Resolve the base path for login/register links ── */
  _authBase() {
    /* App._layoutBase = 'pages/' when we're at site root (index.html),
       '' when we're already inside the pages/ directory. */
    return (App._layoutBase === 'pages/') ? 'pages/' : '';
  },

  /* ── Show the polished login-prompt modal ── */
  showLoginPrompt(product) {
    this._injectStyles();

    /* Save intent before user navigates away */
    if (product) {
      this.savePendingAction({ type: 'add_to_cart', product });
    }

    const isAr  = App.lang === 'ar';
    const base  = this._authBase();
    const next  = encodeURIComponent(window.location.href);
    const loginUrl    = base + 'login.html?next='    + next + '&reason=purchase';
    const registerUrl = base + 'register.html?next=' + next + '&reason=purchase';

    const productImg  = product && typeof getProductPlaceholderSvg === 'function'
      ? getProductPlaceholderSvg(product) : '';
    const productName = product
      ? (product.title?.[App.lang] || product.title?.en || product.title || '') : '';

    /* Remove any stale modal */
    document.getElementById('guestAuthWrap')?.remove();

    const wrap = document.createElement('div');
    wrap.id        = 'guestAuthWrap';
    wrap.className = 'guest-auth-wrap';
    wrap.innerHTML = `
      <div class="guest-auth-backdrop" id="guestAuthBackdrop"></div>
      <div class="guest-auth-modal" role="dialog" aria-modal="true"
           aria-label="${isAr ? 'تسجيل الدخول مطلوب' : 'Login required'}">
        <div class="guest-auth-modal__icon">🛒</div>
        <h2 class="guest-auth-modal__title">
          ${isAr ? 'أنت على وشك إضافة منتج للسلة' : 'You\'re About to Add to Cart'}
        </h2>
        ${productName ? `
        <div class="guest-auth-modal__product">
          ${productImg ? `<img src="${productImg}" alt="" class="guest-auth-modal__product-img" loading="lazy">` : ''}
          <span class="guest-auth-modal__product-name">${productName.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</span>
        </div>` : ''}
        <p class="guest-auth-modal__desc">
          ${isAr
            ? 'يرجى تسجيل الدخول أو إنشاء حساب جديد لإتمام عملية الشراء'
            : 'Please sign in or create an account to complete your purchase'}
        </p>
        <div class="guest-auth-modal__actions">
          <a href="${loginUrl}" class="guest-auth-modal__btn guest-auth-modal__btn--primary">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 stroke-width="2.5" stroke-linecap="round" aria-hidden="true">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
              <polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/>
            </svg>
            ${isAr ? 'تسجيل الدخول' : 'Sign In'}
          </a>
          <a href="${registerUrl}" class="guest-auth-modal__btn guest-auth-modal__btn--secondary">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 stroke-width="2.5" stroke-linecap="round" aria-hidden="true">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/>
            </svg>
            ${isAr ? 'إنشاء حساب جديد' : 'Create Account'}
          </a>
        </div>
        <button type="button" class="guest-auth-modal__dismiss" id="guestAuthDismiss">
          ${isAr ? '← متابعة التسوق' : 'Continue Shopping →'}
        </button>
      </div>`;

    document.body.appendChild(wrap);
    document.body.style.overflow = 'hidden';

    /* Animate in after one paint */
    requestAnimationFrame(() => wrap.classList.add('guest-auth-wrap--open'));

    /* Dismiss handlers */
    const close = () => this.closeModal();
    document.getElementById('guestAuthBackdrop')?.addEventListener('click', close);
    document.getElementById('guestAuthDismiss')?.addEventListener('click',  close);
    this._escFn = e => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', this._escFn);
  },

  closeModal() {
    const wrap = document.getElementById('guestAuthWrap');
    if (wrap) {
      wrap.classList.remove('guest-auth-wrap--open');
      setTimeout(() => wrap.remove(), 210);
    }
    document.body.style.overflow = '';
    if (this._escFn) { document.removeEventListener('keydown', this._escFn); this._escFn = null; }
  },
};

// ============================================================
// PRICE RENDERER  — shared helper for all product card contexts
// ============================================================
/**
 * Returns the HTML string for a product's price block.
 * Handles both the on-sale (strikethrough + badge) and regular cases.
 *
 * @param {object} p   product object
 * @param {string} sar SAR label (from App.t('product.sar'))
 * @param {string} [wrapClass] extra class added to the outer wrapper
 */
function renderProductPrice(p, sar, wrapClass) {
  const effectivePrice = p.salePrice ?? p.price ?? 0;
  if (p.isOnSale && p.originalPrice && p.originalPrice > effectivePrice) {
    /* Sale: sale price (teal bold) + original (gray strikethrough) — same line */
    return `<div class="product-card__price product-card__price--sale ${wrapClass || ''}">
      <span class="price-sale">${effectivePrice}<span class="price-unit"> ${sar}</span></span>
      <span class="price-original">${p.originalPrice}<span class="price-unit"> ${sar}</span></span>
    </div>`;
  }
  /* Regular price */
  return `<div class="product-card__price ${wrapClass || ''}">
    ${effectivePrice}<span class="product-card__price-unit"> ${sar}</span>
  </div>`;
}

// ============================================================
// TOAST
// ============================================================
const Toast = {
  container: null,
  init() {
    if (this.container) return;
    this.container = document.createElement('div');
    this.container.className = 'toast-container';
    this.container.setAttribute('aria-live', 'polite');
    this.container.setAttribute('aria-atomic', 'false');
    document.body.appendChild(this.container);
  },
  show(msg, type = 'info') {
    if (!this.container) this.init();
    const icons = {
      success: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>`,
      error:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
      info:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
      warning: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
    };
    const t = document.createElement('div');
    t.className = 'toast';
    t.setAttribute('role', 'status');
    t.innerHTML = `<span style="width:16px;height:16px;flex-shrink:0" aria-hidden="true">${icons[type] || icons.info}</span><span>${msg}</span>`;
    this.container.appendChild(t);
    setTimeout(() => { t.style.opacity = '0'; setTimeout(() => t.remove(), 300); }, 3200);
  }
};

// ============================================================
// SCROLL REVEAL
// ============================================================
const Reveal = {
  observer: null,
  init() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
      return;
    }
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          this.observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });
    document.querySelectorAll('.reveal').forEach(el => this.observer.observe(el));
  },
  refresh() {
    if (!this.observer) { this.init(); return; }
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => this.observer.observe(el));
  }
};

// ============================================================
// NAV
// ============================================================
const Nav = {
  nav: null,
  drawer: null,
  _overlay: null,
  _scrollBound: null,

  init() {
    // ── Close any open drawer before reinitialising (e.g. during lang switch) ──
    if (this.drawer && this.drawer.classList.contains('open')) {
      this.closeDrawer();
    }
    // Clean up stale overlay that may have survived a nav rebuild
    if (this._overlay && !document.body.contains(this._overlay)) {
      this._overlay = null;
    }
    if (this._overlay) {
      this._overlay.remove();
      this._overlay = null;
    }
    document.body.style.overflow = '';

    this.nav    = document.querySelector('.nav');
    this.drawer = document.getElementById('navDrawer');
    if (!this.nav) return;

    // Scroll
    if (this._scrollBound) window.removeEventListener('scroll', this._scrollBound);
    this._scrollBound = () => this.onScroll();
    window.addEventListener('scroll', this._scrollBound, { passive: true });
    this.onScroll();

    // Hamburger
    const burger = document.getElementById('navHamburger');
    if (burger) {
      burger.replaceWith(burger.cloneNode(true)); // remove old listeners
      document.getElementById('navHamburger')?.addEventListener('click', () => this.openDrawer());
    }

    // Drawer close button
    const closeBtn = document.getElementById('drawerClose');
    if (closeBtn) {
      closeBtn.replaceWith(closeBtn.cloneNode(true));
      document.getElementById('drawerClose')?.addEventListener('click', () => this.closeDrawer());
    }

    // Lang toggle (desktop)
    const lt = document.getElementById('langToggle');
    if (lt) {
      lt.replaceWith(lt.cloneNode(true));
      document.getElementById('langToggle')?.addEventListener('click', () => App.toggleLang());
    }

    // Mobile lang toggle (in drawer footer)
    const ltm = document.getElementById('langToggleMobile');
    if (ltm) {
      ltm.replaceWith(ltm.cloneNode(true));
      document.getElementById('langToggleMobile')?.addEventListener('click', () => {
        this.closeDrawer();
        App.toggleLang();
      });
    }

    // Cart button
    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn) {
      cartBtn.replaceWith(cartBtn.cloneNode(true));
      document.getElementById('cartBtn')?.addEventListener('click', () => CartPanel.open());
    }

    // Active link
    this.setActive();
  },

  onScroll() {
    if (!this.nav) return;
    this.nav.classList.toggle('scrolled', window.scrollY > 20);
  },

  setActive() {
    const page = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav__link, .nav__drawer-link').forEach(link => {
      const h = (link.getAttribute('href') || '').split('/').pop();
      link.classList.toggle('active', h === page || (page === '' && h === 'index.html'));
    });
  },

  openDrawer() {
    if (!this.drawer) return;
    this.drawer.classList.add('open');
    document.getElementById('navHamburger')?.setAttribute('aria-expanded', 'true');

    // Always create a fresh overlay (never reuse a potentially detached one)
    if (this._overlay) {
      this._overlay.remove();
      this._overlay = null;
    }
    this._overlay = document.createElement('div');
    this._overlay.className = 'overlay';
    this._overlay.setAttribute('aria-hidden', 'true');
    this._overlay.addEventListener('click', () => this.closeDrawer());
    document.body.appendChild(this._overlay);
    document.body.style.overflow = 'hidden';
  },

  closeDrawer() {
    if (this.drawer) {
      this.drawer.classList.remove('open');
    }
    document.getElementById('navHamburger')?.setAttribute('aria-expanded', 'false');
    if (this._overlay) {
      this._overlay.remove();
      this._overlay = null;
    }
    document.body.style.overflow = '';
  }
};

// ============================================================
// CART PANEL
// ============================================================
const CartPanel = {
  _panel:   null,
  _overlay: null,

  /* Open the cart panel */
  open() {
    /* Guests can't open the cart — show login prompt instead */
    if (!GuestAuth.isLoggedIn()) {
      GuestAuth.showLoginPrompt(null);
      return;
    }

    this._panel = document.getElementById('cartPanel');
    if (!this._panel) return;

    this.render();
    this._panel.classList.add('open');

    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn) cartBtn.setAttribute('aria-expanded', 'true');

    // Fresh overlay every time
    if (this._overlay) { this._overlay.remove(); this._overlay = null; }
    this._overlay = document.createElement('div');
    this._overlay.className = 'overlay';
    this._overlay.setAttribute('aria-hidden', 'true');
    this._overlay.addEventListener('click', () => this.close());
    document.body.appendChild(this._overlay);
    document.body.style.overflow = 'hidden';

    // Wire close button
    const closeBtn = document.getElementById('cartPanelClose');
    if (closeBtn) {
      closeBtn.replaceWith(closeBtn.cloneNode(true));
      document.getElementById('cartPanelClose')?.addEventListener('click', () => this.close());
    }

    // Wire continue shopping button
    const contBtn = document.getElementById('cartContinueBtn');
    if (contBtn) {
      contBtn.replaceWith(contBtn.cloneNode(true));
      document.getElementById('cartContinueBtn')?.addEventListener('click', () => this.close());
    }

    // Wire checkout button
    const checkBtn = document.getElementById('cartCheckoutBtn');
    if (checkBtn) {
      checkBtn.replaceWith(checkBtn.cloneNode(true));
      document.getElementById('cartCheckoutBtn')?.addEventListener('click', () => {
        // Navigate to checkout page — path depends on whether we're at root or in pages/
        const base = App._layoutBase || '';
        const checkoutUrl = base === 'pages/'
          ? 'pages/checkout.html'
          : 'checkout.html';
        this.close();
        window.location.href = checkoutUrl;
      });
    }

    // Escape key closes panel
    this._onKeyDown = (e) => { if (e.key === 'Escape') this.close(); };
    document.addEventListener('keydown', this._onKeyDown);
  },

  /* Close the cart panel */
  close() {
    this._panel = document.getElementById('cartPanel');
    if (this._panel) this._panel.classList.remove('open');

    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn) cartBtn.setAttribute('aria-expanded', 'false');

    if (this._overlay) { this._overlay.remove(); this._overlay = null; }
    document.body.style.overflow = '';

    if (this._onKeyDown) {
      document.removeEventListener('keydown', this._onKeyDown);
      this._onKeyDown = null;
    }
  },

  /* Re-render contents (called on open + after any cart mutation) */
  render() {
    const body     = document.getElementById('cartPanelBody');
    const footer   = document.getElementById('cartPanelFooter');
    const totals   = document.getElementById('cartTotals');
    const badge    = document.getElementById('cartPanelBadge');
    const title    = document.getElementById('cartPanelTitle');
    const chkLabel = document.getElementById('cartCheckoutLabel');
    const cntLabel = document.getElementById('cartContinueLabel');

    const l   = App.lang;
    const isAr = l === 'ar';
    const sar  = App.t('product.sar');

    // Update text labels
    if (title)    title.textContent    = isAr ? 'سلة التسوق' : 'Shopping Cart';
    if (chkLabel) chkLabel.textContent = isAr ? 'إتمام الشراء' : 'Checkout';
    if (cntLabel) cntLabel.textContent = isAr ? 'مواصلة التسوق' : 'Continue Shopping';

    const cart  = App.cart;
    const count = cart.reduce((s, i) => s + i.qty, 0);

    if (badge) badge.textContent = count;

    if (!body) return;

    if (cart.length === 0) {
      // Empty state
      body.innerHTML = `
        <div class="cart-empty">
          <div class="cart-empty__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
          </div>
          <h3>${isAr ? 'السلة فارغة' : 'Your cart is empty'}</h3>
          <p>${isAr ? 'أضف منتجات لتظهر هنا.' : 'Add some products and they\u0027ll appear here.'}</p>
        </div>`;
      if (footer) footer.style.display = 'none';
      return;
    }

    // Item rows — skip any item without a valid id (defensive guard)
    const validCart = cart.filter(i => i && typeof i.id === 'string' && i.id.trim() !== '');
    body.innerHTML = validCart.map((item, idx) => {
      const name      = item.title?.[l] || item.title?.en || item.title || '';
      const unitPrice = item.salePrice ?? item.price ?? 0;
      const price     = (unitPrice * item.qty).toFixed(0);
      const img       = typeof getProductPlaceholderSvg === 'function'
                        ? getProductPlaceholderSvg(item)
                        : '';
      /* Show strikethrough original total if item is on sale */
      const isItemOnSale = item.isOnSale && item.originalPrice && item.originalPrice > unitPrice;
      const origTotal    = isItemOnSale ? (Number(item.originalPrice) * item.qty).toFixed(0) : null;
      const priceHtml    = isItemOnSale
        ? `<s style="color:#9CA3AF;font-size:.8em;font-weight:400;margin-inline-end:4px">${origTotal} ${sar}</s>
           <span style="color:#0EA5E9;font-weight:700">${price} ${sar}</span>`
        : `${price} ${sar}`;
      return `
        <div class="cart-item" data-id="${item.id}" data-cartindex="${idx}">
          <img class="cart-item__img" src="${img}" alt="${name}" loading="lazy"/>
          <div class="cart-item__info">
            <div class="cart-item__name">${name}</div>
            <div class="cart-item__material">${item.material || ''}</div>
            <div class="cart-item__qty">
              <button type="button" class="cart-item__qty-btn" data-action="dec" data-cartindex="${idx}" aria-label="${isAr ? 'تقليل' : 'Decrease'}">−</button>
              <span class="cart-item__qty-num">${item.qty}</span>
              <button type="button" class="cart-item__qty-btn" data-action="inc" data-cartindex="${idx}" aria-label="${isAr ? 'زيادة' : 'Increase'}">+</button>
            </div>
            <div class="cart-item__price">${priceHtml}</div>
          </div>
          <button type="button" class="cart-item__remove" data-cartindex="${idx}" aria-label="${isAr ? 'حذف' : 'Remove'}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
              <path d="M10 11v6M14 11v6"/>
              <path d="M9 6V4h6v2"/>
            </svg>
          </button>
        </div>`;
    }).join('');

    // Sync App.cart to only valid items so ghost items can never re-appear
    if (validCart.length !== cart.length) {
      App.cart = validCart;
      App.saveCart();
    }

    // Qty buttons — identify item by cartindex to handle any id format safely
    body.querySelectorAll('.cart-item__qty-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const cartIndex = parseInt(btn.dataset.cartindex, 10);
        const item = App.cart[cartIndex];
        if (!item) return;
        const action = btn.dataset.action;
        if (action === 'inc') {
          item.qty++;
        } else if (action === 'dec') {
          item.qty--;
          if (item.qty <= 0) App.cart.splice(cartIndex, 1);
        }
        App.saveCart();
        App.updateCartBadge();
        this.render();
      });
    });

    // Remove buttons — use cartindex so even corrupt or edge-case ids are removable
    body.querySelectorAll('.cart-item__remove').forEach(btn => {
      btn.addEventListener('click', () => {
        const cartIndex = parseInt(btn.dataset.cartindex, 10);
        App.cart.splice(cartIndex, 1);
        App.saveCart();
        App.updateCartBadge();
        this.render();
      });
    });

    // Totals — always charge salePrice (falls back to price for legacy items)
    const subtotal = cart.reduce((s, i) => s + (i.salePrice ?? i.price ?? 0) * i.qty, 0);
    const shipping  = subtotal > 200 ? 0 : 25;
    const total     = subtotal + shipping;

    if (totals) {
      totals.innerHTML = `
        <div class="cart-totals__row">
          <span class="cart-totals__label">${isAr ? 'المجموع الفرعي' : 'Subtotal'}</span>
          <span class="cart-totals__value">${subtotal.toFixed(0)} ${sar}</span>
        </div>
        <div class="cart-totals__row">
          <span class="cart-totals__label">${isAr ? 'الشحن' : 'Shipping'}</span>
          <span class="cart-totals__value">${shipping === 0 ? (isAr ? 'مجاني' : 'Free') : shipping + ' ' + sar}</span>
        </div>
        <div class="cart-totals__row cart-totals__row--total">
          <span class="cart-totals__label">${isAr ? 'الإجمالي' : 'Total'}</span>
          <span class="cart-totals__value">${total.toFixed(0)} ${sar}</span>
        </div>`;
    }

    if (footer) footer.style.display = 'flex';
  },

  /* Called during lang switch — suppress flash, re-render text */
  onLangChange() {
    const panel = document.getElementById('cartPanel');
    if (!panel) return;
    // Freeze transition for one double-rAF cycle
    panel.classList.add('cart-panel--instant');
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        panel.classList.remove('cart-panel--instant');
      });
    });
    // Re-render text/labels if panel is already open
    if (panel.classList.contains('open')) this.render();
  }
};

// ============================================================
// INITIALIZE
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  App.init();
  Toast.init();
  Reveal.init();
  // Nav.init() is called by layout.js after inject
});

// ============================================================
// PAGE TRANSITION — eliminates white flash between pages
// ============================================================
(function () {
  'use strict';
  var _busy = false;

  /* Fade body out, then navigate */
  function leave(href) {
    if (_busy) return;
    _busy = true;
    var b = document.body;
    b.style.transition    = 'opacity 100ms ease-in';
    b.style.opacity       = '0';
    b.style.pointerEvents = 'none';
    setTimeout(function () { window.location.href = href; }, 110);
  }

  /* Intercept all same-origin link clicks */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey ||
        e.shiftKey || e.altKey || a.target === '_blank') return;

    var raw = a.getAttribute('href') || '';
    /* Skip hash-only, void, mailto, tel */
    if (!raw || raw === '#' || raw.startsWith('#') ||
        raw.startsWith('javascript') || raw.startsWith('mailto') ||
        raw.startsWith('tel')) return;

    var url;
    try { url = new URL(raw, location.href); } catch (_) { return; }
    if (url.origin !== location.origin) return;

    /* Hash-only jump on the same page — let browser handle natively */
    if (url.pathname === location.pathname && url.hash) return;

    e.preventDefault();
    leave(url.href);
  }, true); /* capture phase — runs before any inner handlers */

  /* Restore body when returning via back/forward (bfcache) */
  window.addEventListener('pageshow', function (e) {
    if (!e.persisted) return;
    _busy = false;
    document.body.style.opacity       = '';
    document.body.style.transition    = '';
    document.body.style.pointerEvents = '';
  });
}());
