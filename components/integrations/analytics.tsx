import { integrations } from "@/config/integrations";

export function Analytics() {
  if (integrations.analytics.provider !== "google-tag-manager") return null;
  const { containerId } = integrations.analytics;

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtm.js?id=${containerId}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          `,
        }}
      />
    </>
  );
}
