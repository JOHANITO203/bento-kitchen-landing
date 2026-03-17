import { useLang } from "@/context/LanguageContext";
import { MapPin, Phone, Mail, Clock, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const VKIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M21.547 7H16.86c-.115 0-.233.07-.233.186v0c0 .186.466 1.21.7 1.768.466 1.117.932 2.234 1.282 3.397.117.372.117.744.117 1.117 0 .93-.583 1.86-1.515 1.86-.7 0-1.282-.558-1.632-1.117-.466-.744-.816-1.582-1.166-2.42-.116-.28-.233-.558-.349-.838-.117-.186-.35-.372-.583-.372h0c-.233 0-.466.186-.583.372-.117.28-.117.558-.117.838v2.792c0 .558-.35.93-.816 1.024-.35.093-.7.093-1.05.093-1.748 0-3.38-.558-4.78-1.582C4.736 12.573 3.22 10.34 2.17 7.92c-.117-.28-.117-.558.116-.744C2.403 7.07 2.636 7 2.87 7h3.147c.466 0 .816.28.932.744.35.93.816 1.86 1.282 2.698.233.372.466.744.7 1.024.116.186.35.28.583.186.233-.093.35-.28.35-.558V8.396c0-.558-.117-1.024-.583-1.21-.233-.094-.233-.373 0-.466.35-.186.816-.28 1.282-.28h3.264c.466 0 .816.28.816.744v3.956c0 .186.117.372.35.372.116 0 .233-.093.35-.186.816-.93 1.398-2.048 1.864-3.212.117-.28.233-.558.35-.838.116-.28.35-.558.7-.558h3.264c.35 0 .7.186.816.558.117.28 0 .558-.116.838-.583 1.21-1.399 2.42-2.215 3.49-.233.28-.466.652-.466 1.024 0 .372.233.651.466.93.7.838 1.516 1.676 2.099 2.607.233.372.35.744.233 1.21-.117.372-.466.558-.816.558h-3.264c-.35 0-.7-.186-.932-.466-.583-.744-1.166-1.489-1.749-2.234-.233-.28-.466-.558-.816-.558-.35 0-.583.28-.583.651v1.768c0 .558-.35.838-.932.838h-1.515" />
  </svg>
);

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);

const Footer = () => {
  const { t } = useLang();

  const socialLinks = [
    { icon: VKIcon, label: "ВКонтакте", href: "#" },
    { icon: TelegramIcon, label: "Telegram", href: "#" },
    { icon: InstagramIcon, label: "Instagram", href: "#" },
  ];

  return (
    <motion.footer
      className="bg-foreground text-background mt-10"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
    >
      <div className="container py-12 md:py-16">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-display font-bold mb-3">
              солнце<span className="text-primary"> Африки</span>
            </h2>
            <p className="text-background/60 text-sm font-body leading-relaxed mb-6">
              {t.footerTagline}
            </p>
            {/* Social buttons */}
            <div className="flex gap-2">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-xl bg-background/10 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-display font-semibold text-sm uppercase tracking-widest mb-4 text-background/40">
              {t.footerNav}
            </h3>
            <ul className="space-y-3">
              {[
                { label: t.menu, href: "#menu" },
                { label: t.categories, href: "#categories" },
                { label: t.offers, href: "#offers" },
                { label: t.footerAbout, href: "#about" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="text-sm text-background/60 hover:text-background transition-colors font-body">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold text-sm uppercase tracking-widest mb-4 text-background/40">
              {t.footerContact}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-background/60 font-body">
                <Phone className="w-4 h-4 text-primary shrink-0" strokeWidth={1.5} />
                +7 (495) 123-45-67
              </li>
              <li className="flex items-center gap-2 text-sm text-background/60 font-body">
                <Mail className="w-4 h-4 text-primary shrink-0" strokeWidth={1.5} />
                info@solnce-afriki.ru
              </li>
              <li className="flex items-center gap-2 text-sm text-background/60 font-body">
                <MapPin className="w-4 h-4 text-primary shrink-0" strokeWidth={1.5} />
                {t.footerAddress}
              </li>
              <li className="flex items-center gap-2 text-sm text-background/60 font-body">
                <Clock className="w-4 h-4 text-primary shrink-0" strokeWidth={1.5} />
                {t.footerHours}
              </li>
            </ul>
          </div>

          {/* App / CTA */}
          <div>
            <h3 className="font-display font-semibold text-sm uppercase tracking-widest mb-4 text-background/40">
              {t.footerApp}
            </h3>
            <p className="text-sm text-background/60 font-body mb-4">
              {t.footerAppDesc}
            </p>
            {/* App Store style buttons */}
            <div className="flex flex-col gap-2">
              <a
                href="#"
                className="flex items-center gap-3 rounded-xl bg-background/10 hover:bg-background/20 transition-colors px-4 py-3"
              >
                <ExternalLink className="w-5 h-5 text-primary" strokeWidth={1.5} />
                <div>
                  <span className="block text-[10px] text-background/50 font-body leading-none">{t.footerDownload}</span>
                  <span className="block text-sm font-semibold font-display">RuStore</span>
                </div>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-xl bg-background/10 hover:bg-background/20 transition-colors px-4 py-3"
              >
                <ExternalLink className="w-5 h-5 text-primary" strokeWidth={1.5} />
                <div>
                  <span className="block text-[10px] text-background/50 font-body leading-none">{t.footerDownload}</span>
                  <span className="block text-sm font-semibold font-display">App Store</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-background/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-background/40 font-body">
              © 2025 солнце Африки. {t.footerRights}
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-xs text-background/40 hover:text-background/70 transition-colors font-body">
                {t.footerPrivacy}
              </a>
              <a href="#" className="text-xs text-background/40 hover:text-background/70 transition-colors font-body">
                {t.footerTerms}
              </a>
              <a href="#" className="text-xs text-background/40 hover:text-background/70 transition-colors font-body">
                {t.footerCookies}
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
