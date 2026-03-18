import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, MapPin, Phone, MessageSquare, Truck, Store, ChevronRight, CheckCircle2 } from "lucide-react";
import { z } from "zod";
import woodBg from "@/assets/wood-bg.jpg";
import { useLang } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import PageLayout from "@/components/PageLayout";

type DeliveryMode = "delivery" | "pickup";


const deliverySchema = z.object({
  address: z.string().trim().min(5, "min5").max(200),
  phone: z.string().trim().min(7, "min7").max(20),
  comment: z.string().trim().max(500).optional(),
});

const CartPage = () => {
  const { t, lang } = useLang();
  const { items, updateQuantity, removeItem, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();

  const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>("delivery");
  
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [orderPlaced, setOrderPlaced] = useState(false);

  const deliveryFee = deliveryMode === "delivery" ? 200 : 0;
  const grandTotal = totalPrice + deliveryFee;

  const handleOrder = () => {
    const newErrors: Record<string, string> = {};

    if (deliveryMode === "delivery") {
      const result = deliverySchema.safeParse({ address, phone, comment });
      if (!result.success) {
        result.error.errors.forEach((e) => {
          if (e.path[0]) newErrors[e.path[0] as string] = e.message;
        });
      }
    } else {
      if (phone.trim().length < 7) newErrors.phone = "min7";
    }

    if (!selectedSlot) newErrors.slot = "required";
    if (items.length === 0) return;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center" style={{ backgroundImage: `url(${woodBg})`, backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-3xl bg-secondary p-10 shadow-bento text-center max-w-md mx-4"
        >
          <CheckCircle2 className="w-16 h-16 text-accent mx-auto mb-4" strokeWidth={1.5} />
          <h2 className="text-2xl font-graffiti text-foreground mb-2">{t.orderConfirmed}</h2>
          <p className="text-sm text-muted-foreground font-body mb-6">{t.orderConfirmedDesc}</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
          >
            {t.backToHome}
            <ChevronRight className="w-4 h-4" strokeWidth={2} />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <PageLayout backNav hideCart mainClassName="container py-6 md:py-10 max-w-2xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <h1 className="text-3xl md:text-4xl font-graffiti text-foreground">{t.myCart}</h1>
          <p className="text-sm text-muted-foreground font-body mt-1">
            {totalItems > 0 ? `${totalItems} ${t.itemsInCart}` : t.emptyCart}
          </p>
        </motion.div>

        {/* ===== CART ITEMS ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-3xl bg-secondary p-5 shadow-bento mb-5"
        >
          <AnimatePresence mode="popLayout">
            {items.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-12 text-muted-foreground gap-3"
              >
                <ShoppingBag className="w-14 h-14" strokeWidth={1} />
                <p className="text-sm font-body">{t.emptyCart}</p>
                <Link
                  to="/menu"
                  className="mt-2 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
                >
                  {t.viewMenu}
                  <ChevronRight className="w-4 h-4" strokeWidth={2} />
                </Link>
              </motion.div>
            ) : (
              items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
                  className="flex items-center gap-3 rounded-2xl bg-background p-3 mb-3 last:mb-0"
                >
                  <div className="w-16 h-16 rounded-xl bg-secondary flex items-center justify-center overflow-hidden shrink-0">
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
                      className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" strokeWidth={1.5} />
                    </button>
                    <span className="text-sm font-semibold tabular-nums w-6 text-center font-body">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" strokeWidth={1.5} />
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors ml-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>

        {items.length > 0 && (
          <>
            {/* ===== DELIVERY MODE ===== */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-3xl bg-secondary p-5 shadow-bento mb-5"
            >
              <h3 className="text-sm font-display font-semibold text-foreground mb-4">{t.deliveryMode}</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setDeliveryMode("delivery")}
                  className={`flex flex-col items-center gap-2 rounded-2xl p-4 transition-all duration-300 bento-ease ${
                    deliveryMode === "delivery"
                      ? "bg-primary text-primary-foreground shadow-bento"
                      : "bg-background text-foreground hover:bg-background/80"
                  }`}
                >
                  <Truck className="w-6 h-6" strokeWidth={1.5} />
                  <span className="text-sm font-medium font-body">{t.deliveryOption}</span>
                  <span className="text-xs opacity-70 font-body">200 {t.currency}</span>
                </button>
                <button
                  onClick={() => setDeliveryMode("pickup")}
                  className={`flex flex-col items-center gap-2 rounded-2xl p-4 transition-all duration-300 bento-ease ${
                    deliveryMode === "pickup"
                      ? "bg-primary text-primary-foreground shadow-bento"
                      : "bg-background text-foreground hover:bg-background/80"
                  }`}
                >
                  <Store className="w-6 h-6" strokeWidth={1.5} />
                  <span className="text-sm font-medium font-body">{t.pickupOption}</span>
                  <span className="text-xs opacity-70 font-body">{t.free}</span>
                </button>
              </div>
            </motion.div>


            {/* ===== DELIVERY FORM ===== */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="rounded-3xl bg-secondary p-5 shadow-bento mb-5"
            >
              <h3 className="text-sm font-display font-semibold text-foreground mb-4">
                {deliveryMode === "delivery" ? t.deliveryInfo : t.contactInfo}
              </h3>

              <div className="space-y-3">
                {deliveryMode === "delivery" && (
                  <div>
                    <label className="flex items-center gap-2 text-xs text-muted-foreground font-body mb-1.5">
                      <MapPin className="w-3.5 h-3.5" strokeWidth={1.5} />
                      {t.deliveryAddress}
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder={t.addressPlaceholder}
                      maxLength={200}
                      className={`w-full rounded-xl bg-background px-4 py-3 text-sm text-foreground font-body placeholder:text-muted-foreground/50 outline-none transition-all duration-200 border-2 ${
                        errors.address ? "border-destructive" : "border-transparent focus:border-primary/30"
                      }`}
                    />
                    {errors.address && <p className="text-xs text-destructive font-body mt-1">{t.addressError}</p>}
                  </div>
                )}

                <div>
                  <label className="flex items-center gap-2 text-xs text-muted-foreground font-body mb-1.5">
                    <Phone className="w-3.5 h-3.5" strokeWidth={1.5} />
                    {t.phoneLabel}
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t.phonePlaceholder}
                    maxLength={20}
                    className={`w-full rounded-xl bg-background px-4 py-3 text-sm text-foreground font-body placeholder:text-muted-foreground/50 outline-none transition-all duration-200 border-2 ${
                      errors.phone ? "border-destructive" : "border-transparent focus:border-primary/30"
                    }`}
                  />
                  {errors.phone && <p className="text-xs text-destructive font-body mt-1">{t.phoneError}</p>}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-xs text-muted-foreground font-body mb-1.5">
                    <MessageSquare className="w-3.5 h-3.5" strokeWidth={1.5} />
                    {t.commentLabel}
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder={t.commentPlaceholder}
                    maxLength={500}
                    rows={3}
                    className="w-full rounded-xl bg-background px-4 py-3 text-sm text-foreground font-body placeholder:text-muted-foreground/50 outline-none transition-all duration-200 border-2 border-transparent focus:border-primary/30 resize-none"
                  />
                </div>
              </div>
            </motion.div>

            {/* ===== ORDER SUMMARY ===== */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="rounded-3xl bg-secondary p-5 shadow-bento mb-8"
            >
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm font-body">
                  <span className="text-muted-foreground">{t.subtotal}</span>
                  <span className="text-foreground tabular-nums">{totalPrice} {t.currency}</span>
                </div>
                <div className="flex justify-between text-sm font-body">
                  <span className="text-muted-foreground">{t.deliveryFee}</span>
                  <span className="text-foreground tabular-nums">
                    {deliveryFee > 0 ? `${deliveryFee} ${t.currency}` : t.free}
                  </span>
                </div>
                {selectedSlot && (
                  <div className="flex justify-between text-sm font-body">
                    <span className="text-muted-foreground">{t.timeSlot}</span>
                    <span className="text-foreground tabular-nums">{selectedSlot}</span>
                  </div>
                )}
                <div className="border-t border-border/30 pt-2 flex justify-between">
                  <span className="text-base font-display font-semibold text-foreground">{t.total}</span>
                  <span className="text-xl font-display font-bold text-primary tabular-nums">{grandTotal} {t.currency}</span>
                </div>
              </div>

              <button
                onClick={handleOrder}
                className="w-full rounded-2xl bg-primary px-6 py-4 text-sm font-bold text-primary-foreground uppercase tracking-wide transition-all duration-300 bento-ease hover:scale-[1.01] active:scale-[0.99] shadow-bento"
              >
                {t.placeOrder} — {grandTotal} {t.currency}
              </button>
            </motion.div>
          </>
        )}
    </PageLayout>
  );
};

export default CartPage;
