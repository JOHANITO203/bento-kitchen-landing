import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, User, Menu, X } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import CartButton from "@/components/CartButton";
import LanguageToggle from "@/components/LanguageToggle";

const logoImg = "/favicon.png";

interface AppHeaderProps {
  /** Show back arrow instead of full nav */
  backTo?: string;
  /** Use navigate(-1) for back */
  backNav?: boolean;
  /** Extra actions to render before CartButton */
  actions?: React.ReactNode;
  /** Hide cart button */
  hideCart?: boolean;
}

const AppHeader = ({ backTo, backNav, actions, hideCart }: AppHeaderProps) => {
  const { t } = useLang();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isHome = !backTo && !backNav;
  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { to: "/menu", label: t.menu },
    { to: "/categories", label: t.categories },
    { to: "/offers", label: t.offers },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="container flex items-center justify-between py-2.5 sm:py-3">
        {/* Left side */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          {(backTo || backNav) && (
            backNav ? (
              <button
                onClick={() => navigate(-1)}
                className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-secondary text-foreground hover:bg-secondary/80 transition-colors shrink-0"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={1.5} />
              </button>
            ) : (
              <Link
                to={backTo!}
                className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-secondary text-foreground hover:bg-secondary/80 transition-colors shrink-0"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={1.5} />
              </Link>
            )
          )}

          <Link to="/" className="flex items-center gap-1.5 sm:gap-2 min-w-0 shrink-0">
            <img src={logoImg} alt="Солнце Африки" className="w-7 h-7 sm:w-8 sm:h-8 object-contain" />
            <h2 className="text-sm sm:text-lg md:text-xl font-graffiti text-foreground whitespace-nowrap truncate max-w-[120px] sm:max-w-none">
              солнце<span className="text-primary"> Африки</span>
            </h2>
          </Link>

          {/* Desktop Nav (home only) */}
          {isHome && (
            <nav className="hidden md:flex items-center gap-1 ml-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-sm px-3 py-1.5 rounded-lg font-body transition-colors ${
                    isActive(link.to)
                      ? "text-foreground bg-secondary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {actions}
          <LanguageToggle />
          {isHome && (
            <Link
              to="/account"
              className="hidden sm:flex items-center gap-2 rounded-xl bg-secondary px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <User className="w-4 h-4" strokeWidth={1.5} />
              <span className="font-body hidden lg:inline">{t.account}</span>
            </Link>
          )}
          {!hideCart && <CartButton />}
          {isHome && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-secondary text-foreground"
            >
              {mobileMenuOpen ? (
                <X className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={1.5} />
              ) : (
                <Menu className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={1.5} />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Mobile menu (home only) */}
      <AnimatePresence>
        {isHome && mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl overflow-hidden"
          >
            <nav className="container flex flex-col gap-1 py-3">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm font-body py-2.5 px-3 rounded-xl transition-colors ${
                    isActive(link.to)
                      ? "text-foreground bg-secondary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/account"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body py-2.5 px-3 rounded-xl flex items-center gap-2"
              >
                <User className="w-4 h-4" strokeWidth={1.5} />
                {t.account}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default AppHeader;
