/* ================================================================
   Balance 3D — Auth Layer  (auth.js)

   Wraps Supabase Auth with a localStorage fallback for offline/
   demo mode. Provides a single AuthService object used by all
   pages.

   Methods:
     AuthService.signUpEmail(email, password, meta)
     AuthService.signInEmail(email, password)
     AuthService.signInGoogle()
     AuthService.signInApple()
     AuthService.signInPhone(phone)         → sends OTP
     AuthService.verifyOtp(phone, token)    → verifies OTP
     AuthService.signOut()
     AuthService.getSession()               → current session or null
     AuthService.getUser()                  → current user profile or null
     AuthService.onAuthChange(callback)     → subscribe to auth state
     AuthService.isAdmin()                  → boolean
     AuthService.requireAuth(redirectTo)    → guard: redirect if not logged in
     AuthService.requireAdmin(redirectTo)   → guard: redirect if not admin
     AuthService.resetPassword(email)       → sends reset email
     AuthService.updatePassword(password)
     AuthService.updateProfile(data)
   ================================================================ */

'use strict';

/* ----------------------------------------------------------------
   Supabase client reference (db.js loaded before auth.js)
   ---------------------------------------------------------------- */
const _getClient = () => {
  if (typeof window !== 'undefined' && window._sbClient) return window._sbClient;
  return null;
};

/* ----------------------------------------------------------------
   Configuration check (mirrors db.js)
   ---------------------------------------------------------------- */
const _authConfigured = () => {
  const c = _getClient();
  return !!(c && typeof SUPABASE_URL !== 'undefined' &&
    SUPABASE_URL !== 'https://YOUR_PROJECT_ID.supabase.co');
};

/* ----------------------------------------------------------------
   Local session store (fallback when Supabase not configured)
   ---------------------------------------------------------------- */
const _LS_SESSION = 'b3d_session';
const _LS_USER    = 'b3d_user';
const _LS_ADMIN   = 'b3d_admin_auth';

const _localGetSession = () => {
  try { const v = localStorage.getItem(_LS_SESSION); return v ? JSON.parse(v) : null; } catch (_) { return null; }
};
const _localSetSession = (s) => {
  try { if (s) localStorage.setItem(_LS_SESSION, JSON.stringify(s)); else localStorage.removeItem(_LS_SESSION); } catch (_) {}
};
const _localGetUser = () => {
  try { const v = localStorage.getItem(_LS_USER); return v ? JSON.parse(v) : null; } catch (_) { return null; }
};
const _localSetUser = (u) => {
  try { if (u) localStorage.setItem(_LS_USER, JSON.stringify(u)); else localStorage.removeItem(_LS_USER); } catch (_) {}
};

/* ----------------------------------------------------------------
   Demo admin credentials (fallback only — real ones are in DB)
   ---------------------------------------------------------------- */
const _DEMO_ADMIN = { username: 'admin', password: 'admin123' };

/* ----------------------------------------------------------------
   i18n helper (works before App is loaded)
   ---------------------------------------------------------------- */
const _t = (key, fallback) => {
  if (typeof App !== 'undefined' && App.t) return App.t(key) || fallback;
  const lang = localStorage.getItem('b3d_lang') || localStorage.getItem('b3d_admin_lang') || 'ar';
  const _map = {
    'auth.error.invalid_credentials': { ar: 'بريد إلكتروني أو كلمة مرور غير صحيحة', en: 'Invalid email or password' },
    'auth.error.email_taken':         { ar: 'هذا البريد الإلكتروني مسجّل بالفعل', en: 'Email already in use' },
    'auth.error.weak_password':       { ar: 'كلمة المرور ضعيفة جداً (6 أحرف على الأقل)', en: 'Password too weak (min 6 chars)' },
    'auth.error.invalid_phone':       { ar: 'رقم الجوال غير صالح', en: 'Invalid phone number' },
    'auth.error.otp_expired':         { ar: 'انتهت صلاحية الرمز، حاول مجدداً', en: 'OTP expired, please retry' },
    'auth.error.otp_invalid':         { ar: 'الرمز غير صحيح', en: 'Incorrect OTP' },
    'auth.error.generic':             { ar: 'حدث خطأ، يرجى المحاولة مرة أخرى', en: 'Something went wrong, please try again' },
    'auth.success.signed_in':         { ar: 'تم تسجيل الدخول بنجاح', en: 'Signed in successfully' },
    'auth.success.signed_up':         { ar: 'تم إنشاء حسابك بنجاح', en: 'Account created successfully' },
    'auth.success.signed_out':        { ar: 'تم تسجيل الخروج', en: 'Signed out' },
    'auth.success.otp_sent':          { ar: 'تم إرسال رمز التحقق إلى هاتفك', en: 'OTP sent to your phone' },
    'auth.success.reset_sent':        { ar: 'تم إرسال رابط إعادة التعيين إلى بريدك', en: 'Reset link sent to your email' },
    'auth.success.profile_updated':   { ar: 'تم تحديث الملف الشخصي', en: 'Profile updated' },
  };
  const entry = _map[key];
  return entry ? (entry[lang] || entry.en) : fallback;
};

