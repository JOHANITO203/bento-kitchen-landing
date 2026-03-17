import { ArrowRight, UtensilsCrossed } from "lucide-react";
import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import graffitiSplash from "@/assets/graffiti-splash-1.png";
import graffitiTag from "@/assets/graffiti-tag.png";

const BentoHero = () => {
  const { t } = useLang();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.2, 0, 0, 1] }}
      className="group relative overflow-hidden rounded-3xl bg-secondary p-5 sm:p-8 md:p-12 shadow-bento transition-all duration-300 bento-ease hover:shadow-bento-hover hover:-translate-y-0.5 col-span-full lg:col-span-8 row-span-2 flex flex-col justify-between min-h-[280px] sm:min-h-[340px]"
    >
      {/* Graffiti splash texture */}
      <img
        src={graffitiSplash}
        alt=""
        className="absolute -top-10 -right-10 w-80 h-80 object-contain opacity-25 pointer-events-none rotate-12"
      />

      <div className="relative z-10">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          <UtensilsCrossed className="w-3.5 h-3.5" strokeWidth={1.5} />
          солнце Африки
        </span>
        <h1 className="mt-3 sm:mt-4 text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-graffiti text-foreground leading-[1.1] whitespace-pre-line">
          {t.heroTitle}
        </h1>
        <p className="mt-4 text-base text-muted-foreground font-body max-w-md">
          {t.heroSubtitle}
        </p>
      </div>

      <div className="relative z-10 mt-5 sm:mt-8 flex flex-wrap items-center gap-2 sm:gap-3">
        <button className="flex items-center gap-2 rounded-xl bg-primary px-4 sm:px-6 py-2.5 sm:py-3.5 text-xs sm:text-sm font-bold text-primary-foreground transition-all duration-300 bento-ease hover:scale-[1.02] active:scale-[0.98] uppercase tracking-wide">
          {t.orderNow}
          <ArrowRight className="w-4 h-4" strokeWidth={2} />
        </button>
        <button className="flex items-center gap-2 rounded-xl bg-background px-4 sm:px-6 py-2.5 sm:py-3.5 text-xs sm:text-sm font-bold text-foreground shadow-bento transition-all duration-300 bento-ease hover:shadow-bento-hover hover:scale-[1.02] active:scale-[0.98] uppercase tracking-wide">
          {t.viewMenu}
        </button>
      </div>

      {/* Graffiti tag signature */}
      <motion.img
        src={graffitiTag}
        alt=""
        className="absolute bottom-3 right-4 w-32 h-auto opacity-25 pointer-events-none"
        animate={{ rotate: [-2, 2, -2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
};

export default BentoHero;