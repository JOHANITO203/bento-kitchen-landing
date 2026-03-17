import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useCart } from "@/context/CartContext";
import { useLang } from "@/context/LanguageContext";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CartDrawer = () => {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, totalItems, totalPrice } = useCart();
  const { t } = useLang();
  const navigate = useNavigate();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="flex flex-col bg-background border-border/50 w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-display text-xl">
            {t.myCart} <span className="text-muted-foreground text-base">({totalItems})</span>
          </SheetTitle>
          <SheetDescription className="font-body text-sm">
            {t.checkOrder}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          <AnimatePresence mode="popLayout">
            {items.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center h-full text-muted-foreground gap-3"
              >
                <ShoppingBag className="w-12 h-12" strokeWidth={1} />
                <p className="text-sm font-body">{t.emptyCart}</p>
              </motion.div>
            )}
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center gap-3 rounded-2xl bg-secondary p-3"
              >
                <div className="w-16 h-16 rounded-xl bg-background flex items-center justify-center overflow-hidden shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground font-body truncate">{item.name}</p>
                  <p className="text-sm font-semibold text-primary tabular-nums mt-0.5">
                    {item.price * item.quantity} {t.currency}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-7 h-7 rounded-lg bg-background flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </button>
                  <span className="text-sm font-semibold tabular-nums w-5 text-center font-body">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-7 h-7 rounded-lg bg-background flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors ml-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {items.length > 0 && (
          <div className="border-t border-border/50 pt-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground font-body">{t.total}</span>
              <span className="text-lg font-display font-semibold text-foreground tabular-nums">
                {totalPrice} {t.currency}
              </span>
            </div>
            <button className="w-full rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-300 bento-ease hover:scale-[1.01] active:scale-[0.99]">
              {t.order} — {totalPrice} {t.currency}
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
