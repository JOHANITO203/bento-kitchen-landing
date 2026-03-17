import { motion } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLang } from "@/context/LanguageContext";
import tagineImg from "@/assets/tagine.png";
import jollofImg from "@/assets/jollof.png";
import mafeImg from "@/assets/mafe.png";

const BentoFlashOffer = () => {
  const { addItem } = useCart();
  const { t } = useLang();

  const dishes = [
    { id: "tagine-premium", name: t.taginePremiun, price: 1490, image: tagineImg },
    { id: "jollof-special", name: t.jollofSpecial, price: 1250, image: jollofImg },
    { id: "mafe-classic", name: t.mafeClassic, price: 1150, image: mafeImg },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.2, 0, 0, 1] }}
      className="group relative overflow-hidden rounded-3xl bg-secondary p-6 md:p-8 shadow-bento transition-all duration-300 bento-ease hover:shadow-bento-hover hover:-translate-y-0.5 col-span-full lg:col-span-8 min-h-[260px]"
    >
      <div className="flex items-start justify-between mb-6">
        <div>
          <span className="inline-block rounded-xl bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
            {t.discount}
          </span>
          <h3 className="mt-3 text-xl md:text-2xl font-display font-semibold text-foreground">
            {t.africanCuisine}
          </h3>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-primary cursor-pointer">
          <span className="font-body">{t.seeAll}</span>
          <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 -mb-2 scrollbar-none">
        {dishes.map((dish) => (
          <div
            key={dish.id}
            className="shrink-0 w-48 rounded-xl bg-background p-3 shadow-bento transition-all duration-300 bento-ease hover:shadow-bento-hover cursor-pointer"
          >
            <div className="aspect-square rounded-lg overflow-hidden bg-secondary mb-3 flex items-center justify-center">
              <img src={dish.image} alt={dish.name} className="w-full h-full object-contain" />
            </div>
            <p className="text-sm font-medium text-foreground font-body truncate">{dish.name}</p>
            <div className="flex items-center justify-between mt-1.5">
              <p className="text-sm font-semibold text-primary tabular-nums">{dish.price} {t.currency}</p>
              <button
                onClick={() => addItem({ id: dish.id, name: dish.name, price: dish.price, image: dish.image })}
                className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-primary-foreground transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <Plus className="w-4 h-4" strokeWidth={2} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default BentoFlashOffer;
