'use client'

import type { JSX } from 'react'
import { useState } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { Clipboard, CheckBox } from '@/components/Icons/Icons'
import './Fence.css'

interface FenceProps {
  language: string
  content: string
}

export function Fence({ language, content }: FenceProps): JSX.Element {
  const [copied, setCopied] = useState<boolean>(false)

  const handleCopyClick = (): void => {
    navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 1000)
  }

  return (
    <div className='Fence'>
      <span className="copy" onClick={handleCopyClick}>
        {
          copied ? <CheckBox /> : <Clipboard />
        }
      </span>
      <SyntaxHighlighter
        language={language}
        style={atomOneDark}
        customStyle={{ background: 'transparent', fontFamily: 'monospace' }}
        wrapLongLines
      >
        {content}
      </SyntaxHighlighter>
    </div>
  )
}
