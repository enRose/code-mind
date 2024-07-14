import CommitCard from './commit-card'
import { fetchCommits, fetchPullRequests } from './github'
import { Commit, PullRequest } from './types'

const OWNER = 'oven-sh'
const REPO = 'bun'

export async function Bun() {
  const prs: PullRequest[] = await fetchPullRequests(OWNER, REPO)

  return (
    // <div>
    //   <h1>PRs</h1>
    //   {commits.map(commit => (
    //   ))}
    // </div>
    null
  )
}
