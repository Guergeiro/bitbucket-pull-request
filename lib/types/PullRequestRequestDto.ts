export type PullRequestRequestDto = {
  title: string;
  description?: string;
  closeSourceBranch: boolean;
  source: {
    branch: {
      name: string;
    };
  };
  destination?: {
    branch: {
      name: string;
    };
  };
  reviewers?: Array<{ uuid: string }>;
};
