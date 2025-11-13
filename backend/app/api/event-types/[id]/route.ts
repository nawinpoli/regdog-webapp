import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ok, badRequest, notFound, serverError } from '@/lib/http'
import { eventTypeUpdateSchema } from '@/lib/validators'

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: idStr } = await params
  const id = Number(idStr)
  if (!Number.isInteger(id)) return badRequest('Invalid id')
  const item = await prisma.eventType.findUnique({ where: { id } })
  if (!item) return notFound('EventType not found')
  return ok(item)
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: idStr } = await params
    const id = Number(idStr)
    if (!Number.isInteger(id)) return badRequest('Invalid id')
    const json = await req.json()
    const body = eventTypeUpdateSchema.parse(json)

    const updated = await prisma.eventType.update({ where: { id }, data: body })
    return ok(updated)
  } catch (err: any) {
    if (err?.name === 'ZodError') return badRequest('Invalid body', err)
    if (err?.code === 'P2025') return notFound('EventType not found')
    if (err?.code === 'P2002') return badRequest('code already exists')
    return serverError(err)
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: idStr } = await params
    const id = Number(idStr)
    if (!Number.isInteger(id)) return badRequest('Invalid id')
    await prisma.eventType.delete({ where: { id } })
    return ok({ deleted: true })
  } catch (err: any) {
    if (err?.code === 'P2025') return notFound('EventType not found')
    return serverError(err)
  }
}
