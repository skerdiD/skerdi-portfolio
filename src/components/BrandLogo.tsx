type BrandLogoProps = {
  compact?: boolean;
};

/** Shared wordmark; the same vector is used for the browser favicon. */
const BrandLogo = ({ compact = false }: BrandLogoProps) => (
  <span className="inline-flex items-center gap-2.5 whitespace-nowrap">
    <img
      src="/favicon.svg"
      alt=""
      aria-hidden="true"
      width={40}
      height={40}
      className="h-10 w-10 shrink-0 rounded-[9px] transition-shadow duration-200 group-hover:shadow-[0_0_16px_rgba(255,87,34,0.22)] motion-reduce:transition-none"
    />
    <span className={`${compact ? "hidden lg:inline" : "inline"} font-outfit text-lg font-semibold tracking-tight text-foreground`}>
      Skerdi Cacaj
    </span>
  </span>
);

export default BrandLogo;
