import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { categoriesConfig } from "@/data/categoriesConfig";
import { dishes } from "@/data/menuData";
import PageLayout from "@/components/PageLayout";

const CategoriesPage = () => {
  const { t } = useLang();

  return (
    <PageLayout backTo="/">
      <div>
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-graffiti text-foreground">{t.categoriesPageTitle}</h1>
          <p className="text-sm text-muted-foreground font-body mt-1">{t.categoriesPageSubtitle}</p>
        </motion.div>

        {/* Categories grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categoriesConfig.map((cat, i) => {
            const dishCount = dishes.filter((d) => d.category === cat.key).length;
            return (
              <motion.div
                key={cat.key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.2, 0, 0, 1] }}
              >
                <Link
                  to={`/category/${cat.key}`}
                  className="group relative block overflow-hidden rounded-3xl shadow-bento transition-all duration-300 bento-ease hover:shadow-bento-hover hover:-translate-y-1 min-h-[280px]"
                >
                  {/* Hero background */}
                  <img
                    src={cat.heroImage}
                    alt={t[cat.labelKey]}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 bento-ease group-hover:scale-105"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

                  {/* Content */}
                  <div className="relative z-10 flex flex-col justify-end h-full p-6 min-h-[280px]">
                    {/* Thumbnail floating */}
                    <img
                      src={cat.thumbnail}
                      alt=""
                      className="absolute top-4 right-4 w-20 h-20 object-contain drop-shadow-2xl transition-transform duration-500 bento-ease group-hover:scale-110 group-hover:-translate-y-1"
                    />

                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-primary">{cat.icon}</span>
                      <h3 className="text-2xl font-display font-semibold text-foreground">{t[cat.labelKey]}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground font-body mb-4 max-w-[75%]">{t[cat.descKey]}</p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground font-body">
                        {dishCount} {t.dishesCount}
                      </span>
                      <div className="flex items-center gap-2 text-primary">
                        <span className="text-sm font-medium font-body">{t.discover}</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 bento-ease group-hover:translate-x-1" strokeWidth={1.5} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </PageLayout>
  );
};

export default CategoriesPage;
