import { getInput, setFailed } from '@actions/core';
import { context, getOctokit } from '@actions/github';

async function main() {
  const token = getInput('github_token');
  const codeOwners = getInput('code_owners').split(' ');
  const reviewerCount = getInput('reviewer_count');
  const githubClient = getOctokit(token);

  const { owner, repo, number: pull_number } = context.issue;
  await githubClient.rest.pulls.requestReviewers({
    owner,
    repo,
    pull_number,
    reviewers: selectRandomReviewer(codeOwners, reviewerCount),
  });
}

function selectRandomReviewer(codeOwners, reviewerCount) {
  const prCreator = context.payload.pull_request.user.login;
  const candidates = codeOwners.filter((codeOwner) => codeOwner !== prCreator);
  const shuffled = candidates.sort(() => Math.random() - 0.5);

  return shuffled.slice(0, reviewerCount);
}

try {
  main();
} catch (error) {
  setFailed(error.message);
}