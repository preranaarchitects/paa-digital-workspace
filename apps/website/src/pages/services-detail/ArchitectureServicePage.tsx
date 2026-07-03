import { SEOManager } from "../../components/seo/SEOManager";
import contentData from "../../data/services-content/architecture-hero.json";

export function ArchitectureServicePage() {
  return (
    <>
      <SEOManager pageKey="services" />

      <main className="paa-service-detail-view">
        <section className="paa-service-hero">
          <div className="paa-service-hero__container">
            <span className="paa-service-hero__eyebrow">{contentData.eyebrow}</span>
            <h1 className="paa-service-hero__title">{contentData.title}</h1>
            <p className="paa-service-hero__description">{contentData.description}</p>
          </div>
        </section>
      </main>
    </>
  );
}