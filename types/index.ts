/**
 * Shared TypeScript interfaces for the entire portfolio.
 * Every data structure that crosses a module boundary is defined here.
 */

/** A single entry in the Experience timeline. */
export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string[];
  tags: string[];
}

/** A hardcoded, hand-curated project shown in the "Featured Work" grid. */
export interface FeaturedProject {
  title: string;
  description: string;
  tags: string[];
  github: string;
  /** Optional live demo URL. */
  demo?: string;
  /** Optional award/recognition line — renders a trophy badge when present. */
  prize?: string;
}

/** Shape of a repository returned by /api/github (subset of the GitHub REST API). */
export interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
  topics: string[];
}

/** Response envelope for /api/github. `repos` is always an array — never undefined. */
export interface GitHubApiResponse {
  repos: GitHubRepo[];
  error?: string;
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

/** A labeled group of skills rendered in the Skills section. */
export interface SkillGroup {
  label: string;
  skills: string[];
}

/** A navigation link targeting an on-page section id. */
export interface NavLink {
  label: string;
  href: `#${string}`;
  id: string;
}

/** A social/contact icon link. */
export interface SocialLink {
  label: string;
  href: string;
  icon: 'github' | 'linkedin' | 'mail';
}

/** Direction options for the FadeInSection reveal animation. */
export type FadeDirection = 'up' | 'down' | 'left' | 'right';
