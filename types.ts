export interface FeaturedProject {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  github: string;
  demo?: string;
  prize?: string;
  /**
   * Static screenshot of the deployment, used as the card background when the
   * live site refuses to be iframed (e.g. sends X-Frame-Options: SAMEORIGIN).
   * Takes precedence over the live iframe preview.
   */
  screenshot?: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string[];
  tags: string[];
}

/** Payload accepted by POST /api/contact. */
export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

/** Response envelope for /api/contact. */
export interface ContactApiResponse {
  success: boolean;
  error?: string;
}
