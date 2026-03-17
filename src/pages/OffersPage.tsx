import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Clock, Flame, Sparkles, Timer, CalendarDays, Plus, Percent } from "lucide-react";
import woodBg from "@/assets/wood-bg.jpg";
import cutleryIcon from "@/assets/icon-cutlery-graffiti.png";
import heroOffers from "@/assets/heroes/hero-offers.jpg";
import graffitiSplash from "@/assets/graffiti-splash-1.png";
import { useLang } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { promoOfTheDay, discountedDishes, type PromoOffer } from "@/data/offersData";
import CartButton from "@/components/CartButton";
import CartDrawer from "@/components/CartDrawer";
import LanguageToggle from "@/components/LanguageToggle";
import Footer from "@/components/Footer";

const badgeConfig: Record<string, { icon: React.ReactNode; labelRu: string; labelEn: string; colorClass: string }> = {
  hot: { icon: <Flame className="w-3 h-3" />, labelRu: "Горячее", labelEn: "Hot", colorClass: "bg-destructive/20 text-destructive" },
  new: { icon: <Sparkles className="w-3 h-3" />, labelRu: "Новинка", labelEn: "New", colorClass: "bg-accent/20 text-accent" },
  limited: { icon: <Timer className="w-3 h-3" />, labelRu: "Ограничено", labelEn: "Limited", colorClass: "bg-primary/20 text-primary" },
  weekly: { icon: <CalendarDays className="w-3 h-3" />, labelRu: "Неделя", labelEn: "Weekly", colorClass: "bg-accent/20 text-accent" },
};

