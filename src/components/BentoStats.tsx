import { motion } from "framer-motion";
import { Clock, Star } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

const BentoStats = () => {
  const { t } = useLang();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: 0.15, ease: [0.2, 0, 0, 1] }}
      className="group rounded-3xl bg-secondary p-6 shadow-bento transition-all duration-300 bento-ease hover:shadow-bento-hover hover:-translate-y-0.5 col-span-full lg:col-span-4 flex flex-col justify-between min-h-[160px]"
    >
      <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {t.today}
      </span>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4" strokeWidth={1.5} />
            <span className="text-xs font-body">{t.avgTime}</span>
          </div>
          <p className="text-2xl font-display font-semibold text-foreground tabular-nums">22 {t.min}</p>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Star className="w-4 h-4" strokeWidth={1.5} />
            <span className="text-xs font-body">{t.satisfaction}</span>
          </div>
          <p className="text-2xl font-display font-semibold text-foreground tabular-nums">4.9<span className="text-base text-muted-foreground">/5</span></p>
        </div>
      </div>
    </motion.div>
  );
};

export default BentoStats;
