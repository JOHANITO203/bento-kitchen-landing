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
  icon: React.ReactNode;
}

const CategoryItem = ({ labelKey, descKey, image, delay, icon }: CategoryItemProps) => {
  const { t } = useLang();
  const label = t[labelKey] || labelKey;
  const desc = t[descKey] || descKey;

  return (
    <Link to={`/category/${labelKey}`} className="block w-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay, ease: [0.2, 0, 0, 1] }}
        className="group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-secondary p-4 sm:p-8 shadow-bento transition-all duration-300 bento-ease hover:shadow-bento-hover hover:-translate-y-1 flex flex-col justify-between min-h-[150px] sm:min-h-[220px] cursor-pointer w-full"
      >
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300 rounded-3xl z-[5]" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-primary">{icon}</span>
            <h3 className="text-base sm:text-xl font-display font-semibold text-foreground">{label}</h3>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground font-body leading-relaxed max-w-[55%] sm:max-w-[60%]">{desc}</p>
        </div>

        <div className="relative z-10 mt-4 flex items-center gap-2">
          <span className="text-sm font-medium text-primary font-body">{t.discover}</span>
          <ArrowRight className="w-4 h-4 text-primary transition-transform duration-300 bento-ease group-hover:translate-x-1" strokeWidth={1.5} />
        </div>

        <img
          src={image}
          alt={label}
          className="absolute right-1 sm:right-4 bottom-1 sm:bottom-2 w-24 sm:w-36 h-24 sm:h-36 object-contain drop-shadow-2xl transition-transform duration-500 bento-ease group-hover:scale-110 group-hover:-translate-y-1"
        />
      </motion.div>
    </Link>
  );
};

const categories = [
  { labelKey: "popular", descKey: "popularDesc", image: populairesImg, icon: <Star className="w-5 h-5" strokeWidth={1.5} /> },
  { labelKey: "grillades", descKey: "grilladesDesc", image: grilladesImg, icon: <Flame className="w-5 h-5" strokeWidth={1.5} /> },
  { labelKey: "traditionalDishes", descKey: "traditionalDesc", image: traditionnelsImg, icon: <UtensilsCrossed className="w-5 h-5" strokeWidth={1.5} /> },
  { labelKey: "streetFood", descKey: "streetFoodDesc", image: streetfoodImg, icon: <Sandwich className="w-5 h-5" strokeWidth={1.5} /> },
  { labelKey: "drinks", descKey: "drinksDesc", image: boissonsImg, icon: <GlassWater className="w-5 h-5" strokeWidth={1.5} /> },
  { labelKey: "desserts", descKey: "dessertsDesc", image: dessertsImg, icon: <Cake className="w-5 h-5" strokeWidth={1.5} /> },
  { labelKey: "combo", descKey: "comboDesc", image: comboImg, icon: <Package className="w-5 h-5" strokeWidth={1.5} /> },
];

const CategoryGrid = () => {
  const { t } = useLang();

  return (
    <div className="col-span-full flex flex-col gap-4">
      <h2 className="text-xl font-display font-semibold text-foreground mt-2">{t.categories}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {categories.map((cat, i) => (
          <CategoryItem key={cat.labelKey} {...cat} delay={0.1 + i * 0.05} />
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
