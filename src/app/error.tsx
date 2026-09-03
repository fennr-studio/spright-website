"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/Section";
import { Button, ButtonLink } from "@/components/ui/Button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surfaced in server logs; the digest is what support will ask for.
    console.error("[app] unhandled error", error);
  }, [error]);

  return (
    <section className="on-ink bg-ink-900 pb-section pt-[160px] text-paper">
      <Container>
        <h1 className="max-w-[18ch] text-display-lg font-medium text-balance">
          Something went wrong on our side.
        </h1>
        <p className="mt-8 max-w-measure text-lede text-ink-200">
          Try again — it may have been temporary. If it keeps happening, email
          us at hr@sprightsoft.com and we will pick it up.
        </p>
        {error.digest ? (
          <p className="mt-4 text-meta text-ink-400">
            Reference: {error.digest}
          </p>
        ) : null}

        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <Button onClick={reset} variant="solidOnInk" size="lg">
            Try again
          </Button>
          <ButtonLink href="/" variant="ghostOnInk" size="lg">
            Back to home
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
