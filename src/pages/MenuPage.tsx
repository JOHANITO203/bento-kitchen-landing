import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Flame, UtensilsCrossed, Sandwich, GlassWater, Cake, Package, SlidersHorizontal, X } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { dishes, categoryKeys, type CategoryKey, type Badge } from "@/data/menuData";
import DishCard from "@/components/DishCard";
import PageLayout from "@/components/PageLayout";

import filterVegetarian from "@/assets/filter-vegetarian.png";
import filterFast from "@/assets/filter-fast.png";
import filterStarred from "@/assets/filter-starred.png";
import filterHealthy from "@/assets/filter-healthy.png";
import filterNew from "@/assets/filter-new.png";

import filterVegetarian from "@/assets/filter-vegetarian.png";
import filterFast from "@/assets/filter-fast.png";
import filterStarred from "@/assets/filter-starred.png";
import filterHealthy from "@/assets/filter-healthy.png";
import filterNew from "@/assets/filter-new.png";

const categoryIcons: Record<CategoryKey, React.ReactNode> = {
  popular: <Star className="w-4 h-4" strokeWidth={1.5} />,
  grillades: <Flame className="w-4 h-4" strokeWidth={1.5} />,
  traditionalDishes: <UtensilsCrossed className="w-4 h-4" strokeWidth={1.5} />,
  streetFood: <Sandwich className="w-4 h-4" strokeWidth={1.5} />,
  drinks: <GlassWater className="w-4 h-4" strokeWidth={1.5} />,
  desserts: <Cake className="w-4 h-4" strokeWidth={1.5} />,
  combo: <Package className="w-4 h-4" strokeWidth={1.5} />,
};

interface FilterOption {
  key: Badge;
  icon: string;
  labelKey: string;
}

const filterOptions: FilterOption[] = [
  { key: "vegetarian", icon: filterVegetarian, labelKey: "vegetarian" },
  { key: "healthy", icon: filterHealthy, labelKey: "healthyFilter" },
  { key: "spicy", icon: filterStarred, labelKey: "starred" },
  { key: "popular", icon: filterFast, labelKey: "fast" },
  { key: "new", icon: filterNew, labelKey: "newFilter" },
];

const MenuPage = () => {
  const { t } = useLang();
  const [activeCategory, setActiveCategory] = useState<CategoryKey | "all">("all");
  const [activeFilters, setActiveFilters] = useState<Badge[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilter = (badge: Badge) => {
    setActiveFilters((prev) =>
      prev.includes(badge) ? prev.filter((b) => b !== badge) : [...prev, badge]
    );
  };

  const filteredDishes = useMemo(() => {
    let result = dishes;
    if (activeCategory !== "all") {
      result = result.filter((d) => d.category === activeCategory);
    }
    if (activeFilters.length > 0) {
      result = result.filter((d) => activeFilters.some((f) => d.badges.includes(f)));
    }
    return result;
  }, [activeCategory, activeFilters]);

  // Group by category for "all" view
  const groupedDishes = useMemo(() => {
    if (activeCategory !== "all") return null;
    const groups: Record<string, typeof dishes> = {};
    for (const dish of filteredDishes) {
      if (!groups[dish.category]) groups[dish.category] = [];
      groups[dish.category].push(dish);
    }
    return groups;
  }, [activeCategory, filteredDishes]);

  return (
    <div className="min-h-screen bg-background" style={{ backgroundImage: `url(${woodBg})`, backgroundSize: 'cover', backgroundAttachment: 'fixed', backgroundPosition: 'center' }}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="container flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center justify-center w-10 h-10 rounded-xl bg-secondary text-foreground hover:bg-secondary/80 transition-colors">
              <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
            </Link>
            <h2 className="text-xl font-graffiti text-foreground flex items-center gap-2">
              <img src={cutleryIcon} alt="Солнце Африки" className="w-8 h-8 object-contain" />
              солнце<span className="text-primary"> Африки</span>
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition-colors ${
                showFilters || activeFilters.length > 0
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" strokeWidth={1.5} />
              <span className="hidden sm:inline font-body">{t.filters}</span>
              {activeFilters.length > 0 && (
                <span className="ml-1 w-5 h-5 rounded-full bg-primary-foreground text-primary text-xs font-bold flex items-center justify-center">
                  {activeFilters.length}
                </span>
              )}
            </button>
            <CartButton />
          </div>
        </div>
      </header>

      <main className="container py-6 md:py-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <h1 className="text-3xl md:text-4xl font-graffiti text-foreground">{t.menuPageTitle}</h1>
          <p className="text-sm text-muted-foreground font-body mt-1">{t.menuPageSubtitle}</p>
        </motion.div>

        {/* Filters panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mb-6"
            >
              <div className="rounded-3xl bg-secondary p-5 shadow-bento">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-display font-semibold text-foreground">{t.yourCravings}</h3>
                  {activeFilters.length > 0 && (
                    <button
                      onClick={() => setActiveFilters([])}
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X className="w-3 h-3" />
                      <span className="font-body">{t.clearFilters}</span>
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.map((f) => {
                    const active = activeFilters.includes(f.key);
                    return (
                      <button
                        key={f.key}
                        onClick={() => toggleFilter(f.key)}
                        className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300 bento-ease ${
                          active
                            ? "bg-foreground text-background shadow-bento"
                            : "bg-background text-foreground hover:bg-background/80"
                        }`}
                      >
                        <img src={f.icon} alt="" className="w-5 h-5 object-contain" />
                        <span className="font-body">{t[f.labelKey]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
          <button
            onClick={() => setActiveCategory("all")}
            className={`shrink-0 flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-medium transition-all duration-300 bento-ease ${
              activeCategory === "all"
                ? "bg-primary text-primary-foreground shadow-bento"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            <span className="font-body">{t.allDishes}</span>
          </button>
          {categoryKeys.map((key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`shrink-0 flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-medium transition-all duration-300 bento-ease ${
                activeCategory === key
                  ? "bg-primary text-primary-foreground shadow-bento"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="text-current">{categoryIcons[key]}</span>
              <span className="font-body">{t[key]}</span>
            </button>
          ))}
        </div>

        {/* Dishes grid */}
        {activeCategory === "all" && groupedDishes ? (
          // Grouped view
          categoryKeys.map((catKey) => {
            const catDishes = groupedDishes[catKey];
            if (!catDishes || catDishes.length === 0) return null;
            return (
              <div key={catKey} className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-primary">{categoryIcons[catKey]}</span>
                  <h2 className="text-xl font-display font-semibold text-foreground">{t[catKey]}</h2>
                  <span className="text-xs text-muted-foreground font-body ml-2">({catDishes.length})</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {catDishes.map((dish, i) => (
                    <DishCard key={dish.id} dish={dish} index={i} />
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          // Filtered single category
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredDishes.map((dish, i) => (
                <DishCard key={dish.id} dish={dish} index={i} />
              ))}
            </AnimatePresence>
          </div>
        )}

        {filteredDishes.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-lg text-muted-foreground font-body">{t.noResults}</p>
          </motion.div>
        )}
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
};

export default MenuPage;