// Countdown hook
const useCountdown = (hours: number) => {
  const [secondsLeft, setSecondsLeft] = useState(hours * 3600);
  useEffect(() => {
    const interval = setInterval(() => setSecondsLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(interval);
  }, []);
  const h = Math.floor(secondsLeft / 3600);
  const m = Math.floor((secondsLeft % 3600) / 60);
  const s = secondsLeft % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return { h: pad(h), m: pad(m), s: pad(s), expired: secondsLeft <= 0 };
};

// Promo discount card
const PromoCard = ({ offer, index }: { offer: PromoOffer; index: number }) => {
  const { lang, t } = useLang();
  const { addItem } = useCart();
  const countdown = useCountdown(offer.endsInHours);
  const name = lang === "ru" ? offer.nameRu : offer.nameEn;
  const desc = lang === "ru" ? offer.descRu : offer.descEn;
  const badge = badgeConfig[offer.badge];
  const discount = Math.round((1 - offer.newPrice / offer.oldPrice) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.2, 0, 0, 1] }}
      className="group relative overflow-hidden rounded-3xl bg-secondary shadow-bento transition-all duration-300 bento-ease hover:shadow-bento-hover hover:-translate-y-1 flex flex-col"
    >
      {/* Discount badge top-right */}
      <div className="absolute top-3 right-3 z-20 rounded-xl bg-primary px-2.5 py-1 text-xs font-bold text-primary-foreground font-display">
        -{discount}%
      </div>

      {/* Image */}
      <div className="relative h-40 overflow-hidden bg-background/50 flex items-center justify-center p-4">
        <img
          src={offer.image}
          alt={name}
          className="w-32 h-32 object-contain drop-shadow-2xl transition-transform duration-500 bento-ease group-hover:scale-110"
        />
        {/* Badge */}
        <div className="absolute top-3 left-3">
          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${badge.colorClass}`}>
            {badge.icon}
            {lang === "ru" ? badge.labelRu : badge.labelEn}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 pt-3">
        <h3 className="text-base font-display font-semibold text-foreground leading-tight">{name}</h3>
        <p className="mt-1 text-xs text-muted-foreground font-body leading-relaxed line-clamp-2">{desc}</p>

        {/* Countdown */}
        <div className="mt-2 flex items-center gap-1.5">
          <Clock className="w-3 h-3 text-muted-foreground" strokeWidth={1.5} />
          <div className="flex items-center gap-0.5 text-xs font-display font-bold text-foreground tabular-nums">
            <span className="bg-muted rounded px-1 py-0.5">{countdown.h}</span>
            <span className="text-muted-foreground">:</span>
            <span className="bg-muted rounded px-1 py-0.5">{countdown.m}</span>
            <span className="text-muted-foreground">:</span>
            <span className="bg-muted rounded px-1 py-0.5">{countdown.s}</span>
          </div>
        </div>

        {/* Price + Add */}
        <div className="mt-auto pt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground line-through font-body tabular-nums">{offer.oldPrice} {t.currency}</span>
            <span className="text-lg font-display font-bold text-primary tabular-nums">{offer.newPrice} {t.currency}</span>
          </div>
          <button
            onClick={() => addItem({ id: offer.id, name, price: offer.newPrice, image: offer.image })}
            className="flex items-center gap-1.5 rounded-xl bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition-all duration-200 hover:bg-primary/90 active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" strokeWidth={2} />
            <span className="font-body">{t.addToCart}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const OffersPage = () => {
  const { lang, t } = useLang();
  const { addItem } = useCart();
  const promoCountdown = useCountdown(promoOfTheDay.endsInHours);
  const promoName = lang === "ru" ? promoOfTheDay.nameRu : promoOfTheDay.nameEn;
  const promoDesc = lang === "ru" ? promoOfTheDay.descRu : promoOfTheDay.descEn;
  const promoDiscount = Math.round((1 - promoOfTheDay.newPrice / promoOfTheDay.oldPrice) * 100);

  return (
    <div className="min-h-screen bg-background" style={{ backgroundImage: `url(${woodBg})`, backgroundSize: 'cover', backgroundAttachment: 'fixed', backgroundPosition: 'center' }}>
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

      <main className="container py-6 md:py-10">
        {/* Page title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-graffiti text-foreground">{t.offersPageTitle}</h1>
          <p className="text-sm text-muted-foreground font-body mt-1">{t.offersPageSubtitle}</p>
        </motion.div>

        {/* ===== PROMO DU JOUR — Hero Bento ===== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.2, 0, 0, 1] }}
          className="relative overflow-hidden rounded-3xl shadow-bento mb-8"
        >
          {/* Background hero image */}
          <img src={heroOffers} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />

          {/* Graffiti texture */}
          <img src={graffitiSplash} alt="" className="absolute -bottom-10 -right-10 w-64 h-64 object-contain opacity-10 pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 p-6 md:p-10">
            {/* Left content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-3">
                <Flame className="w-5 h-5 text-primary" strokeWidth={2} />
                <span className="text-xs font-bold uppercase tracking-widest text-primary font-display">
                  {t.promoOfTheDay}
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-graffiti text-foreground mb-2">{promoName}</h2>
              <p className="text-sm text-muted-foreground font-body max-w-md mb-4">{promoDesc}</p>

              {/* Price */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-lg text-muted-foreground line-through font-body tabular-nums">{promoOfTheDay.oldPrice} {t.currency}</span>
                <span className="text-3xl font-graffiti text-primary tabular-nums">{promoOfTheDay.newPrice} {t.currency}</span>
                <span className="rounded-xl bg-primary px-3 py-1 text-sm font-bold text-primary-foreground font-display">-{promoDiscount}%</span>
              </div>

              {/* Countdown */}
              <div className="flex items-center gap-2 mb-5">
                <Clock className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
                <span className="text-xs text-muted-foreground font-body mr-1">{t.endsIn}</span>
                <div className="flex items-center gap-1 font-display text-sm font-bold text-foreground tabular-nums">
                  <span className="bg-secondary rounded-lg px-2.5 py-1.5">{promoCountdown.h}</span>
                  <span className="text-muted-foreground">:</span>
                  <span className="bg-secondary rounded-lg px-2.5 py-1.5">{promoCountdown.m}</span>
                  <span className="text-muted-foreground">:</span>
                  <span className="bg-secondary rounded-lg px-2.5 py-1.5">{promoCountdown.s}</span>
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={() => addItem({ id: promoOfTheDay.id, name: promoName, price: promoOfTheDay.newPrice, image: promoOfTheDay.image })}
                className="flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground uppercase tracking-wide transition-all duration-200 hover:bg-primary/90 active:scale-[0.98] shadow-bento"
              >
                {t.orderNow}
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </button>
            </div>

            {/* Right image */}
            <motion.img
              src={promoOfTheDay.image}
              alt={promoName}
              className="w-48 h-48 md:w-56 md:h-56 object-contain drop-shadow-2xl shrink-0"
              animate={{ rotate: [0, 3, -3, 0], y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>

        {/* ===== DISCOUNTED DISHES GRID ===== */}
        <div className="flex items-center gap-2 mb-5">
          <Percent className="w-5 h-5 text-primary" strokeWidth={1.5} />
          <h2 className="text-xl font-display font-semibold text-foreground">{t.moreDeals}</h2>
          <span className="text-xs text-muted-foreground font-body ml-2">({discountedDishes.length})</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {discountedDishes.map((offer, i) => (
            <PromoCard key={offer.id} offer={offer} index={i} />
          ))}
        </div>
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
};

export default OffersPage;
