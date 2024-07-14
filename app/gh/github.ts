import { Commit, PullRequest } from './types'

export const fetchPullRequests = async (
  owner: string,
  repo: string
): Promise<PullRequest[]> => {
  let page = 1
  const perPage = 30
  const allPullRequests: PullRequest[] = []

  while (true) {
    const res = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/pulls?per_page=${perPage}&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
        }
      }
    )

    const pullRequests = await res.json()
    if (pullRequests.length === 0) {
      break
    }

    allPullRequests.push(...pullRequests)
    page += 1
  }

  return allPullRequests
}

export const fetchCommits = async (
  gh_token: string,
  owner: string,
  repo: string,
  page: number = 1,
  perPage: number = 30
): Promise<Commit[]> => {
  const allCommits: Commit[] = []

  try {
    const res = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/commits?per_page=${perPage}&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
        }
      }
    )

    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }

    const commits: Commit[] = await res.json()

    // Fetch file details for each commit
    for (const commit of commits) {
      const commitDetailsRes = await fetch(
        `https://api.github.com/repos/${OWNER}/${REPO}/commits/${commit.sha}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
          }
        }
      )

      const commitDetails = await commitDetailsRes.json()
      commit.files = commitDetails.files
    }

    allCommits.push(...commits)

    return allCommits
  } catch (error) {
    console.error('Error fetching commits:', error)
    return []
  }
}
