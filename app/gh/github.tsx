import CommitCard from './bun'
import { Commit } from './types'

const fetchCommits = async (): Promise<Commit[]> => {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN
  const OWNER = 'oven-sh'
  const REPO = 'bun'

  let page = 1
  const perPage = 30 // Number of commits per page (you can adjust as needed)
  const allCommits: Commit[] = []

  try {
    const res = await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/commits?per_page=${perPage}&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`
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
            Authorization: `Bearer ${GITHUB_TOKEN}`
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

export async function Bun() {
  const commits: Commit[] = await fetchCommits()

  return (
    <div>
      <h1>Commit History</h1>
      {commits.map(commit => (
        <CommitCard commit={commit}></CommitCard>
      ))}
    </div>
  )
}
