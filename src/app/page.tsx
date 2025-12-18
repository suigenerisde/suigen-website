import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { Problem } from '@/components/sections/Problem';
import { TwoColumns } from '@/components/sections/TwoColumns';
import { FokusAuditHighlight } from '@/components/sections/FokusAuditHighlight';
import { SocialProof } from '@/components/sections/SocialProof';
import { AboutPreview } from '@/components/sections/AboutPreview';
import { FAQ } from '@/components/sections/FAQ';
import { CTA } from '@/components/sections/CTA';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problem />
        <TwoColumns />
        <FokusAuditHighlight />
        <SocialProof />
        <AboutPreview />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
