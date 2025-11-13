import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ok, badRequest, notFound, serverError } from '@/lib/http'

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: idStr } = await params
  const id = Number(idStr)
  if (!Number.isInteger(id)) return badRequest('Invalid id')
  const item = await prisma.dogEvent.findUnique({
    where: { id },
    include: {
      eventType: true,
      walkEvent: true,
      playEvent: true,
      trainingEvent: true,
      symptomEvent: true,
      vaccineEvent: true,
      medicationEvent: true,
      vetVisitEvent: true,
      weightEvent: true,
      expenseEvent: true,
    },
  })
  if (!item) return notFound('DogEvent not found')
  return ok(item)
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: idStr } = await params
    const id = Number(idStr)
    if (!Number.isInteger(id)) return badRequest('Invalid id')
    await prisma.dogEvent.delete({ where: { id } })
    return ok({ deleted: true })
  } catch (err: any) {
    if (err?.code === 'P2025') return notFound('DogEvent not found')
    return serverError(err)
  }
}
