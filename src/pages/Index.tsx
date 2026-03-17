import BentoHero from "@/components/BentoHero";
import BentoLiveTracker from "@/components/BentoLiveTracker";
import BentoStats from "@/components/BentoStats";
import BentoCategory from "@/components/BentoCategory";
import BentoFlashOffer from "@/components/BentoFlashOffer";
import BentoFilters from "@/components/BentoFilters";
import CartButton from "@/components/CartButton";
import CartDrawer from "@/components/CartDrawer";
import LanguageToggle from "@/components/LanguageToggle";
import { useLang } from "@/context/LanguageContext";
import jollofImg from "@/assets/jollof.png";
import tagineImg from "@/assets/tagine.png";
import mafeImg from "@/assets/mafe.png";

const Index = () => {
  const { t } = useLang();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="container flex items-center justify-between py-4">
          <h2 className="text-xl font-display font-semibold text-foreground">
            солнце<span className="text-primary"> Африки</span>
          </h2>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body">{t.restaurants}</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body">{t.categories}</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body">{t.offers}</a>
          </nav>
          <div className="flex items-center gap-3">
            <LanguageToggle />
            <CartButton />
          </div>
        </div>
      </header>

      {/* Bento Grid */}
      <main className="container py-6 md:py-10">
        <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-4 md:gap-5">
          <BentoHero />
          <BentoLiveTracker />
          <BentoStats />

          <BentoCategory labelKey="popular" titleKey="jollofRice" image={jollofImg} delay={0.2} />
          <BentoCategory labelKey="trending" titleKey="tagine" image={tagineImg} delay={0.25} />
          <BentoCategory labelKey="healthy" titleKey="pokeBowl" image={mafeImg} delay={0.3} />

          <BentoFlashOffer />
          <BentoFilters />
        </div>
      </main>

      <CartDrawer />
    </div>
  );
};

export default Index;
