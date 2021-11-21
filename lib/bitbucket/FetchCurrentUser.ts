import { User } from "../entity/User.ts";
import { UserResponseDto } from "../types/UserResponseDto.ts";
import { RestApi } from "./RestApi.ts";

export class FetchCurrentUser extends RestApi<User> {
  protected override buildUrl() {
    const url = new URL(`2.0/user`, super.baseUrl);

    return url;
  }

  protected override buildMethod() {
    return "GET";
  }

  protected override async makeRequest(url: URL, init: RequestInit) {
    const data = await super.makeHttpRequest<UserResponseDto>(url, init);
    return new User(data);
  }
}
