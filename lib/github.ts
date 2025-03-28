import { Octokit } from 'octokit';

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export async function getGithubUser(username: string) {
  try {
    const { data } = await octokit.rest.users.getByUsername({
      username,
    });
    return data;
  } catch (error) {
    console.error('Error fetching GitHub user:', error);
    return null;
  }
}

export async function getGithubRepos(username: string) {
  try {
    const { data } = await octokit.rest.repos.listForUser({
      username,
      sort: 'updated',
      per_page: 30,
    });
    return data;
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
}