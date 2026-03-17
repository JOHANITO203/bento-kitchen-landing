import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import pastaImg from "@/assets/pasta.png";
import pokeImg from "@/assets/poke.png";

const dishes = [
  { name: "Pasta Truffe Noire", price: "18,90", image: pastaImg },
  { name: "Poke Saumon Premium", price: "16,50", image: pokeImg },
  { name: "Pasta Truffe Noire", price: "18,90", image: pastaImg },
];

const BentoFlashOffer = () => {
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
            -20%
          </span>
          <h3 className="mt-3 text-xl md:text-2xl font-display font-semibold text-foreground">
            Sélection Italienne
          </h3>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-primary cursor-pointer">
          <span className="font-body">Tout voir</span>
          <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 -mb-2 scrollbar-none">
        {dishes.map((dish, i) => (
          <div
            key={i}
            className="shrink-0 w-48 rounded-xl bg-background p-3 shadow-bento transition-all duration-300 bento-ease hover:shadow-bento-hover cursor-pointer"
          >
            <div className="aspect-square rounded-lg overflow-hidden bg-secondary mb-3 flex items-center justify-center">
              <img src={dish.image} alt={dish.name} className="w-full h-full object-contain" />
            </div>
            <p className="text-sm font-medium text-foreground font-body truncate">{dish.name}</p>
            <p className="text-sm font-semibold text-primary tabular-nums mt-1">{dish.price} €</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default BentoFlashOffer;
