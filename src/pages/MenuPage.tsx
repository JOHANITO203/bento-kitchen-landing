import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Flame, UtensilsCrossed, Sandwich, GlassWater, Cake, Package, SlidersHorizontal, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { dishes, categoryKeys, type CategoryKey, type Badge } from "@/data/menuData";
import DishCard from "@/components/DishCard";
import PageLayout from "@/components/PageLayout";

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

interface CategoryTabsProps {
  activeCategory: CategoryKey | "all";
  setActiveCategory: (cat: CategoryKey | "all") => void;
  categoryIcons: Record<CategoryKey, React.ReactNode>;
  filterButton: React.ReactNode;
  t: Record<string, string>;
}

const CategoryTabs = ({ activeCategory, setActiveCategory, categoryIcons, filterButton, t }: CategoryTabsProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  // Auto-scroll active tab into view
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const activeBtn = el.querySelector("[data-active='true']") as HTMLElement;
    if (activeBtn) {
      const left = activeBtn.offsetLeft - el.offsetLeft - 40;
      el.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
    }
  }, [activeCategory]);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -200 : 200, behavior: "smooth" });
  };

  const allTabs: { key: CategoryKey | "all"; icon?: React.ReactNode; label: string }[] = [
    { key: "all", label: t.allDishes },
    ...categoryKeys.map((key) => ({ key, icon: categoryIcons[key], label: t[key] || key })),
  ];

  return (
    <div className="relative mb-6 group/tabs">
      {/* Scroll fade edges */}
      {canScrollLeft && (
        <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-background/80 to-transparent z-10 pointer-events-none rounded-l-2xl" />
      )}
      {canScrollRight && (
        <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-background/80 to-transparent z-10 pointer-events-none rounded-r-2xl" />
      )}

      {/* Scroll arrows (desktop) */}
      <AnimatePresence>
        {canScrollLeft && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => scroll("left")}
            className="hidden md:flex absolute -left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-secondary shadow-elevated items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <ChevronLeft className="w-4 h-4" strokeWidth={2} />
          </motion.button>
        )}
        {canScrollRight && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => scroll("right")}
            className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-secondary shadow-elevated items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <ChevronRight className="w-4 h-4" strokeWidth={2} />
          </motion.button>
        )}
      </AnimatePresence>

      <div
        ref={scrollRef}
        className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-hide items-center snap-x snap-mandatory scroll-smooth px-1"
      >
        {/* Mobile filter button */}
        <div className="md:hidden shrink-0 snap-start">{filterButton}</div>

        {allTabs.map((tab) => {
          const isActive = activeCategory === tab.key;
          return (
            <button
              key={tab.key}
              data-active={isActive}
              onClick={() => setActiveCategory(tab.key)}
              className="relative shrink-0 flex items-center gap-1.5 sm:gap-2 rounded-2xl px-3.5 sm:px-4 py-2 sm:py-2.5 text-sm font-medium transition-colors duration-200 snap-start"
            >
              {isActive && (
                <motion.div
                  layoutId="category-pill"
                  className="absolute inset-0 rounded-2xl bg-primary shadow-glow-primary"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              {tab.icon && (
                <span className={`relative z-10 transition-colors duration-200 ${isActive ? "text-primary-foreground" : "text-muted-foreground"}`}>
                  {tab.icon}
                </span>
              )}
              <span className={`relative z-10 font-body whitespace-nowrap transition-colors duration-200 ${
                isActive ? "text-primary-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
              }`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

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

  const filterButton = (
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
  );

  return (
    <PageLayout backTo="/" headerActions={<span className="hidden md:flex">{filterButton}</span>}>
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
        <CategoryTabs
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          categoryIcons={categoryIcons}
          filterButton={filterButton}
          t={t}
        />

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
    </PageLayout>
  );
};

export default MenuPage;
