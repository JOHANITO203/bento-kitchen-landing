import { ArrowRight, UtensilsCrossed } from "lucide-react";
import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";

const BentoHero = () => {
  const { t } = useLang();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.2, 0, 0, 1] }}
      className="group relative overflow-hidden rounded-3xl bg-secondary p-8 md:p-12 shadow-bento transition-all duration-300 bento-ease hover:shadow-bento-hover hover:-translate-y-0.5 col-span-full lg:col-span-8 row-span-2 flex flex-col justify-between min-h-[340px]"
    >
      <div className="relative z-10">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          <UtensilsCrossed className="w-3.5 h-3.5" strokeWidth={1.5} />
          солнце Африки
        </span>
        <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-foreground leading-[1.05] whitespace-pre-line">
          {t.heroTitle}
        </h1>
        <p className="mt-4 text-base text-muted-foreground font-body max-w-md">
          {t.heroSubtitle}
        </p>
      </div>

      <div className="relative z-10 mt-8 flex items-center gap-3">
        <button className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-300 bento-ease hover:scale-[1.02] active:scale-[0.98]">
          {t.orderNow}
          <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
        </button>
        <button className="flex items-center gap-2 rounded-xl bg-background px-6 py-3.5 text-sm font-semibold text-foreground shadow-bento transition-all duration-300 bento-ease hover:shadow-bento-hover hover:scale-[1.02] active:scale-[0.98]">
          {t.viewMenu}
        </button>
      </div>
    </motion.div>
  );
};

export default BentoHero;
