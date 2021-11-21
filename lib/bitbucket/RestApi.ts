import { Config } from "../types/Config.ts";

export abstract class RestApi<T> {
  #baseUrl = new URL("https://api.bitbucket.org");
  #config: Config;

  public constructor(config: Config) {
    this.#config = config;
  }

  public async execute() {
    const url = this.buildUrl();
    const requestInit: RequestInit = {
      method: this.buildMethod(),
      headers: this.buildHeaders(),
      body: this.buildBody(),
    };
    const data = await this.makeRequest(url, requestInit);
    return data;
  }

  protected buildHeaders() {
    const headers = new Headers();
    headers.set(
      "Authorization",
      `Basic ${btoa(`${this.#config.username}:${this.#config.password}`)}`,
    );
    headers.set("Content-Type", "application/json");
    return headers;
  }

  protected abstract buildUrl(): URL;

  protected buildBody(): string | undefined {
    return undefined;
  }

  protected abstract buildMethod(): string;

  protected abstract makeRequest(
    url: URL,
    init: RequestInit,
  ): Promise<T>;

  protected async makeHttpRequest<G>(
    url: URL,
    init: RequestInit,
  ) {
    const response = await fetch(url, init);
    const data: G = await response.json();
    return data;
  }

  get baseUrl() {
    return this.#baseUrl;
  }

  get config() {
    return this.#config;
  }
}
