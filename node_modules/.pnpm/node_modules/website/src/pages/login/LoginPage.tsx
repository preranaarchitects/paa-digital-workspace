import React, { useState } from "react";
import { CheckCircle2, Lock, Mail, ShieldCheck, X } from "lucide-react";
import { Logo } from "@paa/ui";

import branding from "../../../../../packages/ui/src/data/branding.json";
import loginData from "../../data/login.json";
import { verifyUserCredentials, supabase } from "../../services/authService";

import "./login-page.css";

export function LoginPage(): React.ReactElement {
  const [email, setEmail] = useState<string>(""); 
  const [password, setPassword] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isClientModalOpen, setIsClientModalOpen] = useState<boolean>(false);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setIsClientModalOpen(false);

    try {
      const targetIdentifier = email.trim();

      // 1. Call our authentication service layer
      const apiResult = await verifyUserCredentials(targetIdentifier, password);

      // 2. Intercept validation error responses straight from the API
      if (apiResult.status === "ERROR") {
        if (apiResult.message.includes("not the client of the Prerana Architect")) {
          setIsClientModalOpen(true);
        } else {
          setErrorMessage(apiResult.message);
        }
        setIsLoading(false);
        return;
      }

      // 3. API SUCCESS: Let Supabase sign the secure cryptographic session
      const { error: sessionError } = await supabase.auth.signInWithPassword({
        email: targetIdentifier,
        password: password,
      });

      if (sessionError) {
        setErrorMessage(loginData.messages.invalidCredentials);
        setIsLoading(false);
        return;
      }

      // 4. Check for first-time password reset onboarding rules
      if (apiResult.is_first_login) {
        window.location.href = "/onboarding/reset-password";
        return;
      }

      // 5. Dynamic Routing Layer using the explicit URL from the API response
      if (apiResult.target_url) {
        const activeEnv = loginData.authentication.activeEnvironment;

        if (activeEnv === "production") {
          window.location.href = apiResult.target_url;
        } else {
          // Local Environment Monorepo Port Routing Engine
          if (apiResult.target_url.includes("admin.")) {
            window.location.href = `${loginData.authentication.redirects.admin.urls.local}/dashboard`;
          } else if (apiResult.target_url.includes("team.")) {
            window.location.href = `${loginData.authentication.redirects.supervisor.urls.local}/dashboard`;
          } else {
            const cleanSlug = targetIdentifier.toLowerCase();
            window.location.href = `${loginData.authentication.redirects.client.urls.local}/dashboard?tenant=${cleanSlug}`;
          }
        }
      } else {
        setErrorMessage(loginData.messages.unexpectedError);
        setIsLoading(false);
      }

    } catch (error: unknown) {
      setErrorMessage(error instanceof Error ? error.message : loginData.messages.unexpectedError);
      setIsLoading(false);
    }
  }

  return (
    <main className="paa-login-page">
      <section className="paa-login-card">
        <aside className="paa-login-card__brand-panel">
          <Logo logo={branding.logo} variant="full" />
          <div className="paa-login-card__brand-divider" />

          <div>
            <p className="paa-login-card__portal-label">{loginData.branding.portalTitle}</p>
            <p className="paa-login-card__portal-description">{loginData.branding.portalDescription}</p>
          </div>

          <div className="paa-login-card__features">
            {loginData.branding.features.map((feature) => (
              <div key={feature.title} className="paa-login-card__feature">
                <CheckCircle2 size={18} />
                <div>
                  <strong>{feature.title}</strong>
                  <span>{feature.description}</span>
                </div>
              </div>
            ))}
          </div>

          <blockquote className="paa-login-card__quote">
            “{loginData.branding.quote.text}”
            <span>{loginData.branding.quote.author}</span>
          </blockquote>
        </aside>

        {/* Form triggers handlesubmit on type="submit" button automatically */}
        <form className="paa-login-card__form-panel" onSubmit={handleLogin}>
          <div className="paa-login-card__form-header">
            <div className="paa-login-card__secure-badge">
              <ShieldCheck size={18} />
              <span>Secure Access</span>
            </div>
            <p className="paa-login-card__eyebrow">{loginData.login.eyebrow}</p>
            <h1>{loginData.login.title}</h1>
            <p>{loginData.login.description}</p>
          </div>

          <label className="paa-login-card__field">
            <span>{loginData.login.email.label}</span>
            <div className="paa-login-card__input">
              <Mail size={18} />
              <input
                type="text"
                value={email}
                placeholder={loginData.login.email.placeholder}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
          </label>

          <label className="paa-login-card__field">
            <span>{loginData.login.password.label}</span>
            <div className="paa-login-card__input">
              <Lock size={18} />
              <input
                type="password"
                value={password}
                placeholder={loginData.login.password.placeholder}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
          </label>

          {errorMessage && <p className="paa-login-card__error">{errorMessage}</p>}

          <button type="submit" className="paa-login-card__submit" disabled={isLoading}>
            {isLoading ? loginData.messages.loading : loginData.login.submitButton.label}
          </button>

          <button
            type="button"
            className="paa-login-card__forgot"
            onClick={() => { window.location.href = loginData.login.forgotPassword.path; }}
          >
            {loginData.login.forgotPassword.label}
          </button>

          <div className="paa-login-card__support">
            <strong>{loginData.login.support.title}</strong>
            <p>{loginData.login.support.description}</p>
            <button
              type="button"
              onClick={() => { window.location.href = loginData.login.support.path; }}
            >
              {loginData.login.support.buttonLabel}
            </button>
          </div>
        </form>
      </section>

      {isClientModalOpen && (
        <div className="paa-modal-backdrop">
          <div className="paa-modal-card">
            <header className="paa-modal-card__header">
              <div className="paa-modal-card__icon-wrapper">
                <ShieldCheck size={24} style={{ color: "var(--paa-border)" }} />
              </div>
              <button type="button" className="paa-modal-card__close-btn" onClick={() => setIsClientModalOpen(false)}>
                <X size={20} />
              </button>
            </header>
            
            <div className="paa-modal-card__body">
              <p>{loginData.popupModal.message}</p>
            </div>

            <footer className="paa-modal-card__actions">
              <button type="button" className="paa-modal-card__btn-secondary" onClick={() => setIsClientModalOpen(false)}>
                {loginData.popupModal.actionClose}
              </button>
              <button
                type="button"
                className="paa-modal-card__btn-primary"
                onClick={() => { window.location.href = loginData.login.support.path; }}
              >
                {loginData.popupModal.actionContact}
              </button>
            </footer>
          </div>
        </div>
      )}
    </main>
  );
}