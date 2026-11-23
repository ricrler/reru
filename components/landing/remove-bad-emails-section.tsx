import { EmailValidatorAnimation } from "@/components/landing/email-validator-animation";

export function RemoveBadEmailsSection() {
  return (
    <section
      id="validation"
      className="border-t border-white/10 bg-black px-5 py-16 sm:px-8 sm:py-20 md:px-10 md:py-24"
    >
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,1.05fr)] lg:items-center lg:gap-12 xl:gap-16">
        <header className="max-w-xl">
          <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-[2rem] md:leading-tight">
            Remove bad emails before you send.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/80 sm:text-lg">
            Invalid addresses raise your bounce rate and put your sender reputation at
            risk. Check your list before the first send.
          </p>
        </header>

        <EmailValidatorAnimation />
      </div>
    </section>
  );
}