/* ----------------------------------------------------------------
   AuthService
   ---------------------------------------------------------------- */
const AuthService = {

  /* ---- Email / Password signup ---- */
  async signUpEmail(email, password, meta = {}) {
    if (!_authConfigured()) {
      return this._localSignUp(email, password, meta);
    }
    const { data, error } = await _getClient().auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name:      meta.firstName ? (meta.firstName + (meta.lastName ? ' ' + meta.lastName : '')) : (meta.nameEn || ''),
          first_name:     meta.firstName || meta.nameEn || '',
          last_name:      meta.lastName  || meta.nameAr || '',
          preferred_lang: meta.lang || localStorage.getItem('b3d_lang') || 'ar',
        },
        emailRedirectTo: window.location.origin + '/pages/login.html',
      },
    });
    if (error) return { ok: false, error: this._mapError(error) };
    return { ok: true, user: data.user, session: data.session };
  },

  /* ---- Email / Password sign-in ---- */
  async signInEmail(email, password) {
    if (!_authConfigured()) {
      return this._localSignIn(email, password);
    }
    const { data, error } = await _getClient().auth.signInWithPassword({ email, password });
    if (error) return { ok: false, error: this._mapError(error) };
    this._notifyChange(data.session?.user || null);
    return { ok: true, user: data.user, session: data.session };
  },

  /* ---- Google OAuth ---- */
  async signInGoogle() {
    if (!_authConfigured()) {
      return { ok: false, error: _t('auth.error.generic', 'Configure Supabase to use Google sign-in') };
    }
    const { error } = await _getClient().auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/pages/login.html?auth=callback',
        queryParams: { access_type: 'offline', prompt: 'consent' },
      },
    });
    if (error) return { ok: false, error: this._mapError(error) };
    return { ok: true }; // browser redirects
  },

  /* ---- Apple OAuth ---- */
  async signInApple() {
    if (!_authConfigured()) {
      return { ok: false, error: _t('auth.error.generic', 'Configure Supabase to use Apple sign-in') };
    }
    const { error } = await _getClient().auth.signInWithOAuth({
      provider: 'apple',
      options: {
        redirectTo: window.location.origin + '/pages/login.html?auth=callback',
      },
    });
    if (error) return { ok: false, error: this._mapError(error) };
    return { ok: true }; // browser redirects
  },

  /* ---- Phone: send OTP ---- */
  async signInPhone(phone) {
    const cleaned = phone.replace(/\s+/g, '');
    if (!_authConfigured()) {
      // Demo mode: accept any phone, return a fake OTP token
      _localSetSession({ phone: cleaned, otp: '123456', type: 'phone_pending' });
      return { ok: true, message: _t('auth.success.otp_sent', 'OTP sent') };
    }
    const { error } = await _getClient().auth.signInWithOtp({
      phone: cleaned,
      options: { channel: 'sms' },
    });
    if (error) return { ok: false, error: this._mapError(error) };
    return { ok: true, message: _t('auth.success.otp_sent', 'OTP sent') };
  },

  /* ---- Phone: verify OTP ---- */
  async verifyOtp(phone, token) {
    const cleaned = phone.replace(/\s+/g, '');
    if (!_authConfigured()) {
      const pending = _localGetSession();
      if (pending?.type === 'phone_pending' && pending?.otp === token) {
        const user = { id: 'demo-' + Date.now(), phone: cleaned, role: 'customer' };
        _localSetSession({ user, type: 'phone_session' });
        _localSetUser(user);
        this._notifyChange(user);
        return { ok: true, user };
      }
      return { ok: false, error: _t('auth.error.otp_invalid', 'Incorrect OTP') };
    }
    const { data, error } = await _getClient().auth.verifyOtp({
      phone: cleaned, token, type: 'sms',
    });
    if (error) return { ok: false, error: this._mapError(error) };
    this._notifyChange(data.session?.user || null);
    return { ok: true, user: data.user, session: data.session };
  },

  /* ---- Sign out ---- */
  async signOut() {
    if (_authConfigured()) {
      await _getClient().auth.signOut();
    }
    _localSetSession(null);
    _localSetUser(null);
    sessionStorage.removeItem(_LS_ADMIN);
    this._notifyChange(null);
    return { ok: true };
  },

  /* ---- Admin login (username/password against DB) ---- */
  async signInAdmin(username, password) {
    // Demo/offline fallback
    if (!_authConfigured()) {
      if (username === _DEMO_ADMIN.username && password === _DEMO_ADMIN.password) {
        sessionStorage.setItem(_LS_ADMIN, '1');
        return { ok: true };
      }
      return { ok: false, error: _t('auth.error.invalid_credentials', 'Invalid credentials') };
    }
    // With Supabase: sign in as the admin Supabase auth user OR
    // check admin_users table and set a session flag
    // For maximum security, sign in with email/password using the admin's Supabase account
    // But we also support the simpler username+password check via admin_users table:
    try {
      const { data, error } = await _getClient()
        .from('admin_users')
        .select('id, username, name')
        .eq('username', username)
        .maybeSingle();

      if (error || !data) {
        return { ok: false, error: _t('auth.error.invalid_credentials', 'Invalid credentials') };
      }

      // Verify password using the RPC function (bcrypt check in DB)
      const { data: ok } = await _getClient().rpc('verify_admin_password', {
        p_username: username,
        p_password: password,
      });

      if (!ok) {
        return { ok: false, error: _t('auth.error.invalid_credentials', 'Invalid credentials') };
      }

      sessionStorage.setItem(_LS_ADMIN, '1');
      sessionStorage.setItem('b3d_admin_name', data.name || 'Admin');
      return { ok: true };
    } catch (_) {
      // Fallback to demo if RPC not set up yet
      if (username === _DEMO_ADMIN.username && password === _DEMO_ADMIN.password) {
        sessionStorage.setItem(_LS_ADMIN, '1');
        return { ok: true };
      }
      return { ok: false, error: _t('auth.error.invalid_credentials', 'Invalid credentials') };
    }
  },

  /* ---- Password reset ---- */
  async resetPassword(email) {
    if (!_authConfigured()) {
      return { ok: true, message: _t('auth.success.reset_sent', 'Reset link sent') };
    }
    const { error } = await _getClient().auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/pages/reset-password.html',
    });
    if (error) return { ok: false, error: this._mapError(error) };
    return { ok: true, message: _t('auth.success.reset_sent', 'Reset link sent') };
  },

  /* ---- Update password (after reset link) ---- */
  async updatePassword(password) {
    if (!_authConfigured()) return { ok: true };
    const { error } = await _getClient().auth.updateUser({ password });
    if (error) return { ok: false, error: this._mapError(error) };
    return { ok: true };
  },

  /* ---- Update profile ---- */
  async updateProfile(data) {
    const user = await this.getUser();
    if (!user) return { ok: false, error: 'Not authenticated' };
    if (_authConfigured()) {
      const patch = {
        name_en:        data.nameEn,
        name_ar:        data.nameAr,
        preferred_lang: data.lang,
        updated_at:     new Date().toISOString(),
      };
      if (data.phone !== undefined) patch.phone = data.phone;
      const { error } = await _getClient()
        .from('profiles')
        .update(patch)
        .eq('id', user.id);
      if (error) return { ok: false, error: this._mapError(error) };
    } else {
      _localSetUser({ ...user, ...data });
    }
    return { ok: true, message: _t('auth.success.profile_updated', 'Profile updated') };
  },

  /* ---- Get current session ---- */
  async getSession() {
    if (_authConfigured()) {
      const { data } = await _getClient().auth.getSession();
      return data.session;
    }
    const s = _localGetSession();
    return (s?.type === 'email_session' || s?.type === 'phone_session') ? s : null;
  },

  /* ---- Get current user (with profile) ---- */
  async getUser() {
    if (_authConfigured()) {
      const { data } = await _getClient().auth.getUser();
      if (!data.user) return null;
      // Fetch profile
      const { data: profile } = await _getClient()
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .maybeSingle();
      return { ...data.user, ...profile };
    }
    return _localGetUser();
  },

  /* ---- Check admin access ---- */
  isAdmin() {
    return sessionStorage.getItem(_LS_ADMIN) === '1';
  },

  /* ---- Auth guard: redirect if not logged in ---- */
  async requireAuth(redirectTo = '/pages/login.html') {
    const session = await this.getSession();
    if (!session) {
      window.location.href = redirectTo + '?next=' + encodeURIComponent(window.location.pathname);
      return false;
    }
    return true;
  },

  /* ---- Auth guard: redirect if not admin ---- */
  requireAdmin(redirectTo = '../admin/login.html') {
    if (!this.isAdmin()) {
      window.location.href = redirectTo;
      return false;
    }
    return true;
  },

  /* ---- Subscribe to auth state changes ---- */
  onAuthChange(callback) {
    if (_authConfigured()) {
      _getClient().auth.onAuthStateChange((event, session) => {
        callback(event, session?.user || null);
      });
    }
    // Expose for local fallback polling
    this._onChange = callback;
  },

  /* ---- Handle OAuth callback (call on page load of callback page) ---- */
  async handleCallback() {
    if (_authConfigured()) {
      const { data, error } = await _getClient().auth.getSession();
      if (error) return { ok: false, error: this._mapError(error) };
      if (data.session) {
        this._notifyChange(data.session.user);
        return { ok: true, user: data.session.user };
      }
    }
    return { ok: false };
  },

  /* ---- Internal: map Supabase error codes to user-friendly messages ---- */
  _mapError(error) {
    const msg = (error?.message || '').toLowerCase();
    if (msg.includes('invalid') && (msg.includes('password') || msg.includes('credential') || msg.includes('email'))) {
      return _t('auth.error.invalid_credentials');
    }
    if (msg.includes('already registered') || msg.includes('already been registered') || msg.includes('unique')) {
      return _t('auth.error.email_taken');
    }
    if (msg.includes('password') && (msg.includes('weak') || msg.includes('short') || msg.includes('6'))) {
      return _t('auth.error.weak_password');
    }
    if (msg.includes('phone') || msg.includes('sms')) {
      return _t('auth.error.invalid_phone');
    }
    if (msg.includes('token expired') || msg.includes('otp expired')) {
      return _t('auth.error.otp_expired');
    }
    if (msg.includes('token') || msg.includes('otp') || msg.includes('invalid otp')) {
      return _t('auth.error.otp_invalid');
    }
    console.error('[AuthService] Supabase error:', error);
    return _t('auth.error.generic');
  },

  /* ---- Internal: notify listeners ---- */
  _notifyChange(user) {
    if (typeof this._onChange === 'function') this._onChange('CHANGE', user);
  },

  /* ---- Local fallback: sign-up ---- */
  _localSignUp(email, password, meta) {
    const users = this._localUsers();
    if (users.find(u => u.email === email)) {
      return { ok: false, error: _t('auth.error.email_taken') };
    }
    if (!password || password.length < 6) {
      return { ok: false, error: _t('auth.error.weak_password') };
    }
    const user = {
      id:        'local-' + Date.now(),
      email,
      firstName: meta.firstName || meta.nameEn || '',
      lastName:  meta.lastName  || meta.nameAr || '',
      // keep legacy fields populated for getUser() display
      nameEn:    meta.firstName ? (meta.firstName + (meta.lastName ? ' ' + meta.lastName : '')) : (meta.nameEn || ''),
      nameAr:    meta.lastName  || meta.nameAr || '',
      lang:      meta.lang   || 'ar',
      role:      'customer',
      createdAt: new Date().toISOString(),
    };
    users.push({ ...user, password }); // demo only — never do this in production
    this._saveLocalUsers(users);
    _localSetSession({ user, type: 'email_session' });
    _localSetUser(user);
    this._notifyChange(user);
    return { ok: true, user };
  },

  /* ---- Local fallback: sign-in ---- */
  _localSignIn(email, password) {
    const users = this._localUsers();
    const user  = users.find(u => u.email === email && u.password === password);
    if (!user) return { ok: false, error: _t('auth.error.invalid_credentials') };
    const { password: _, ...safeUser } = user;
    _localSetSession({ user: safeUser, type: 'email_session' });
    _localSetUser(safeUser);
    this._notifyChange(safeUser);
    return { ok: true, user: safeUser };
  },

  _localUsers() {
    try { return JSON.parse(localStorage.getItem('b3d_local_users') || '[]'); } catch (_) { return []; }
  },
  _saveLocalUsers(users) {
    try { localStorage.setItem('b3d_local_users', JSON.stringify(users)); } catch (_) {}
  },
};

/* Expose globally */
if (typeof window !== 'undefined') {
  window.AuthService = AuthService;
}

/* ---- On page load: handle OAuth callback if present ---- */
(async () => {
  const url = new URL(window.location.href);
  if (url.searchParams.get('auth') === 'callback') {
    await AuthService.handleCallback();
  }
})();
