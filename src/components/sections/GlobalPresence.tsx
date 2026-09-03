import { ArrowUpRight, Phone } from "lucide-react";
import { Section, Container } from "@/components/ui/Section";
import { Reveal } from "@/components/animations/Reveal";
import { offices, site } from "@/lib/site";

/**
 * Two bases, one arc between them.
 *
 * A live embedded map would cost several hundred kilobytes and tell a visitor
 * nothing they cannot read from the address, so the graphic here is a plain
 * inline SVG: a longitude field with the two offices marked on it.
 */
function PresenceGraphic() {
  return (
    <svg
      viewBox="0 0 800 260"
      className="h-auto w-full"
      role="img"
      aria-label="Abstract diagram showing Spright's two offices, in Tampa and Pune, connected across the globe"
    >
      <defs>
        <linearGradient id="arc-fade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8AA3FF" stopOpacity="0.15" />
          <stop offset="50%" stopColor="#8AA3FF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#8AA3FF" stopOpacity="0.15" />
        </linearGradient>
      </defs>

      {/* Longitude field */}
      <g stroke="currentColor" strokeOpacity="0.14">
        {Array.from({ length: 17 }, (_, i) => (
          <line key={i} x1={i * 50} y1="0" x2={i * 50} y2="260" />
        ))}
        {Array.from({ length: 6 }, (_, i) => (
          <line key={`h-${i}`} x1="0" y1={i * 52} x2="800" y2={i * 52} />
        ))}
      </g>

      {/* Great-circle arc between the two offices */}
      <path
        d="M170 168 Q400 20 630 128"
        fill="none"
        stroke="url(#arc-fade)"
        strokeWidth="1.5"
        strokeDasharray="5 7"
      />

      {/* Tampa */}
      <g>
        <circle cx="170" cy="168" r="5" fill="#8AA3FF" />
        <circle
          cx="170"
          cy="168"
          r="5"
          fill="#8AA3FF"
          className="origin-[170px_168px] animate-marker-pulse"
        />
        <text x="170" y="196" textAnchor="middle" fill="currentColor" fontSize="13" opacity="0.75">
          Tampa
        </text>
      </g>

      {/* Pune */}
      <g>
        <circle cx="630" cy="128" r="5" fill="#8AA3FF" />
        <circle
          cx="630"
          cy="128"
          r="5"
          fill="#8AA3FF"
          className="origin-[630px_128px] animate-marker-pulse [animation-delay:1.2s]"
        />
        <text x="630" y="156" textAnchor="middle" fill="currentColor" fontSize="13" opacity="0.75">
          Pune
        </text>
      </g>
    </svg>
  );
}

export function GlobalPresence() {
  return (
    <Section tone="ink" aria-labelledby="presence-heading">
      <Container>
        <div className="grid gap-x-16 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="flex items-center gap-3 text-meta font-medium text-ink-200">
                <span aria-hidden="true" className="h-px w-8 bg-cobalt-bright" />
                Where we are
              </p>
              <h2
                id="presence-heading"
                className="mt-8 text-display-md font-medium text-balance"
              >
                Two offices, ten hours apart, one hiring process.
              </h2>
              <p className="mt-6 max-w-measure text-body text-ink-200">
                Between Pune and Tampa we cover Indian and US working hours,
                supporting organisations hiring in more than ten countries.
              </p>
            </Reveal>
          </div>

          <div className="text-ink-200 lg:col-span-6 lg:col-start-7">
            <PresenceGraphic />
          </div>
        </div>

        <div className="mt-16 grid gap-px bg-white/10 sm:grid-cols-2 lg:mt-20">
          {offices.map((office, index) => (
            <Reveal key={office.id} delay={index * 0.08} className="bg-ink-900 p-8 lg:p-12">
              <h3 className="text-display-sm font-medium tracking-[-0.025em]">
                {office.country}
              </h3>
              <address className="mt-6 not-italic text-body leading-relaxed text-ink-200">
                {office.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
                <span className="block">
                  {office.city} — {office.postalCode}
                </span>
              </address>

              <div className="mt-8 flex flex-col gap-3">
                <a
                  href={office.phoneHref}
                  className="inline-flex items-center gap-2.5 text-[0.9375rem] font-medium transition-colors hover:text-cobalt-bright"
                >
                  <Phone aria-hidden="true" className="size-4 text-cobalt-bright" />
                  {office.phoneLabel}
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2 text-[0.9375rem] font-medium transition-colors hover:text-cobalt-bright"
                >
                  {site.email}
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
