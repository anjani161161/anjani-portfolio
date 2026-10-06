import emailjs from "@emailjs/browser";

export interface EmailConfig {
  serviceId: string;
  templateId: string;
  publicKey: string;
}

export const emailConfig: EmailConfig = {
  serviceId: (import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_mv5raln").trim(),
  templateId: (import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "").trim(),
  publicKey: (import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "").trim(),
};

export const isEmailConfigured: boolean = Boolean(
  emailConfig.serviceId && emailConfig.templateId && emailConfig.publicKey,
);

export function getEmailConfigStatus(): {
  serviceId: "configured" | "missing";
  templateId: "configured" | "missing";
  publicKey: "configured" | "missing";
} {
  return {
    serviceId: emailConfig.serviceId ? "configured" : "missing",
    templateId: emailConfig.templateId ? "configured" : "missing",
    publicKey: emailConfig.publicKey ? "configured" : "missing",
  };
}

export interface ContactEmailPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendContactEmail(payload: ContactEmailPayload) {
  if (!isEmailConfigured) {
    throw new Error("EMAILJS_NOT_CONFIGURED");
  }

  const templateParams = {
    name: payload.name,
    email: payload.email,
    subject: payload.subject,
    message: payload.message,
  };

  const timeoutPromise = new Promise<never>((_, reject) =>
    setTimeout(
      () =>
        reject(
          new Error(
            "Request timed out. Please check your network connection or reach out directly.",
          ),
        ),
      12000,
    ),
  );

  const sendPromise = emailjs.send(emailConfig.serviceId, emailConfig.templateId, templateParams, {
    publicKey: emailConfig.publicKey,
  });

  return Promise.race([sendPromise, timeoutPromise]);
}
