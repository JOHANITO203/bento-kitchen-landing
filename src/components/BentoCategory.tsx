import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

interface BentoCategoryProps {
  labelKey: string;
  titleKey: string;
  image: string;
  delay?: number;
}

const BentoCategory = ({ labelKey, titleKey, image, delay = 0 }: BentoCategoryProps) => {
  const { t } = useLang();
  const label = t[labelKey] || labelKey;
  const title = t[titleKey] || titleKey;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.2, 0, 0, 1] }}
      className="group relative overflow-visible rounded-3xl bg-secondary p-6 shadow-neu-raised transition-all duration-300 bento-ease hover:shadow-bento-hover hover:-translate-y-1 col-span-full sm:col-span-6 lg:col-span-4 flex flex-col justify-between min-h-[260px] cursor-pointer border border-transparent hover:border-primary/10"
    >
      <div className="relative z-10">
        <span className="text-xs font-bold uppercase tracking-widest text-primary">
          {label}
        </span>
        <h3 className="mt-2 text-2xl font-display text-foreground">
          {title}
        </h3>
      </div>

      <div className="relative z-10 mt-8 flex items-center gap-2">
        <span className="text-sm font-bold text-primary font-body uppercase tracking-wide">{t.discover}</span>
        <ArrowRight className="w-4 h-4 text-primary transition-transform duration-300 bento-ease group-hover:translate-x-1" strokeWidth={2.5} />
      </div>

      <img
        src={image}
        alt={title}
        className="absolute -right-4 -bottom-4 w-40 h-40 object-contain drop-shadow-2xl transition-transform duration-500 bento-ease group-hover:scale-110 group-hover:-translate-y-2 group-hover:rotate-3"
      />
    </motion.div>
  );
};

export default BentoCategory;