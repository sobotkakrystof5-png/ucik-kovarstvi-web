/**
 * JSON-LD jako <script type="application/ld+json">. Datový blok se nespouští,
 * CSP `script-src` se na něj nevztahuje. `<` se escapuje proti XSS
 * (doporučení Next.js, guide JSON-LD).
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
