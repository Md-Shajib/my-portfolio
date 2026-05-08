import { ImageResponse } from 'next/og'
import { site } from '@/lib/site'

export const dynamic = 'force-static'
export const runtime = 'nodejs'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') ?? site.shortName
  const subtitle = searchParams.get('subtitle') ?? 'Software Engineer'

  return new ImageResponse(
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 80,
        background: 'linear-gradient(135deg, #0a192f 0%, #112240 50%, #0a192f 100%)',
        color: '#ccd6f6',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div
          style={{
            width: 64,
            height: 64,
            border: '3px solid #64ffda',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#64ffda',
            fontWeight: 700,
            fontSize: 32,
          }}
        >
          S
        </div>
        <span style={{ color: '#64ffda', fontFamily: 'monospace', fontSize: 22 }}>
          {site.url.replace(/^https?:\/\//, '')}
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <span
          style={{
            color: '#64ffda',
            fontFamily: 'monospace',
            fontSize: 24,
            letterSpacing: 2,
          }}
        >
          {subtitle}
        </span>
        <span
          style={{
            fontSize: 78,
            fontWeight: 700,
            lineHeight: 1.1,
            maxWidth: 980,
          }}
        >
          {title}
        </span>
      </div>
      <span style={{ color: '#8892b0', fontSize: 20 }}>{site.name}</span>
    </div>,
    { width: 1200, height: 630 }
  )
}
