import { Command } from "../deps.ts";
import { version } from "./version.ts";

export type Config = {
  title: string;
  originBranch: string;
  destinationBranch?: string;
  username: string;
  password: string;
  repoOwner: string;
  repoSlug: string;
};

export type Body = {
  title: string;
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
};

export type ResponseJson = {
  type: string;
  [key: string]: unknown;
};

function bodyBuilder(config: Config) {
  const body: Body = {
    title: config.title,
    source: {
      branch: {
        name: config.originBranch,
      },
    },
  };

  if (config.destinationBranch != null) {
    body.destination = {
      branch: {
        name: config.destinationBranch,
      },
    };
  }
  return body;
}

function urlBuilder(config: Config) {
  return new URL(
    `https://api.bitbucket.org/2.0/repositories/${config.repoOwner}/${config.repoSlug}/pullrequests`,
  );
}

function headersBuilder(config: Config) {
  const headers = new Headers();
  headers.set(
    "Authorization",
    `Basic ${btoa(`${config.username}:${config.password}`)}`,
  );
  headers.set("Content-Type", "application/json");
  return headers;
}

export async function makePullRequest(config: Config) {
  const url = urlBuilder(config);
  const headers = headersBuilder(config);
  const body = bodyBuilder(config);
  const response = await fetch(
    url,
    {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    },
  );
  const data: ResponseJson = await response.json();
  return data;
}

async function main() {
  const { options } = await new Command().name("bitbucket-pull-request")
    .description(
      "Script to automatically make a pull request on bitbucket",
    ).version(version).option(
      "-d, --destinationBranch [destinationBranch:string]",
      "Destination Branch of Pull Request",
    ).allowEmpty(false).option(
      "-t, --title [title:string]",
      "Pull Request Title",
      { required: true },
    ).option(
      "-o, --originBranch [originBranch:string]",
      "Origin Branch of Pull Request",
      { required: true },
    ).option(
      "-u, --username [username:string]",
      "Username of the creator of Pull Request",
      { required: true },
    ).option(
      "-p, --password [password:string]",
      "Password of the creator of Pull Request",
      { required: true },
    ).option(
      "-ro, --repoOwner [repoOwner:string]",
      "Name of the repository owner",
      { required: true },
    ).option(
      "-rs, --repoSlug [repoSlug:string]",
      "Simple name of the repository",
      { required: true },
    ).parse(Deno.args);

  const data = await makePullRequest(options);
  console.log(data);
}

if (import.meta.main === true) {
  await main();
}
