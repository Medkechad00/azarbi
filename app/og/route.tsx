import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const title = searchParams.get('title') || 'Azarbi Masterweavers'
    const subtitle = searchParams.get('subtitle') || 'Authentic Moroccan Berber Rugs'

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            backgroundColor: '#F4EFE5', // Linen
            padding: '80px',
            fontFamily: 'sans-serif', // Using system sans since custom fonts require loading TTF
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: 'radial-gradient(circle at 100% 100%, #1C1815 0%, transparent 40%)',
              opacity: 0.1,
            }}
          />
          <span style={{ fontSize: 32, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#1C1815', opacity: 0.5, marginBottom: 40 }}>
            {subtitle}
          </span>
          <h1 style={{ fontSize: 80, fontWeight: 700, color: '#1C1815', lineHeight: 1.1, maxWidth: '80%' }}>
            {title}
          </h1>
          <div style={{ position: 'absolute', bottom: 80, left: 80, display: 'flex', alignItems: 'center' }}>
            <div style={{ width: 40, height: 40, backgroundColor: '#8C4A30', borderRadius: 2 }} />
            <span style={{ marginLeft: 20, fontSize: 32, fontWeight: 600, color: '#1C1815' }}>AZARBI</span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e: any) {
    return new Response(`Failed to generate OG image`, { status: 500 })
  }
}
