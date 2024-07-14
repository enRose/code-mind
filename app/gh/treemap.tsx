'use client'

import * as d3 from 'd3'
import { useEffect, useRef } from 'react'

let count: number = 0

function uid(name: string | null): Id {
  return new Id('O-' + (name == null ? '' : name + '-') + ++count)
}

class Id {
  id: string
  href: string

  constructor(id: string) {
    this.id = id
    this.href = new URL(`#${id}`, location.toString()).toString()
  }

  toString(): string {
    return 'url(' + this.href + ')'
  }
}

export const Treemap = ({ data }: { data: any }) => {
  const ref = useRef<HTMLDivElement>(null)

  // Specify the chart’s dimensions.
  const width = 1154
  const height = 1154
  const tile = d3.treemapBinary

  // Specify the color scale.
  const color = d3.scaleOrdinal(
    data.children.map((d: { name: any }) => d.name),
    d3.schemeTableau10
  )

  // Compute the layout.
  const root = d3
    .treemap()
    .tile(tile) // e.g., d3.treemapSquarify
    .size([width, height])
    .padding(1)
    .round(true)(
    d3
      .hierarchy(data)
      .sum(d => d.value)
      .sort((a, b) => b.value || 0 - (a.value || 0))
  )

  // Create the SVG container.
  const svg = d3
    .create('svg')
    .attr('viewBox', [0, 0, width, height])
    .attr('width', width)
    .attr('height', height)
    .attr('style', 'max-width: 100%; height: auto; font: 10px sans-serif;')

  // Add a cell for each leaf of the hierarchy.
  const leaf = svg
    .selectAll('g')
    .data(root.leaves())
    .join('g')
    .attr('transform', d => `translate(${d.x0},${d.y0})`)

  // Append a tooltip.
  const format = d3.format(',d')
  leaf.append('title').text(
    d =>
      `${d
        .ancestors()
        .reverse()
        .map(d => (d as any).data.name)
        .join('.')}\n${format(d.value ?? 0)}`
  )

  // Append a color rectangle.
  leaf
    .append('rect')
    .attr('id', d => ((d as any).leafUid = uid('leaf')).id)
    .attr('fill', d => {
      while (d.depth > 1) (d as any) = d.parent
      return color((d as any).data.name)
    })
    .attr('fill-opacity', 0.6)
    .attr('width', d => d.x1 - d.x0)
    .attr('height', d => d.y1 - d.y0)

  // Append a clipPath to ensure text does not overflow.
  leaf
    .append('clipPath')
    .attr('id', d => ((d as any).clipUid = uid('clip')).id)
    .append('use')
    .attr('xlink:href', d => (d as any).leafUid.href)

  // Append multiline text. The last line shows the value and has a specific formatting.
  leaf
    .append('text')
    .attr('clip-path', d => (d as any).clipUid)
    .selectAll('tspan')
    .data(d =>
      (d as any).data.name
        .split(/(?=[A-Z][a-z])|\s+/g)
        .concat(format((d as any).value))
    )
    .join('tspan')
    .attr('x', 3)
    .attr(
      'y',
      (d, i: number, nodes) =>
        `${(i === nodes.length - 1 ? 1 : 0) * 0.3 + 1.1 + i * 0.9}em`
    )
    .attr('fill-opacity', (d, i, nodes) =>
      i === nodes.length - 1 ? 0.7 : null
    )
    .text(d => d as any)

  useEffect(() => {
    if (ref.current) {
      ref.current.appendChild(
        Object.assign((svg as any).node(), { scales: { color }, ref: { ref } })
      )
    }
  }, [])

  return <div ref={ref} />
}
