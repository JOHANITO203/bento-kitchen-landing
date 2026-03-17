import { useLang } from "@/context/LanguageContext";
import { motion } from "framer-motion";

const LanguageToggle = () => {
  const { lang, setLang } = useLang();

  return (
    <div className="flex items-center rounded-xl bg-secondary p-1 gap-0.5">
      {(["ru", "en"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className="relative px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors duration-200"
        >
          {lang === l && (
            <motion.div
              layoutId="lang-pill"
              className="absolute inset-0 rounded-lg bg-foreground"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className={`relative z-10 ${lang === l ? "text-background" : "text-muted-foreground"}`}>
            {l === "ru" ? "RU" : "EN"}
          </span>
        </button>
      ))}
    </div>
  );
};

export default LanguageToggle;
