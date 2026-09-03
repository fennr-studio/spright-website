/**
 * IMAGE ABSTRACTION LAYER
 * ----------------------------------------------------------------------------
 * Every photograph on the site is referenced through a semantic key defined
 * here. Components never hard-code a URL, so swapping the current royalty-free
 * placeholders for licensed brand photography is a single-file change: replace
 * `src` (and `alt`) below and the whole site updates.
 *
 * To move to self-hosted assets, drop the files into /public/photography and
 * change `src` to e.g. "/photography/hero-primary.jpg". No other file changes.
 *
 * Current sources are Unsplash (free to use under the Unsplash License).
 */

export type ImageAsset = {
  src: string;
  /** Describes the content for screen readers. Empty string = decorative. */
  alt: string;
  /** Intrinsic aspect ratio, used to reserve space and avoid layout shift. */
  ratio: number;
};

const unsplash = (id: string, w = 1800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=72`;

export const images = {
  /** Office locator thumbnails — one per base, used in the hero strip. */
  officeIndia: {
    src: unsplash("photo-1614716194506-ef3694ae131a", 400),
    alt: "Pune, India",
    ratio: 1,
  },
  officeUsa: {
    src: unsplash("photo-1673574672395-5f8bd3c2ed5a", 400),
    alt: "Tampa, Florida",
    ratio: 1,
  },
  heroPrimary: {
    src: unsplash("photo-1522071820081-009f0129c71c", 1600),
    alt: "A cross-functional technology team reviewing work together around a table",
    ratio: 4 / 5,
  },
  heroSecondary: {
    src: unsplash("photo-1531482615713-2afd69097998", 900),
    alt: "An engineer working through code on a laptop",
    ratio: 1,
  },
  introSplit: {
    src: unsplash("photo-1552664730-d307ca884978", 1400),
    alt: "Colleagues in discussion during a project planning session",
    ratio: 5 / 6,
  },
  workplace: {
    src: unsplash("photo-1497215728101-856f4ea42174", 1800),
    alt: "An open, light-filled modern workplace",
    ratio: 16 / 9,
  },
  collaboration: {
    src: unsplash("photo-1519389950473-47ba0277781c", 1800),
    alt: "A team working side by side on laptops",
    ratio: 16 / 10,
  },
  interview: {
    src: unsplash("photo-1600880292089-90a7e086ee0c", 1400),
    alt: "A candidate conversation between two professionals",
    ratio: 4 / 3,
  },
  engineering: {
    src: unsplash("photo-1487058792275-0ad4aaf24ca7", 1800),
    alt: "Source code displayed across a developer's monitor",
    ratio: 16 / 9,
  },
  hardware: {
    src: unsplash("photo-1518770660439-4636190af475", 1600),
    alt: "Close detail of a circuit board",
    ratio: 3 / 2,
  },
  globalNetwork: {
    src: unsplash("photo-1451187580459-43490279c0fa", 1800),
    alt: "Illuminated network connections spanning a view of the earth at night",
    ratio: 16 / 9,
  },
  careers: {
    src: unsplash("photo-1521737711867-e3b97375f902", 1600),
    alt: "Colleagues collaborating in a relaxed workspace",
    ratio: 3 / 2,
  },
  officeDetail: {
    src: unsplash("photo-1497366811353-6870744d04b2", 1400),
    alt: "Detail of a quiet contemporary office interior",
    ratio: 4 / 3,
  },
  cityscape: {
    src: unsplash("photo-1486406146926-c627a92ad1ab", 1600),
    alt: "Glass office towers seen from below",
    ratio: 4 / 5,
  },
  desk: {
    src: unsplash("photo-1573164713988-8665fc963095", 1400),
    alt: "A professional reviewing candidate profiles at a desk",
    ratio: 3 / 2,
  },
} as const satisfies Record<string, ImageAsset>;

export type ImageKey = keyof typeof images;
