import { SiteHeader } from "@/components/landing/site-header";
import { Hero } from "@/components/landing/hero";
import { EmailVerifierSection } from "@/components/landing/email-verifier-section";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <EmailVerifierSection />
      </main>
    </div>
  );
}