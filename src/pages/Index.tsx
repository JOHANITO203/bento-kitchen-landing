import BentoHero from "@/components/BentoHero";
import BentoLiveTracker from "@/components/BentoLiveTracker";
import BentoStats from "@/components/BentoStats";
import CategoryGrid from "@/components/CategoryGrid";
import BentoFlashOffer from "@/components/BentoFlashOffer";
import BentoFilters from "@/components/BentoFilters";
import AboutSection from "@/components/AboutSection";
import AppHeader from "@/components/AppHeader";
import MobileBottomNav from "@/components/MobileBottomNav";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import woodBg from "@/assets/wood-bg.jpg";

const SnapSection = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <section
    className={`snap-section min-h-[100dvh] flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-6 ${className}`}
  >
    <div className="container mx-auto w-full max-w-7xl">{children}</div>
  </section>
);

const Index = () => {
  return (
    <div
      className="snap-container h-[100dvh] overflow-y-auto overflow-x-hidden w-full"
      style={{
        backgroundImage: `url(${woodBg})`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        scrollSnapType: "y mandatory",
      }}
    >
      <AppHeader />

      {/* Section 1: Hero + Image */}
      <SnapSection>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 md:gap-5">
          <BentoHero />
          <BentoLiveTracker />
        </div>
      </SnapSection>

      {/* Section 2: Promo + Flash offers */}
      <SnapSection>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 md:gap-5">
          <BentoFlashOffer />
          <BentoStats />
        </div>
      </SnapSection>

      {/* Section 3: Categories */}
      <SnapSection>
        <CategoryGrid />
      </SnapSection>

      {/* Section 4: Filters + About */}
      <SnapSection>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 md:gap-5">
          <div className="col-span-full lg:col-span-4">
            <BentoFilters />
          </div>
          <div className="col-span-full lg:col-span-8">
            <AboutSection />
          </div>
        </div>
      </SnapSection>

      {/* Section 5: Footer */}
      <section
        className="snap-section min-h-[50dvh] flex flex-col justify-end"
        style={{ scrollSnapAlign: "end" }}
      >
        <Footer />
      </section>

      <CartDrawer />
      <MobileBottomNav />
    </div>
  );
};

export default Index;
