import type { Config as BaseConfig } from "../../deps.ts";

export type Config = BaseConfig & {
  title: string;
  description: string;
  closeSourceBranch: boolean;
  defaultReviewers: boolean;
  originBranch: string;
  destinationBranch?: string;
  repoOwner: string;
  repoSlug: string;
};
