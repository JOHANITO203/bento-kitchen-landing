import { useLang } from "@/context/LanguageContext";
import { Heart, Globe, Utensils } from "lucide-react";

const AboutSection = () => {
  const { t } = useLang();

  const values = [
    { icon: Globe, titleKey: "aboutValue1Title", descKey: "aboutValue1Desc" },
    { icon: Heart, titleKey: "aboutValue2Title", descKey: "aboutValue2Desc" },
    { icon: Utensils, titleKey: "aboutValue3Title", descKey: "aboutValue3Desc" },
  ];

  return (
    <motion.section
      id="about"
      className="col-span-full"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
    >
      <div className="rounded-3xl bg-card border border-border/50 p-8 md:p-12 overflow-hidden relative">
        {/* Decorative accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-medium tracking-widest uppercase text-primary mb-3">
              {t.aboutTag}
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              {t.aboutTitle}
            </h2>
            <p className="text-muted-foreground font-body max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
              {t.aboutDesc}
            </p>
          </div>

          {/* Values grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map(({ icon: Icon, titleKey, descKey }) => (
              <div
                key={titleKey}
                className="rounded-2xl bg-secondary/50 border border-border/30 p-6 text-center hover:bg-secondary/80 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">
                  {t[titleKey]}
                </h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">
                  {t[descKey]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
