import { NextResponse } from "next/server";

const GITHUB_USERNAME = "AbdulWasayUl";

const QUERY = `
query($username: String!) {
  user(login: $username) {
    repositories(first: 1, ownerAffiliations: [OWNER, COLLABORATOR, ORGANIZATION_MEMBER]) {
      totalCount
    }
    contributionsCollection {
      totalCommitContributions
      totalPullRequestReviewContributions
    }
    pullRequests(first: 1) {
      totalCount
    }
    repositoriesContributedTo(first: 1, contributionTypes: [COMMIT, PULL_REQUEST, REPOSITORY]) {
      totalCount
    }
  }
}
`;

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "GITHUB_TOKEN not configured" },
      { status: 500 }
    );
  }

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: QUERY, variables: { username: GITHUB_USERNAME } }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: "GitHub API error", detail: text },
        { status: res.status }
      );
    }

    const json = await res.json();

    if (json.errors) {
      return NextResponse.json(
        { error: "GraphQL error", detail: json.errors },
        { status: 500 }
      );
    }

    const user = json.data.user;
    const contributions = user.contributionsCollection;

    const ownedRepos = user.repositories.totalCount;
    const contributedTo = user.repositoriesContributedTo.totalCount;
    const totalRepos = Math.max(ownedRepos, ownedRepos + contributedTo);

    return NextResponse.json({
      totalRepos,
      totalCommits: contributions.totalCommitContributions,
      totalPRs: user.pullRequests.totalCount,
      totalReviews: contributions.totalPullRequestReviewContributions,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch", detail: String(err) },
      { status: 500 }
    );
  }
}
