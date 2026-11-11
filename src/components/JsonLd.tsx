export interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

const withoutContext = (schema: Record<string, unknown>) => {
  const { "@context": _context, ...node } = schema;
  void _context;
  return node;
};

export default function JsonLd({ data }: JsonLdProps) {
  const payload = Array.isArray(data)
    ? {
        "@context": "https://schema.org",
        "@graph": data.map(withoutContext),
      }
    : data;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
