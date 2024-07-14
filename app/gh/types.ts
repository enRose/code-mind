export interface Commit {
  sha: string
  commit: {
    message: string
    author: {
      name: string
      date: string
    }
  }
  files: Array<{
    filename: string
    additions: number
    deletions: number
    changes: number
    status: string
  }>
}

export interface PullRequest {
  id: number
  title: string
  user: {
    login: string
  }
  state: string
  created_at: string
  updated_at: string
  closed_at: string | null
  merged_at: string | null
}
