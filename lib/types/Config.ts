export type Config = {
  title: string;
  description: string;
  closeSourceBranch: boolean;
  defaultReviewers: boolean;
  originBranch: string;
  destinationBranch?: string;
  username: string;
  password: string;
  repoOwner: string;
  repoSlug: string;
};
