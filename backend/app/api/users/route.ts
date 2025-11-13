import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withCors, preflight } from '@/lib/cors'

export async function GET() {
  const users = await prisma.user.findMany({ orderBy: { createdAt: 'desc' } })
  return withCors(users)
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  if (!body || typeof body.email !== 'string') {
    return withCors({ error: 'Invalid body: { email: string, name?: string }' }, { status: 400 })
  }
  const user = await prisma.user.create({
    data: {
      email: body.email,
      name: typeof body.name === 'string' ? body.name : null,
    },
  })
  return withCors(user, { status: 201 })
}

export async function OPTIONS() {
  return preflight()
}
