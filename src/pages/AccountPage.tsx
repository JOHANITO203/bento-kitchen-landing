import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Lock, User, Phone, MapPin, LogOut, Save, Eye, EyeOff, ChevronRight } from "lucide-react";
import woodBg from "@/assets/wood-bg.jpg";
import cutleryIcon from "@/assets/icon-cutlery-graffiti.png";
import { useLang } from "@/context/LanguageContext";
import LanguageToggle from "@/components/LanguageToggle";
import CartButton from "@/components/CartButton";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";

type View = "login" | "register" | "profile";

const AccountPage = () => {
  const { t } = useLang();
  const [view, setView] = useState<View>("login");
  const [showPassword, setShowPassword] = useState(false);

  // Mock auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Login form
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register form
  const [regName, setRegName] = useState("");
  const [regSurname, setRegSurname] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");

  // Profile form
  const [profileName, setProfileName] = useState("Александр");
  const [profileSurname, setProfileSurname] = useState("Иванов");
  const [profilePhone, setProfilePhone] = useState("+7 (999) 123-45-67");
  const [profileAddress, setProfileAddress] = useState("Москва, ул. Примерная, 12, кв. 45");
  const [saved, setSaved] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setProfileName(regName || "Александр");
    setProfileSurname(regSurname || "Иванов");
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileName(regName);
    setProfileSurname(regSurname);
    setIsLoggedIn(true);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setView("login");
  };

  const currentView = isLoggedIn ? "profile" : view;

  return (
    <div className="min-h-screen bg-background" style={{ backgroundImage: `url(${woodBg})`, backgroundSize: "cover", backgroundAttachment: "fixed", backgroundPosition: "center" }}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="container flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center justify-center w-10 h-10 rounded-xl bg-secondary text-foreground hover:bg-secondary/80 transition-colors">
              <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
            </Link>
            <h2 className="text-xl font-graffiti text-foreground flex items-center gap-2">
              <img src={cutleryIcon} alt="" className="w-7 h-7 object-contain invert" />
              солнце<span className="text-primary"> Африки</span>
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <CartButton />
          </div>
        </div>
      </header>

      <main className="container py-6 md:py-10 max-w-md mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-6">
          <h1 className="text-3xl md:text-4xl font-graffiti text-foreground">{t.accountPageTitle}</h1>
          <p className="text-sm text-muted-foreground font-body mt-1">{t.accountPageSubtitle}</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* ===== LOGIN ===== */}
          {currentView === "login" && (
            <motion.div key="login" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }} className="rounded-3xl bg-secondary p-6 shadow-bento">
              <h2 className="text-lg font-display font-semibold text-foreground mb-5">{t.loginTitle}</h2>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="flex items-center gap-2 text-xs text-muted-foreground font-body mb-1.5">
                    <Mail className="w-3.5 h-3.5" strokeWidth={1.5} />
                    Email
                  </label>
                  <input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} placeholder="email@example.com" className="w-full rounded-xl bg-background px-4 py-3 text-sm text-foreground font-body placeholder:text-muted-foreground/50 outline-none border-2 border-transparent focus:border-primary/30 transition-all" />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-xs text-muted-foreground font-body mb-1.5">
                    <Lock className="w-3.5 h-3.5" strokeWidth={1.5} />
                    {t.password}
                  </label>
                  <div className="relative">
                    <input type={showPassword ? "text" : "password"} value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} placeholder="••••••••" className="w-full rounded-xl bg-background px-4 py-3 pr-11 text-sm text-foreground font-body placeholder:text-muted-foreground/50 outline-none border-2 border-transparent focus:border-primary/30 transition-all" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button type="submit" className="w-full rounded-2xl bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground uppercase tracking-wide transition-all duration-300 bento-ease hover:scale-[1.01] active:scale-[0.99] shadow-bento">
                  {t.loginBtn}
                </button>
              </form>

              {/* Google mock */}
              <div className="mt-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-xs text-muted-foreground font-body">{t.orContinueWith}</span>
                  <div className="flex-1 h-px bg-border" />
                </div>
                <button onClick={() => setIsLoggedIn(true)} className="w-full flex items-center justify-center gap-3 rounded-2xl bg-background px-6 py-3 text-sm font-medium text-foreground transition-all duration-300 bento-ease hover:bg-background/80 border border-border/50">
                  <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                  Google
                </button>
              </div>

              <p className="mt-5 text-center text-xs text-muted-foreground font-body">
                {t.noAccount}{" "}
                <button onClick={() => setView("register")} className="text-primary font-medium hover:underline">{t.registerLink}</button>
              </p>
            </motion.div>
          )}

          {/* ===== REGISTER ===== */}
          {currentView === "register" && (
            <motion.div key="register" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="rounded-3xl bg-secondary p-6 shadow-bento">
              <h2 className="text-lg font-display font-semibold text-foreground mb-5">{t.registerTitle}</h2>

              <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="flex items-center gap-2 text-xs text-muted-foreground font-body mb-1.5">
                      <User className="w-3.5 h-3.5" strokeWidth={1.5} />
                      {t.firstName}
                    </label>
                    <input type="text" value={regName} onChange={(e) => setRegName(e.target.value)} placeholder={t.firstName} className="w-full rounded-xl bg-background px-4 py-3 text-sm text-foreground font-body placeholder:text-muted-foreground/50 outline-none border-2 border-transparent focus:border-primary/30 transition-all" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground font-body mb-1.5 block">{t.lastName}</label>
                    <input type="text" value={regSurname} onChange={(e) => setRegSurname(e.target.value)} placeholder={t.lastName} className="w-full rounded-xl bg-background px-4 py-3 text-sm text-foreground font-body placeholder:text-muted-foreground/50 outline-none border-2 border-transparent focus:border-primary/30 transition-all" />
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-xs text-muted-foreground font-body mb-1.5"><Mail className="w-3.5 h-3.5" strokeWidth={1.5} /> Email</label>
                  <input type="email" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} placeholder="email@example.com" className="w-full rounded-xl bg-background px-4 py-3 text-sm text-foreground font-body placeholder:text-muted-foreground/50 outline-none border-2 border-transparent focus:border-primary/30 transition-all" />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-xs text-muted-foreground font-body mb-1.5"><Lock className="w-3.5 h-3.5" strokeWidth={1.5} /> {t.password}</label>
                  <input type="password" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} placeholder="••••••••" className="w-full rounded-xl bg-background px-4 py-3 text-sm text-foreground font-body placeholder:text-muted-foreground/50 outline-none border-2 border-transparent focus:border-primary/30 transition-all" />
                </div>

                <button type="submit" className="w-full rounded-2xl bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground uppercase tracking-wide transition-all duration-300 bento-ease hover:scale-[1.01] active:scale-[0.99] shadow-bento">
                  {t.registerBtn}
                </button>
              </form>

              <p className="mt-5 text-center text-xs text-muted-foreground font-body">
                {t.hasAccount}{" "}
                <button onClick={() => setView("login")} className="text-primary font-medium hover:underline">{t.loginLink}</button>
              </p>
            </motion.div>
          )}

          {/* ===== PROFILE ===== */}
          {currentView === "profile" && (
            <motion.div key="profile" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              {/* Avatar + Name */}
              <div className="rounded-3xl bg-secondary p-6 shadow-bento mb-5 flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center shrink-0">
                  <span className="text-2xl font-graffiti text-primary">{profileName[0]}{profileSurname[0]}</span>
                </div>
                <div>
                  <h2 className="text-lg font-display font-semibold text-foreground">{profileName} {profileSurname}</h2>
                  <p className="text-xs text-muted-foreground font-body">{loginEmail || regEmail || "user@example.com"}</p>
                </div>
              </div>

              {/* Edit profile */}
              <div className="rounded-3xl bg-secondary p-6 shadow-bento mb-5">
                <h3 className="text-sm font-display font-semibold text-foreground mb-4">{t.editProfile}</h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="flex items-center gap-2 text-xs text-muted-foreground font-body mb-1.5"><User className="w-3.5 h-3.5" strokeWidth={1.5} /> {t.firstName}</label>
                      <input type="text" value={profileName} onChange={(e) => setProfileName(e.target.value)} className="w-full rounded-xl bg-background px-4 py-3 text-sm text-foreground font-body outline-none border-2 border-transparent focus:border-primary/30 transition-all" />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground font-body mb-1.5 block">{t.lastName}</label>
                      <input type="text" value={profileSurname} onChange={(e) => setProfileSurname(e.target.value)} className="w-full rounded-xl bg-background px-4 py-3 text-sm text-foreground font-body outline-none border-2 border-transparent focus:border-primary/30 transition-all" />
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-xs text-muted-foreground font-body mb-1.5"><Phone className="w-3.5 h-3.5" strokeWidth={1.5} /> {t.phoneLabel}</label>
                    <input type="tel" value={profilePhone} onChange={(e) => setProfilePhone(e.target.value)} className="w-full rounded-xl bg-background px-4 py-3 text-sm text-foreground font-body outline-none border-2 border-transparent focus:border-primary/30 transition-all" />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-xs text-muted-foreground font-body mb-1.5"><MapPin className="w-3.5 h-3.5" strokeWidth={1.5} /> {t.defaultAddress}</label>
                    <input type="text" value={profileAddress} onChange={(e) => setProfileAddress(e.target.value)} className="w-full rounded-xl bg-background px-4 py-3 text-sm text-foreground font-body outline-none border-2 border-transparent focus:border-primary/30 transition-all" />
                  </div>

                  <button onClick={handleSave} className="w-full rounded-2xl bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground uppercase tracking-wide transition-all duration-300 bento-ease hover:scale-[1.01] active:scale-[0.99] shadow-bento flex items-center justify-center gap-2">
                    {saved ? <motion.span initial={{ scale: 0.8 }} animate={{ scale: 1 }}>{t.saved}</motion.span> : <><Save className="w-4 h-4" strokeWidth={2} /> {t.saveProfile}</>}
                  </button>
                </div>
              </div>

              {/* Quick links */}
              <div className="rounded-3xl bg-secondary p-4 shadow-bento mb-5 space-y-1">
                <Link to="/cart" className="flex items-center justify-between rounded-xl px-4 py-3 hover:bg-background/50 transition-colors">
                  <span className="text-sm font-body text-foreground">{t.myCart}</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </Link>
                <Link to="/offers" className="flex items-center justify-between rounded-xl px-4 py-3 hover:bg-background/50 transition-colors">
                  <span className="text-sm font-body text-foreground">{t.offers}</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </Link>
                <Link to="/menu" className="flex items-center justify-between rounded-xl px-4 py-3 hover:bg-background/50 transition-colors">
                  <span className="text-sm font-body text-foreground">{t.menu}</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </Link>
              </div>

              {/* Logout */}
              <button onClick={handleLogout} className="w-full rounded-2xl bg-secondary px-6 py-3.5 text-sm font-medium text-destructive transition-all duration-300 bento-ease hover:bg-destructive/10 shadow-bento flex items-center justify-center gap-2">
                <LogOut className="w-4 h-4" strokeWidth={1.5} />
                {t.logout}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
};

export default AccountPage;
