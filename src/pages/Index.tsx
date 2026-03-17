import BentoHero from "@/components/BentoHero";
import BentoLiveTracker from "@/components/BentoLiveTracker";
import BentoStats from "@/components/BentoStats";
import CategoryGrid from "@/components/CategoryGrid";
import BentoFlashOffer from "@/components/BentoFlashOffer";
import BentoFilters from "@/components/BentoFilters";
import AboutSection from "@/components/AboutSection";
import PageLayout from "@/components/PageLayout";

const Index = () => {
  return (
    <PageLayout>
      <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-4 md:gap-5">
        <BentoHero />
        <BentoLiveTracker />
        <BentoStats />
        <CategoryGrid />
        <BentoFlashOffer />
        <BentoFilters />
        <AboutSection />
      </div>
    </PageLayout>
  );
};

export default Index;
