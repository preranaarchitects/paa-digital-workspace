import { useState } from "react";
import { MapPin, Smartphone, Mail, Info, Map, MessageSquare } from "lucide-react";
import { FaLinkedin, FaInstagram, FaFacebook, FaWhatsapp, FaGoogle } from "react-icons/fa6";
import { Button } from "../../../../../../../packages/ui/src/components/button"; 
import conversionData from "../../../../data/conversion.json";
import "./conversion-glimpse.css";
import { SectionHeader } from "../../../../../../../packages/ui/src/components/section/SectionHeader";

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
  connectButtonLabel: string;
  connectButtonPath: string; 
  socials: SocialItem[];
}

const data = conversionData as ConversionStructure;

export function ConversionGlimpse() {
  const { eyebrow, title, description, address, phone, email, mapEmbedUrl, connectButtonLabel, connectButtonPath, socials } = data;
  
  const [activeTab, setActiveTab] = useState<"info" | "map">("info");

  const renderSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "linkedin": return <FaLinkedin size={22} strokeWidth={2.5} />;
      case "instagram": return <FaInstagram size={22} strokeWidth={2.5} />;
      case "facebook": return <FaFacebook size={22} strokeWidth={2.5} />;
      case "whatsapp": return <FaWhatsapp size={22} strokeWidth={2.5} />;
      case "google": return <FaGoogle size={22} strokeWidth={2.5} />;
      default: return null;
    }
  };

  const handleConnectNavigation = () => {
    window.location.href = connectButtonPath; 
  };

  return (
    <section className="paa-conversion-glimpse">
      <div className="paa-conversion-glimpse__container">
        
        <header className="paa-conversion-glimpse__header">
          <SectionHeader
            eyebrow={eyebrow}
            title={title}
            description={description}
            eyebrowSize="xl"
            icon={MessageSquare}
          />

          <div className="paa-conversion-tabs">
            <button 
              className={`paa-conversion-tab-btn ${activeTab === "info" ? "is-active" : ""}`}
              onClick={() => setActiveTab("info")}
            >
              <Info size={14} /> Contact Details
            </button>
            <button 
              className={`paa-conversion-tab-btn ${activeTab === "map" ? "is-active" : ""}`}
              onClick={() => setActiveTab("map")}
            >
              <Map size={14} /> Studio Map
            </button>
          </div>
        </header>

        <div className="paa-conversion-glimpse__grid">
          
          <div className={`paa-conversion-glimpse__card ${activeTab === "info" ? "tab-visible" : "tab-hidden"}`}>
            <div className="paa-info-section-top">
              
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

            </div>

            <div className="paa-conversion-action-zone">
              
              <div className="paa-studio-networks-group">
                <span className="paa-networks-title">Studio Networks</span>
                <div className="paa-networks-vertical-list">
                  {socials.map((social, idx) => (
                    <a 
                      key={idx}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="paa-network-row-link"
                    >
                      <div className="paa-network-icon-circle">
                        {renderSocialIcon(social.platform)}
                      </div>
                      <span className="paa-network-text-name">{social.platform}</span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="paa-connect-action-placement">
                <Button 
                  variant="explore" 
                  onClick={handleConnectNavigation}
                  className="paa-studio-connect-button-override"
                >
                  {connectButtonLabel}
                </Button>
              </div>

            </div>
          </div>

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