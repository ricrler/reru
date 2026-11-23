const HOLO_PRODUCT_COPY =
  "Email Verifier . Automated Warmup, Placement Tester, Template Creator, Email Accounts, Cold Outreach.";

export function ProductHoloText() {
  return (
    <div className="relative z-[1] flex min-h-0 w-full min-w-0 flex-1 flex-col justify-end bg-transparent">
      <p className="holo-product-gradient-text max-w-full">
        <span className="holo-product-gradient-text-fill">{HOLO_PRODUCT_COPY}</span>
        <span className="holo-product-gradient-text-grain" aria-hidden>
          {HOLO_PRODUCT_COPY}
        </span>
      </p>
    </div>
  );
}

export { HOLO_PRODUCT_COPY };