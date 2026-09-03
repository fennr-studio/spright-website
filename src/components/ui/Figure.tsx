import Image from "next/image";
import type { ImageAsset } from "@/lib/images";
import { cn } from "@/lib/utils";

/**
 * The only place next/image is configured.
 *
 * The wrapper carries a mist-line base colour so the space is filled before —
 * and if — the photograph loads, which keeps CLS at zero and prevents a blank
 * hole if a source is ever unavailable.
 */

/** 1×1 mist-line pixel, used as the blur-up placeholder. */
const BLUR =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxIDEiPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNlNGUwZDYiLz48L3N2Zz4=";

type FigureProps = {
  image: ImageAsset;
  /** Tailwind aspect utility, e.g. "aspect-[4/5]". Defaults to the asset ratio. */
  className?: string;
  imageClassName?: string;
  /** Only true for the single largest above-the-fold image. */
  priority?: boolean;
  sizes?: string;
  /** Decorative images get an empty alt regardless of the asset value. */
  decorative?: boolean;
};

export function Figure({
  image,
  className,
  imageClassName,
  priority = false,
  sizes = "(min-width: 1280px) 40vw, (min-width: 768px) 50vw, 100vw",
  decorative = false,
}: FigureProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-card bg-mist",
        className,
      )}
      style={
        className?.includes("aspect-")
          ? undefined
          : { aspectRatio: String(image.ratio) }
      }
    >
      <Image
        src={image.src}
        alt={decorative ? "" : image.alt}
        fill
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        placeholder="blur"
        blurDataURL={BLUR}
        className={cn("object-cover", imageClassName)}
        aria-hidden={decorative || undefined}
      />
    </div>
  );
}
