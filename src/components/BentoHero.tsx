import { useState } from "react";
import { MapPin, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";

const BentoHero = () => {
  const [address, setAddress] = useState("");
  const { t } = useLang();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
      className="group relative overflow-hidden rounded-3xl bg-secondary p-8 md:p-12 shadow-bento transition-all duration-300 bento-ease hover:shadow-bento-hover hover:-translate-y-0.5 col-span-full lg:col-span-8 row-span-2 flex flex-col justify-between min-h-[340px]"
    >
      <div className="relative z-10">
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {t.premiumDelivery}
        </span>
        <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-foreground leading-[1.05] whitespace-pre-line">
          {t.heroTitle}
        </h1>
        <p className="mt-4 text-base text-muted-foreground font-body max-w-md">
          {t.heroSubtitle}
        </p>
      </div>

      <div className="relative z-10 mt-8 flex items-center gap-3 max-w-lg">
        <div className="flex-1 flex items-center gap-3 rounded-xl bg-background px-4 py-3 shadow-bento">
          <MapPin className="w-5 h-5 text-muted-foreground shrink-0" strokeWidth={1.5} />
          <input
            type="text"
            placeholder={t.addressPlaceholder}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none font-body"
          />
        </div>
        <button className="shrink-0 flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 bento-ease hover:scale-[1.02] active:scale-[0.98]">
          {t.find}
          <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
        </button>
      </div>
    </motion.div>
  );
};

export default BentoHero;
