import woodBg from "@/assets/wood-bg.jpg";
import AppHeader from "@/components/AppHeader";
import MobileBottomNav from "@/components/MobileBottomNav";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";

interface PageLayoutProps {
  children: React.ReactNode;
  /** Show back arrow to this path */
  backTo?: string;
  /** Use navigate(-1) for back */
  backNav?: boolean;
  /** Extra header actions */
  headerActions?: React.ReactNode;
  /** Hide cart button in header */
  hideCart?: boolean;
  /** Custom main className */
  mainClassName?: string;
  /** Hide footer */
  hideFooter?: boolean;
}

const PageLayout = ({
  children,
  backTo,
  backNav,
  headerActions,
  hideCart,
  mainClassName = "container py-4 sm:py-6 md:py-10",
  hideFooter,
}: PageLayoutProps) => {
  return (
    <div
      className="min-h-screen bg-background pb-16 md:pb-0"
      style={{
        backgroundImage: `url(${woodBg})`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
      }}
    >
      <AppHeader
        backTo={backTo}
        backNav={backNav}
        actions={headerActions}
        hideCart={hideCart}
      />

      <main className={mainClassName}>{children}</main>

      {!hideFooter && <Footer />}
      <CartDrawer />
      <MobileBottomNav />
    </div>
  );
};

export default PageLayout;
