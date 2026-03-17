import BentoHero from "@/components/BentoHero";
import BentoLiveTracker from "@/components/BentoLiveTracker";
import BentoStats from "@/components/BentoStats";
import BentoCategory from "@/components/BentoCategory";
import BentoFlashOffer from "@/components/BentoFlashOffer";
import BentoFilters from "@/components/BentoFilters";
import sushiImg from "@/assets/sushi.png";
import burgerImg from "@/assets/burger.png";
import pokeImg from "@/assets/poke.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="container flex items-center justify-between py-4">
          <h2 className="text-xl font-display font-semibold text-foreground">
            vite<span className="text-primary">.</span>
          </h2>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body">Restaurants</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body">Catégories</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body">Offres</a>
          </nav>
          <button className="rounded-xl bg-foreground px-4 py-2 text-sm font-semibold text-background transition-all duration-300 bento-ease hover:scale-[1.02] active:scale-[0.98]">
            Connexion
          </button>
        </div>
      </header>

      {/* Bento Grid */}
      <main className="container py-6 md:py-10">
        <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-4 md:gap-5">
          {/* Row 1-2: Hero + Live Tracker + Stats */}
          <BentoHero />
          <BentoLiveTracker />
          <BentoStats />

          {/* Row 3: Categories */}
          <BentoCategory label="Populaire" title="Sushis d'Exception" image={sushiImg} delay={0.2} />
          <BentoCategory label="Tendance" title="Burgers Gourmet" image={burgerImg} delay={0.25} />
          <BentoCategory label="Healthy" title="Poké Bowls" image={pokeImg} delay={0.3} />

          {/* Row 4: Flash Offer + Filters */}
          <BentoFlashOffer />
          <BentoFilters />
        </div>
      </main>
    </div>
  );
};

export default Index;
