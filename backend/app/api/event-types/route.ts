import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ok, badRequest, serverError } from '@/lib/http'
import { eventTypeCreateSchema } from '@/lib/validators'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const page = Math.max(1, Number(searchParams.get('page') ?? '1'))
  const pageSize = Math.min(100, Math.max(1, Number(searchParams.get('pageSize') ?? '20')))

  const [items, total] = await Promise.all([
    prisma.eventType.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { id: 'asc' },
    }),
    prisma.eventType.count(),
  ])

  return ok({ items, page, pageSize, total })
}

export async function POST(req: NextRequest) {
  try {
    const json = await req.json()
    const body = eventTypeCreateSchema.parse(json)

    const item = await prisma.eventType.create({ data: body })
    return ok(item, { status: 201 })
  } catch (err: any) {
    if (err?.name === 'ZodError') return badRequest('Invalid body', err)
    if (err?.code === 'P2002') return badRequest('code already exists')
    return serverError(err)
  }
}
