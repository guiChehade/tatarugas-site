import { Nav } from "@/components/Nav";
import { HeroSection } from "@/components/HeroSection";
import { ManifestoSection } from "@/components/ManifestoSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { PrivacySection } from "@/components/PrivacySection";
import { DownloadSection } from "@/components/DownloadSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <HeroSection />

        {/* Divider */}
        <div className="max-w-5xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-bg-border to-transparent" />
        </div>

        <ManifestoSection />

        <div className="max-w-5xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-bg-border to-transparent" />
        </div>

        <FeaturesSection />

        <div className="max-w-5xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-bg-border to-transparent" />
        </div>

        <PrivacySection />

        <div className="max-w-5xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-bg-border to-transparent" />
        </div>

        <DownloadSection />
      </main>
      <Footer />
    </>
  );
}
