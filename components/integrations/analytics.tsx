import { integrations } from "@/config/integrations";

export function Analytics() {
  const { containerId, measurementId } = integrations.analytics;
  if (!containerId && !measurementId) return null;
  const configureAnalytics = measurementId ? `gtag('config', '${measurementId}');` : "";

  return (
    <>
      {containerId ? (
        <script async src={`https://www.googletagmanager.com/gtm.js?id=${containerId}`} />
      ) : null}
      {measurementId ? (
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} />
      ) : null}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            ${configureAnalytics}
          `,
        }}
      />
    </>
  );
}
