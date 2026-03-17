import { motion } from "framer-motion";
import { ArrowRight, Star, Flame, UtensilsCrossed, Sandwich, GlassWater, Cake, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { useLang } from "@/context/LanguageContext";

import populairesImg from "@/assets/populaires.png";
import grilladesImg from "@/assets/grillades.png";
import traditionnelsImg from "@/assets/plats_traditionnels.png";
import streetfoodImg from "@/assets/streetfood.png";
import boissonsImg from "@/assets/boissons.png";
import dessertsImg from "@/assets/desserts.png";
import comboImg from "@/assets/combo.png";

interface CategoryItemProps {
  labelKey: string;
  descKey: string;
  image: string;
  delay: number;
  span?: string;
  icon: React.ReactNode;
}

const CategoryItem = ({ labelKey, descKey, image, delay, span = "col-span-full sm:col-span-4", icon }: CategoryItemProps) => {
  const { t } = useLang();
  const label = t[labelKey] || labelKey;
  const desc = t[descKey] || descKey;

  return (
    <Link to={`/category/${labelKey}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay, ease: [0.2, 0, 0, 1] }}
        className={`group relative overflow-hidden rounded-3xl bg-secondary p-8 shadow-bento transition-all duration-300 bento-ease hover:shadow-bento-hover hover:-translate-y-1 ${span} flex flex-col justify-between min-h-[260px] cursor-pointer`}
      >
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300 rounded-3xl z-[5]" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-primary">{icon}</span>
            <h3 className="text-lg font-display font-semibold text-foreground">{label}</h3>
          </div>
          <p className="text-xs text-muted-foreground font-body leading-relaxed max-w-[60%]">{desc}</p>
        </div>

        <div className="relative z-10 mt-4 flex items-center gap-2">
          <span className="text-sm font-medium text-primary font-body">{t.discover}</span>
          <ArrowRight className="w-4 h-4 text-primary transition-transform duration-300 bento-ease group-hover:translate-x-1" strokeWidth={1.5} />
        </div>

        <img
          src={image}
          alt={label}
          className="absolute -right-2 -bottom-2 w-32 h-32 object-contain drop-shadow-2xl transition-transform duration-500 bento-ease group-hover:scale-110 group-hover:-translate-y-1"
        />
      </motion.div>
    </Link>
  );
};

const categories = [
  { labelKey: "popular", descKey: "popularDesc", image: populairesImg, span: "col-span-full sm:col-span-4", icon: <Star className="w-4 h-4" strokeWidth={1.5} /> },
  { labelKey: "grillades", descKey: "grilladesDesc", image: grilladesImg, span: "col-span-full sm:col-span-4", icon: <Flame className="w-4 h-4" strokeWidth={1.5} /> },
  { labelKey: "traditionalDishes", descKey: "traditionalDesc", image: traditionnelsImg, span: "col-span-full sm:col-span-4", icon: <UtensilsCrossed className="w-4 h-4" strokeWidth={1.5} /> },
  { labelKey: "streetFood", descKey: "streetFoodDesc", image: streetfoodImg, span: "col-span-full sm:col-span-4", icon: <Sandwich className="w-4 h-4" strokeWidth={1.5} /> },
  { labelKey: "drinks", descKey: "drinksDesc", image: boissonsImg, span: "col-span-full sm:col-span-4", icon: <GlassWater className="w-4 h-4" strokeWidth={1.5} /> },
  { labelKey: "desserts", descKey: "dessertsDesc", image: dessertsImg, span: "col-span-full sm:col-span-4", icon: <Cake className="w-4 h-4" strokeWidth={1.5} /> },
  { labelKey: "combo", descKey: "comboDesc", image: comboImg, span: "col-span-full sm:col-span-4", icon: <Package className="w-4 h-4" strokeWidth={1.5} /> },
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
