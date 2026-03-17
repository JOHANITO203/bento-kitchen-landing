import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useState } from "react";
import { useLang } from "@/context/LanguageContext";

const BentoFilters = () => {
  const { t } = useLang();
  const [selected, setSelected] = useState<string[]>([]);

  const filters = [
    { label: t.vegetarian, emoji: "🌿" },
    { label: t.fast, emoji: "⚡" },
    { label: t.starred, emoji: "⭐" },
    { label: t.healthyFilter, emoji: "🥗" },
    { label: t.newFilter, emoji: "✨" },
  ];

  const toggle = (label: string) => {
    setSelected((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: 0.15, ease: [0.2, 0, 0, 1] }}
      className="rounded-3xl bg-secondary p-6 shadow-bento transition-all duration-300 bento-ease hover:shadow-bento-hover hover:-translate-y-0.5 col-span-full sm:col-span-6 lg:col-span-4 min-h-[260px]"
    >
      <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {t.filters}
      </span>
      <h3 className="mt-2 text-xl font-display font-semibold text-foreground mb-5">
        {t.yourCravings}
      </h3>

      <div className="flex flex-col gap-2">
        {filters.map((f) => {
          const active = selected.includes(f.label);
          return (
            <button
              key={f.label}
              onClick={() => toggle(f.label)}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 bento-ease ${
                active
                  ? "bg-foreground text-background shadow-bento"
                  : "bg-background text-foreground hover:bg-background/80"
              }`}
            >
              <span>{f.emoji}</span>
              <span className="flex-1 text-left font-body">{f.label}</span>
              {active && <Check className="w-4 h-4" strokeWidth={1.5} />}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default BentoFilters;
