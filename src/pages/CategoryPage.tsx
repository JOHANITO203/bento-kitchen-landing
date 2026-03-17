import { useParams, Link, Navigate } from "react-router-dom";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { categoriesConfig } from "@/data/categoriesConfig";
import { dishes, type CategoryKey } from "@/data/menuData";
import DishCard from "@/components/DishCard";
import PageLayout from "@/components/PageLayout";

const CategoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useLang();

  const category = categoriesConfig.find((c) => c.key === id);
  const categoryDishes = useMemo(
    () => dishes.filter((d) => d.category === (id as CategoryKey)),
    [id]
  );

  if (!category) return <Navigate to="/categories" replace />;

  // Find next/prev categories for navigation
  const currentIndex = categoriesConfig.findIndex((c) => c.key === id);
  const prevCat = currentIndex > 0 ? categoriesConfig[currentIndex - 1] : null;
  const nextCat = currentIndex < categoriesConfig.length - 1 ? categoriesConfig[currentIndex + 1] : null;

  return (
    <PageLayout backTo="/categories" mainClassName="">
      {/* Hero banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-[300px] md:h-[400px] overflow-hidden"
      >
        <img
          src={category.heroImage}
          alt={t[category.labelKey]}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />

        <div className="relative z-10 container h-full flex flex-col justify-end pb-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Link to="/categories" className="text-xs text-muted-foreground hover:text-foreground transition-colors font-body">
                {t.categories}
              </Link>
              <span className="text-muted-foreground">/</span>
            </div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-primary">{category.icon}</span>
              <h1 className="text-4xl md:text-5xl font-graffiti text-foreground">{t[category.labelKey]}</h1>
            </div>
            <p className="text-base text-muted-foreground font-body max-w-lg">{t[category.descKey]}</p>
            <span className="inline-block mt-3 text-sm text-muted-foreground font-body">
              {categoryDishes.length} {t.dishesCount}
            </span>
          </motion.div>
        </div>
      </motion.div>

      {/* Dishes grid */}
      <main className="container py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {categoryDishes.map((dish, i) => (
            <DishCard key={dish.id} dish={dish} index={i} />
          ))}
        </div>

        {categoryDishes.length === 0 && (
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground font-body">{t.noResults}</p>
          </div>
        )}

        {/* Category navigation */}
        <div className="flex items-center justify-between mt-12 pt-6 border-t border-border/30">
          {prevCat ? (
            <Link
              to={`/category/${prevCat.key}`}
              className="group flex items-center gap-3 rounded-2xl bg-secondary px-5 py-3 transition-all duration-300 bento-ease hover:bg-secondary/80"
            >
              <ArrowLeft className="w-4 h-4 text-muted-foreground transition-transform duration-300 group-hover:-translate-x-1" strokeWidth={1.5} />
              <div>
                <span className="text-xs text-muted-foreground font-body block">{t.prevCategory}</span>
                <span className="text-sm font-display text-foreground">{t[prevCat.labelKey]}</span>
              </div>
            </Link>
          ) : <div />}

          {nextCat ? (
            <Link
              to={`/category/${nextCat.key}`}
              className="group flex items-center gap-3 rounded-2xl bg-secondary px-5 py-3 transition-all duration-300 bento-ease hover:bg-secondary/80 text-right"
            >
              <div>
                <span className="text-xs text-muted-foreground font-body block">{t.nextCategory}</span>
                <span className="text-sm font-display text-foreground">{t[nextCat.labelKey]}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
            </Link>
          ) : <div />}
        </div>
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
};

export default CategoryPage;
