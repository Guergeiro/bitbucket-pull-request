import { User } from "../entity/User.ts";
import { Config } from "../types/Config.ts";
import { PullRequestRequestDto } from "../types/PullRequestRequestDto.ts";
import { PullRequestResponseDto } from "../types/PullRequestResponseDto.ts";
import { RestApi } from "../../deps.ts";

export class MakePullRequest extends RestApi<Config, PullRequestResponseDto> {
  #reviewers: Array<User>;

  public constructor(config: Config, reviewers: Array<User> = []) {
    super(config);
    this.#reviewers = reviewers;
  }

  protected override buildUrl() {
    const url = new URL(
      `2.0/repositories/${super.config.repoOwner}/${super.config.repoSlug}/pullrequests`,
      super.baseUrl,
    );

    return url;
  }

  protected override buildMethod() {
    return "POST";
  }

  protected override buildBody() {
    const body: PullRequestRequestDto = {
      title: super.config.title,
      closeSourceBranch: super.config.closeSourceBranch,
      source: {
        branch: {
          name: super.config.originBranch,
        },
      },
      reviewers: this.#reviewers.map(function (reviewer) {
        return { uuid: reviewer.uuid };
      }),
    };

    if (super.config.description != null) {
      body.description = super.config.description;
    }

    if (super.config.destinationBranch != null) {
      body.destination = {
        branch: {
          name: super.config.destinationBranch,
        },
      };
    }
    return JSON.stringify(body);
  }

  protected override async makeRequest(url: URL, init: RequestInit) {
    const data = await super.makeHttpRequest<PullRequestResponseDto>(url, init);
    return data;
  }
}
