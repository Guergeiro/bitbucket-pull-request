import { Command } from "../deps.ts";
import { version } from "./version.ts";
import { FetchCurrentUser } from "./bitbucket/FetchCurrentUser.ts";
import { FetchDefaultReviewers } from "./bitbucket/FetchDefaultReviewers.ts";
import { MakePullRequest } from "./bitbucket/MakePullRequest.ts";
import { User } from "./entity/User.ts";

async function main() {
  const { options } = await new Command().name("bitbucket-pull-request")
    .description(
      "Script to automatically make a pull request on bitbucket",
    ).version(version).option(
      "--description [description:string]",
      "Description of the Pull Request",
    ).option(
      "--destinationBranch [destinationBranch:string]",
      "Destination Branch of Pull Request",
    ).option(
      "--defaultReviewers [defaultReviewers:boolean]",
      "Default Reviewers of Pull Request",
      { default: true },
    ).option(
      "--closeSourceBranch [closeSourceBranch:boolean]",
      "Destination Branch of Pull Request",
      { default: true },
    ).allowEmpty(false).option(
      "--title [title:string]",
      "Pull Request Title",
      { required: true },
    ).option(
      "--originBranch [originBranch:string]",
      "Origin Branch of Pull Request",
      { required: true },
    ).option(
      "--username [username:string]",
      "Username of the creator of Pull Request",
      { required: true },
    ).option(
      "--password [password:string]",
      "Password of the creator of Pull Request",
      { required: true },
    ).option(
      " --repoOwner [repoOwner:string]",
      "Name of the repository owner",
      { required: true },
    ).option(
      " --repoSlug [repoSlug:string]",
      "Simple name of the repository",
      { required: true },
    ).parse(Deno.args);

  const reviewers: Array<User> = [];

  if (options.defaultReviewers === true) {
    const user = await (new FetchCurrentUser(options)).execute();
    const defaultReviewers = await (new FetchDefaultReviewers(options))
      .execute();
    reviewers.push(
      ...(defaultReviewers.filter(function (reviewer) {
        return user.account_id !== reviewer.account_id;
      })),
    );
  }
  const data = await (new MakePullRequest(options, reviewers)).execute();
  console.log(data);
}

if (import.meta.main === true) {
  await main();
}
