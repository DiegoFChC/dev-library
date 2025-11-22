import type { JSX } from 'react'
import type { Metadata } from 'next'
import { Landing } from '@/components/Landing/Landing'
import { TopBar } from '@/components'

export const metadata: Metadata = {
  title: 'Dev Library',
  description: 'Here you can found my programming notes and little components with HTML, CSS and JavaScript.',
}

export default function Home(): JSX.Element {
  return (
    <main>
      <TopBar />
      <Landing />
    </main>
  )
}
