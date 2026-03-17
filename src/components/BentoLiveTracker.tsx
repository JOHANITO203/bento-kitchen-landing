import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";

const BentoLiveTracker = () => {
  const { t } = useLang();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.2, 0, 0, 1] }}
      className="group relative overflow-hidden rounded-3xl bg-foreground p-6 shadow-bento transition-all duration-300 bento-ease hover:shadow-bento-hover hover:-translate-y-0.5 col-span-full lg:col-span-4 flex flex-col justify-between min-h-[160px]"
    >
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-accent animate-pulse-dot" />
        <span className="text-xs font-semibold uppercase tracking-widest text-background/60">
          {t.live}
        </span>
      </div>

      <div className="mt-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm text-background/60 font-body">{t.nextDelivery}</p>
            <p className="text-3xl font-display font-semibold text-background tabular-nums mt-1">
              12:04 <span className="text-lg text-background/40">{t.min}</span>
            </p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-xs text-background/40 font-body">{t.restaurantToYou}</span>
            <div className="w-24 h-1 rounded-full bg-background/10 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-accent"
                initial={{ width: "20%" }}
                animate={{ width: "65%" }}
                transition={{ duration: 3, ease: [0.2, 0, 0, 1], repeat: Infinity, repeatType: "reverse" }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BentoLiveTracker;
