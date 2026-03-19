import { motion } from "framer-motion";
import { Plus, Clock, Flame, Leaf, Star, Sparkles, Heart } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import OptimizedImage from "@/components/OptimizedImage";
import type { Dish, Badge } from "@/data/menuData";

const badgeConfig: Record<Badge, { icon: React.ReactNode; colorClass: string }> = {
  popular: { icon: <Star className="w-3 h-3" />, colorClass: "bg-primary/20 text-primary" },
  new: { icon: <Sparkles className="w-3 h-3" />, colorClass: "bg-accent/20 text-accent" },
  spicy: { icon: <Flame className="w-3 h-3" />, colorClass: "bg-destructive/20 text-destructive" },
  vegetarian: { icon: <Leaf className="w-3 h-3" />, colorClass: "bg-accent/20 text-accent" },
  healthy: { icon: <Heart className="w-3 h-3" />, colorClass: "bg-accent/20 text-accent" },
};

const badgeLabels: Record<Badge, { ru: string; en: string }> = {
  popular: { ru: "Хит", en: "Hit" },
  new: { ru: "New", en: "New" },
  spicy: { ru: "Острое", en: "Spicy" },
  vegetarian: { ru: "Veggie", en: "Veggie" },
  healthy: { ru: "ЗОЖ", en: "Healthy" },
};

interface DishCardProps {
  dish: Dish;
  index: number;
}

const DishCard = ({ dish, index }: DishCardProps) => {
  const { lang, t } = useLang();
  const { addItem } = useCart();

  const name = lang === "ru" ? dish.nameRu : dish.nameEn;
  const desc = lang === "ru" ? dish.descRu : dish.descEn;

  const handleAdd = () => {
    addItem({ id: dish.id, name, price: dish.price, image: dish.image });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay: index * 0.04, ease: [0.2, 0, 0, 1] }}
      className="group relative overflow-hidden rounded-3xl bg-secondary shadow-bento transition-all duration-300 bento-ease hover:shadow-bento-hover hover:-translate-y-1 flex flex-col"
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-background/50 flex items-center justify-center p-4">
        <OptimizedImage
          src={dish.image}
          alt={name}
          className="w-36 h-36 object-contain drop-shadow-2xl transition-transform duration-500 bento-ease group-hover:scale-110"
        />
        {/* Badges overlay */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1">
          {dish.badges.map((badge) => {
            const cfg = badgeConfig[badge];
            const label = badgeLabels[badge][lang];
            return (
              <span
                key={badge}
                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${cfg.colorClass}`}
              >
                {cfg.icon}
                {label}
              </span>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 pt-3">
        <h3 className="text-base font-display font-semibold text-foreground leading-tight">{name}</h3>
        <p className="mt-1 text-xs text-muted-foreground font-body leading-relaxed line-clamp-2">{desc}</p>

        {/* Prep time */}
        <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="w-3 h-3" strokeWidth={1.5} />
          <span className="font-body">{dish.prepTime} {t.min}</span>
        </div>

        {/* Price + Add */}
        <div className="mt-auto pt-3 flex items-center justify-between">
          <span className="text-lg font-display font-bold text-foreground tabular-nums">
            {dish.price} {t.currency}
          </span>
          <button
            onClick={handleAdd}
            className="flex items-center gap-1.5 rounded-xl bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition-all duration-200 hover:bg-primary/90 active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" strokeWidth={2} />
            <span className="font-body">{t.addToCart}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default DishCard;
