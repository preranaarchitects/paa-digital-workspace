import { useState } from "react";
import { MapPin, Smartphone, Mail, Instagram, Linkedin, Facebook } from "lucide-react";
import conversionData from "../../../../data/conversion.json";
import "./conversion-glimpse.css";

interface AddressStructure {
  label: string;
  firmName: string;
  lines: string[];
}

interface CommunicationItem {
  label: string;
  value: string;
}

interface SocialItem {
  platform: string;
  url: string;
}

interface ConversionStructure {
  eyebrow: string;
  title: string;
  description: string;
  address: AddressStructure;
  phone: CommunicationItem;
  email: CommunicationItem;
  mapEmbedUrl: string;
  socials: SocialItem[];
}

const data = conversionData as ConversionStructure;

export function ConversionGlimpse() {
  const { eyebrow, title, description, address, phone, email, mapEmbedUrl, socials } = data;
  
  // Strict layout switcher to completely eliminate mobile page scrolling
  const [activeTab, setActiveTab] = useState<"info" | "map">("info");

  const renderSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "linkedin": return <Linkedin size={20} strokeWidth={2.5} />;
      case "instagram": return <Instagram size={20} strokeWidth={2.5} />;
      case "facebook": return <Facebook size={20} strokeWidth={2.5} />;
      default: return null;
    }
  };

  return (
    <section className="paa-conversion-glimpse">
      <div className="paa-conversion-glimpse__container">
        
        {/* 🏛️ ALWAYS CENTERED HEADER & RESPONSIVE SWITCHER DOCK */}
        <header className="paa-conversion-glimpse__header">
          <span className="paa-conversion-glimpse__eyebrow">{eyebrow}</span>
          <h2 className="paa-conversion-glimpse__title">{title}</h2>
          <p className="paa-conversion-glimpse__desc">{description}</p>

          {/* 📱 SCREEN TOGGLE TAB BAR (Only mounts/displays on Mobile & Tablet viewports) */}
          <div className="paa-conversion-tabs">
            <button 
              className={`paa-conversion-tab-btn ${activeTab === "info" ? "is-active" : ""}`}
              onClick={() => setActiveTab("info")}
            >
              Contact Details
            </button>
            <button 
              className={`paa-conversion-tab-btn ${activeTab === "map" ? "is-active" : ""}`}
              onClick={() => setActiveTab("map")}
            >
              Interactive Map
            </button>
          </div>
        </header>

        {/* 🖼️ INTERACTIVE IN-PLACE SWAP HUB PANEL */}
        <div className="paa-conversion-glimpse__grid">
          
          {/* VIEW SLIDE A: DETAILS ELEMENT */}
          <div className={`paa-conversion-glimpse__card ${activeTab === "info" ? "tab-visible" : "tab-hidden"}`}>
            <div className="paa-info-row">
              <div className="paa-info-row__icon-circle"><MapPin size={22} strokeWidth={2.5} /></div>
              <div className="paa-info-row__text-block">
                <span className="paa-info-row__label">{address.label}</span>
                <strong className="paa-info-row__heading">{address.firmName}</strong>
                {address.lines.map((line, idx) => (
                  <span key={idx} className="paa-info-row__text">{line}</span>
                ))}
              </div>
            </div>

            <div className="paa-info-row">
              <div className="paa-info-row__icon-circle"><Smartphone size={22} strokeWidth={2.5} /></div>
              <div className="paa-info-row__text-block">
                <span className="paa-info-row__label">{phone.label}</span>
                <span className="paa-info-row__text-highlight">{phone.value}</span>
              </div>
            </div>

            <div className="paa-info-row">
              <div className="paa-info-row__icon-circle"><Mail size={22} strokeWidth={2.5} /></div>
              <div className="paa-info-row__text-block">
                <span className="paa-info-row__label">{email.label}</span>
                <span className="paa-info-row__text-highlight">{email.value}</span>
              </div>
            </div>

            <div className="paa-social-footer-dock">
              <span className="paa-social-footer-dock__title">Studio Networks</span>
              <div className="paa-social-footer-dock__row">
                {socials.map((social, idx) => (
                  <a 
                    key={idx} 
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`paa-social-circle-link paa-social-circle-link--${social.platform.toLowerCase()}`}
                  >
                    {renderSocialIcon(social.platform)}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* VIEW SLIDE B: MAP ELEMENT */}
          <div className={`paa-conversion-glimpse__map-wrapper ${activeTab === "map" ? "tab-visible" : "tab-hidden"}`}>
            <iframe
              src={mapEmbedUrl}
              className="paa-conversion-glimpse__map-iframe"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Prerana Architects Verified Office Location"
            />
          </div>

        </div>

      </div>
    </section>
  );
}