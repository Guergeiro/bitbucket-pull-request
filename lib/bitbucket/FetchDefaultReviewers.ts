import { User } from "../entity/User.ts";
import { DefaultReviewersResponseDto } from "../types/DefaultReviewersResponseDto.ts";
import { RestApi } from "./RestApi.ts";

export class FetchDefaultReviewers extends RestApi<Array<User>> {
  protected override buildUrl() {
    const url = new URL(
      `2.0/repositories/${super.config.repoOwner}/${super.config.repoSlug}/default-reviewers`,
      super.baseUrl,
    );

    return url;
  }

  protected override buildMethod() {
    return "GET";
  }

  protected override async makeRequest(url: URL, init: RequestInit) {
    const data = await super.makeHttpRequest<DefaultReviewersResponseDto>(
      url,
      init,
    );
    const defaultReviewers = data.values.map(function (defaultReviewer) {
      return new User(defaultReviewer);
    });

    if (data.size > data.pagelen) {
      url.searchParams.set("page", `${data.page += 1}`);
      defaultReviewers.push(...await this.makeRequest(url, init));
    }
    return defaultReviewers;
  }
}
