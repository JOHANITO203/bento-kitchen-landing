import { motion } from "framer-motion";
import { Clock, Flame, ArrowRight } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";
import jollofImg from "@/assets/jollof.png";
import graffitiSplash from "@/assets/graffiti-splash-1.png";

const BentoStats = () => {
  const { t } = useLang();
  const { addItem } = useCart();

  const [timeLeft, setTimeLeft] = useState({ h: 1, m: 47, s: 33 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        let { h, m, s } = prev;
        s -= 1;
        if (s < 0) { s = 59; m -= 1; }
        if (m < 0) { m = 59; h -= 1; }
        if (h < 0) return { h: 0, m: 0, s: 0 };
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: 0.15, ease: [0.2, 0, 0, 1] }}
      className="group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-primary to-primary/80 p-3 sm:p-6 shadow-bento transition-all duration-300 bento-ease hover:shadow-bento-hover hover:-translate-y-0.5 col-span-full lg:col-span-4 flex flex-col justify-between min-h-[140px] sm:min-h-[160px]"
    >
      {/* Graffiti texture overlay */}
      <img
        src={graffitiSplash}
        alt=""
        className="absolute -bottom-8 -left-8 w-56 h-56 object-contain opacity-20 pointer-events-none rotate-180"
      />

      {/* Badge */}
      <div className="flex items-center gap-2">
        <Flame className="w-4 h-4 text-primary-foreground" strokeWidth={2.5} />
        <span className="text-xs font-bold uppercase tracking-widest text-primary-foreground/80 font-display">
          {t.promoTag || "Акция дня"}
        </span>
      </div>

      {/* Content */}
      <div className="mt-3 flex items-end justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm text-primary-foreground/70 font-body line-through tabular-nums">
            1 250 {t.currency}
          </p>
          <p className="text-2xl font-graffiti text-primary-foreground tabular-nums">
            890 {t.currency}
          </p>
          <p className="text-xs text-primary-foreground/70 font-body mt-1 truncate">
            {t.jollofSpecial}
          </p>

          {/* Countdown */}
          <div className="flex items-center gap-1.5 mt-3">
            <Clock className="w-3.5 h-3.5 text-primary-foreground/60" strokeWidth={2} />
            <div className="flex items-center gap-1 font-display text-sm font-bold text-primary-foreground tabular-nums">
              <span className="bg-primary-foreground/20 rounded-md px-1.5 py-0.5">{pad(timeLeft.h)}</span>
              <span className="text-primary-foreground/50">:</span>
              <span className="bg-primary-foreground/20 rounded-md px-1.5 py-0.5">{pad(timeLeft.m)}</span>
              <span className="text-primary-foreground/50">:</span>
              <span className="bg-primary-foreground/20 rounded-md px-1.5 py-0.5">{pad(timeLeft.s)}</span>
            </div>
          </div>
        </div>

        <motion.img
          src={jollofImg}
          alt="Promo"
          className="w-20 h-20 object-contain drop-shadow-lg shrink-0"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* CTA */}
      <button
        onClick={() => addItem({ id: "promo-jollof", name: t.jollofSpecial, price: 890, image: jollofImg })}
        className="mt-3 flex items-center justify-center gap-2 w-full rounded-xl bg-primary-foreground/20 backdrop-blur-sm px-4 py-2.5 text-xs font-bold text-primary-foreground uppercase tracking-wide transition-all duration-200 hover:bg-primary-foreground/30 active:scale-[0.98]"
      >
        {t.orderNow || "Заказать"}
        <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
      </button>
    </motion.div>
  );
};

export default BentoStats;