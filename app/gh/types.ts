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
