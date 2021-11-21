import { UserResponseDto } from "../types/UserResponseDto.ts";

export class User {
  #display_name: string;
  #uuid: string;
  #type: string;
  #nickname: string;
  #account_id: string;

  public constructor(
    // deno-lint-ignore camelcase
    { display_name, uuid, type, nickname, account_id }: UserResponseDto,
  ) {
    this.#display_name = display_name;
    this.#uuid = uuid;
    this.#type = type;
    this.#nickname = nickname;
    this.#account_id = account_id;
  }

  get display_name() {
    return this.#display_name;
  }

  get uuid() {
    return this.#uuid;
  }

  get type() {
    return this.#type;
  }

  get nickname() {
    return this.#nickname;
  }

  get account_id() {
    return this.#account_id;
  }
}
