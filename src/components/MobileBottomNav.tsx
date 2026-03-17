import { Link, useLocation } from "react-router-dom";
import { Home, UtensilsCrossed, Percent, User, ShoppingBag } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";

const MobileBottomNav = () => {
  const { t } = useLang();
  const { totalItems } = useCart();
  const { pathname } = useLocation();

  const links = [
    { to: "/", icon: Home, label: t.menu === "Меню" ? "Главная" : "Home" },
    { to: "/menu", icon: UtensilsCrossed, label: t.menu },
    { to: "/offers", icon: Percent, label: t.offers },
    { to: "/cart", icon: ShoppingBag, label: t.cart, badge: totalItems },
    { to: "/account", icon: User, label: t.account },
  ];

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/90 backdrop-blur-xl border-t border-border/50 safe-area-bottom">
      <div className="flex items-center justify-around py-1.5 px-2">
        {links.map((link) => {
          const active = isActive(link.to);
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`relative flex flex-col items-center gap-0.5 py-1.5 px-2 rounded-xl transition-colors min-w-[3.5rem] ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {active && (
                <motion.div
                  layoutId="bottom-nav-active"
                  className="absolute inset-0 bg-primary/10 rounded-xl"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <div className="relative z-10">
                <link.icon className="w-5 h-5" strokeWidth={active ? 2 : 1.5} />
                {link.badge && link.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[9px] font-bold flex items-center justify-center">
                    {link.badge}
                  </span>
                )}
              </div>
              <span className="relative z-10 text-[10px] font-medium font-body leading-tight">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
