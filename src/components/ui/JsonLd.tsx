/**
 * Renders schema.org JSON-LD. The payload is built on the server from typed
 * objects in lib/structured-data.ts, so nothing user-supplied is ever
 * serialised here. `<` is escaped to close off script-breakout entirely.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
