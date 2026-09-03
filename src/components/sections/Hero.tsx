import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/animations/Reveal";
import { images } from "@/lib/images";
import { offices } from "@/lib/site";
import { stats } from "@/data/stats";

/**
 * Hero.
 *
 * The reference runs two equal 668px columns on a 100px gap: the argument on
 * the left, a tall portrait photograph on the right with a card stacked
 * beside it. Underneath the left column sits a quiet credential line and a
 * "Based in" strip of small square office thumbnails.
 *
 * That last element is why this composition suits Spright unusually well —
 * the reference uses it for two offices, and Spright has exactly two.
 *
 * Nothing is centred. The headline runs at 56px, weight 500, normal tracking;
 * the restraint is the point.
 */
export function Hero() {
  const headline = stats[0]!;

  return (
    <section className="gutter pb-section pt-8 lg:pt-14">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-[100px]">
        {/* Argument */}
        <div className="flex flex-col">
          <Reveal>
            <h1 className="text-display-xl text-balance text-ink">
              Specialized talent for technology that moves business forward.
            </h1>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-7 max-w-measure text-lede text-ink-500">
              Spright places engineers, architects, testers and delivery
              specialists inside client teams — on contract, contract-to-hire
              and permanent terms — across IT, engineering, media, education
              and corporate functions.
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <ButtonLink href="/contact">Talk to our experts</ButtonLink>
              <ButtonLink href="/services" variant="outline">
                Explore services
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 ease-editorial group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                  aria-hidden
                />
              </ButtonLink>
            </div>
          </Reveal>

          {/* Credential line and office strip, pinned to the bottom of the
              column the way the reference does. */}
          <div className="mt-14 lg:mt-auto lg:pt-20">
            <Reveal delay={0.24}>
              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <p className="text-meta text-ink-400">
                    Fifteen years of resource experience
                  </p>
                  <p className="mt-3 max-w-measure-sm text-body text-ink-500">
                    Specialised hiring across IT and functional industries,
                    built on sector knowledge rather than keyword matching.
                  </p>
                </div>

                <div>
                  <p className="text-meta text-ink-400">Based in</p>
                  <ul className="mt-3 flex items-center gap-3">
                    {offices.map((office) => {
                      const asset =
                        office.id === "india"
                          ? images.officeIndia
                          : images.officeUsa;
                      return (
                        <li key={office.id} className="flex items-center gap-3">
                          <span className="media-thumb block h-[70px] w-[70px] shrink-0">
                            <Image
                              src={asset.src}
                              alt={asset.alt}
                              fill
                              sizes="70px"
                              className="object-cover"
                            />
                          </span>
                          <span className="text-meta text-ink-500">
                            {office.city}
                            <br />
                            {office.country}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Photograph and proof card */}
        <div className="grid gap-5 sm:grid-cols-[1.05fr_0.95fr] lg:gap-6">
          <Reveal className="h-full">
            <div className="media h-full min-h-[380px] sm:min-h-[520px] lg:min-h-[694px]">
              <Image
                src={images.heroPrimary.src}
                alt={images.heroPrimary.alt}
                fill
                priority
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div className="flex flex-col gap-5 lg:gap-6">
            <Reveal delay={0.1}>
              <div className="rounded-card bg-mist p-7">
                <p className="text-body text-ink">
                  Hiring supported across ten-plus countries from two bases,
                  with delivery teams that already understand the technical
                  environment they are recruiting into.
                </p>

                <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-mist-line pt-6">
                  {stats.slice(0, 2).map((stat) => (
                    <div key={stat.label}>
                      <dt className="sr-only">{stat.label}</dt>
                      <dd className="tabular text-display-md text-ink">
                        {stat.value}
                        {stat.suffix}
                      </dd>
                      <p className="mt-1 text-meta text-ink-400">{stat.label}</p>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>

            <Reveal delay={0.18} className="flex-1">
              <div className="media h-full min-h-[220px]">
                <Image
                  src={images.heroSecondary.src}
                  alt={images.heroSecondary.alt}
                  fill
                  sizes="(min-width: 1024px) 22vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <p className="sr-only">
        {headline.value}
        {headline.suffix} {headline.label}
      </p>
    </section>
  );
}
