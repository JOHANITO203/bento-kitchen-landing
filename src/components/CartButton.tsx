import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLang } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

const CartButton = () => {
  const { totalItems, setIsOpen } = useCart();
  const { t } = useLang();

  return (
    <button
      onClick={() => setIsOpen(true)}
      className="relative rounded-xl bg-foreground px-4 py-2 text-sm font-semibold text-background transition-all duration-300 bento-ease hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
    >
      <ShoppingBag className="w-4 h-4" strokeWidth={1.5} />
      <span className="hidden sm:inline">{t.cart}</span>
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.span
            key={totalItems}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center"
          >
            {totalItems}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
};

export default CartButton;
