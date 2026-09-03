/**
 * Route-level loading state. Deliberately quiet: a hairline progress bar under
 * the header rather than a skeleton of a page that renders in milliseconds.
 */
export default function Loading() {
  return (
    <div className="fixed inset-x-0 top-[76px] z-40 h-px overflow-hidden bg-mist">
      <div className="h-full w-1/3 animate-pulse bg-cobalt" />
      <span className="sr-only" role="status">
        Loading
      </span>
    </div>
  );
}
