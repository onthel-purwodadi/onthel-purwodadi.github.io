import type { IntegrationConfig } from "./types";
import generatedIntegrationsRaw from "../content/generated/integrations.json";

type GeneratedIntegrations = {
  gaMeasurementId?: string | null;
  gtmContainerId?: string | null;
  bingSiteVerification?: string | null;
};

const generatedIntegrations = generatedIntegrationsRaw as GeneratedIntegrations;

const adScriptUrl = process.env.NEXT_PUBLIC_ADSTERRA_NATIVE_SCRIPT_URL?.trim();
const adContainerId = process.env.NEXT_PUBLIC_ADSTERRA_NATIVE_CONTAINER_ID?.trim();

const gtmContainerId = generatedIntegrations.gtmContainerId?.trim() ?? "";
const gaMeasurementId = generatedIntegrations.gaMeasurementId?.trim() ?? "";

const bingFromEnv = process.env.BING_SITE_VERIFICATION?.trim() || "";
const bingFromGenerated = typeof generatedIntegrations.bingSiteVerification === "string"
  ? generatedIntegrations.bingSiteVerification.trim()
  : "";
const bingVerification = bingFromEnv || bingFromGenerated || null;

export const integrations: IntegrationConfig = {
  analytics: {
    containerId: /^GTM-[A-Z0-9]+$/.test(gtmContainerId) ? gtmContainerId : null,
    measurementId: /^G-[A-Z0-9]+$/.test(gaMeasurementId) ? gaMeasurementId : null,
  },
  ads:
    adScriptUrl && adContainerId
      ? {
          provider: "adsterra-native",
          scriptUrl: adScriptUrl,
          containerId: adContainerId,
        }
      : { provider: "none" },
  verification: {
    bing: bingVerification,
  },
};
