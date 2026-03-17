import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

import populairesImg from "@/assets/populaires.png";
import grilladesImg from "@/assets/grillades.png";
import jollofImg from "@/assets/jollof.png";
import streetfoodImg from "@/assets/streetfood.png";
import dessertsImg from "@/assets/desserts.png";
import boissonsImg from "@/assets/boissons.png";

interface CategoryItemProps {
  labelKey: string;
  image: string;
  delay: number;
  span?: string;
}

const CategoryItem = ({ labelKey, image, delay, span = "col-span-full sm:col-span-4" }: CategoryItemProps) => {
  const { t } = useLang();
  const label = t[labelKey] || labelKey;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.2, 0, 0, 1] }}
      className={`group relative overflow-visible rounded-3xl bg-secondary p-6 shadow-bento transition-all duration-300 bento-ease hover:shadow-bento-hover hover:-translate-y-1 ${span} flex flex-col justify-between min-h-[200px] cursor-pointer`}
    >
      <div className="relative z-10">
        <h3 className="text-lg font-display font-semibold text-foreground">{label}</h3>
      </div>

      <div className="relative z-10 mt-4 flex items-center gap-2">
        <span className="text-sm font-medium text-primary font-body">{t.discover}</span>
        <ArrowRight className="w-4 h-4 text-primary transition-transform duration-300 bento-ease group-hover:translate-x-1" strokeWidth={1.5} />
      </div>

      <img
        src={image}
        alt={label}
        className="absolute -right-2 -bottom-2 w-32 h-32 object-contain drop-shadow-2xl transition-transform duration-500 bento-ease group-hover:scale-105 group-hover:-translate-y-1"
      />
    </motion.div>
  );
};

const categories = [
  { labelKey: "popular", image: populairesImg, span: "col-span-full sm:col-span-4" },
  { labelKey: "grillades", image: grilladesImg, span: "col-span-full sm:col-span-4" },
  { labelKey: "africanDishes", image: jollofImg, span: "col-span-full sm:col-span-4" },
  { labelKey: "streetFood", image: streetfoodImg, span: "col-span-full sm:col-span-4" },
  { labelKey: "desserts", image: dessertsImg, span: "col-span-full sm:col-span-4" },
  { labelKey: "drinks", image: boissonsImg, span: "col-span-full sm:col-span-4" },
];

const CategoryGrid = () => {
  const { t } = useLang();

  return (
    <>
      <div className="col-span-full flex items-center justify-between mt-2">
        <h2 className="text-xl font-display font-semibold text-foreground">{t.categories}</h2>
      </div>
      {categories.map((cat, i) => (
        <CategoryItem key={cat.labelKey} {...cat} delay={0.1 + i * 0.05} />
      ))}
    </>
  );
};

export default CategoryGrid;
