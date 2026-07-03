import { Helmet } from "react-helmet-async";
import seoData from "../../data/seo/pages.json";

interface PageSeoStructure {
  title: string;
  description: string;
  canonical: string;
  schema?: Record<string, unknown>;
}

const typedSeoMap = seoData as Record<string, PageSeoStructure | undefined>;

interface SEOManagerProps {
  pageKey: string;
}

export function SEOManager({ pageKey }: SEOManagerProps) {
  const seo = typedSeoMap[pageKey];

  if (!seo) {
    console.warn(`[SEOManager] Missing SEO configurations for key: "${pageKey}"`);
    return null;
  }

  return (
    <Helmet>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <link rel="canonical" href={seo.canonical} />
      
      {seo.schema && (
        <script type="application/ld+json">
          {JSON.stringify(seo.schema)}
        </script>
      )}
    </Helmet>
  );
}