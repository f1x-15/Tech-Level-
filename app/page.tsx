import Hero from '@/components/home/Hero';
import TrustSection from '@/components/home/TrustSection';
import CategoryHighlights from '@/components/home/CategoryHighlights';
import CTASection from '@/components/home/CTASection';

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <TrustSection />
      <CategoryHighlights />
      <CTASection />
    </div>
  );
}