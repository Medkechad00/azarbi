// Chart configuration — Azarbi brand colours for Recharts
// Used by all admin chart components

export const AZARBI_CHART_CONFIG = {
  revenue:  { label: 'Revenue',  color: '#8C4A30' },
  orders:   { label: 'Orders',   color: '#C17A2C' },
  products: { label: 'Products', color: '#3C5D4E' },
  visitors: { label: 'Visitors', color: '#9B8F85' },
  bespoke:  { label: 'Bespoke',  color: '#D9CFBF' },
} as const

export const CHART_TOOLTIP_STYLE = {
  background: '#1C1815',
  border: '1px solid #2E2926',
  borderRadius: '4px',
  color: '#F4EFE5',
  fontSize: '12px',
  fontFamily: 'Josefin Sans',
}

export const AXIS_STYLE = {
  tick: { fill: '#9B8F85', fontSize: 11, fontFamily: 'Josefin Sans' },
  axisLine: { stroke: '#E6DDD1' },
  tickLine: false as const,
}

// Colour array for charts that need multiple series
export const CHART_COLORS = [
  '#8C4A30', // clay
  '#C17A2C', // saffron
  '#3C5D4E', // argane
  '#9B8F85', // smoke
  '#D9CFBF', // bone2
]
