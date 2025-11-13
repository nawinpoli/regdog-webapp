import { withCors } from '@/lib/cors'

export async function GET() {
  return withCors({ ok: true, service: 'backend', timestamp: new Date().toISOString() })
}
