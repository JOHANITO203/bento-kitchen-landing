import woodBg from "@/assets/wood-bg.jpg";
import cutleryIcon from "@/assets/icon-cutlery-graffiti.png";
import BentoHero from "@/components/BentoHero";
import BentoLiveTracker from "@/components/BentoLiveTracker";
import BentoStats from "@/components/BentoStats";
import CategoryGrid from "@/components/CategoryGrid";
import BentoFlashOffer from "@/components/BentoFlashOffer";
import BentoFilters from "@/components/BentoFilters";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import CartButton from "@/components/CartButton";
import CartDrawer from "@/components/CartDrawer";
import LanguageToggle from "@/components/LanguageToggle";
import { useLang } from "@/context/LanguageContext";
import { User, Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Index = () => {
  const { t } = useLang();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background" style={{ backgroundImage: `url(${woodBg})`, backgroundSize: 'cover', backgroundAttachment: 'fixed', backgroundPosition: 'center' }}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="container flex items-center justify-between py-3">
          {/* Logo */}
          <h2 className="text-xl font-graffiti text-foreground shrink-0 flex items-center gap-2">
            <img src={cutleryIcon} alt="" className="w-7 h-7 object-contain invert" />
            солнце<span className="text-primary"> Африки</span>
          </h2>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#menu" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body">{t.menu}</a>
            <a href="#categories" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body">{t.categories}</a>
            <a href="#offers" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body">{t.offers}</a>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <button className="hidden sm:flex items-center gap-2 rounded-xl bg-secondary px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <User className="w-4 h-4" strokeWidth={1.5} />
              <span className="font-body">{t.account}</span>
            </button>
            <CartButton />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-secondary text-foreground"
            >
              <Menu className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl">
            <nav className="container flex flex-col gap-1 py-3">
              <a href="#menu" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body py-2">{t.menu}</a>
              <a href="#categories" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body py-2">{t.categories}</a>
              <a href="#offers" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body py-2">{t.offers}</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body py-2 flex items-center gap-2">
                <User className="w-4 h-4" strokeWidth={1.5} />
                {t.account}
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Bento Grid */}
      <main className="container py-6 md:py-10">
        <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-4 md:gap-5">
          {/* Hero + Tracker + Stats */}
          <BentoHero />
          <BentoLiveTracker />
          <BentoStats />

          {/* Category Navigation */}
          <CategoryGrid />

          {/* Flash Offer + Filters */}
          <BentoFlashOffer />
          <BentoFilters />

          {/* About Us */}
          <AboutSection />
        </div>
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
};

export default Index;
