import { Treemap } from './d3/treemap'
import { data } from './d3/data'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Treemap data={data}></Treemap>
    </main>
  )
}
