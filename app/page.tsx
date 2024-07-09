import { Bun } from '@/app/gh/github'
import D3Example from './gh/d3'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <D3Example width="200" height="200" />
      <Bun />
    </main>
  )
}
